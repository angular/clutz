package com.google.javascript.cl2dts;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Predicates.equalTo;
import static com.google.common.base.Predicates.not;
import static com.google.common.collect.Iterables.any;
import static com.google.javascript.rhino.jstype.JSTypeNative.ARRAY_TYPE;
import static com.google.javascript.rhino.jstype.JSTypeNative.OBJECT_TYPE;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.base.Function;
import com.google.common.base.Preconditions;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import com.google.common.collect.Iterables;
import com.google.common.io.Files;
import com.google.javascript.jscomp.BasicErrorManager;
import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.CommandLineRunner;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerInput;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.DefaultPassConfig;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.Result;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.jscomp.TypedScope;
import com.google.javascript.jscomp.TypedVar;
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
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

import javax.annotation.Nullable;

/**
 * A tool that generates {@code .d.ts} declarations from a Google Closure JavaScript program.
 */
public class DeclarationGenerator {

  private static final Logger logger = Logger.getLogger(DeclarationGenerator.class.getName());
  private static final String INTERNAL_NAMESPACE = "ಠ_ಠ.cl2dts_internal";
  private static final Function<Node, String> NODE_GET_STRING = new Function<Node, String>() {
    @Override public String apply(Node input) {
      return input.getString();
    }};

  private StringWriter out = new StringWriter();
  private final Options opts;

  DeclarationGenerator(Options opts) {
    this.opts = opts;
  }

  public static void main(String[] args) {
    try {
      new DeclarationGenerator(new Options(args)).generateDeclarations();
    } catch (CmdLineException e) {
      System.err.println(e.getMessage());
      System.err.println("Usage: cl2dts [options...] arguments...");
      e.getParser().printUsage(System.err);
      System.err.println();
      System.exit(1);
    } catch (Exception e) {
      e.printStackTrace(System.err);
      System.err.println("Uncaught exception in cl2dts, exiting.");
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
    compiler.setPassConfig(new DefaultPassConfig(compilerOptions));
    // Don't print anything, throw later below.
    compiler.setErrorManager(new BasicErrorManager() {
      @Override
      public void println(CheckLevel level, JSError error) {}

      @Override
      protected void printSummary() {}
    });

    if (externs.isEmpty()) {
      externs = opts.skipParseExterns ? Collections.<SourceFile>emptyList() : getDefaultExterns();
    } else {
      Preconditions.checkArgument(!opts.skipParseExterns);
    }
    Result compilationResult =
        compiler.compile(externs, sourceFiles, compilerOptions);
    if (compiler.hasErrors()) {
      throw new AssertionError("Compile failed: " + Arrays.toString(compilationResult.errors));
    }

    return produceDts(compiler, depgraph);
  }

  public String produceDts(Compiler compiler, Depgraph depgraph) {
    Set<String> provides = new HashSet<>();
    Set<String> transitiveProvides = new HashSet<>();
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
        int lastDot = symbol.getName().lastIndexOf('.');
        namespace = lastDot >= 0 ? symbol.getName().substring(0, lastDot) : "";
      }
      declareNamespace(namespace, symbol, isDefault, compiler, transitiveProvides);
      declareModule(provide, isDefault);
    }
    checkState(indent == 0, "indent must be zero after printing, but is %s", indent);
    return out.toString();
  }

  private void declareNamespace(String namespace, TypedVar symbol, boolean isDefault,
      Compiler compiler, Set<String> provides) {
    emitNamespaceBegin(namespace);
    TreeWalker treeWalker = new TreeWalker(namespace, compiler.getTypeRegistry(), provides);
    if (isDefault) {
      treeWalker.walk(symbol, true);
    } else {
      // JSCompiler treats "foo.x" as one variable name, so collect all provides that start with
      // $provide + "." but are not sub-properties.
      Set<String> desiredSymbols = new HashSet<>();
      Iterable<TypedVar> allSymbols = compiler.getTopScope().getAllSymbols();

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
            treeWalker.walk(other, false);
          } catch (RuntimeException e) {
            throw new RuntimeException("Failed to emit for " + other, e);
          }
        }
      }
    }
    emitNamespaceEnd();
    // An extra pass is required for default exported interfaces, because in Closure they might have
    // static methods. TS does not support static methods on interfaces, thus we create a new namespace for them.
    if (isDefault && isInterfaceWithStatic(symbol.getType())) {
      emitNamespaceBegin(symbol.getName());
      treeWalker.walkDefaultInterface((FunctionType) symbol.getType());
      emitNamespaceEnd();
    }
  }


  private void emitNamespaceBegin(String namespace) {
    emitNoSpace("declare namespace ");
    emitNoSpace(INTERNAL_NAMESPACE);
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
    emitNoSpace(INTERNAL_NAMESPACE);
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

  private List<SourceFile> getDefaultExterns() {
    try {
      // TODO(alexeagle): change to this after next closure release (dated after 9/9/15)
      // return AbstractCommandLineRunner.getBuiltinExterns(opts.getCompilerOptions());
      return CommandLineRunner.getDefaultExterns();
    } catch (IOException e) {
      throw new RuntimeException(e);
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
    return proto == null ? null :
        proto.getImplicitPrototype().getDisplayName().equals("Object") ? null :
        proto.getImplicitPrototype();
  }

  private class TreeWalker {
    private final String namespace;
    private final JSTypeRegistry typeRegistry;
    private final Set<String> provides;

    private TreeWalker(String namespace, JSTypeRegistry typeRegistry, Set<String> provides) {
      this.namespace = namespace;
      this.typeRegistry = typeRegistry;
      this.provides = provides;
    }

    private String getRelativeName(ObjectType objectType) {
      String name = objectType.getDisplayName();
      if (name.equals(namespace)) return name;
      return !name.startsWith(namespace) ? name : name.substring(namespace.length() + 1);
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

    private void walk(TypedVar symbol, boolean isDefault) {
      JSType type = symbol.getType();
      if (type.isFunctionType()) {
        FunctionType ftype = (FunctionType) type;

        // Closure represents top-level functions as classes because they might be new-able.
        // See https://github.com/angular/closure-to-dts/issues/90
        boolean ordinaryFunctionAppearingAsClass = type.isConstructor()
            && type.getJSDocInfo() != null && !type.getJSDocInfo().isConstructor();

        if (type.isOrdinaryFunction() || ordinaryFunctionAppearingAsClass) {
          emit("function");
          emit(getUnqualifiedName(symbol));
          visitFunctionDeclaration(ftype);
          emit(";");
          emitBreak();
          return;
        }
        if (type.isConstructor()) {
          emit("class");
        } else if (type.isInterface()) {
          emit("interface");
        } else {
          checkState(false, "Unexpected function type " + type);
        }
        emit(getUnqualifiedName(symbol));

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
      } else {
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
        emit("var");
        emit(getUnqualifiedName(symbol));
        visitTypeDeclaration(type, false);
        emit(";");
        emitBreak();
      }
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
      // /** @enum {ValueType} */ var MyEnum = {A: ..., B: ...};
      // type MyEnum = EnumValueType;
      // var MyEnum: {A: MyEnum, B: MyEnum, ...};
      // TODO(martinprobst): Special case number enums to map to plain TS enums?
      visitTypeAlias(type.getElementsType().getPrimitiveType(), getUnqualifiedName(type));
      emit("var");
      // TS `type` declarations accept only unqualified names.
      emit(getUnqualifiedName(type));
      emit(": {");
      emitBreak();
      indent();
      for (String elem : type.getElements()) {
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

    private void visitType(JSType type) {
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
            emit(getRelativeName(type));
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
          emit(getRelativeName(type));
          return null;
        }

        @Override
        public Void caseTemplatizedType(TemplatizedType type) {
          ObjectType referencedType = type.getReferencedType();
          String templateTypeName = getRelativeName(referencedType);
          if (typeRegistry.getNativeType(ARRAY_TYPE).equals(referencedType)
              && type.getTemplateTypes().size() == 1) {
            visitType(type.getTemplateTypes().get(0));
            emit("[]");
            return null;
          }
          // Arguments<?> and NodeList<?> in es3 externs are correspondinly
          // IArguments and NodeList interfaces (not-parametrized) in lib.d.ts.
          // New* are temporary work-arounds for upstream externs.
          // TODO(rado): upgrade closure compiler and remove them.
          if (type.getDisplayName().equals("Arguments") ||
              type.getDisplayName().equals("NewArguments")) {
            emit("IArguments");
            return null;
          }
          if (type.getDisplayName().equals("NodeList") ||
              type.getDisplayName().equals("NewNodeList")) {
            emit("NodeList");
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
          emit(getRelativeName(type));
          return null;
        }

        @Override
        public Void caseFunctionType(FunctionType type) {
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
        type.visit(visitor);
      } catch (Exception e) {
        throw new RuntimeException("Failed to emit type " + type, e);
      }
    }

    // This method is used for objects like the static props on an interface, that
    // behave like an object with bunch of props, but are not technically defined as
    // record types.
    private void visitNamespaceLikeType(ObjectType type) {
      for (String propName : type.getOwnPropertyNames()) {
        if (propName.equals("prototype")) continue;
        JSType pType = type.getPropertyType(propName);
        // Here we assume the enum is exported and handled separately.
        if (pType.isEnumType()) continue;
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
      Iterator<String> it = type.getOwnPropertyNames().iterator();
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

    private void visitUnionType(UnionType ut) {
      Collection<JSType> alts = Collections2.filter(ut.getAlternates(), new Predicate<JSType>() {
        @Override
        public boolean apply(JSType input) {
          // Skip - TypeScript does not have explicit null or optional types.
          // Optional types must be handled at the declaration name (`foo?` syntax).
          return !input.isNullType() && !input.isVoidType();
        }
      });
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

    private void visitObjectType(ObjectType type, ObjectType prototype) {
      visitObjectType(type, prototype, true);
    }

    private void visitObjectType(ObjectType type, ObjectType prototype, Boolean processStatics) {
      emit("{");
      indent();
      emitBreak();
      // Constructors.
      if (type.isConstructor() && ((FunctionType)type).getParameters().iterator().hasNext()) {
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
      // Methods.
      visitProperties(prototype, false);
      // Statics.
      if (processStatics) {
        visitProperties(type, true);
      }
      unindent();
      emit("}");
      emitBreak();
    }

    private void visitProperties(ObjectType objType, boolean isStatic) {
      for (String propName : objType.getOwnPropertyNames()) {
        if ("prototype".equals(propName) || "superClass_".equals(propName)
            // constructors are handled in #visitObjectType
            || "constructor".equals(propName)) {
          continue;
        }
        JSType propertyType = objType.getPropertyType(propName);
        // Some symbols might be emitted as provides, so don't duplicate them
        String qualifiedName = objType.getDisplayName() + "." + propName;
        if (provides.contains(qualifiedName)) {
          continue;
        } else if (isPrivate(propertyType.getJSDocInfo())) {
          continue;
        } else if (propertyType.isEnumType()) {
          // For now, we don't emit static enum properties. We theorize it should not be needed.
          emit("/* not emitting " + propName + " because it is an enum and it is not provided */");
          emitBreak();
          continue;
        }
        if (isStatic) {
          // The static methods apply and call are provided by lib.d.ts.
          if (propName.equals("apply") || propName.equals("call")) continue;
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
  }
}
