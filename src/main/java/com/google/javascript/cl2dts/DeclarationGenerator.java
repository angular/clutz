package com.google.javascript.cl2dts;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkState;

import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import com.google.common.collect.ImmutableList;
import com.google.javascript.jscomp.BasicErrorManager;
import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.CommandLineRunner;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerInput;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.DefaultPassConfig;
import com.google.javascript.jscomp.ErrorHandler;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.Result;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.jscomp.TypedScope;
import com.google.javascript.jscomp.TypedVar;
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

/**
 * A tool that generates {@code .d.ts} declarations from a Google Closure JavaScript program.
 */
public class DeclarationGenerator {

  private static final Logger logger = Logger.getLogger(DeclarationGenerator.class.getName());
  private static final String INTERNAL_NAMESPACE = "ಠ_ಠ.cl2dts_internal";

  private StringWriter out = new StringWriter();
  private final boolean parseExterns;

  DeclarationGenerator(boolean parseExterns) {
    this.parseExterns = parseExterns;
  }

  public static void main(String[] args) {
    if (args.length == 0) {
      System.err.println("Usage: c2dts [FILES...]");
      System.exit(1);
    }
    List<SourceFile> sources = new ArrayList<>();
    for (String arg : args) {
      File f = new File(arg);
      if (!f.exists()) {
        System.err.println("Input file not found: " + f.getPath());
        System.exit(1);
      }
      sources.add(SourceFile.fromFile(f));
    }
    DeclarationGenerator generator = new DeclarationGenerator(true);
    System.out.println(generator.generateDeclarations(sources));
  }

  String generateDeclarations(String sourceContents) {
    SourceFile sourceFile = SourceFile.fromCode("test.js", sourceContents);
    List<SourceFile> sourceFiles = Collections.singletonList(sourceFile);
    return generateDeclarations(sourceFiles);
  }

  private String generateDeclarations(List<SourceFile> sourceFiles) throws AssertionError {
    Compiler compiler = new Compiler();
    compiler.disableThreads();
    final CompilerOptions options = new CompilerOptions();
    options.setClosurePass(true);
    options.setCheckGlobalNamesLevel(CheckLevel.ERROR);
    options.setCheckGlobalThisLevel(CheckLevel.ERROR);
    options.setCheckTypes(true);
    options.setInferTypes(true);
    options.setIdeMode(true); // So that we can query types after compilation.
    options.setErrorHandler(new ErrorHandler() {
      @Override
      public void report(CheckLevel level, JSError error) {
        throw new AssertionError(error.toString());
      }
    });

    compiler.setPassConfig(new DefaultPassConfig(options));
    // Don't print anything, throw later below.
    compiler.setErrorManager(new BasicErrorManager() {
      @Override
      public void println(CheckLevel level, JSError error) {}

      @Override
      protected void printSummary() {}
    });

    Result compilationResult =
        compiler.compile(getExterns(), sourceFiles, options);
    if (compiler.hasErrors()) {
      throw new AssertionError("Compile failed: " + Arrays.toString(compilationResult.errors));
    }

    return produceDts(compiler);
  }

  public String produceDts(Compiler compiler) {
    Set<String> provides = new HashSet<>();
    // TODO: only inspect inputs which were explicitly provided by the user
    for (CompilerInput compilerInput : compiler.getInputsById().values()) {
      provides.addAll(compilerInput.getProvides());
    }

    out = new StringWriter();
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
      declareNamespace(namespace, symbol, isDefault, compiler);
      declareModule(provide, isDefault);
    }
    checkState(indent == 0, "indent must be zero after printing, but is %s", indent);
    return out.toString();
  }

  private void declareNamespace(
      String namespace, TypedVar symbol, boolean isDefault, Compiler compiler) {
    emitNoSpace("declare namespace ");
    emitNoSpace(INTERNAL_NAMESPACE);
    if (!namespace.isEmpty()) {
      emitNoSpace("." + namespace);
    }
    emitNoSpace(" {");
    indent();
    emitBreak();
    TreeWalker treeWalker = new TreeWalker(namespace, compiler.getTypeRegistry());
    if (isDefault) {
      treeWalker.walk(symbol, true);
    } else {
      // JSCompiler treats "foo.x" as one variable name, so collect all provides that start with
      // $provide + "." but are not sub-properties.
      Set<String> desiredSymbols = new HashSet<>();
      Iterable<TypedVar> allSymbols = compiler.getTopScope().getAllSymbols();

      ObjectType objType = (ObjectType) symbol.getType();
      for (String property : objType.getPropertyNames()) {
        desiredSymbols.add(symbol.getName() + "." + property);
      }

      for (TypedVar other : allSymbols) {
        String otherName = other.getName();
        if (desiredSymbols.contains(otherName) && other.getType() != null
            && !other.getType().isFunctionPrototypeType()
            && !isPrototypeMethod(other)) {
          treeWalker.walk(other, false);
        }
      }
    }
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

  private List<SourceFile> getExterns() {
    if (!parseExterns) {
      return ImmutableList.of();
    }
    try {
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

  private ObjectType getSuperType(FunctionType type) {
    FunctionType superClassConstructor = type.getSuperClassConstructor();
    return superClassConstructor == null ? null
        : superClassConstructor.getDisplayName().equals("Object") ? null
            : superClassConstructor;
  }

  private class TreeWalker {
    private final String namespace;
    private final JSTypeRegistry typeRegistry;

    private TreeWalker(String namespace, JSTypeRegistry typeRegistry) {
      this.namespace = namespace;
      this.typeRegistry = typeRegistry;
    }

    private String getRelativeName(ObjectType objectType) {
      String name = objectType.getDisplayName();
      return !name.startsWith(namespace) ? name : name.substring(namespace.length() + 1);
    }

    private String getUnqualifiedName(TypedVar symbol) {
      String qualifiedName = symbol.getName();
      int dotIdx = qualifiedName.lastIndexOf('.');
      if (dotIdx == -1) {
        return qualifiedName;
      }
      return qualifiedName.substring(dotIdx + 1, qualifiedName.length());
    }

    private void walk(TypedVar symbol, boolean isDefault) {
      JSType type = symbol.getType();
      if (type.isFunctionType()) {
        FunctionType ftype = (FunctionType) type;
        if (isDefault && ftype.isInterface()) {
          // Have to produce a named interface and export that.
          // https://github.com/Microsoft/TypeScript/issues/3194
          emit("interface");
          emit(getUnqualifiedName(symbol));
          visitObjectType(ftype, ftype.getPrototype());
          return;
        }
        if (type.isOrdinaryFunction()) {
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
            emit(getRelativeName(it.next()));
            if (it.hasNext()) {
              emit(",");
            }
          }
        }
        // Class extends another class
        if (getSuperType(ftype) != null) {
          emit("extends");
          emit(getRelativeName(getSuperType(ftype)));
        }

        Iterator<ObjectType> it = ftype.getOwnImplementedInterfaces().iterator();
        if (it.hasNext()) {
          emit("implements");
          while (it.hasNext()) {
            emit(getRelativeName(it.next()));
            if (it.hasNext()) {
              emit(",");
            }
          }
        }

        visitObjectType(ftype, ftype.getPrototype());
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
        visitTypeDeclaration(type);
        emit(";");
        emitBreak();
      }
    }

    private void visitTemplateTypes(FunctionType ftype) {
      if (ftype.hasAnyTemplateTypes() && !ftype.getTemplateTypeMap().isEmpty()) {
        emit("<");
        Iterator<TemplateType> it = ftype.getTemplateTypeMap().getTemplateKeys().iterator();
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
      visitTypeAlias(type.getElementsType().getPrimitiveType(), getRelativeName(type));
      emit("var");
      emit(getRelativeName(type));
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

    private void visitTypeDeclaration(JSType type) {
      if (type != null) {
        emit(":");
        visitType(type);
      }
    }

    private void visitType(JSType type) {
      // See also JsdocToEs6TypedConverter in the Closure code base. This code is implementing the
      // same algorithm starting from JSType nodes (as opposed to JSDocInfo), and directly
      // generating textual output. Otherwise both algorithms should produce the same output.
      type.visit(new Visitor<Void>() {
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
          if (type.isRecordType()) {
            visitRecordType((RecordType) type);
          } else {
            emit(type.getReferenceName());
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
          emit(type.getReferenceName());
          return null;
        }

        @Override
        public Void caseTemplatizedType(TemplatizedType type) {
          ObjectType referencedType = type.getReferencedType();
          String templateTypeName = getRelativeName(referencedType);
          if ("Array".equals(referencedType.getReferenceName())
              && type.getTemplateTypes().size() == 1) {
            visitType(type.getTemplateTypes().get(0));
            emit("[]");
            return null;
          }
          emit(templateTypeName);
          emit("<");
          for (JSType tmplType : type.getTemplateTypes()) {
            visitType(tmplType);
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
      });
    }

    private void visitRecordType(RecordType type) {
      emit("{");
      Iterator<String> it = type.getOwnPropertyNames().iterator();
      while (it.hasNext()) {
        String propName = it.next();
        emit(propName);
        visitTypeDeclaration(type.getPropertyType(propName));
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
          return !input.isNullable() && !input.isVoidType();
        }
      });
      if (alts.size() == 1) {
        visitType(alts.iterator().next());
        return;
      }
      emit("(");
      Iterator<JSType> it = alts.iterator();
      while (it.hasNext()) {
        visitType(it.next());
        if (it.hasNext()) {
          emit("|");
        }
      }
      emit(")");
    }

    private void visitObjectType(ObjectType type, ObjectType prototype) {
      emit("{");
      indent();
      emitBreak();
      // Constructors.
      if (type.isConstructor() && ((FunctionType)type).getParameters().iterator().hasNext()) {
        emit("constructor");
        visitFunctionParameters((FunctionType) type);
        emit(";");
        emitBreak();
      }
      // Fields.
      JSType instanceType = type.getTypeOfThis();
      checkArgument(instanceType.isObject(), "expected an ObjectType for this, but got "
          + instanceType + " which is a " + instanceType.getClass().getSimpleName());
      visitProperties((ObjectType) instanceType, false);
      // Methods.
      visitProperties(prototype, false);
      // Statics.
      visitProperties(type, true);
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
        if (isStatic) {
          emit("static");
        }
        emit(propName);
        JSType propertyType = objType.getPropertyType(propName);
        if (propertyType.isFunctionType()) {
          visitFunctionDeclaration((FunctionType) propertyType);
        } else {
          visitTypeDeclaration(propertyType);
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
      visitTemplateTypes(ftype);
      emit("(");
      Iterator<Node> parameters = ftype.getParameters().iterator();
      char pName = 'a'; // let's hope for no more than 26 parameters...
      while (parameters.hasNext()) {
        Node param = parameters.next();
        if (param.isVarArgs()) {
          emit("...");
        }
        emitNoSpace("" + pName++);
        if (param.isOptionalArg()) {
          emit("?");
        }
        visitTypeDeclaration(param.getJSType());
        if (param.isVarArgs()) {
          emit("[]");
        }
        if (parameters.hasNext()) {
          emit(", ");
        }
      }
      emit(")");
    }
  }
}
