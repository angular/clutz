package com.google.javascript.clutz;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Predicates.equalTo;
import static com.google.common.base.Predicates.not;
import static com.google.common.collect.Iterables.any;
import static com.google.javascript.rhino.jstype.JSTypeNative.ARRAY_TYPE;
import static com.google.javascript.rhino.jstype.JSTypeNative.OBJECT_TYPE;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.base.Function;
import com.google.common.base.Functions;
import com.google.common.base.Preconditions;
import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import com.google.common.base.Splitter;
import com.google.common.collect.Collections2;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.io.Files;
import com.google.javascript.jscomp.AbstractCommandLineRunner;
import com.google.javascript.jscomp.BasicErrorManager;
import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerInput;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.DefaultPassConfig;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.ErrorHandler;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.jscomp.TypedScope;
import com.google.javascript.jscomp.TypedVar;
import com.google.javascript.rhino.InputId;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.JSDocInfo.Visibility;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.jstype.EnumElementType;
import com.google.javascript.rhino.jstype.EnumType;
import com.google.javascript.rhino.jstype.FunctionType;
import com.google.javascript.rhino.jstype.JSType;
import com.google.javascript.rhino.jstype.JSTypeRegistry;
import com.google.javascript.rhino.jstype.NamedType;
import com.google.javascript.rhino.jstype.NoType;
import com.google.javascript.rhino.jstype.ObjectType;
import com.google.javascript.rhino.jstype.ProxyObjectType;
import com.google.javascript.rhino.jstype.RecordType;
import com.google.javascript.rhino.jstype.TemplateType;
import com.google.javascript.rhino.jstype.TemplatizedType;
import com.google.javascript.rhino.jstype.UnionType;
import com.google.javascript.rhino.jstype.Visitor;

import org.kohsuke.args4j.CmdLineException;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.regex.Pattern;

import javax.annotation.Nullable;

/**
 * A tool that generates {@code .d.ts} declarations from a Google Closure JavaScript program.
 */
public class DeclarationGenerator {
  static final DiagnosticType CLUTZ_OVERRIDDEN_STATIC_FIELD =
      DiagnosticType.error("CLUTZ_OVERRIDDEN_STATIC_FIELD",
          "Found a statically declared field that does not match the type of a parent field "
              + "with the same name, which is illegal in TypeScript.\nAt {0}.{1}");
  static final DiagnosticType CLUTZ_MISSING_TYPES = DiagnosticType.error("CLUTZ_MISSING_TYPES",
      "The code does not compile because it is missing some types. This is often caused by "
          + "the referenced code missing dependencies or by missing externs in your build rule.");

  private static final Function<Node, String> NODE_GET_STRING = new Function<Node, String>() {
    @Override public String apply(Node input) {
      return input.getString();
    }};

  private List<JSError> errors = new ArrayList<>();
  private StringWriter out = new StringWriter();
  private final Options opts;

  DeclarationGenerator(Options opts) {
    this.opts = opts;
  }

  public static void main(String[] args) {
    boolean printStackTrace = false;
    try {
      Options options = new Options(args);
      printStackTrace = options.debug;
      new DeclarationGenerator(options).generateDeclarations();
    } catch (CmdLineException e) {
      System.err.println(e.getMessage());
      System.err.println("Usage: clutz [options...] arguments...");
      e.getParser().printUsage(System.err);
      System.err.println();
      System.exit(1);
    } catch (DeclarationGeneratorException e) {
      if (printStackTrace) {
        // Includes the message.
        e.printStackTrace(System.err);
      } else {
        System.err.println(e.getMessage());
      }
      System.exit(1);
    } catch (Exception e) {
      e.printStackTrace(System.err);
      System.err.println("Uncaught exception in clutz, exiting.");
      System.exit(1);
    }
    System.exit(0);
  }

  void generateDeclarations() {
    List<SourceFile> sourceFiles = new ArrayList<>();
    for (String source : opts.arguments) {
      sourceFiles.add(SourceFile.fromFile(source, UTF_8));
    }
    List<SourceFile> externFiles = new ArrayList<>();
    for (String extern : opts.externs) {
      externFiles.add(SourceFile.fromFile(extern, UTF_8));
    }
    String result = generateDeclarations(sourceFiles, externFiles,
        Depgraph.parseFrom(opts.readDepgraphs()));

    if ("-".equals(opts.output)) {
      System.out.println(result);
    } else {
      File output = new File(opts.output);
      try {
        Files.write(result, output, UTF_8);
      } catch (IOException e) {
        throw new IllegalArgumentException("Unable to write to file " + opts.output, e);
      }
    }
  }

  String generateDeclarations(List<SourceFile> sourceFiles, List<SourceFile> externs,
      Depgraph depgraph) throws AssertionError {
    Compiler compiler = new Compiler();
    compiler.disableThreads();
    CompilerOptions compilerOptions = opts.getCompilerOptions();
    // Capture all errors directly instead of relying on JSCompiler's error reporting mechanisms.
    compilerOptions.setErrorHandler(new ErrorHandler() {
      @Override
      public void report(CheckLevel level, JSError error) {
        errors.add(error);
      }
    });
    compiler.setPassConfig(new DefaultPassConfig(compilerOptions));
    // In spite of setting an ErrorHandler above, this is still needed to silence the console.
    compiler.setErrorManager(new BasicErrorManager() {
      @Override
      public void println(CheckLevel level, JSError error) { /* check errors below */ }

      @Override
      protected void printSummary() { /* check errors below */ }
    });

    if (externs.isEmpty()) {
      externs = opts.skipParseExterns ? Collections.<SourceFile>emptyList() : getDefaultExterns(opts);
    } else {
      Preconditions.checkArgument(!opts.skipParseExterns,
          "Cannot pass --skipParseExterns and --externs.");
    }

    compiler.compile(externs, sourceFiles, compilerOptions);
    if (!errors.isEmpty()) {
      boolean missingTypes =
          Iterables.any(Iterables.transform(errors, Functions.toStringFunction()),
              Predicates.contains(Pattern.compile("Bad type annotation. Unknown type")));
      if (missingTypes) {
        errors.add(0, JSError.make(CLUTZ_MISSING_TYPES));
      }
      throw new DeclarationGeneratorException("Source code does not compile with JSCompiler",
          errors);
    }

    String dts = produceDts(compiler, depgraph);
    if (!errors.isEmpty()) {
      throw new DeclarationGeneratorException("Errors while generating definitions", errors);
    }
    return dts;
  }

  private String getNamespace(String input) {
    int dotIdx = input.lastIndexOf('.');
    if (dotIdx == -1) {
      return "";
    }
    return input.substring(0, dotIdx);
  }

  public String produceDts(Compiler compiler, Depgraph depgraph) {
    // Tree sets for consistent order.
    Set<String> provides = new TreeSet<>();
    Set<String> transitiveProvides = new TreeSet<>();
    out = new StringWriter();

    for (CompilerInput compilerInput : compiler.getInputsById().values()) {
      transitiveProvides.addAll(compilerInput.getProvides());
      if (depgraph.getRoots().isEmpty() ||
          depgraph.getRoots().contains(compilerInput.getSourceFile().getOriginalPath())) {
        provides.addAll(compilerInput.getProvides());
        emitComment(String.format("Processing provides %s from input %s",
            compilerInput.getProvides(),
            compilerInput.getSourceFile().getOriginalPath()));
      }
    }

    TypedScope topScope = compiler.getTopScope();
    for (String provide : provides) {
      TypedVar symbol = topScope.getOwnSlot(provide);
      checkArgument(symbol != null, "goog.provide not defined: %s", provide);
      checkArgument(symbol.getType() != null, "all symbols should have a type");
      String namespace = provide;
        // These goog.provide's have only one symbol, so users expect to use default import
      boolean isDefault = !symbol.getType().isObject() ||
          symbol.getType().isInterface() ||
          symbol.getType().isEnumType() ||
          symbol.getType().isFunctionType();
      if (isDefault) {
        namespace = getNamespace(symbol.getName());
      }
      int valueSymbolsWalked = declareNamespace(namespace, symbol, isDefault, compiler,
          transitiveProvides, false);

      // skip emitting goog.require declarations for value empty namespaces, as calling typeof
      // does not work for them.
      if (valueSymbolsWalked > 0) {
        emitGoogRequireSupport(namespace, isDefault ? symbol.getName() : namespace);
      }
      declareModule(provide, isDefault);
    }

    // In order to typecheck in the presence of third-party externs, also emit all top-level and
    // class symbols, even though they have no explicit provides.
    for (TypedVar symbol : topScope.getAllSymbols()) {
      CompilerInput symbolInput = compiler.getInput(new InputId(symbol.getInputName()));
      if (symbolInput == null || !symbolInput.isExtern()) {
        continue;
      }
      if (isPlatformExtern(symbolInput)) {
        continue;
      }

      JSType type = symbol.getType();
      String namespace = getNamespace(symbol.getName());
      if (namespace.contains(".") &&
          (type.isConstructor() || type.isEnumType() || type.isInterface())) {
        declareNamespace(namespace, symbol, true, compiler,
            transitiveProvides, true);
      } else {
        if (symbol.getName().contains(".")) {
          continue;
        }
        declareNamespace(symbol.getName(), symbol, false, compiler, transitiveProvides, true);
      }
      // we do not declare modules or goog.require support, because externs types should not be
      // visible from TS code.
    }

    checkState(indent == 0, "indent must be zero after printing, but is %s", indent);
    return out.toString();
  }

  // For platform externs we skip emitting .d.ts, to avoid collisions with lib.d.ts.
  private boolean isPlatformExtern(CompilerInput symbolInput) {
    String name = symbolInput.getName();
    name = name.replace("externs.zip//", "");
    // mostly matching what is in https://github.com/google/closure-compiler/tree/master/externs.
    return name.startsWith("javascript/externs/") || name.startsWith("es") || name.startsWith("w3c")
        || name.startsWith("ie_") || name.startsWith("browser");
  }

  private int declareNamespace(String namespace, TypedVar symbol, boolean isDefault,
                               Compiler compiler, Set<String> provides, boolean isExtern) {
    emitNamespaceBegin(namespace);
    TreeWalker treeWalker = new TreeWalker(compiler.getTypeRegistry(), provides);
    if (isDefault) {
      treeWalker.walk(symbol);
    } else {
      // JSCompiler treats "foo.x" as one variable name, so collect all provides that start with
      // $provide + "." but are not sub-properties.
      Set<String> desiredSymbols = new TreeSet<>();
      List<TypedVar> allSymbols = Lists.newArrayList(compiler.getTopScope().getAllSymbols());
      Collections.sort(allSymbols, new Comparator<TypedVar>() {
        @Override
        public int compare(TypedVar o1, TypedVar o2) {
          return o1.getName().compareTo(o2.getName());
        }
      });

      ObjectType objType = (ObjectType) symbol.getType();
      for (String property : objType.getPropertyNames()) {
        if (!isPrivate(objType.getOwnPropertyJSDocInfo(property))) {
          desiredSymbols.add(symbol.getName() + "." + property);
        }
      }
      // Any provides have their own namespace and should not be emitted in this namespace.
      for (String provide : provides) {
        String toRemove = provide;
        while (!toRemove.isEmpty()) {
          desiredSymbols.remove(toRemove);
          // Also remove their implicit parent namespaces
          toRemove = toRemove.substring(0, Math.max(0, toRemove.lastIndexOf('.')));
        }
      }

      for (TypedVar other : allSymbols) {
        String otherName = other.getName();
        if (desiredSymbols.contains(otherName) && other.getType() != null
            && !other.getType().isFunctionPrototypeType()
            && !isPrototypeMethod(other)) {
          try {
            treeWalker.walk(other);
          } catch (RuntimeException e) {
            // Do not throw DeclarationGeneratorException - this is an unexpected runtime error.
            throw new RuntimeException("Failed to emit for " + other, e);
          }
        }
      }
    }
    emitNamespaceEnd();
    // An extra pass is required for default exported interfaces, because in Closure they might have
    // static methods. TS does not support static methods on interfaces, thus we create a new
    // namespace for them.
    if (isDefault && isInterfaceWithStatic(symbol.getType())) {
      emitNamespaceBegin(symbol.getName());
      treeWalker.walkDefaultInterface((FunctionType) symbol.getType());
      emitNamespaceEnd();
    }
    // extra walk required for inner classes and inner enums. They are allowed in closure,
    // but not in TS, so we have to generate a namespace-class pair in TS.
    // In the case of the externs, however we *do* go through all symbols so this pass is not
    // needed.
    if (isDefault && hasNestedTypes(symbol.getType()) && !isExtern) {
      emitNamespaceBegin(symbol.getName());
      treeWalker.walkInnerClassesAndEnums((ObjectType) symbol.getType(), symbol.getName());
      emitNamespaceEnd();
    }
    return treeWalker.valueSymbolsWalked;

  }

  private boolean hasNestedTypes(JSType type) {
    if (!type.isConstructor()) return false;
    FunctionType ftype = (FunctionType) type;
    for (String name : ((FunctionType) type).getOwnPropertyNames()) {
      JSType propType = ftype.getPropertyType(name);
      if (propType.isConstructor() || propType.isEnumType() || propType.isInterface()) return true;
    }
    return false;
  }

  private void emitGoogRequireSupport(String namespace, String closureNamespace) {
    // goog namespace doesn't need to be goog.required.
    if (namespace.equals("goog")) return;
    emitNamespaceBegin("goog");
    String qualifiedClosureNamespace = Constants.INTERNAL_NAMESPACE + "." + closureNamespace;
    // TS supports overloading the require declaration with a fixed string argument.
    emit("function require(name: '" + closureNamespace + "'): typeof " + qualifiedClosureNamespace
        + ";");
    emitBreak();
    emitNamespaceEnd();
  }


  private void emitNamespaceBegin(String namespace) {
    emitNoSpace("declare namespace ");
    emitNoSpace(Constants.INTERNAL_NAMESPACE);
    if (!namespace.isEmpty()) {
      emitNoSpace("." + namespace);
    }
    emitNoSpace(" {");
    indent();
    emitBreak();
  }

  private void emitNamespaceEnd() {
    unindent();
    emit("}");
    emitBreak();
  }

  private boolean isPrototypeMethod(TypedVar other) {
    if (other.getType() != null && other.getType().isOrdinaryFunction()) {
      JSType typeOfThis = ((FunctionType) other.getType()).getTypeOfThis();
      if (typeOfThis != null && !typeOfThis.isUnknownType()) {
        return true;
      }
    }
    return false;
  }

  private boolean isPrivate(@Nullable JSDocInfo docInfo) {
    return docInfo != null && docInfo.getVisibility() == Visibility.PRIVATE;
  }

  private boolean isInterfaceWithStatic(JSType type) {
    if (!type.isInterface() || !type.isFunctionType()) return false;
    FunctionType ftype = (FunctionType) type;
    return any(ftype.getOwnPropertyNames(), not(equalTo("prototype")));
  }

  private void declareModule(String name, Boolean isDefault) {
    emitNoSpace("declare module '");
    emitNoSpace("goog:" + name);
    emitNoSpace("' {");
    indent();
    emitBreak();
    // workaround for https://github.com/Microsoft/TypeScript/issues/4325
    emit("import alias = ");
    emitNoSpace(Constants.INTERNAL_NAMESPACE);
    emitNoSpace("." + name);
    emitNoSpace(";");
    emitBreak();
    if (isDefault) {
      emit("export default alias;");
    } else {
      emit("export = alias;");
    }
    emitBreak();
    unindent();
    emit("}");
    emitBreak();
  }

  static public List<SourceFile> getDefaultExterns(Options opts) {
    try {
      return AbstractCommandLineRunner.getBuiltinExterns(opts.getCompilerOptions());
    } catch (IOException e) {
      throw new RuntimeException("Could not locate builtin externs", e);
    }
  }

  private int indent = 0;
  private boolean startOfLine = true;

  private void indent() {
    indent++;
  }

  private void unindent() {
    indent--;
    checkState(indent >= 0, "indentation level below zero");
  }

  private void emitNoSpace(String str) {
    maybeEmitIndent();
    out.write(str);
  }

  private void emit(String str) {
    Preconditions.checkNotNull(str);
    if (!maybeEmitIndent()) {
      out.write(" ");
    }
    out.write(str);
  }

  private boolean maybeEmitIndent() {
    if (!startOfLine) {
      return false;
    }
    for (int i = 0; i < indent; i++) {
      out.write("  ");
    }
    startOfLine = false;
    return true;
  }

  private void emitBreak() {
    out.write("\n");
    startOfLine = true;
  }

  // We use a syntax for comments that we can strip in unit tests
  private void emitComment(String s) {
    emit("//!!");
    emit(s);
    emitBreak();
  }

  private ObjectType getSuperType(FunctionType type) {
    ObjectType proto = type.getPrototype();
    if (proto == null) return null;
    ObjectType implicitProto = proto.getImplicitPrototype();
    if (implicitProto == null) return null;
    return "Object".equals(implicitProto.getDisplayName()) ? null : implicitProto;
  }

  private class TreeWalker {
    private final JSTypeRegistry typeRegistry;
    private final Set<String> provides;
    private int valueSymbolsWalked = 0;
    private TypedVar currentSymbol;

    private TreeWalker(JSTypeRegistry typeRegistry, Set<String> provides) {
      this.typeRegistry = typeRegistry;
      this.provides = provides;
    }

    private String getAbsoluteName(ObjectType objectType) {
      String name = objectType.getDisplayName();
      // Names that do not have a namespace '.' are either platform names in the top level
      // namespace like `Object` or `Element`, or they are unqualified `goog.provide`s, e.g.
      // `goog.provide('Toplevel')`. In both cases they will be found with the naked name.
      // However a goog.provide'd name can collide with a re-declared top-level symbol, e.g. if some
      // code goog.provide's `Element`.
      // TODO(martinprobst): Consider aliasing all global symbols into the clutz namespace.
      if (name.indexOf('.') == -1) return name;
      return Constants.INTERNAL_NAMESPACE + "." + name;
    }

    private String getUnqualifiedName(TypedVar symbol) {
      return lastPart(symbol.getName());
    }

    private String getUnqualifiedName(JSType type) {
      return lastPart(type.getDisplayName());
    }

    private String lastPart(String input) {
      int dotIdx = input.lastIndexOf('.');
      if (dotIdx == -1) {
        return input;
      }
      return input.substring(dotIdx + 1, input.length());
    }

    private void walk(TypedVar symbol) {
      this.currentSymbol = symbol;
      JSType type = symbol.getType();
      if (!type.isInterface() && !type.isNoType()) valueSymbolsWalked++;
      if (type.isFunctionType()) {
        FunctionType ftype = (FunctionType) type;

        // Closure represents top-level functions as classes because they might be new-able.
        // This happens through externs es3.js which has Function marked as constructor.
        // See https://github.com/angular/closure-to-dts/issues/90
        boolean ordinaryFunctionAppearingAsClass =
            ftype.isConstructor() && "Function".equals(ftype.getDisplayName());

        if (ftype.isOrdinaryFunction() || ordinaryFunctionAppearingAsClass) {
          maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ false);
          emit("function");
          emit(getUnqualifiedName(symbol));
          visitFunctionDeclaration(ftype);
          emit(";");
          emitBreak();
          return;
        }

        maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ true);
        if (!ftype.isNominalConstructor()) {
          // A top-level field that has a specific constructor function type.
          // <code>/** @type {function(new:X)} */ foo.x;</code>
          visitVarDeclaration(symbol, ftype);
          return;
        }
        visitClassOrInterface(getUnqualifiedName(symbol), ftype);
      } else {
        maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ false);
        if (type.isEnumType()) {
          visitEnumType((EnumType) type);
          return;
        }
        // Closure keeps type None for the symbol which became the type alias.
        // However, the aliased type is present in the registry under the same name.
        // TODO(rado): figure out whether NoType guarantees a typedef.
        if (type.isNoType()) {
          JSType registryType = typeRegistry.getType(symbol.getName());
          if (registryType != null) {
            visitTypeAlias(registryType, getUnqualifiedName(symbol));
            return;
          }
        }
        visitVarDeclaration(symbol, type);
      }
    }

    private void maybeEmitJsDoc(JSDocInfo docs, boolean ignoreParams) {
      if (docs == null) return;
      String desc = docs.getBlockDescription();
      if (desc == null) return;
      emit("/**");
      emitBreak();
      if (desc != null) {
        for (String line : Splitter.on('\n').split(desc)) {
          emit(" *");
          if (!line.isEmpty()) emit(line);
          emitBreak();
        }
      }
      if (!ignoreParams) {
        for (String name : docs.getParameterNames()) {
          if (docs.getDescriptionForParameter(name) == null) continue;
          emit(" * @param");
          emit(name);
          emit(docs.getDescriptionForParameter(name));
          emitBreak();
        }
      }
      emit(" */");
      emitBreak();
    }

    private void visitClassOrInterface(String name, FunctionType ftype) {
      if (ftype.isConstructor()) {
        // "proper" class constructor
        emit("class");
      } else if (ftype.isInterface()) {
        emit("interface");
      } else {
        checkState(false, "Unexpected function type " + ftype);
      }
      emit(name);

      visitTemplateTypes(ftype);

      // Interface extends another interface
      if (ftype.getExtendedInterfacesCount() > 0) {
        emit("extends");
        Iterator<ObjectType> it = ftype.getExtendedInterfaces().iterator();
        while (it.hasNext()) {
          visitType(it.next());
          if (it.hasNext()) {
            emit(",");
          }
        }
      }
      // Class extends another class
      if (getSuperType(ftype) != null) {
        emit("extends");
        visitType(getSuperType(ftype));
      }

      Iterator<ObjectType> it = ftype.getOwnImplementedInterfaces().iterator();
      if (it.hasNext()) {
        emit("implements");
        while (it.hasNext()) {
          visitType(it.next());
          if (it.hasNext()) {
            emit(",");
          }
        }
      }
      visitObjectType(ftype, ftype.getPrototype(), !ftype.isInterface());
    }

    private void visitVarDeclaration(TypedVar symbol, JSType type) {
      emit("var");
      emit(getUnqualifiedName(symbol));
      visitTypeDeclaration(type, false);
      emit(";");
      emitBreak();
    }

    private void walkDefaultInterface(FunctionType ftype) {
      visitNamespaceLikeType(ftype);
    }

    private void visitTemplateTypes(ObjectType type) {
      if (type.hasAnyTemplateTypes() && !type.getTemplateTypeMap().isEmpty()) {
        emit("<");
        Iterator<TemplateType> it = type.getTemplateTypeMap().getTemplateKeys().iterator();
        while (it.hasNext()) {
          emit(it.next().getDisplayName());
          if (it.hasNext()) {
            emit(",");
          }
        }
        emit(">");
      }
    }

    private void visitTypeAlias(JSType registryType, String unqualifiedName) {
      emit("type");
      emit(unqualifiedName);
      emit("=");
      visitType(registryType);
      emit(";");
      emitBreak();
    }

    private void visitEnumType(EnumType type) {
      // Enums are top level vars, but also declare a corresponding type:
      // <pre>
      // /** @enum {ValueType} */ var MyEnum = {A: ..., B: ...};
      // type MyEnum = EnumValueType;
      // var MyEnum: {A: MyEnum, B: MyEnum, ...};
      // </pre>
      // TODO(martinprobst): Special case number enums to map to plain TS enums?
      visitTypeAlias(type.getElementsType().getPrimitiveType(), getUnqualifiedName(type));
      emit("var");
      // TS `type` declarations accept only unqualified names.
      emit(getUnqualifiedName(type));
      emit(": {");
      emitBreak();
      indent();
      for (String elem : sorted(type.getElements())) {
        emit(elem);
        emit(":");
        visitType(type.getElementsType());
        emit(",");
        emitBreak();
      }
      unindent();
      emit("};");
      emitBreak();
    }

    private void visitTypeDeclaration(JSType type, boolean isVarArgs) {
      if (type != null) {
        emit(":");
        // From https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
        // ArrayType:
        //   PrimaryType [no LineTerminator here] [ ]
        if (isVarArgs) {
          visitTypeAsPrimary(type);
        } else {
          visitType(type);
        }
        if (isVarArgs) emit("[]");
      }
    }

    /**
     * Adds parentheses to turn a Type grammar production into a PrimaryType.
     * See https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
     *
     * Avoid adding extra parens where the type is already known to be Primary.
     *
     * PrimaryType:
     *   ParenthesizedType
     * ParenthesizedType:
     *   ( Type )
     */
    private void visitTypeAsPrimary(JSType type) {
      // These types will produce a non-primary grammar production
      if (type.isConstructor() || type.isFunctionType() || type.isUnionType()) {
        emit("(");
        visitType(type);
        emit(")");
      } else {
        visitType(type);
      }
    }

    private void visitType(JSType typeToVisit) {
      // See also JsdocToEs6TypedConverter in the Closure code base. This code is implementing the
      // same algorithm starting from JSType nodes (as opposed to JSDocInfo), and directly
      // generating textual output. Otherwise both algorithms should produce the same output.
      Visitor<Void> visitor = new Visitor<Void>() {
        @Override
        public Void caseBooleanType() {
          emit("boolean");
          return null;
        }

        @Override
        public Void caseNumberType() {
          emit("number");
          return null;
        }

        @Override
        public Void caseStringType() {
          emit("string");
          return null;
        }

        @Override
        public Void caseObjectType(ObjectType type) {
          if (type.getDisplayName() != null && type.getDisplayName().equals("Error")) {
            // global Error is aliased as GlobalError in closure.lib.d.ts.
            emit("GlobalError");
            return null;
          }
          // Closure doesn't require that all the type params be declared, but TS does
          if (!type.getTemplateTypeMap().isEmpty()
              && !typeRegistry.getNativeType(OBJECT_TYPE).equals(type)) {
            return caseTemplatizedType(typeRegistry.createTemplatizedType(type));
          }
          if (type.isRecordType()) {
            visitRecordType((RecordType) type);
          } else if (type.isDict()) {
            emit("{[key: string]: any}");
          } else if (type.getReferenceName() != null) {
            emit(getAbsoluteName(type));
          } else {
            emit("Object");
          }
          return null;
        }

        @Override
        public Void caseUnionType(UnionType type) {
          visitUnionType(type);
          return null;
        }

        @Override
        public Void caseNamedType(NamedType type) {
          visitType(type.getReferencedType());
          return null;
        }

        @Override
        public Void caseTemplatizedType(TemplatizedType type) {
          ObjectType referencedType = type.getReferencedType();
          String templateTypeName = getAbsoluteName(referencedType);
          if (typeRegistry.getNativeType(ARRAY_TYPE).equals(referencedType)
              && type.getTemplateTypes().size() == 1) {
            // As per TS type grammar, array types require primary types.
            // https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
            visitTypeAsPrimary(type.getTemplateTypes().get(0));
            emit("[]");
            return null;
          }
          switch (type.getDisplayName()) {
            // Arguments<?> and NodeList<?> in es3 externs are correspondinly
            // IArguments and NodeList interfaces (not-parametrized) in lib.d.ts.
            // New* are temporary work-arounds for upstream externs.
            // TODO(rado): upgrade closure compiler and remove them.
            case "Arguments":
            case "NewArguments":
              emit("IArguments");
              return null;
            case "NodeList":
            case "NewNodeList":
              emit("NodeList");
              return null;
            case "IThenable":
              templateTypeName = "PromiseLike";
              break;
            default:
              break;
          }
          if (type.getTemplateTypes().isEmpty()) {
            // In Closure, subtypes of `TemplatizedType`s that do not take type arguments are still
            // represented by templatized types.
            emit(templateTypeName);
            return null;
          }
          Iterator<JSType> it = type.getTemplateTypes().iterator();
          if (typeRegistry.getNativeType(OBJECT_TYPE).equals(referencedType)) {
            emit("{ [");
            // TS allows only number or string as index type of an object
            // https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.9.4
            JSType keyType = it.next();
            if (keyType.isNumberValueType()) {
              emit("n: number");
            } else {
              if (!keyType.isStringValueType()) {
                emit("/* warning: coerced from " + keyType + " */");
              }
              emit("s: string");
            }
            emit("]:");
            visitType(it.next());
            emit("}");
            return null;
          }
          emit(templateTypeName);
          emit("<");
          while (it.hasNext()) {
            visitType(it.next());
            if (it.hasNext()) {
              emit(",");
            }
          }
          emit(">");
          return null;
        }

        @Override
        public Void caseTemplateType(TemplateType templateType) {
          emit(templateType.getReferenceName());
          return null;
        }

        @Override
        public Void caseNoType(NoType type) {
          emit("any");
          return null;
        }

        @Override
        public Void caseAllType() {
          emit("any");
          return null;
        }

        @Override
        public Void caseNoObjectType() {
          emit("any");
          return null;
        }

        @Override
        public Void caseUnknownType() {
          emit("any");
          return null;
        }

        @Override
        public Void caseNullType() {
          emit("any");
          return null;
        }

        @Override
        public Void caseVoidType() {
          emit("void");
          return null;
        }

        @Override
        public Void caseEnumElementType(EnumElementType type) {
          emit(getAbsoluteName(type));
          return null;
        }

        @Override
        public Void caseFunctionType(FunctionType type) {
          if (type.isConstructor() && !"Function".equals(type.getDisplayName())) {
            visitConstructorFunctionDeclaration(type);
            return null;
          }
          visitFunctionParameters(type);
          JSType returnType = type.getReturnType();
          if (returnType != null) {
            emit("=>");
            visitType(returnType);
          }
          return null;
        }

        @Override
        public Void caseProxyObjectType(ProxyObjectType type) {
          type.visitReferenceType(this);
          return null;
        }
      };
      try {
        typeToVisit.visit(visitor);
      } catch (Exception e) {
        throw new RuntimeException("Failed to emit type " + typeToVisit, e);
      }
    }

    // This method is used for objects like the static props on an interface, that
    // behave like an object with bunch of props, but are not technically defined as
    // record types.
    private void visitNamespaceLikeType(ObjectType type) {
      for (String propName : getSortedPropertyNames(type)) {
        if (propName.equals("prototype")) continue;
        JSType pType = type.getPropertyType(propName);
        // Here we assume the enum is exported and handled separately.
        if (pType.isEnumType()) continue;
        maybeEmitJsDoc(pType.getJSDocInfo(), /* ignoreParams */ false);
        emit("var");
        emit(propName);
        emit(":");
        visitType(pType);
        emit(";");
        emitBreak();
      }
    }

    private void visitRecordType(RecordType type) {
      emit("{");
      Iterator<String> it = getSortedPropertyNames(type).iterator();
      while (it.hasNext()) {
        String propName = it.next();
        emit(propName);
        visitTypeDeclaration(type.getPropertyType(propName), false);
        if (it.hasNext()) {
          emit(",");
        }
      }
      emit("}");
    }

    private Set<String> getSortedPropertyNames(ObjectType type) {
      return sorted(type.getOwnPropertyNames());
    }

    private Set<String> sorted(Set<String> elements) {
      return new TreeSet<>(elements);
    }

    private void visitUnionType(UnionType ut) {
      Collection<JSType> alts = Collections2.filter(ut.getAlternates(), new Predicate<JSType>() {
        @Override
        public boolean apply(JSType input) {
          // Skip - TypeScript does not have explicit null or optional types.
          // Optional types must be handled at the declaration name (`foo?` syntax).
          return !input.isNullType() && !input.isVoidType();
        }
      });
      if (alts.size() == 0) {
        emit("any");
        return;
      }
      if (alts.size() == 1) {
        visitType(alts.iterator().next());
        return;
      }
      Iterator<JSType> it = alts.iterator();
      while (it.hasNext()) {
        // See https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
        // UnionType:
        //   UnionOrIntersectionOrPrimaryType | IntersectionOrPrimaryType
        visitTypeAsPrimary(it.next());
        if (it.hasNext()) {
          emit("|");
        }
      }
    }

    private void visitObjectType(ObjectType type, ObjectType prototype, Boolean processStatics) {
      emit("{");
      indent();
      emitBreak();
      // Prevent accidental structural typing - emit every class with a private field.
      if (type.isNominalConstructor() && !type.isInterface()
          // But only for non-extending classes (TypeScript doesn't like overriding private fields)
          && getSuperType((FunctionType) type) == null) {
        emit("private noStructuralTyping_: any;");
        emitBreak();
      }
      // Constructors.
      if (type.isConstructor() && ((FunctionType)type).getParameters().iterator().hasNext()) {
        maybeEmitJsDoc(type.getJSDocInfo(), /* ignoreParams */ false);
        emit("constructor");
        visitFunctionParameters((FunctionType) type, false);
        emit(";");
        emitBreak();
      }
      // Fields.
      JSType instanceType = type.getTypeOfThis();
      checkArgument(instanceType.isObject(), "expected an ObjectType for this, but got "
          + instanceType + " which is a " + instanceType.getClass().getSimpleName());
      visitProperties((ObjectType) instanceType, false);
      // Bracket-style property access
      if (type.isDict()) {
        emit("[key: string]: any;");
        emitBreak();
      }
      // Prototype fields (mostly methods).
      visitProperties(prototype, false, ((ObjectType) instanceType).getOwnPropertyNames());
      // Statics.
      if (processStatics) {
        visitProperties(type, true);
      }
      unindent();
      emit("}");
      emitBreak();
    }

    private void visitProperties(ObjectType objType, boolean isStatic) {
      visitProperties(objType, isStatic,  Collections.<String>emptySet());
    }

    private void visitProperties(ObjectType objType, boolean isStatic, Set<String> skipNames) {
      for (String propName : getSortedPropertyNames(objType)) {
        if (skipNames.contains(propName)) continue;

        if ("prototype".equals(propName) || "superClass_".equals(propName)
            // constructors are handled in #visitObjectType
            || "constructor".equals(propName)) {
          continue;
        }
        visitProperty(propName, objType, isStatic);
      }
    }

    private void visitProperty(String propName, ObjectType objType, boolean isStatic) {
      JSType propertyType = objType.getPropertyType(propName);
      // Some symbols might be emitted as provides, so don't duplicate them
      String qualifiedName = objType.getDisplayName() + "." + propName;
      if (provides.contains(qualifiedName)) {
        return;
      } else if (isPrivate(objType.getOwnPropertyJSDocInfo(propName))) {
        return;
      } else if (propertyType.isEnumType() || propertyType.isConstructor()) {
        // enums and classes are emitted in a namespace later.
        return;
      }
      maybeEmitJsDoc(objType.getOwnPropertyJSDocInfo(propName), /* ignoreParams */ false);
      if (isStatic) {
        // The static methods apply and call are provided by lib.d.ts.
        if (propName.equals("apply") || propName.equals("call")) return;
        emit("static");
      }
      emit(propName);
      if (propertyType.isFunctionType()) {
        visitFunctionDeclaration((FunctionType) propertyType);
      } else {
        visitTypeDeclaration(propertyType, false);
      }
      emit(";");
      emitBreak();
      if (isStatic && !isPrivate(objType.getOwnPropertyJSDocInfo(propName))) {
        emitStaticOverloads(propName, objType, propertyType);
      }
    }

    /**
     * Emit overloads for static methods from super classes that do not match the signature of the
     * current method.
     *
     * In Closure, static methods are completely independent of each other, like regular functions
     * with different names. In TypeScript, the static side of a class has to extend its parent's
     * static side, i.e. static methods are inherited and have to subtype the parent's methods.
     *
     * E.g. the following code fails as Child incorrectly extends Parent.
     *
     * <pre>
     *   class Parent               { static foo(a: string); }
     *   class Child extends Parent { static foo(a: number); }
     * </pre>
     *
     * To fix, the code below re-emits (by recursion) any properties that have a colliding type.
     *
     * This is necessarily incomplete, and will fail for differences that cannot be dispatched on,
     * e.g. different return types. It also pretends that functions exist that do not.
     */
    private void emitStaticOverloads(String propName, ObjectType objType, JSType propertyType) {
      if (!objType.isFunctionType()) {
        return;
      }
      ObjectType superType = getSuperType((FunctionType) objType);
      if (superType == null || superType.getConstructor() == null) {
        return;
      }
      FunctionType superTypeCtor = superType.getConstructor();
      if (!superTypeCtor.hasProperty(propName)) {
        return;
      }
      // "I, for one, welcome our new static overloads." - H.G. Wells.
      JSType superPropType = superTypeCtor.getPropertyType(propName);
      if (!propertyType.isSubtype(superPropType)) {
        // If the super field is private there is no issue, because private fields are not emitted.
        if (isPrivate(superTypeCtor.getOwnPropertyJSDocInfo(propName))) return;
        if (!propertyType.isFunctionType() || !superPropType.isFunctionType()) {
          errors.add(JSError.make(currentSymbol.getNode(), CLUTZ_OVERRIDDEN_STATIC_FIELD,
              objType.getDisplayName(), propName));
        } else {
          emit("/** WARNING: emitted for non-matching super type's static method. "
              + "Only the first overload is actually callable. */");
          emitBreak();
        }
        visitProperty(propName, superTypeCtor, true);
      }
    }

    private void visitFunctionDeclaration(FunctionType ftype) {
      visitFunctionParameters(ftype);
      JSType type = ftype.getReturnType();
      if (type != null) {
        emit(":");
        visitType(type);
      }
    }

    private void visitConstructorFunctionDeclaration(FunctionType ftype) {
      // Translate constructor functions to object type literals with a construct signature.
      // "function(new:X, string)" --> "{new(a: string): X}".
      emit("{");
      emit("new");
      visitFunctionParameters(ftype);
      emit(":");
      visitType(ftype.getInstanceType());
      emit("}");
    }

    private void visitFunctionParameters(FunctionType ftype) {
      visitFunctionParameters(ftype, true);
    }

    private void visitFunctionParameters(FunctionType ftype, boolean emitTemplatizedTypes) {
      if (emitTemplatizedTypes) {
        visitTemplateTypes(ftype);
      }
      emit("(");
      Iterator<Node> parameters = ftype.getParameters().iterator();
      Iterator<String> names = null;
      Node functionSource = ftype.getSource();
      if (functionSource != null) {
        // functionSource AST:  FUNCTION -> (NAME, PARAM_LIST, BLOCK ...)
        Iterable<Node> parameterNodes = functionSource.getFirstChild().getNext().children();
        names = Iterables.transform(parameterNodes, NODE_GET_STRING).iterator();
      }
      char pName = 'a'; // let's hope for no more than 26 parameters...
      while (parameters.hasNext()) {
        Node param = parameters.next();
        if (param.isVarArgs()) {
          emit("...");
        }
        if (names != null && names.hasNext()) {
          emitNoSpace(names.next());
        } else {
          emitNoSpace("" + pName++);
        }
        if (param.isOptionalArg()) {
          emit("?");
        }
        visitTypeDeclaration(param.getJSType(), param.isVarArgs());
        if (parameters.hasNext()) {
          emit(", ");
        }
      }
      emit(")");
    }

    public void walkInnerClassesAndEnums(ObjectType type, String innerNamespace) {
      for (String propName : getSortedPropertyNames(type)) {
        if (provides.contains(innerNamespace + '.' + propName)) continue;
        JSType pType = type.getPropertyType(propName);
        if (pType.isEnumType()) {
          visitEnumType((EnumType) pType);
        } else if (pType.isConstructor()) {
          visitClassOrInterface(propName, (FunctionType) pType);
        }
      }
    }
  }
}
