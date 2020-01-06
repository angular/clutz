package com.google.javascript.gents;

import com.google.common.base.Preconditions;
import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;
import com.google.javascript.gents.CollectModuleMetadata.FileModule;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.JSDocInfo.Visibility;
import com.google.javascript.rhino.JSTypeExpression;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import javax.annotation.Nullable;

/**
 * Converts ES5 JavaScript classes and interfaces into ES6 JavaScript classes and TypeScript
 * interfaces. Prototype declarations are converted into the new class definitions of ES6.
 */
public final class TypeConversionPass implements CompilerPass {

  private final AbstractCompiler compiler;
  private final NodeComments nodeComments;
  private final CollectModuleMetadata modulePrepass;
  private Map<String, Node> types;
  /**
   * typesToRename is an <oldName, newName> map typesToFilename is an <oldName, definedFromFile> map
   * Together they are used for cross files renaming of certain types.
   */
  private Map<String, String> typesToRename;

  private Map<String, String> typesToFilename;

  TypeConversionPass(
      AbstractCompiler compiler, CollectModuleMetadata modulePrepass, NodeComments nodeComments) {
    this.compiler = compiler;
    this.modulePrepass = modulePrepass;
    this.nodeComments = nodeComments;
    this.types = new LinkedHashMap<>();
    this.typesToRename = new LinkedHashMap<>();
    this.typesToFilename = new LinkedHashMap<>();
  }

  @Override
  public void process(Node externs, Node root) {
    this.typesToRename = new LinkedHashMap<>();
    this.typesToFilename = new LinkedHashMap<>();
    for (Node child : root.children()) {
      // We convert each file independently to avoid merging class methods from different files.
      if (child.isScript()) {
        this.types = new LinkedHashMap<>();
        NodeTraversal.traverse(compiler, child, new TypeConverter());
        NodeTraversal.traverse(compiler, child, new TypeMemberConverter());
        NodeTraversal.traverse(compiler, child, new FieldOnThisConverter());
        NodeTraversal.traverse(compiler, child, new InheritanceConverter());
        NodeTraversal.traverse(compiler, child, new EnumConverter());
      }
    }
    convertTypeAlias();
  }

  /** Converts @constructor annotated functions into classes and all @typedefs. */
  private class TypeConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      JSDocInfo bestJSDocInfo = null;
      switch (n.getToken()) {
        case FUNCTION:
          bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
          if (bestJSDocInfo != null
              && bestJSDocInfo.isConstructorOrInterface()
              && !isConstructorInGoogDefineClass(n)) {
            convertConstructorToClass(n, bestJSDocInfo);
          }
          break;
        case CALL:
          if (n.getFirstChild().matchesQualifiedName("goog.defineClass")) {
            convertDefineClassToClass(n);
          }
          break;
        case GETPROP:
          // Converts a class inner typedef into either (1) a top level interface, which then later
          // has its members converted in TypeAnnotationPass; or (2) a type alias.
          // Most class inner @typedef meant @record in closure but they were added before @record
          // was supported. Also in TypeScript interfaces are preferred to type alias because of
          // better error reporting and extendability. However simple types such as string are
          // still type aliases.
          bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
          if (bestJSDocInfo == null || !bestJSDocInfo.hasTypedefType()) {
            break;
          }

          Node typedefNode = bestJSDocInfo.getTypedefType().getRoot();
          if (containsObject(typedefNode)) {
            // Interface
            String interfaceName = n.getSecondChild().getString();
            Node interfaceMember = new Node(Token.INTERFACE_MEMBERS);
            typesToRename.put(n.getQualifiedName(), interfaceName);
            typesToFilename.put(n.getQualifiedName(), n.getSourceFileName());
            types.put(interfaceName, interfaceMember);
            interfaceMember.setJSDocInfo(bestJSDocInfo);
            Node interfaceNode = new Node(Token.INTERFACE, IR.empty(), IR.empty(), interfaceMember);
            Node nameNode = Node.newString(Token.NAME, interfaceName);
            nameNode.addChildToBack(interfaceNode);
            Node exportNode = new Node(Token.EXPORT, new Node(Token.CONST, nameNode));
            replaceExpressionOrAssignment(n, parent, exportNode);
            break;
          }

          // Typedef of simple types
          createTypeAlias(n, parent);
          break;
        case VAR:
        case LET:
        case CONST:
          bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
          if (bestJSDocInfo == null || !bestJSDocInfo.hasTypedefType()) break;
          // Similar to GETPROP logic @typedefs of a simple object type {a: ..., b: ...} should
          // get translated to TS interfaces. See comment above for more reasoning.
          if (containsObject(bestJSDocInfo.getTypedefType().getRoot())) {
            String name = n.getFirstChild().getString();
            Node interfaceMember = new Node(Token.INTERFACE_MEMBERS);
            interfaceMember.setJSDocInfo(bestJSDocInfo);
            Node interfaceNode = new Node(Token.INTERFACE, IR.empty(), IR.empty(), interfaceMember);
            Node nameNode = Node.newString(Token.NAME, name);
            nameNode.addChildToBack(interfaceNode);
            Node constNode = new Node(Token.CONST, nameNode);
            // At this point the AST is the non-syntactically correct `const Foo = interface {}`,
            // and a later pass will fill in the members and change to proper interface Foo.
            // TODO(radokirov): Figure out if we can just generate interface Foo {}.
            replaceExpressionOrAssignment(n, parent, constNode);
          } else {
            createTypeAlias(n, parent);
          }
          break;
        case NAME:
          // NAME token can occur in many locations. Only create an alias for ones that are direct
          // children of statements.
          // Without this check, gents will try to create two aliases for code like:
          // /** @typedef {...} */
          // Foo.Bar = Buz;
          // Because of the NAME tokens - Bar and Buz.
          if (parent.isExprResult() && parent.getChildCount() == 1) {
            createTypeAlias(n, parent);
          }
          break;

        case CLASS:
          JSDocInfo jsDoc = n.getJSDocInfo();
          // If a class has the @interface or @record annotation we will respect that and turn it into an interface.
          if (jsDoc != null && jsDoc.isInterface()) {
            Node className = n.getFirstChild();
            Node classExtends = n.getSecondChild();
            Node classMembers = n.getLastChild();
            // Change CLASS_EXTENDS to INTERFACE_EXTENDS
            Node interfaceExtends =
                classExtends.isEmpty()
                    ? classExtends.detach()
                    : new Node(Token.INTERFACE_EXTENDS, classExtends.detach());
            // Also merge with any @extends if present.
            for (JSTypeExpression extendedInterface : jsDoc.getExtendedInterfaces()) {
              if (interfaceExtends.isEmpty()) {
                interfaceExtends = new Node(Token.INTERFACE_EXTENDS);
              }
              interfaceExtends.addChildToBack(extendedInterface.getRoot());
            }

            // Collect MEMBER_VARIABLE_DEF's and MEMBER_FUNCTION_DEF's and use those as the new interface members.
            Node interfaceMembers = new Node(Token.INTERFACE_MEMBERS);
            for (Node member : classMembers.children()) {
              if (!member.isMemberFunctionDef()) {
                continue;
              }

              Node functionNode = member.getFirstChild();
              if (!functionNode.isFunction()) {
                continue;
              }

              // MEMBER_VARIABLE_DEF is in the constructor.
              if (getEnclosingFunctionName(functionNode).equals("constructor")) {
                Node blockNode = functionNode.getLastChild();
                if (!blockNode.isBlock()) {
                  continue;
                }

                for (Node exprResult : blockNode.children()) {
                  ClassMemberDeclaration declaration =
                      ClassMemberDeclaration.newDeclarationOnThis(exprResult);
                  if (declaration != null && declaration.jsDoc != null) {
                    interfaceMembers.addChildToBack(createMemberVariableDef(declaration));
                  }
                }
              } else {
                stripFunctionBody(member);
                interfaceMembers.addChildToBack(member.detach());
              }
            }

            Node newNode =
                new Node(Token.INTERFACE, className.detach(), interfaceExtends, interfaceMembers);
            addTypeToScope(newNode, className.getString());
            newNode.useSourceInfoFrom(n);
            nodeComments.replaceWithComment(n, newNode);
          }
          break;
        default:
          break;
      }
    }

    private void stripFunctionBody(Node member) {
      Node functionNode = member.getFirstChild();
      Node functionName = functionNode.getFirstChild();
      Node functionParams = functionNode.getSecondChild();
      // Strip body from function definitions.
      Node newFunction =
          new Node(
              Token.FUNCTION,
              functionName.detach(),
              functionParams.detach(),
              new Node(Token.EMPTY));
      newFunction.useSourceInfoFrom(functionNode);
      nodeComments.replaceWithComment(functionNode, newFunction);
    }

    private boolean containsObject(Node typedefNode) {
      Token typedefToken = typedefNode.getToken();
      if (typedefToken == Token.LC) {
        return true;
      }

      if ((typedefToken == Token.QMARK || typedefToken == Token.BANG)
          && typedefNode.hasOneChild()) {
        // child Node is a simple type or a LC
        return containsObject(typedefNode.getFirstChild());
      }

      return false;
    }

    private void createTypeAlias(Node n, Node parent) {
      JSDocInfo bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
      if (bestJSDocInfo != null && bestJSDocInfo.hasTypedefType()) {
        String name;
        switch (n.getToken()) {
          case NAME:
            name = n.getString();
            break;
          case GETPROP:
            // Inner typedef
            name = n.getSecondChild().getString();
            break;
          default:
            name = n.getFirstChild().getString();
            break;
        }
        Node typeDef = Node.newString(Token.TYPE_ALIAS, name);
        nodeComments.moveComment(n, typeDef);
        types.put(name, typeDef);
        typeDef.setJSDocInfo(bestJSDocInfo);
        replaceExpressionOrAssignment(n, parent, typeDef);
      }
    }

    private void replaceExpressionOrAssignment(Node n, Node parent, Node newNode) {
      if (parent.isExprResult()) {
        // Handles case: Myclass.Type;
        // AST:
        // EXPR_RESULT
        //     GETPROP
        //         NAME MyClass
        //         STRING Type
        parent.getParent().replaceChild(parent, newNode);
      } else if (parent.isAssign()) {
        // Handles case: Myclass.Type = {};
        // AST:
        // ASSIGN
        //     GETPROP
        //         NAME MyClass
        //         STRING Type
        //     OBJECTLIST
        parent.getGrandparent().replaceChild(parent.getParent(), newNode);
      } else {
        parent.replaceChild(n, newNode);
      }
    }
  }

  /** Converts class prototype methods and static methods. */
  private class TypeMemberConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getToken()) {
        case CLASS:
          addClassToScope(n);
          break;
        case EXPR_RESULT:
          ClassMemberDeclaration declaration = ClassMemberDeclaration.newDeclaration(n, types);
          if (declaration == null) {
            break;
          }
          if (declaration.rhs != null && declaration.rhs.isFunction()) {
            moveMethodsIntoClasses(declaration);
          } else {
            // Ignore field declarations without a type annotation
            if (declaration.jsDoc != null && declaration.jsDoc.getType() != null) {
              moveFieldsIntoClasses(declaration);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  /** Converts fields declared internally inside a class using the "this" keyword. */
  private class FieldOnThisConverter extends AbstractPostOrderCallback {
    /** Map from class node to its field names. */
    private final Multimap<Node, String> classFieldMap = HashMultimap.create();

    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      if (n.isExprResult()) {
        ClassMemberDeclaration declaration = ClassMemberDeclaration.newDeclarationOnThis(n);

        if (declaration == null || declarationHasBeenAdded(declaration)) {
          return;
        }

        Node fnNode = NodeUtil.getEnclosingFunction(n);
        String fnName = getEnclosingFunctionName(fnNode);

        // TODO(gmoothart): in many cases we should be able to infer the type from the rhs if there
        // is no jsDoc

        // Convert fields to parameter properties when we are in the constructor and have a
        // declaration of the form this.name = name;
        if ("constructor".equals(fnName)
            && declaration.jsDoc != null
            && declaration.rhsEqualToField()) {
          JSTypeExpression declarationType = declaration.jsDoc.getType();
          Node params = fnNode.getSecondChild();
          @Nullable JSDocInfo constructorJsDoc = NodeUtil.getBestJSDocInfo(fnNode);

          for (Node param : params.children()) {
            Node nodeAfterDefault = param.isDefaultValue() ? param.getFirstChild() : param;
            // If not a Name node, it is potentially a destructuring arg, for which we cannot
            // use the public/private shorthand.
            if (!nodeAfterDefault.isName()) {
              continue;
            }
            String paramName = nodeAfterDefault.getString();
            @Nullable
            JSTypeExpression paramType =
                constructorJsDoc == null ? null : constructorJsDoc.getParameterType(paramName);
            // The class member declaration on "this" will not have "=" in the JSDoc most of the
            // time. Therefore we need to remove the "=" from the JSDoc of the parameter
            // declaration so we can compare the types and collapse the parameter property.
            if (param.isDefaultValue() && Token.EQUALS.equals(paramType.getRoot().getToken())) {
              paramType =
                  new JSTypeExpression(
                      paramType.getRoot().getFirstChild(), paramType.getSourceName());
            }
            // Names must be equal. Types must be equal, or if the declaration has no type it is
            // assumed to be the type of the parameter.
            if (declaration.memberName.equals(paramName)
                && (declarationType == null || declarationType.equals(paramType))) {

              // Add visibility directly to param if possible
              moveAccessModifier(declaration, param);
              markAsConst(declaration, param);
              compiler.reportChangeToEnclosingScope(n);
              n.detach();
              return;
            }
          }
        }

        moveFieldsIntoClasses(declaration);
        registerDeclaration(declaration);
      }
    }

    private void registerDeclaration(ClassMemberDeclaration declaration) {
      classFieldMap.put(declaration.classNode, declaration.memberName);
    }

    private boolean declarationHasBeenAdded(ClassMemberDeclaration declaration) {
      Collection<String> classMembers = classFieldMap.get(declaration.classNode);
      return classMembers != null && classMembers.contains(declaration.memberName);
    }

    /** Moves the access modifier from the original declaration to the constructor parameter */
    void moveAccessModifier(ClassMemberDeclaration declaration, Node param) {
      if (Visibility.PRIVATE.equals(declaration.jsDoc.getVisibility())) {
        param.putProp(Node.ACCESS_MODIFIER, Visibility.PRIVATE);
      } else if (Visibility.PROTECTED.equals(declaration.jsDoc.getVisibility())) {
        param.putProp(Node.ACCESS_MODIFIER, Visibility.PROTECTED);
      } else {
        param.putProp(Node.ACCESS_MODIFIER, Visibility.PUBLIC);
      }
    }

    /** Mark constructor parameter as constant, so it can be annotated readonly */
    void markAsConst(ClassMemberDeclaration declaration, Node param) {
      if (declaration.jsDoc != null && declaration.jsDoc.isConstant()) {
        param.putBooleanProp(Node.IS_CONSTANT_NAME, true);
      }
    }
  }

  /**
   * Converts closure enums into TypeScript enum, whenever possible. Closure enums are more
   * expressive supporting enums of arbitrary types, while TS only supports string and number.
   */
  private class EnumConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getToken()) {
        case VAR:
        case LET:
        case CONST:
          if (n.getJSDocInfo() == null || n.getJSDocInfo().getEnumParameterType() == null) return;
          JSTypeExpression enumExp = n.getJSDocInfo().getEnumParameterType();
          if (!enumExp.getRoot().isString()) return;
          String enumTypeStr = enumExp.getRoot().getString();
          if (!enumTypeStr.equals("number") && !enumTypeStr.equals("string")) return;

          Node name = n.getFirstChild().detach();
          Node members = name.getFirstChild().detach();

          Node enumMembers = transformMembers(members, enumTypeStr.equals("number"));
          Node enumNode = new Node(Token.ENUM, name, enumMembers);
          parent.replaceChild(n, enumNode);
          compiler.reportChangeToEnclosingScope(parent);
          break;
        default:
          break;
      }
    }

    private Node transformMembers(Node members, boolean enumIsOfNumberType) {
      assert members.isObjectLit();
      int lastCount = -1;
      Node enumMembers = new Node(Token.ENUM_MEMBERS);
      for (Node child : members.children()) {
        Node name = Node.newString(Token.NAME, child.getString());
        Node value = child.getFirstChild().detach();
        Node newMember;
        // Check whether we can emit simply the name, and rely on the automatic numeric assignment
        // in TypeScript. For example, enum E { A, B } is equivalent to enum E { A = 0, B = 1 }.
        if (enumIsOfNumberType && value.isNumber() && value.getDouble() == lastCount + 1) {
          newMember = name;
        } else {
          // We cannot reuse the STRING_KEY node here, because it pretty prints as a: 0, and we
          // want a = 1. Instead we recreate an ASSIGN node with same contents as STRING_KEY
          newMember = new Node(Token.ASSIGN, name, value);
        }
        if (enumIsOfNumberType && value.isNumber()) {
          lastCount = (int) value.getDouble();
        }
        enumMembers.addChildToBack(newMember);
        nodeComments.moveComment(child, newMember);
      }
      return enumMembers;
    }
  }

  /** Converts inheritance and superclass calls. */
  private class InheritanceConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      switch (n.getToken()) {
        case EXPR_RESULT:
          maybeRemoveInherits(n);
          break;
        case CALL:
          maybeReplaceSuperCall(n);
          break;
        default:
          break;
      }
    }
  }

  /**
   * Put every type alias into their fileModule's importedNamespacesToSymbols Map so
   * TypeAnnotationPass can actually fix all references across multiple files importing the type and
   * create import statements if needed.
   *
   * <p>TODO(bowenni): If the type to rename is exported as an alias then the references in other
   * files will not get renamed.
   *
   * <pre>
   * goog.module('A');
   * exports.alias = typeToRename;
   *
   * goog.require('A');
   * {@literal @}typedef {A.alias};
   * </pre>
   *
   * In this case the child module won't rename 'A.alias' because the child module is expecting to
   * rename 'typeToRename'
   */
  private void convertTypeAlias() {
    Map<String, FileModule> fileMap = modulePrepass.getFileMap();
    for (Entry<String, String> entry : typesToRename.entrySet()) {
      // Need to add a module entry in the file to module map otherwise TypeAnnotationPass won't
      // convert any symbols in the file.
      String oldTypeName = entry.getKey();
      String newTypeName = entry.getValue();
      String filename = typesToFilename.get(oldTypeName);
      FileModule module = fileMap.get(filename);
      if (module != null) {
        // TypeAnnotationPass will convert the global type name to the local type name using this
        // mapping.
        module.importedNamespacesToSymbols.put(oldTypeName, newTypeName);
      }
    }
  }

  /** Converts @constructor annotated functions into class definitions. */
  private void convertConstructorToClass(Node n, JSDocInfo jsDoc) {
    Preconditions.checkState(n.isFunction());
    Preconditions.checkState(n.getFirstChild().isName());
    Preconditions.checkState(n.getSecondChild().isParamList());
    Preconditions.checkState(n.getLastChild().isNormalBlock());
    String typeName = NodeUtil.getName(n);
    // Break up function
    Node name = n.getFirstChild();
    Node params = n.getSecondChild();
    Node body = n.getLastChild();
    n.detachChildren();

    // The empty name corresponds to anonymous constructors.
    // The name is usually located in the surrounding context.
    // ie. /** @constructor */ var A = function() {};
    // is converted to: var A = class {};
    if (name.getString().isEmpty()) {
      name = IR.empty();
    }

    // Superclass defaults to empty
    Node superClass = IR.empty();
    if (jsDoc.getBaseType() != null) {
      // Fullname of superclass
      // Closure Compiler generates non-nullable base classes:
      // ie. A.B.C is parsed as !A.B.C
      String superClassName =
          jsDoc
              .getBaseType()
              .getRoot()
              .getFirstChild() // ignore the ! node as we always output non nullable types
              .getString();
      superClass = NodeUtil.newQName(compiler, superClassName);
      superClass.useSourceInfoFrom(n);
    }

    Node typeNode;
    if (jsDoc.isInterface()) {
      List<JSTypeExpression> interfaces = jsDoc.getExtendedInterfaces();
      if (!interfaces.isEmpty()) {
        Node superInterfaces = new Node(Token.INTERFACE_EXTENDS);
        for (JSTypeExpression type : interfaces) {
          superInterfaces.addChildToBack(type.getRoot());
        }
        superClass = superInterfaces;
      }
      typeNode = new Node(Token.INTERFACE, name, superClass, new Node(Token.INTERFACE_MEMBERS));
      typeNode.useSourceInfoFromForTree(n);
      // Must be registered here, as JSCompiler cannot extract names from INTERFACE nodes.
      addTypeToScope(typeNode, typeName);
    } else {
      // Generate new class node with only a constructor method
      Node constructor =
          IR.memberFunctionDef("constructor", IR.function(IR.name(""), params, body));
      constructor.useSourceInfoFrom(n);
      // Sets jsdoc info to preserve type declarations on method
      constructor.setJSDocInfo(jsDoc);
      Node classMembers = new Node(Token.CLASS_MEMBERS, constructor);
      typeNode = new Node(Token.CLASS, name, superClass, classMembers);
    }

    typeNode.setJSDocInfo(n.getJSDocInfo());
    nodeComments.replaceWithComment(n, typeNode);
  }

  /** Converts goog.defineClass calls into class definitions. */
  private void convertDefineClassToClass(Node n) {
    Preconditions.checkState(n.isCall());
    Node superClass = n.getSecondChild();
    if (superClass.isNull()) {
      superClass = IR.empty();
    } else {
      superClass.detach();
    }

    Node classMembers = new Node(Token.CLASS_MEMBERS);
    classMembers.useSourceInfoFrom(n);
    for (Node child : n.getLastChild().children()) {
      if (child.isStringKey() || child.isMemberFunctionDef()) {
        // Handle static methods
        if ("statics".equals(child.getString())) {
          for (Node child2 : child.getFirstChild().children()) {
            convertObjectLiteral(classMembers, child2, true);
          }
        } else { // prototype methods
          convertObjectLiteral(classMembers, child, false);
        }
      } else {
        // Add all other members, such as EMPTY comment nodes, as is.
        child.detach();
        classMembers.addChildToBack(child);
      }
    }
    Node classNode = new Node(Token.CLASS, IR.empty(), superClass, classMembers);
    classNode.useSourceInfoFrom(n);

    nodeComments.replaceWithComment(n, classNode);
  }

  /** return if node n is a @constructor annotated function inside goog.defineClass */
  private boolean isConstructorInGoogDefineClass(Node n) {
    // CALL
    //     GETPROP
    //         NAME goog
    //         STRING defineClass
    //     NULL|super class node
    //     OBJECTLIT
    //         STRING_KEY constructor
    //             FUNCTION <- n
    if (n == null) {
      return false;
    }

    @Nullable Node stringKey = n.getParent();
    if (stringKey == null
        || !stringKey.isStringKey()
        || !"constructor".equals(stringKey.getString())) {
      return false;
    }

    @Nullable Node objectlit = stringKey.getParent();
    if (objectlit == null) {
      return false;
    }

    @Nullable Node call = objectlit.getParent();
    if (call == null || !call.getFirstChild().matchesQualifiedName("goog.defineClass")) {
      return false;
    }

    return true;
  }
  /**
   * Converts functions and variables declared in object literals into member method and field
   * definitions
   */
  private void convertObjectLiteral(Node classMembers, Node objectLiteralMember, boolean isStatic) {
    Preconditions.checkState(
        objectLiteralMember.isStringKey() || objectLiteralMember.isMemberFunctionDef());

    Node value = objectLiteralMember.getFirstChild();
    value.detach();

    if (value.isFunction()) {
      Node n = IR.memberFunctionDef(objectLiteralMember.getString(), value);
      n.setJSDocInfo(objectLiteralMember.getJSDocInfo());
      n.setStaticMember(isStatic);
      // Methods added to back
      classMembers.addChildToBack(n);
      nodeComments.moveComment(objectLiteralMember, n);
    } else {
      Node n = Node.newString(Token.MEMBER_VARIABLE_DEF, objectLiteralMember.getString());
      n.addChildToBack(value);
      n.setJSDocInfo(objectLiteralMember.getJSDocInfo());
      n.setStaticMember(isStatic);
      // Fields added to front
      addFieldToClassMembers(classMembers, n);
      nodeComments.moveComment(objectLiteralMember, n);
    }
  }

  /**
   * Attempts to move a method declaration into a class definition. This generates a new
   * MEMBER_FUNCTION_DEF Node while removing the old function node from the AST.
   */
  private void moveMethodsIntoClasses(ClassMemberDeclaration declaration) {
    Node classMembers = declaration.classNode.getLastChild();
    String fieldName = declaration.memberName;

    // Detach nodes in order to move them around in the AST.
    declaration.exprRoot.detach();
    declaration.rhs.detach();

    Node memberFunc = IR.memberFunctionDef(fieldName, declaration.rhs);
    memberFunc.setStaticMember(declaration.isStatic);
    memberFunc.setJSDocInfo(declaration.jsDoc);
    if (declaration.classNode.getToken() == Token.INTERFACE) {
      Node body = declaration.rhs.getLastChild();
      Preconditions.checkState(body.isNormalBlock());
      if (body.hasChildren()) {
        compiler.report(
            JSError.make(
                declaration.rhs,
                GentsErrorManager.GENTS_CLASS_PASS_ERROR,
                String.format("Interface method %s should be empty.", declaration.memberName)));
      }
      declaration.rhs.replaceChild(body, new Node(Token.EMPTY));
    }

    // Append the new method to the class
    classMembers.addChildToBack(memberFunc);
    nodeComments.moveComment(declaration.exprRoot, memberFunc);
    compiler.reportChangeToEnclosingScope(memberFunc);
  }

  private Node createMemberVariableDef(ClassMemberDeclaration declaration) {
    Node fieldNode = Node.newString(Token.MEMBER_VARIABLE_DEF, declaration.memberName);
    fieldNode.setJSDocInfo(declaration.jsDoc);
    fieldNode.setStaticMember(declaration.isStatic);
    nodeComments.moveComment(declaration.exprRoot, fieldNode);
    return fieldNode;
  }

  /**
   * Attempts to move a field declaration into a class definition. This generates a new
   * MEMBER_VARIABLE_DEF Node while persisting the old node in the AST.
   */
  private void moveFieldsIntoClasses(ClassMemberDeclaration declaration) {
    Node classMembers = declaration.classNode.getLastChild();

    Node fieldNode = createMemberVariableDef(declaration);

    if (declaration.rhs == null) {
      declaration.exprRoot.detach();
    } else if (canPromoteFieldInitializer(declaration)) {
      declaration.exprRoot.detach();
      declaration.rhs.detach();
      fieldNode.addChildToBack(declaration.rhs);
    } else {
      nodeComments.clearComment(declaration.exprRoot);
    }

    addFieldToClassMembers(classMembers, fieldNode);
    compiler.reportChangeToEnclosingScope(classMembers);
  }

  /**
   * Check if we can safely generate a field initializer. We don't do this if the assignment rhs is
   * not a literal or the enclosing function is not a constructor.
   */
  private boolean canPromoteFieldInitializer(ClassMemberDeclaration declaration) {
    if (!NodeUtil.isLiteralValue(declaration.rhs, false)) {
      return false;
    }

    Node fnNode = NodeUtil.getEnclosingFunction(declaration.exprRoot);
    if (fnNode != null) {
      String fnName = getEnclosingFunctionName(fnNode);
      if (!"constructor".equals(fnName)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Attempts to remove an inheritance statement. ex. goog.inherits(base, super)
   *
   * <p>This returns without any modification if the node is not an inheritance statement. This
   * fails by reporting an error when the node is an invalid inheritance statement.
   */
  private void maybeRemoveInherits(Node exprNode) {
    Preconditions.checkState(exprNode.isExprResult());
    if (exprNode.getFirstChild().isCall()) {
      Node callNode = exprNode.getFirstChild();
      // Remove goog.inherits calls
      if (!callNode.getFirstChild().matchesQualifiedName("goog.inherits")) {
        return;
      }
      String className = callNode.getSecondChild().getQualifiedName();
      String superClassName = callNode.getLastChild().getQualifiedName();

      // Check that class exists
      if (!types.containsKey(className)) {
        compiler.report(
            JSError.make(
                exprNode,
                GentsErrorManager.GENTS_CLASS_PASS_ERROR,
                String.format("Class %s could not be found.", className)));
        return;
      }

      // Check that superclass is consistent
      Node classNode = types.get(className);
      String storedSuperClassName = classNode.getSecondChild().getQualifiedName();
      if (classNode.getSecondChild().isEmpty() || !storedSuperClassName.equals(superClassName)) {
        compiler.report(
            JSError.make(
                exprNode,
                GentsErrorManager.GENTS_CLASS_PASS_ERROR,
                String.format("Invalid superclass for %s", className)));
        return;
      }

      compiler.reportChangeToEnclosingScope(exprNode);
      exprNode.detach();
    } else if (exprNode.getFirstChild().isAssign()) {
      Node assignNode = exprNode.getFirstChild();
      // Report error if trying to assign to prototype directly
      Node lhs = assignNode.getFirstChild();
      if (lhs.isGetProp() && "prototype".equals(lhs.getLastChild().getString())) {
        compiler.report(
            JSError.make(
                exprNode,
                GentsErrorManager.GENTS_CLASS_PASS_ERROR,
                String.format(
                    "Cannot directly assign to prototype for %s",
                    lhs.getFirstChild().getQualifiedName())));
      }
    }
  }

  /**
   * Attempts to convert a ES5 superclass call into a ES6 super() call.
   *
   * <p>Examples:
   *
   * <pre>
   * B.call(this, args) -> super(args);
   * B.prototype.foo.call(this, args) ->super.foo(args);
   * A.base(this, 'constructor', args) -> super(args);
   * A.base(this, 'foo', args) -> super.foo(args);
   * </pre>
   *
   * <p>This returns without any modification if the node is not an superclass call statement.
   */
  private void maybeReplaceSuperCall(Node callNode) {
    Preconditions.checkState(callNode.isCall());
    String callName = callNode.getFirstChild().getQualifiedName();

    // First validate that we are inside a constructor call that extends another class
    Node classNode = NodeUtil.getEnclosingClass(callNode);
    if (callName == null || classNode == null) {
      return;
    }

    String className = NodeUtil.getName(classNode);

    // Translate super constructor or super method calls as follows:
    // A.base(this, 'constructor', args) -> super(args);
    // A.base(this, 'foo', args) -> super.foo(args);
    if (callName.equals(className + ".base") && callNode.getSecondChild().isThis()) {
      // Super calls for root classes are not converted
      if (classNode.getSecondChild().isEmpty()) {
        compiler.report(
            JSError.make(
                callNode,
                GentsErrorManager.GENTS_CLASS_PASS_ERROR,
                String.format("Cannot call superclass in root class %s", className)));
        return;
      }
      String methodName = callNode.getChildAtIndex(2).getString();

      if ("constructor".equals(methodName)) {
        nodeComments.replaceWithComment(callNode.getFirstChild(), IR.superNode());
      } else {
        nodeComments.replaceWithComment(
            callNode.getFirstChild(), NodeUtil.newQName(compiler, "super." + methodName));
      }

      // Remove twice to get rid of "this" and the method name
      callNode.removeChild(callNode.getSecondChild());
      callNode.removeChild(callNode.getSecondChild());
      compiler.reportChangeToEnclosingScope(callNode);
      return;
    }

    String superClassName = classNode.getSecondChild().getQualifiedName();
    // B.call(this, args) -> super(args);
    if (callName.equals(superClassName + ".call") && callNode.getSecondChild().isThis()) {
      nodeComments.replaceWithComment(callNode.getFirstChild(), IR.superNode());

      callNode.removeChild(callNode.getSecondChild());
      compiler.reportChangeToEnclosingScope(callNode);
      return;
    }

    // B.prototype.foo.call(this, args) -> super.foo(args);
    if (callName.startsWith(superClassName + ".prototype.") && callName.endsWith(".call")) {
      if (callNode.getSecondChild().isThis()) {
        // Determine name of method being called
        Node nameNode = callNode.getFirstFirstChild();
        Node n = nameNode;
        while (!n.getLastChild().getString().equals("prototype")) {
          n = n.getFirstChild();
        }
        nameNode.detach();

        nodeComments.replaceWithComment(n, IR.superNode());
        nodeComments.replaceWithComment(callNode.getFirstChild(), nameNode);
        callNode.removeChild(callNode.getSecondChild());
        compiler.reportChangeToEnclosingScope(callNode);
        return;
      }
    }
  }

  /** Adds a field node before the first method node in classMembers */
  private void addFieldToClassMembers(Node classMembers, Node field) {
    for (Node n : classMembers.children()) {
      if (n.isMemberFunctionDef()) {
        classMembers.addChildBefore(field, n);
        return;
      }
    }
    classMembers.addChildToBack(field);
  }

  /**
   * Adds a class node to the top level scope.
   *
   * <p>This determines the classname using the nearest available name node.
   */
  private void addClassToScope(Node n) {
    Preconditions.checkState(n.isClass());
    String className = NodeUtil.getName(n);
    if (className == null) {
      // We do not emit an error here as there can be anonymous classes without names.
      return;
    }
    addTypeToScope(n, className);
  }

  private void addTypeToScope(Node n, String typeName) {
    if (types.containsKey(typeName)) {
      compiler.report(
          JSError.make(
              n,
              GentsErrorManager.GENTS_CLASS_PASS_ERROR,
              String.format("Type %s has been defined multiple times.", typeName)));
      return;
    }
    types.put(typeName, n);
  }

  private String getEnclosingFunctionName(Node fnNode) {
    if (fnNode.isArrowFunction()) {
      return null;
    }

    // Use the QualifiedName if the function is on an object/namespace: `foo.moreFoo()`;
    // otherwise, use the string on the node: `foo` for `function foo()`
    Node fnParent = fnNode.getParent();
    if (fnParent.isGetProp() || fnParent.isCall()) {
      return NodeUtil.getName(fnNode);
    }

    /*
     * For the specific case below, when fnNode is the anonymous function then fnParent
     * is an ASSIGN node and getString() is an invalid operation on an ASSIGN node.
     *
     * Thus, in this case, there isn't an enclosing function name and so null should be
     * returned.
     *
     * class A {
     *   constructor() {
     *     this.x = function() {
     *       this.y;
     *     }
     *   }
     * }
     */
    if (fnParent.isAssign()) {
      return null;
    }

    return fnParent.getString();
  }

  /** Represents a declaration of a class member. */
  private static class ClassMemberDeclaration {
    Node exprRoot;
    Node rhs;
    JSDocInfo jsDoc;

    boolean isStatic;
    Node classNode;
    String memberName;

    private ClassMemberDeclaration(Node n, boolean isStatic, Node classNode, String memberName) {
      this.exprRoot = n;
      this.rhs = getRhs(n);
      this.jsDoc = NodeUtil.getBestJSDocInfo(n);
      this.isStatic = isStatic;
      this.classNode = classNode;
      this.memberName = memberName;
    }

    /** Returns whether the rhs is the same as the method name being declared eg. this.a = a; */
    boolean rhsEqualToField() {
      return rhs != null && rhs.matchesQualifiedName(memberName);
    }

    /**
     * Factory method for creating a new ClassMemberDeclaration on a declaration external to a
     * class.
     *
     * <ul>
     *   <li><code>A.prototype.foo = function() {...}</code>
     *   <li><code>A.prototype.w = 4</code>
     *   <li><code>A.prototype.x</code>
     *   <li><code>A.bar = function() {...}</code>
     *   <li><code>A.y = 6</code>
     *   <li><code>A.z</code>
     * </ul>
     *
     * Returns null if the expression node is an invalid member declaration.
     */
    @Nullable
    static ClassMemberDeclaration newDeclaration(Node n, Map<String, Node> classes) {
      Node fullName = getFullName(n);
      // Node MUST NOT start with "this."
      if (!fullName.isGetProp() || containsThis(fullName)) {
        return null;
      }

      boolean isStatic = isStatic(fullName);
      String className =
          isStatic
              ? fullName.getFirstChild().getQualifiedName()
              : fullName.getFirstFirstChild().getQualifiedName();

      // Class must exist in scope
      if (!classes.containsKey(className)) {
        return null;
      }
      Node classNode = classes.get(className);
      String memberName = fullName.getLastChild().getString();

      return new ClassMemberDeclaration(n, isStatic, classNode, memberName);
    }

    /**
     * Factory method for creating a new ClassMemberDeclarationOnThis on a declaration internal to a
     * class via the "this" keyword.
     *
     * <ul>
     *   <li>{@code this.a = 5}
     *   <li>{@code this.b}
     * </ul>
     *
     * Returns null if the expression node is an invalid member declaration.
     */
    @Nullable
    static ClassMemberDeclaration newDeclarationOnThis(Node n) {
      Node fullName = getFullName(n);
      // Node MUST start with "this." and be shallow, i.e. "this.foo".
      // "this.foo.bar" and other nestings are not declarations and are ignored.
      // fullName is a binary tree and multiple parts are represented by GETPROP
      // nodes recursively on the left (first) child, so a first child of THIS is
      // sufficient to ensure the name is of the form "this.foo".
      if (!fullName.isGetProp() || !fullName.getFirstChild().isThis()) {
        return null;
      }

      Node classNode = NodeUtil.getEnclosingClass(n);
      String memberName = fullName.getLastChild().getString();
      if (classNode == null) {
        return null;
      }

      return new ClassMemberDeclaration(n, false, classNode, memberName);
    }

    /** Returns the full name of the class member being declared. */
    static Node getFullName(Node n) {
      return n.getFirstChild().isAssign() ? n.getFirstFirstChild() : n.getFirstChild();
    }

    /** Returns the right hand side of the member declaration. */
    static Node getRhs(Node n) {
      return n.getFirstChild().isAssign() ? n.getFirstChild().getLastChild() : null;
    }

    /** Returns whether a name starts with "this." */
    static boolean containsThis(Node fullName) {
      return fullName.isThis() || (fullName.isGetProp() && containsThis(fullName.getFirstChild()));
    }

    /** Returns if a name refers to a static member of a class. */
    static boolean isStatic(Node fullName) {
      return !(fullName.getFirstChild().isGetProp()
          && "prototype".equals(fullName.getFirstChild().getLastChild().getString()));
    }
  }
}
