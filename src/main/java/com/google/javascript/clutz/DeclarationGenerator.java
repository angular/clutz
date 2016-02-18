package com.google.javascript.clutz;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkState;
import static com.google.common.collect.Iterables.any;
import static com.google.javascript.rhino.jstype.JSTypeNative.ARRAY_TYPE;
import static com.google.javascript.rhino.jstype.JSTypeNative.OBJECT_TYPE;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.base.Function;
import com.google.common.base.Preconditions;
import com.google.common.base.Predicate;
import com.google.common.base.Splitter;
import com.google.common.collect.Collections2;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.common.io.Files;
import com.google.javascript.jscomp.AbstractCommandLineRunner;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerInput;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.ErrorFormat;
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
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.regex.Pattern;

import javax.annotation.Nullable;

/**
 * A tool that generates {@code .d.ts} declarations from a Google Closure JavaScript program.
 */
public class DeclarationGenerator {

  static final String INSTANCE_CLASS_SUFFIX = "_Instance";
  public static final Pattern GOOG_MODULE_EXTRACT =
      Pattern.compile("goog.module\\(['\"](.*)['\"]\\);");

  public static void main(String[] args) {
    Options options = null;
    try {
      options = new Options(args);
    } catch (CmdLineException e) {
      System.err.println(e.getMessage());
      System.err.println("Usage: clutz [options...] arguments...");
      e.getParser().printUsage(System.err);
      System.err.println();
      System.exit(1);
    }
    try {
      DeclarationGenerator generator = new DeclarationGenerator(options);
      generator.generateDeclarations();
      if (generator.hasErrors()) {
        // Already reported through the print stream.
        System.exit(2);
      }
    } catch (Exception e) {
      e.printStackTrace(System.err);
      System.err.println("Uncaught exception in clutz, exiting.");
      System.exit(3);
    }
    System.exit(0);
  }

  static final DiagnosticType CLUTZ_MISSING_TYPES = DiagnosticType.error("CLUTZ_MISSING_TYPES",
      "A dependency does not compile because it is missing some types. This is often caused by "
          + "the referenced code missing dependencies or by missing externs in your build rule.");

  private static final Function<Node, String> NODE_GET_STRING = new Function<Node, String>() {
    @Override
    public String apply(Node input) {
      return input.getString();
    }
  };

  private final Options opts;
  private final Compiler compiler;
  private final ClutzErrorManager errorManager;
  private StringWriter out = new StringWriter();
  private final Set<String> privateEnums = new LinkedHashSet<>();
  /**
   * Aggregates all emitted types, used in a final pass to find types emitted in type position but
   * not declared, possibly due to missing goog.provides.
   */
  private final Set<String> typesUsed = new LinkedHashSet<>();

  DeclarationGenerator(Options opts) {
    this.opts = opts;
    this.compiler = new Compiler();
    compiler.disableThreads();
    this.errorManager = new ClutzErrorManager(System.err,
        ErrorFormat.MULTILINE.toFormatter(compiler, true), opts.debug);
    compiler.setErrorManager(errorManager);
  }

  boolean hasErrors() {
    return errorManager.getErrorCount() > 0;
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
    String result =
        generateDeclarations(sourceFiles, externFiles, Depgraph.parseFrom(opts.readDepgraphs()));

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
    if (externs.isEmpty()) {
      externs =
          opts.skipParseExterns ? Collections.<SourceFile>emptyList() : getDefaultExterns(opts);
    } else {
      Preconditions.checkArgument(!opts.skipParseExterns,
          "Cannot pass --skipParseExterns and --externs.");
    }
    compiler.compile(externs, sourceFiles, opts.getCompilerOptions());
    String dts = produceDts(depgraph);
    errorManager.doGenerateReport();
    return dts;
  }

  private String getNamespace(String input) {
    int dotIdx = input.lastIndexOf('.');
    if (dotIdx == -1) {
      return "";
    }
    return input.substring(0, dotIdx);
  }

  public String produceDts(Depgraph depgraph) {
    // Tree sets for consistent order.
    Set<String> provides = new TreeSet<>();
    Set<String> transitiveProvides = new TreeSet<>();
    out = new StringWriter();

    for (CompilerInput compilerInput : compiler.getInputsById().values()) {
      transitiveProvides.addAll(compilerInput.getProvides());
      if (depgraph.getRoots().isEmpty()
          || depgraph.getRoots().contains(compilerInput.getSourceFile().getOriginalPath())) {
        provides.addAll(compilerInput.getProvides());
        emitComment(String.format("Processing provides %s from input %s",
            compilerInput.getProvides(), compilerInput.getSourceFile().getOriginalPath()));
      }
    }

    TypedScope topScope = compiler.getTopScope();
    for (String provide : provides) {
      TypedVar symbol = topScope.getOwnSlot(provide);
      if (symbol == null) {
        // Sometimes goog.provide statements are used as pure markers for dependency management, or
        // the defined provides do not get a symbol because they don't have a proper type.
        emitNamespaceBegin(getNamespace(provide));
        emit("var");
        emit(getUnqualifiedName(provide));
        emit(": any;");
        emitBreak();
        emitNamespaceEnd();
        declareModule(provide, true);
        continue;
      }
      // ArrayLike is defined in lib.d.ts, so we skip any type alias that
      // would shadow it.
      // Note that clutz expands type aliases used in closure code,
      // thus this does not result in undefined types.
      // This case handles goog.provided typedefs.
      if (isTypedef(symbol.getType()) && isArrayLike(symbol)) {
        emitSkipTypeAlias(symbol);
        emitBreak();
        continue;
      }
      // checkArgument(symbol.getType() != null, "all symbols should have a type: %s", provide);
      String namespace = provide;
      // These goog.provide's have only one symbol, so users expect to use default import
      boolean isDefault = isDefaultExport(symbol);
      if (isDefault) {
        namespace = getNamespace(symbol.getName());
      }
      int valueSymbolsWalked =
          declareNamespace(namespace, symbol, isDefault, transitiveProvides, false);

      // skip emitting goog.require declarations for value empty namespaces, as calling typeof
      // does not work for them.
      if (valueSymbolsWalked > 0) {
        emitGoogRequireSupport(namespace, isDefault ? symbol.getName() : namespace);
      }
      declareModule(provide, isDefault);
    }
    // In order to typecheck in the presence of third-party externs, emit all extern symbols.
    processExternSymbols();

    processUnprovidedTypes(provides);

    checkState(indent == 0, "indent must be zero after printing, but is %s", indent);
    return out.toString();
  }

  private boolean isArrayLike(TypedVar symbol) {
    return symbol.getName().endsWith(".ArrayLike");
  }

  /**
   * Closure does not require all types to be explicitly provided, if they are only used in type
   * positions. However, our emit phases only emits goog.provided symbols and namespaces, so this
   * extra pass is required, in order to have valid output.
   */
  private void processUnprovidedTypes(Set<String> provides) {
    // AFAIKT, there is no api for going from type to symbol, so iterate all symbols first.
    for (TypedVar symbol : compiler.getTopScope().getAllSymbols()) {
      String name = symbol.getName();
      // skip unused symbols.
      if (!typesUsed.contains(name)) continue;
      // skip provided symbols (as default or in an namespace).
      if (provides.contains(name) || provides.contains(getNamespace(name))) continue;

      // skip extern symbols (they have a separate pass).
      CompilerInput symbolInput = this.compiler.getInput(new InputId(symbol.getInputName()));
      if (symbolInput != null && symbolInput.isExtern()) continue;
      declareNamespace(getNamespace(name), symbol, /* isDefault */ true,
          Collections.<String>emptySet(), /* isExtern */ false);
    }
  }

  private void processExternSymbols() {
    Set<String> noTransitiveProvides = Collections.emptySet();
    LinkedHashSet<String> visitedNamespaces = new LinkedHashSet<>();
    LinkedHashSet<String> visitedClassLikes = new LinkedHashSet<>();

    for (TypedVar symbol : compiler.getTopScope().getAllSymbols()) {
      CompilerInput symbolInput = compiler.getInput(new InputId(symbol.getInputName()));
      if (symbolInput == null || !symbolInput.isExtern() || symbol.getType() == null) {
        continue;
      }
      // Closure treats all prototypes as separate symbols, but we handle them in conjunction with
      // parent symbol.
      if (symbol.getName().contains(".prototype")) continue;
      // For is a reserved word.
      if (symbol.getName().equals("Symbol.for")) continue;

      String parentPath = getNamespace(symbol.getName());
      boolean isDefault = isDefaultExport(symbol);

      // skip foo.bar.baz in the following three cases:
      // * foo.bar is namespace
      if (visitedNamespaces.contains(parentPath)) {
        // Note that this class has been visited before continuing.
        if (isDefault && isClassLike(symbol.getType())) visitedClassLikes.add(symbol.getName());
        continue;
      }
      // * foo.bar is class-like and baz is a static field.
      if (isStaticFieldOrMethod(symbol.getType()) || symbol.getName().equals("Object") && visitedClassLikes.contains(parentPath))
        continue;
      // * foo is a class-like and foo.bar is a static field.
      if (visitedClassLikes.contains(getNamespace(parentPath))) continue;

      declareNamespace(isDefault ? parentPath : symbol.getName(), symbol, isDefault,
          noTransitiveProvides, true);

      if (!isDefault && isLikelyNamespace(symbol.getType()))
        visitedNamespaces.add(symbol.getName());
      if (isDefault && isClassLike(symbol.getType())) visitedClassLikes.add(symbol.getName());
      // we do not declare modules or goog.require support, because externs types should not be
      // visible from TS code.
    }
  }

  private boolean isStaticFieldOrMethod(JSType type) {
    return !isClassLike(type) && !isTypedef(type) && !type.isEnumType();
  }

  private boolean isDefaultExport(TypedVar symbol) {
    if (symbol.getType() == null) return true;
    ObjectType otype = symbol.getType().toMaybeObjectType();
    if (otype != null && otype.getOwnPropertyNames().size() == 0) return true;
    return !symbol.getType().isObject() || symbol.getType().isInterface()
        || symbol.getType().isInstanceType() || symbol.getType().isEnumType()
        || symbol.getType().isFunctionType() || isTypedef(symbol.getType());
  }

  private int declareNamespace(String namespace, TypedVar symbol, boolean isDefault,
      Set<String> provides, boolean isExtern) {
    emitNamespaceBegin(namespace);
    TreeWalker treeWalker = new TreeWalker(compiler.getTypeRegistry(), provides, isExtern);
    if (isDefault) {
      if (isPrivate(symbol.getJSDocInfo())) {
        treeWalker.emitPrivateValue(symbol);
      } else {
        treeWalker.walk(symbol);
      }
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
      // Can be null if the symbol is provided, but not defined.
      Set<String> propertyNames =
          objType != null ? objType.getPropertyNames() : Collections.<String>emptySet();
      for (String property : propertyNames) {
        // When parsing externs namespaces are explicitly declared with a var of Object type
        // Do not emit the var declaration, as it will conflict with the namespace.
        if (!(isPrivateProperty(objType, property)
            || (isExtern && isLikelyNamespace(objType.getPropertyType(property))))) {
          desiredSymbols.add(symbol.getName() + "." + property);
        } else if (objType.getPropertyType(property).isEnumType()) {
          // For enum types (unlike classes or interfaces), Closure does not track the visibility on
          // the created type. Clutz still needs to skip emitting the values, as the original enum
          // is not emitted here. JSTypeRegistry etc do not provide access to this, so the list of
          // private enums has to be tracked in this side channel.
          //
          // NB: This has multiple issues. It requires the enum to be declared before used, and it
          // requires the enum to be on an exported namespace. In practice, the rare instances of
          // this pattern appear to follow those rules.
          privateEnums.add(namespace + "." + property);
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
            && !other.getType().isFunctionPrototypeType() && !isPrototypeMethod(other)) {
          // For safety we need to special case goog.require to return the empty interface by
          // default
          // For existing namespaces we emit a goog.require string override that has the proper
          // type.
          // See emitGoogRequireSupport method.
          if (otherName.equals("goog.require")) {
            emit("function require (name : string ) : " + Constants.INTERNAL_NAMESPACE
                + ".ClosureSymbolNotGoogProvided;");
            emitBreak();
            continue;
          }
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

    // extra walk required for inner classes and inner enums. They are allowed in closure,
    // but not in TS, so we have to generate a namespace-class pair in TS.
    // In the case of the externs, however we *do* go through all symbols so this pass is not
    // needed.
    // In the case of aliased classes, we cannot emit inner classes, due to a var-namespace clash.
    ObjectType otype = symbol.getType().toMaybeObjectType();
    if (isDefault && !isExtern && otype != null && !isAliasedClassOrInterface(symbol, otype)) {
      treeWalker.walkInnerSymbols(otype, symbol.getName());
    }
    return treeWalker.valueSymbolsWalked;
  }

  // Due to lack of precise definition of a namespace, we look for object types that are not of any
  // other type. This will need more refinement as more cases appear.
  private boolean isLikelyNamespace(JSType type) {
    UnionType utype = type.toMaybeUnionType();
    if (utype != null) {
      return isNativeObjectType(utype.restrictByNotNullOrUndefined());
    }
    // The inferred type for an namespace-like object is not the native object,
    // but rather PrototypeObjectType.
    return isNativeObjectType(type) ||
        // TODO(rado): find a better api to use here (if it exists).
        (type.isObject() && !type.isConstructor() && !type.isInstanceType()
            && !type.isFunctionType());
  }

  // TODO(rado): refactor so that the native object type is a final field.
  private boolean isNativeObjectType(JSType type) {
    return compiler.getTypeRegistry().getNativeType(OBJECT_TYPE).equals(type);
  }

  /**
   * Returns true if {@code propType} is creating a new type in the TypeScript sense - i.e. it's a
   * constructor function (class or interface), enum, or typedef.
   */
  private boolean isDefiningType(JSType propType) {
    return isClassLike(propType) || propType.isEnumType() || propType.isInterface()
        || isTypedef(propType);
  }

  /**
   * Returns true for types that are class like, i.e. that define a constructor or interface, but
   * excludes typedefs and the built-in constructor functions such as {@code Function}.
   */
  private boolean isClassLike(JSType propType) {
    // Confusingly, the typedef type returns true on isConstructor checks, so we need to filter
    // the NoType through this utility method.
    return !isTypedef(propType) && (propType.isConstructor() || propType.isInterface())
    // "Function" is a constructor, but does not define a new type for our purposes.
        && !propType.toMaybeObjectType().isNativeObjectType()
        && !propType.isFunctionPrototypeType();
  }

  // This indirection exists because the name in the Closure APIs is confusing.
  // TODO(rado): figure out if NoType can be created through other means and more filtering is
  // needed here.
  private boolean isTypedef(JSType type) {
    return type.isNoType();
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

  private boolean isPrivateProperty(ObjectType obj, String propName) {
    JSDocInfo info = obj.getOwnPropertyJSDocInfo(propName);
    return isPrivate(info);
  }

  private boolean isPrivate(@Nullable JSDocInfo docInfo) {
    return docInfo != null && docInfo.getVisibility() == Visibility.PRIVATE;
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
  private String getUnqualifiedName(TypedVar symbol) {
    return getUnqualifiedName(symbol.getName());
  }

  private String getUnqualifiedName(String name) {
    return lastDottedPart(name);
  }

  private String lastDottedPart(String input) {
    int dotIdx = input.lastIndexOf('.');
    if (dotIdx == -1) {
      return input;
    }
    return input.substring(dotIdx + 1, input.length());
  }

  private class TreeWalker {
    private final JSTypeRegistry typeRegistry;
    private final Set<String> provides;
    private int valueSymbolsWalked = 0;
    private final boolean isExtern;

    /**
     * The void type in closure contains only the undefined value.
     */
    private final Predicate<JSType> isVoidType = new Predicate<JSType>() {
      @Override
      public boolean apply(JSType type) {
        return type.isVoidType();
      }
    };

    private TreeWalker(JSTypeRegistry typeRegistry, Set<String> provides, boolean isExtern) {
      this.typeRegistry = typeRegistry;
      this.provides = provides;
      this.isExtern = isExtern;
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

    private void walk(TypedVar symbol) {
      JSType type = symbol.getType();
      if (!type.isInterface() && !isTypedef(type)) valueSymbolsWalked++;
      if (type.isFunctionType()) {
        FunctionType ftype = (FunctionType) type;

        if (isOrdinaryFunction(ftype)) {
          maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ false);
          visitFunctionExpression(getUnqualifiedName(symbol), ftype);
          return;
        }

        maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ true);
        // isNominalConstructor is a bit of misnomer, it returns true for all
        // classes/interfaces that have = function() {}, even a structural interface
        // defined with @record.
        // In externs it is allowed to have interfaces without the dummy = function() {}, so the
        // heuristic fails.
        // This rare pattern occurs only twice in closure externs, so use a white-list for now.
        // TODO(rado): find a more robust way to detect.
        if (!ftype.isNominalConstructor() && !isExtern ||
            knownExternSymbolOfConstructorFunctionType(symbol.getName())) {
          // A top-level field that has a specific constructor function type.
          // <code>/** @type {function(new:X)} */ foo.x;</code>
          visitVarDeclaration(getUnqualifiedName(symbol), ftype);
          return;
        }
        // The class/interface symbol might be an alias for another symbol.
        // Since closure inlines all aliases before this step, check against
        // the type name.
        if (!isAliasedClassOrInterface(symbol, ftype)) {
          visitClassOrInterface(getUnqualifiedName(symbol), ftype);
        } else {
          visitClassOrInterfaceAlias(getUnqualifiedName(symbol), ftype);
        }
      } else {
        maybeEmitJsDoc(symbol.getJSDocInfo(), /* ignoreParams */ false);
        if (type.isEnumType()) {
          visitEnumType(symbol.getName(), (EnumType) type);
          return;
        }
        if (isTypedef(type)) {
          // ArrayLike is defined in lib.d.ts, so we skip any type alias that
          // would shadow it.
          // Note that clutz expands type aliases used in closure code,
          // thus this does not result in undefined types.
          // This case handles not goog.provided typedefs.
          if (isArrayLike(symbol)) {
            emitSkipTypeAlias(symbol);
            emitBreak();
            return;
          }
          // The aliased type is present in the registry under the symbol name.
          JSType registryType = typeRegistry.getType(symbol.getName());
          if (registryType != null) {
            visitTypeAlias(registryType, getUnqualifiedName(symbol));
            return;
          }
        }
        visitVarDeclaration(getUnqualifiedName(symbol), type);
      }
    }

    private boolean knownExternSymbolOfConstructorFunctionType(String name) {
      return name.equals("webkitMediaStream") || name.equals("ActiveXObject")
          || name.equals("webkitRTCPeerConnection");
    }

    private void visitClassOrInterfaceAlias(String unqualifiedName, FunctionType ftype) {
      String typeName = Constants.INTERNAL_NAMESPACE + "." + ftype.getDisplayName();
      emit("type");
      emit(unqualifiedName);
      visitTemplateTypes(ftype);
      emit("=");
      emit(typeName);
      visitTemplateTypes(ftype);
      emit(";");
      emitBreak();
      if (!ftype.isInterface()) {
        // TS type aliases are only useful in type positions.
        // To emulate closure alias semantics, introduce also an aliased constructor
        emit("var " + unqualifiedName);
        emit(":");
        emit("typeof");
        emit(typeName);
        emit(";");
        emitBreak();
      }
      typesUsed.add(ftype.getDisplayName());
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
      // TypeScript classes (like ES6 classes) have prototypal inheritance on the static side,
      // which means that if A extends B, A.foo and B.foo cannot be of incompatible types.
      // Closure (ES5) classes have no such restriction.
      // To avoid collisions on the static side, emit all statics in the original class name A,
      // and emit instance fields in another class A_Instance. As such:
      // class A extends A_Instance { <static fields and methods> }
      // class B extends B_Instance { <static fields and methods> }
      // class A_Instance extends B_Instance { <instance fields and methods> }
      // class B_Instance { <instance fields and methods> }
      //
      // Emit original name class before Instance in order to match the already emitted JSDoc.
      final boolean emitInstance = !ftype.isInterface();
      if (emitInstance) {
        emit("class");
        emit(name);
        visitTemplateTypes(ftype);
        emit("extends");
        emit(name + INSTANCE_CLASS_SUFFIX);
        visitTemplateTypes(ftype);
        emit("{");
        indent();
        emitBreak();
        visitProperties(ftype, true);
        unindent();
        emit("}");
        emitBreak();
      }
      if (ftype.isConstructor()) {
        // "proper" class constructor
        emit("class");
      } else if (ftype.isInterface()) {
        emit("interface");
      } else {
        checkState(false, "Unexpected function type " + ftype);
      }
      emit(emitInstance ? name + INSTANCE_CLASS_SUFFIX : name);

      visitTemplateTypes(ftype);

      // Interface extends another interface
      if (ftype.getExtendedInterfacesCount() > 0) {
        emit("extends");
        Iterator<ObjectType> it = ftype.getExtendedInterfaces().iterator();
        emitCommaSeparatedInterfaces(it);
      }
      // Class extends another class
      ObjectType superType = getSuperType(ftype);
      if (superType != null) {
        emit("extends");
        if (isPrivate(superType.getJSDocInfo())) {
          // TypeScript does not allow public APIs that expose non-exported/private types.
          emit(Constants.INTERNAL_NAMESPACE + ".PrivateClass");
        } else {
          Visitor<Void> visitor = new ExtendsImplementsTypeVisitor(emitInstance);
          superType.visit(visitor);
        }
      }

      Iterator<ObjectType> it = ftype.getOwnImplementedInterfaces().iterator();
      if (it.hasNext()) {
        emit("implements");
        emitCommaSeparatedInterfaces(it);
      }
      visitObjectType(ftype, ftype.getPrototype());
    }

    private void emitCommaSeparatedInterfaces(Iterator<ObjectType> it) {
      while (it.hasNext()) {
        ObjectType type = it.next();
        if (isPrivate(type.getJSDocInfo())) {
          // TypeScript does not allow public APIs that expose non-exported/private types.
          emit(Constants.INTERNAL_NAMESPACE + ".PrivateInterface");
        } else {
          ExtendsImplementsTypeVisitor visitor = new ExtendsImplementsTypeVisitor(false);
          type.visit(visitor);
        }
        if (it.hasNext()) {
          emit(",");
        }
      }
    }

    private void visitVarDeclaration(String name, JSType type) {
      emit("var");
      emit(name);
      visitTypeDeclaration(type, false);
      emit(";");
      emitBreak();
    }

    private void visitTemplateTypes(ObjectType type) {
      // Closure's Object type is templatized
      if (type.getDisplayName() != null && type.getDisplayName().equals("Object")) return;
      if (type.hasAnyTemplateTypes() && !type.getTemplateTypeMap().isEmpty()) {
        emit("<");
        Iterator<TemplateType> it = type.getTemplateTypeMap().getTemplateKeys().iterator();
        while (it.hasNext()) {
          // For unknown reason, IObject attaches its name to the type vars, which results in
          // incorrect TS name.
          emit(it.next().getDisplayName().replace("IObject#", ""));
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

    private void visitEnumType(String symbolName, EnumType type) {
      // Enums are top level vars, but also declare a corresponding type:
      // <pre>
      // /** @enum {ValueType} */ var MyEnum = {A: ..., B: ...};
      // type MyEnum = EnumValueType;
      // var MyEnum: {A: MyEnum, B: MyEnum, ...};
      // </pre>
      // TODO(martinprobst): Special case number enums to map to plain TS enums?
      String unqualifiedName = getUnqualifiedName(symbolName);
      // TS `type` declarations accept only unqualified names.
      visitTypeAlias(type.getElementsType().getPrimitiveType(), unqualifiedName);
      emit("var");
      emit(unqualifiedName);
      emit(": {");
      emitBreak();
      indent();
      for (String elem : sorted(type.getElements())) {
        emit(elem);
        emit(":");
        // No need to use type.getMembersType(), this must match the type alias we just declared.
        emit(unqualifiedName);
        emit(",");
        emitBreak();
      }
      unindent();
      emit("}");
      emitNoSpace(";");
      emitBreak();
    }

    private void visitTypeDeclaration(JSType type, boolean isVarArgs) {
      if (type != null) {
        emit(":");
        // From https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
        // ArrayType:
        // PrimaryType [no LineTerminator here] [ ]
        if (isVarArgs) {
          visitTypeAsPrimary(type);
        } else {
          visitType(type);
        }
        if (isVarArgs) emit("[]");
      }
    }

    /**
     * Adds parentheses to turn a Type grammar production into a PrimaryType. See
     * https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
     *
     * Avoid adding extra parens where the type is already known to be Primary.
     *
     * PrimaryType: ParenthesizedType ParenthesizedType: ( Type )
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
      if (isPrivate(typeToVisit.getJSDocInfo())
          || privateEnums.contains(typeToVisit.getDisplayName())) {
        // TypeScript does not allow public APIs that expose non-exported/private types. Just emit
        // an empty object literal type for those, i.e. something that cannot be used for anything,
        // except being passed around.
        emit(Constants.INTERNAL_NAMESPACE + ".PrivateType");
        return;
      }
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
          return emitObjectType(type, false);
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
          return emitTemplatizedType(type, false);
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
          typesUsed.add(type.getDisplayName());
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

    private Void emitTemplatizedType(TemplatizedType type, boolean extendingInstanceClass) {
      ObjectType referencedType = type.getReferencedType();
      String templateTypeName = extendingInstanceClass
          ? getAbsoluteName(type) + INSTANCE_CLASS_SUFFIX : getAbsoluteName(type);
      if (typeRegistry.getNativeType(ARRAY_TYPE).equals(referencedType)
          && type.getTemplateTypes().size() == 1) {
        // As per TS type grammar, array types require primary types.
        // https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#a-grammar
        visitTypeAsPrimary(type.getTemplateTypes().get(0));
        emit("[]");
        return null;
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
      typesUsed.add(type.getDisplayName());
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

    private void visitRecordType(RecordType type) {
      emit("{");
      Iterator<String> it = getSortedPublicPropertyNames(type).iterator();
      while (it.hasNext()) {
        String propName = it.next();
        emit(propName);
        UnionType unionType = type.getPropertyType(propName).toMaybeUnionType();
        if (unionType != null && any(unionType.getAlternates(), isVoidType)) {
          emit("?");
        }
        visitTypeDeclaration(type.getPropertyType(propName), false);
        if (it.hasNext()) {
          emit(",");
        }
      }
      emit("}");
    }

    private Set<String> getSortedPublicPropertyNames(final ObjectType type) {
      return sorted(Sets.filter(type.getOwnPropertyNames(), new Predicate<String>() {
        @Override
        public boolean apply(String propName) {
          return !isPrivateProperty(type, propName);
        }
      }));
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
        // UnionType:
        // UnionOrIntersectionOrPrimaryType | IntersectionOrPrimaryType
        visitTypeAsPrimary(it.next());
        if (it.hasNext()) {
          emit("|");
        }
      }
    }

    private void visitObjectType(ObjectType type, ObjectType prototype) {
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
      if (type.isConstructor() && ((FunctionType) type).getParameters().iterator().hasNext()) {
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
      // Statics are handled in INSTANCE_CLASS_SUFFIX class.
      unindent();
      emit("}");
      emitBreak();
    }

    private void visitProperties(ObjectType objType, boolean isStatic) {
      visitProperties(objType, isStatic, Collections.<String>emptySet());
    }

    private void visitProperties(ObjectType objType, boolean isStatic, Set<String> skipNames) {
      for (String propName : getSortedPublicPropertyNames(objType)) {
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
      } else if (isDefiningType(propertyType)) {
        // enums and classes are emitted in a namespace later.
        return;
      }
      // The static methods apply and call are provided by lib.d.ts.
      if (isStatic && propName.equals("apply") || propName.equals("call")) return;
      maybeEmitJsDoc(objType.getOwnPropertyJSDocInfo(propName), /* ignoreParams */ false);
      emitProperty(propName, propertyType, isStatic);
    }

    private void emitProperty(String propName, JSType propertyType, boolean isStatic) {
      if (isStatic) emit("static");
      emit(propName);
      if (propertyType.isFunctionType() && !visitFunctionAsField(propName)) {
        visitFunctionDeclaration((FunctionType) propertyType);
      } else {
        visitTypeDeclaration(propertyType, false);
      }
      emit(";");
      emitBreak();
    }

    private boolean visitFunctionAsField(String propName) {
      // TODO(rado): replace this quick-and-dirty solution for getting the externs to clutz
      // with proper strategy as outlined in issue #199.
      return propName.equals("initUIEvent") || propName.equals("close")
          || propName.equals("open") || propName.equals("") || propName.equals("createTreeWalker")
          || propName.equals("loadXML") || propName.equals("load")
          || propName.equals("initMessageEvent") || propName.equals("ref");
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
        // functionSource AST: FUNCTION -> (NAME, PARAM_LIST, BLOCK ...)
        Iterable<Node> parameterNodes = functionSource.getFirstChild().getNext().children();
        names = Iterables.transform(parameterNodes, NODE_GET_STRING).iterator();
      }
      char pName = 'a'; // let's hope for no more than 52 parameters...
      while (parameters.hasNext()) {
        Node param = parameters.next();
        if (param.isVarArgs()) {
          emit("...");
        }
        if (names != null && names.hasNext()) {
          emitNoSpace(names.next());
        } else {
          emitNoSpace("" + pName);
          if (pName == 'z') {
            pName = 'A';
          } else {
            pName++;
          }
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

    void walkInnerSymbols(ObjectType type, String innerNamespace) {
      // TODO(martinprobst): This curiously duplicates visitProperty above. Investigate the code
      // smell and reduce duplication (or figure out & document why it's needed).

      // Populating privateEnums is necessary, because enumType.getJsDocInfo() returns null, while
      // parentType.getOwnPropertyJSDocInfo(enumName) works fine.
      for (String propName : type.getPropertyNames()) {
        JSType pType = type.getPropertyType(propName);
        if (pType.isEnumType() && isPrivate(type.getOwnPropertyJSDocInfo(propName))) {
          privateEnums.add(innerNamespace + '.' + propName);
        }
      }

      boolean foundNamespaceMembers = false;
      for (String propName : getSortedPublicPropertyNames(type)) {
        String qualifiedName = innerNamespace + '.' + propName;
        if (provides.contains(qualifiedName)) continue;
        JSType pType = type.getPropertyType(propName);
        if (pType.isEnumType()) {
          if (!foundNamespaceMembers) {
            emitNamespaceBegin(innerNamespace);
            foundNamespaceMembers = true;
          }
          visitEnumType(propName, (EnumType) pType);
        } else if (isClassLike(pType)) {
          if (!foundNamespaceMembers) {
            emitNamespaceBegin(innerNamespace);
            foundNamespaceMembers = true;
          }
          visitClassOrInterface(propName, (FunctionType) pType);
        } else if (isTypedef(pType)) {
          if (!foundNamespaceMembers) {
            emitNamespaceBegin(innerNamespace);
            foundNamespaceMembers = true;
          }
          JSType registryType = typeRegistry.getType(qualifiedName);
          visitTypeAlias(registryType, propName);

          // An extra pass is required for interfaces, because in Closure they might have
          // static methods or fields. TS does not support static methods on interfaces, so we
          // handle
          // them here.
        } else if (type.isInterface() && isOrdinaryFunction(pType)) {
          if (!foundNamespaceMembers) {
            emitNamespaceBegin(innerNamespace);
            foundNamespaceMembers = true;
          }
          visitFunctionExpression(propName, (FunctionType) pType);
        } else if (type.isInterface() && !pType.isNoType() && !pType.isFunctionPrototypeType()) {
          if (!foundNamespaceMembers) {
            emitNamespaceBegin(innerNamespace);
            foundNamespaceMembers = true;
          }
          visitVarDeclaration(propName, pType);
        }
      }
      if (foundNamespaceMembers) emitNamespaceEnd();
    }

    private void visitFunctionExpression(String propName, FunctionType ftype) {
      emit("function");
      emit(propName);
      visitFunctionDeclaration(ftype);
      emit(";");
      emitBreak();
    }

    public void emitPrivateValue(TypedVar symbol) {
      emit("var");
      emit(getUnqualifiedName(symbol));
      emit(":");
      emit(Constants.INTERNAL_NAMESPACE + ".PrivateType;");
      emitBreak();
    }

    public Void emitObjectType(ObjectType type, boolean extendingInstanceClass) {
      if (type.getDisplayName() != null && type.getDisplayName().equals("Error")) {
        // global Error is aliased as GlobalError in closure.lib.d.ts.
        emit("GlobalError");
        return null;
      }
      // Closure doesn't require that all the type params be declared, but TS does
      if (!type.getTemplateTypeMap().isEmpty()
          && !typeRegistry.getNativeType(OBJECT_TYPE).equals(type)) {
        return emitTemplatizedType(typeRegistry.createTemplatizedType(type), false);
      }
      if (type.isRecordType()) {
        visitRecordType((RecordType) type);
      } else if (type.isDict()) {
        emit("{[key: string]: any}");
      } else if (type.getReferenceName() != null) {
        String name = getAbsoluteName(type);
        // Under special conditions (see prototype_inferred_type.js) closure can infer
        // the type be the prototype object. TypeScript has nothing that matches the shape
        // of the prototype object (surprisingly typeof A.prototype is A). The best we can do is
        // any.
        if (name.endsWith(".prototype")) {
          emit("any");
          return null;
        }
        emit(extendingInstanceClass ? name + INSTANCE_CLASS_SUFFIX : name);
        if (!type.getDisplayName().equals("Object")) {
          typesUsed.add(type.getDisplayName());
        }
      } else {
        emit("Object");
      }
      return null;
    }

    /**
     * A type visitor used for types in Foo extends <...> and Foo implements <...> positions. Unlike
     * the type visitor for a generic type declaration (i.e. var a: <...>), this visitor only emits
     * symbols that are valid in an extends/implements position. For example: 'class A extends () =>
     * any' is invalid, even though () => any is a valid type.
     */
    class ExtendsImplementsTypeVisitor implements Visitor<Void> {
      final boolean emitInstanceForObject;

      ExtendsImplementsTypeVisitor(boolean emitInstanceForObject) {
        this.emitInstanceForObject = emitInstanceForObject;
      }

      @Override
      public Void caseObjectType(ObjectType type) {
        emitObjectType(type, emitInstanceForObject);
        return null;
      }

      @Override
      public Void caseUnknownType() {
        return null;
      }

      @Override
      public Void caseNullType() {
        return null;
      }

      @Override
      public Void caseNamedType(NamedType type) {
        return null;
      }

      @Override
      public Void caseProxyObjectType(ProxyObjectType type) {
        return null;
      }

      @Override
      public Void caseNumberType() {
        return null;
      }

      @Override
      public Void caseStringType() {
        return null;
      }

      @Override
      public Void caseVoidType() {
        return null;
      }

      @Override
      public Void caseUnionType(UnionType type) {
        return null;
      }

      @Override
      public Void caseTemplatizedType(TemplatizedType type) {
        emitTemplatizedType(type, emitInstanceForObject);
        return null;
      }

      @Override
      public Void caseTemplateType(TemplateType templateType) {
        return null;
      }

      @Override
      public Void caseNoType(NoType type) {
        return null;
      }

      @Override
      public Void caseEnumElementType(EnumElementType type) {
        return null;
      }

      @Override
      public Void caseAllType() {
        return null;
      }

      @Override
      public Void caseBooleanType() {
        return null;
      }

      @Override
      public Void caseNoObjectType() {
        return null;
      }

      @Override
      public Void caseFunctionType(FunctionType type) {
        emit("Function");
        return null;
      }
    }
  }

  private boolean isOrdinaryFunction(JSType ftype) {
    // Closure represents top-level functions as classes because they might be new-able.
    // This happens through externs es3.js which has Function marked as constructor.
    // See https://github.com/angular/closure-to-dts/issues/90
    boolean ordinaryFunctionAppearingAsClass =
        ftype.isConstructor() && "Function".equals(ftype.getDisplayName());
    return ftype.isOrdinaryFunction() || ordinaryFunctionAppearingAsClass;
  }

  private boolean isAliasedClassOrInterface(TypedVar symbol, JSType type) {
    if (!type.isConstructor() && !type.isInterface()) return false;
    return !symbol.getName().equals(type.getDisplayName());
  }

  private void emitSkipTypeAlias(TypedVar symbol) {
    emit("/* skipped emitting type alias " + symbol.getName()
        + " to avoid collision with existing one in lib.d.ts. */");
  }

}
