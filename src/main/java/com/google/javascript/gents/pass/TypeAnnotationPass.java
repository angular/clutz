package com.google.javascript.gents.pass;

import static com.google.javascript.rhino.TypeDeclarationsIR.anyType;
import static com.google.javascript.rhino.TypeDeclarationsIR.arrayType;
import static com.google.javascript.rhino.TypeDeclarationsIR.booleanType;
import static com.google.javascript.rhino.TypeDeclarationsIR.functionType;
import static com.google.javascript.rhino.TypeDeclarationsIR.namedType;
import static com.google.javascript.rhino.TypeDeclarationsIR.numberType;
import static com.google.javascript.rhino.TypeDeclarationsIR.parameterizedType;
import static com.google.javascript.rhino.TypeDeclarationsIR.recordType;
import static com.google.javascript.rhino.TypeDeclarationsIR.stringType;
import static com.google.javascript.rhino.TypeDeclarationsIR.undefinedType;
import static com.google.javascript.rhino.TypeDeclarationsIR.unionType;
import static com.google.javascript.rhino.TypeDeclarationsIR.voidType;

import com.google.common.base.Predicates;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.HashBasedTable;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;
import com.google.common.collect.LinkedHashMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.Multimap;
import com.google.common.collect.Table;
import com.google.javascript.gents.pass.CollectModuleMetadata.FileModule;
import com.google.javascript.gents.pass.comments.GeneralComment;
import com.google.javascript.gents.pass.comments.NodeComments;
import com.google.javascript.gents.util.NameUtil;
import com.google.javascript.gents.util.PathUtil;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.JSDocInfo.Visibility;
import com.google.javascript.rhino.JSTypeExpression;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Node.TypeDeclarationNode;
import com.google.javascript.rhino.Token;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import javax.annotation.Nullable;

/**
 * Converts JavaScript code into JavaScript code annotated with TypeScript {@code
 * TypeDeclarationNode} information provided by the corresponding jsdoc.
 *
 * <p>This compiler pass is based off of the {@code JsdocToEs6TypedConverter} compiler pass.
 */
public final class TypeAnnotationPass implements CompilerPass {

  private final AbstractCompiler compiler;
  private final PathUtil pathUtil;
  private final NameUtil nameUtil;
  private final NodeComments nodeComments;

  /** symbolName -> fileModule */
  private final Map<String, FileModule> symbolToModule;
  /** filename, namespace -> local name */
  private final Table<String, String, String> typeRewrite;
  /** filename -> extra imports needed to be added */
  private final Multimap<String, Node> importsNeeded = LinkedHashMultimap.create();
  /** extern -> typing map for when extern and TS typing names differ */
  private final Map<String, String> externsMap;

  public TypeAnnotationPass(
      AbstractCompiler compiler,
      PathUtil pathUtil,
      NameUtil nameUtil,
      Map<String, FileModule> symbolMap,
      Table<String, String, String> typeRewrite,
      NodeComments nodeComments,
      Map<String, String> externsMap) {
    this.compiler = compiler;
    this.pathUtil = pathUtil;
    this.nameUtil = nameUtil;
    this.nodeComments = nodeComments;

    this.symbolToModule = new HashMap<>(symbolMap);
    this.typeRewrite = HashBasedTable.create(typeRewrite);
    this.externsMap = externsMap;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverse(compiler, root, new TypeAnnotationConverter());
    NodeTraversal.traverse(compiler, root, new AccessModifierConverter());
    NodeTraversal.traverse(compiler, root, new TemplateAnnotationConverter());
    for (Node script : root.children()) {
      addTypeOnlyImports(script);
    }
  }

  /** Converts @template JSDoc anotations to TypeScript generics syntax. */
  private static class TemplateAnnotationConverter extends AbstractPostOrderCallback {
    private static ImmutableList<String> getExtendedTemplateTypeNames(JSDocInfo bestJSDocInfo) {
      ImmutableList.Builder<String> extendedTemplateTypeNames = ImmutableList.<String>builder();
      JSTypeExpression baseType = bestJSDocInfo.getBaseType();
      if (baseType != null) {
        Node root = baseType.getRoot();
        if (root != null) {
          Node firstFirstChild = root.getFirstFirstChild();
          if (firstFirstChild != null) {
            Iterable<Node> children = firstFirstChild.children();
            for (Node child : children) {
              if (child.isString()) {
                extendedTemplateTypeNames.add(child.getString());
              }
            }
          }
        }
      }
      return extendedTemplateTypeNames.build();
    }

    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      if (!n.isFunction() && !n.isClass() && n.getToken() != Token.INTERFACE) {
        return;
      }
      JSDocInfo bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
      if (bestJSDocInfo == null) {
        return;
      }

      List<String> generics = bestJSDocInfo.getTemplateTypeNames();
      if (!generics.isEmpty()) {
        // JSComp will handle emitting generics for function/class/interface if they are a node on the
        // GENERIC_TYPE_LIST property of the declaration name. The declaration name is the first
        // child of the node generics are being retrieved for.
        Node genericsList = new Node(Token.GENERIC_TYPE_LIST);
        for (String generic : generics) {
          genericsList.addChildToBack(Node.newString(Token.GENERIC_TYPE, generic));
        }
        n.getFirstChild().putProp(Node.GENERIC_TYPE_LIST, genericsList);
      }

      // If the node is a class, the second child might be an "extends" clause, in which
      // case we should check if the super class has any generics.
      Node superClass = n.getSecondChild();
      if (n.isClass() && superClass != null && superClass.isName()) {
        ImmutableList<String> superClassGenerics = TemplateAnnotationConverter.getExtendedTemplateTypeNames(bestJSDocInfo);
        if (!superClassGenerics.isEmpty()) {
          // Convert the super class into a parameterized type. The first child is the class
          // name, all other children are type parameters.
          superClass.setToken(Token.PARAMETERIZED_TYPE);
          superClass.addChildToBack(new Node(Token.NAMED_TYPE, Node.newString(Token.NAME, superClass.getString())));
          for (String generic : superClassGenerics) {
            superClass.addChildToBack(new Node(Token.NAMED_TYPE, Node.newString(Token.NAME, generic)));
          }
        }
      }
    }
  }

  /** Annotates variables and functions with their corresponding TypeScript type. */
  private class TypeAnnotationConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      JSDocInfo bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
      switch (n.getToken()) {
        case PARAM_LIST:
          // If a parameter list has JSDoc comments associated with it, it is because those
          // are inline JSDoc comments that appear just before a function that has a JSDoc comment
          // as well as an inline comment above it, i.e.
          //
          // // a single-line comment
          // /**
          //  * A JSDoc comment
          //  */
          // function /** string */ h() {
          // }
          //
          // In this case, the inline JSDoc comments should be removed (/** string */ in the
          // above example).
          //
          // Note:  There is an inline JSDoc attached to a parameters list when, as in the example
          // above, there is a // right before the JSDoc comment of a function with an inline
          // JSDoc comment for the return type.  If the // comment is not there, the JSDoc return
          // type annotation is not attached to the parameter list.  In that case, the
          // OBJECT_PATTERN case below applies, and handles removing the JSDoc return type
          // annotation.
          List<GeneralComment> comments = nodeComments.getComments(n);
          if (comments != null) {
            nodeComments.setComments(n, comments.stream().filter(it -> !it.isInlineJsDoc()).collect(
                Collectors.toList()));
          }
          break;
          // Fields default to any type
        case MEMBER_VARIABLE_DEF:
          if (bestJSDocInfo != null && bestJSDocInfo.getType() != null) {
            setTypeExpression(n, bestJSDocInfo.getType(), false);
          } else {
            n.setDeclaredTypeExpression(anyType());
          }
          break;
          // Functions are annotated with their return type
        case FUNCTION:
          if (bestJSDocInfo != null) {
            if (bestJSDocInfo.hasThisType()) {
              Node thisParam = IR.name("this");
              n.getSecondChild().addChildToFront(thisParam);
              setTypeExpression(thisParam, bestJSDocInfo.getThisType(), /* isReturnType */ false);
              thisParam.setStaticSourceFile(n.getStaticSourceFile());
            }
            if (n.getGrandparent().isInterfaceMembers()) {
              setTypeExpressionForInterfaceMethod(n, bestJSDocInfo.getReturnType(), true);
            } else {
              setTypeExpression(n, bestJSDocInfo.getReturnType(), true);
            }
          }
          break;
        case CLASS:
          if (bestJSDocInfo != null) {
            List<JSTypeExpression> interfaces = bestJSDocInfo.getImplementedInterfaces();
            if (!interfaces.isEmpty()) {
              // Convert the @implements {...} JSDoc comments to TypeNodeASTs, and add them into the
              // implements part of the class definition.
              Node impls = new Node(Token.IMPLEMENTS);
              for (JSTypeExpression type : interfaces) {
                impls.addChildToBack(convertTypeNodeAST(type.getRoot()));
              }
              impls.useSourceInfoFrom(n);
              n.putProp(Node.IMPLEMENTS, impls);
            }
          }
          break;
        case INTERFACE_EXTENDS:
          Node newExtends = n.cloneNode();
          for (Node c : n.children()) {
            newExtends.addChildToBack(convertTypeNodeAST(c));
          }
          parent.replaceChild(n, newExtends);
          break;
        case TYPE_ALIAS:
          if (bestJSDocInfo != null && bestJSDocInfo.hasTypedefType()) {
            JSTypeExpression typeDef = bestJSDocInfo.getTypedefType();
            n.addChildToBack(convertTypeNodeAST(typeDef.getRoot()));
          }
          break;
          // Names and properties are annotated with their types
        case NAME:
        case GETPROP:
        case OBJECT_PATTERN:
          if (parent == null) {
            break;
          }
          if (NodeUtil.isNameDeclaration(parent)) { // Variable declaration
            maybeSetInlineTypeExpression(n, n, bestJSDocInfo, false);
          } else if (parent.isParamList()) { // Function parameters
            boolean wasSetFromFunctionDoc = setParameterTypeFromFunctionDoc(n, parent);
            if (!wasSetFromFunctionDoc) {
              // If we didn't set the parameter type from the functions's JsDoc, then maybe the type
              // is inlined just before the parameter?
              maybeSetInlineTypeExpression(n, n, bestJSDocInfo, false);
            }
          } else if (parent.isFunction() && n.getJSDocInfo() == bestJSDocInfo) {
            // If this is a name of the function and the JsDoc is just before this name,
            // then it may be an inline return type of this function.
            maybeSetInlineTypeExpression(parent, n, bestJSDocInfo, true);
          }
          break;
          // If a DEFAULT_VALUE is in a PARAM_LIST we type annotate its first child which is the
          // actual parameter.
        case DEFAULT_VALUE:
          Node paramNode = n.getFirstChild();
          if (parent != null && parent.isParamList() && paramNode != null) {
            boolean wasSetFromFunctionDoc = setParameterTypeFromFunctionDoc(paramNode, parent);
            if (!wasSetFromFunctionDoc) {
              // If we didn't set the parameter type from the functions's JsDoc, then maybe the type
              // is inlined just before the parameter?
              maybeSetInlineTypeExpression(paramNode, paramNode, bestJSDocInfo, false);
            }
          }
          break;
        case CAST:
          setTypeExpression(n, n.getJSDocInfo().getType(), false);
          break;
        case INTERFACE_MEMBERS:
          // Closure code generator expects the form:
          //
          // INTERFACE_MEMBERS
          //     MEMBER_VARIABLE_DEF property1 [jsdoc_info: JSDocInfo]
          //     MEMBER_VARIABLE_DEF property2 [jsdoc_info: JSDocInfo]
          //
          // Each MEMBER_VARIABLE_DEF has a jsdoc about its typing.
          //
          // Closure annotated interfaces are already in this format at this point so it's a no-op
          // here. typedefs inside classes are converted to top level interfaces in
          // TypeConversionPass. They are in a different format:
          //
          // INTERFACE_MEMBERS [jsdoc_info: JSDocInfo]
          //
          // There are no MEMBER_VARIABLE_DEFs yet. All the information are stored in
          // INTERFACE_MEMBERS's jsdoc. We are extracting the properties from the jsdoc and
          // creating each MEMBER_VARIABLE_DEFs so code generator works.
          if (bestJSDocInfo != null && bestJSDocInfo.hasTypedefType()) {
            Node typedefTypeRoot = bestJSDocInfo.getTypedefType().getRoot();
            if ((typedefTypeRoot.getToken() == Token.BANG)
                || (typedefTypeRoot.getToken() == Token.QMARK)) {
              typedefTypeRoot = typedefTypeRoot.getFirstChild();
            }
            // For input:
            //   /*
            //    * @typedef{{
            //    *   a: number,
            //    *   b: number,
            //    *   c
            //    * }}
            //    */
            // the structure of the JSDoc comment is:
            // (BANG|QMARK)
            //     LC
            //         LB
            //             COLON
            //                 STRING_KEY a
            //                 STRING number
            //             COLON
            //                 STRING_KEY b
            //                 STRING number
            //             STRING_KEY c
            for (Node colonOrStringNode : typedefTypeRoot.getFirstChild().children()) {
              if (colonOrStringNode.isStringKey()) {
                // If the typedef is of the form `key` instead of `key: type`
                // treat the type as `any` since a type constraint wasn't specified.
                Node memberVariableDefNode =
                    Node.newString(Token.MEMBER_VARIABLE_DEF, colonOrStringNode.getString());
                memberVariableDefNode.setDeclaredTypeExpression(
                    new TypeDeclarationNode(Token.ANY_TYPE));
                n.addChildToBack(memberVariableDefNode);
              } else {
                Node memberVariableDefNode =
                    Node.newString(
                        Token.MEMBER_VARIABLE_DEF, colonOrStringNode.getFirstChild().getString());
                memberVariableDefNode.setDeclaredTypeExpression(
                    convertTypeNodeAST(colonOrStringNode.getSecondChild()));
                n.addChildToBack(memberVariableDefNode);
              }
            }
          }
          break;
        default:
          break;
      }
    }

    private void maybeSetInlineTypeExpression(
        Node nameNode, Node commentNode, JSDocInfo docInfo, boolean isReturnType) {
      if (docInfo == null) {
        return;
      }
      JSTypeExpression type = docInfo.getType();
      if (type == null) {
        return;
      }
      setTypeExpression(nameNode, type, isReturnType);
      // Remove the part of comment that sets the inline type.
      String toRemove = docInfo.getOriginalCommentString();
      List<GeneralComment> comments = nodeComments.getComments(commentNode);
      if (comments == null) {
        return;
      }

      List<GeneralComment> newComments = Lists.newArrayList();
      for (GeneralComment c : comments) {
        String newText = c.getText().replaceFirst("\\n?" + Pattern.quote(toRemove), "");
        newComments.add(GeneralComment.from(newText, c.getOffset()));
      }

      nodeComments.setComments(commentNode, newComments);
      compiler.reportChangeToEnclosingScope(commentNode);
    }

    /**
     * Attempts to set the type of parameter represented by node by extracting it from @param
     * annotations in the function's jsDoc. Returns true if it succeeds (i.e. if it finds the type).
     */
    private boolean setParameterTypeFromFunctionDoc(Node node, Node parent) {
      JSDocInfo parentDocInfo = NodeUtil.getBestJSDocInfo(parent.getParent());
      if (parentDocInfo == null) {
        return false;
      }
      String parameterName;
      if (node.isObjectPattern()) {
        // If the object pattern has a default value, the recorded parameter root is actually that
        // of the default value node.
        Node parameter = node.getParent().isDefaultValue() ? node.getParent() : node;
        parameterName = parentDocInfo.getParameterNameAt(parent.getIndexOfChild(parameter));
      } else {
        parameterName = node.getString();
      }
      JSTypeExpression parameterType = parentDocInfo.getParameterType(parameterName);
      if (parameterType == null) {
        return false;
      }
      TypeDeclarationNode parameterTypeNode = convertTypeNodeAST(parameterType.getRoot());
      // Parameter is declared using verbose @param syntax before the function definition.
      Node attachTypeExpr = node;
      // Modify the primary AST to represent a function parameter as a
      // REST node, if the type indicates it is a rest parameter.
      if (parameterType.getRoot().getToken() == Token.ITER_REST) {
        attachTypeExpr = IR.iterRest(IR.name(node.getString()));
        nodeComments.replaceWithComment(node, attachTypeExpr);
      }
      // Modify the AST to represent an optional parameter
      if (parameterType.getRoot().getToken() == Token.EQUALS) {
        if (node.isObjectPattern()) {
          List<Node> bindings = new ArrayList<>();
          for (Node binding : node.children()) {
            bindings.add(binding.cloneTree());
          }
          attachTypeExpr = IR.objectPattern(bindings.toArray(new Node[node.getChildCount()]));
        } else {
          attachTypeExpr = IR.name(node.getString());
        }
        if (!node.getParent().isDefaultValue()) {
          attachTypeExpr.putBooleanProp(Node.OPT_ES6_TYPED, true);
        } else if (node.getParent().getSecondChild().isName()
            && node.getParent().getSecondChild().getString().equals("undefined")) {
          // if default value is "undefined" add undefined to the type
          parameterTypeNode = flatUnionType(ImmutableList.of(parameterTypeNode, undefinedType()));
        }
        nodeComments.replaceWithComment(node, attachTypeExpr);
      }
      setTypeExpression(attachTypeExpr, parameterTypeNode);
      return true;
    }
  }

  /** Annotates variables with their corresponding modifiers. (ie. private, protected) */
  private static class AccessModifierConverter extends AbstractPostOrderCallback {
    @Override
    public void visit(NodeTraversal t, Node n, Node parent) {
      JSDocInfo bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
      if (bestJSDocInfo == null) {
        return;
      }

      // Add visibility for private and protected.
      if (Visibility.PRIVATE.equals(bestJSDocInfo.getVisibility())) {
        n.putProp(Node.ACCESS_MODIFIER, Visibility.PRIVATE);
      } else if (Visibility.PROTECTED.equals(bestJSDocInfo.getVisibility())) {
        n.putProp(Node.ACCESS_MODIFIER, Visibility.PROTECTED);
      }

      // Change variable declarations to constants
      if (bestJSDocInfo.isConstant() && (n.isVar() || n.isLet())) {
        n.setToken(Token.CONST);
      }
    }
  }

  /** Adds nodes for new imports required to resolve type declarations. */
  void addTypeOnlyImports(Node script) {
    if (!script.isScript() || !importsNeeded.containsKey(script.getSourceFileName())) {
      return;
    }

    Node body = script.getFirstChild().isModuleBody() ? script.getFirstChild() : script;

    for (Node n : body.children()) {
      if (n.isImport()) {
        // Prepends new imports to the first import
        for (Node newImport : importsNeeded.get(script.getSourceFileName())) {
          body.addChildBefore(newImport, n);
        }
        return;
      }
    }
    for (Node newImport : importsNeeded.get(script.getSourceFileName())) {
      script.addChildToFront(newImport);
    }
  }

  /**
   * Sets the annotated type expression for a interface method return type.
   *
   * <p>The generic setTypeExpression cannot be used, because when an explicit annotation is missing
   * In closure it means infer 'void' while for TypeScripe we need to add : void explicitly.
   */
  private void setTypeExpressionForInterfaceMethod(
      Node n, @Nullable JSTypeExpression type, boolean isReturnType) {
    TypeDeclarationNode decl = type == null ? voidType() : convert(type, isReturnType);
    setTypeExpression(n, decl);
  }

  /** Sets the annotated type expression corresponding to Node {@code n}. */
  private void setTypeExpression(Node n, @Nullable JSTypeExpression type, boolean isReturnType) {
    TypeDeclarationNode typeNode = convert(type, isReturnType);

    // If the type of a member variable contains "undefined", we emit prop? and drop the undefined in TypeScript.
    // This is a better translation which matches closure semantics that a field with
    // optional undefined can be completely omitted from the assigned object.
    //   /** @private {string|undefined} */ this.a -> a? : string
    if (n.isMemberVariableDef() &&
        typeNode.getToken() == Token.UNION_TYPE &&
        unionContainsUndefined(typeNode)) {
      n.setString(n.getString() + "?");
      typeNode = getUnionTypeNoUndefined(typeNode);
    }

    setTypeExpression(n, typeNode);
  }

  /** Sets the annotated type expression corresponding to Node {@code n}. */
  private void setTypeExpression(Node n, @Nullable TypeDeclarationNode type) {
    if (type != null) {
      n.setDeclaredTypeExpression(type);
      compiler.reportChangeToEnclosingScope(n);
    }
  }

  @Nullable
  private TypeDeclarationNode convert(@Nullable JSTypeExpression typeExpr, boolean isReturnType) {
    if (typeExpr == null) {
      return null;
    }
    return convertTypeNodeAST(typeExpr.getRoot(), isReturnType);
  }

  /**
   * The root of a JSTypeExpression is very different from an AST node, even though we use the same
   * Java class to represent them. This function converts root nodes of JSTypeExpressions into
   * TypeDeclaration ASTs, to make them more similar to ordinary AST nodes.
   *
   * @return the root node of a TypeDeclaration AST, or null if no type is available for the node.
   */
  @Nullable
  private TypeDeclarationNode convertTypeNodeAST(Node n) {
    return convertTypeNodeAST(n, false);
  }

  @Nullable
  private TypeDeclarationNode convertTypeNodeAST(Node n, boolean isReturnType) {
    switch (n.getToken()) {
        // for function types that don't declare a return type
        // ex. /** @return */ var f = function() {};
      case EMPTY:
        return null;
        // TODO(renez): re-evaluate whether or not we want to convert {*} to the any type.
      case STAR:
        return anyType();
      case VOID:
        return isReturnType ? voidType() : undefinedType();
      case QMARK:
        Node child = n.getFirstChild();
        if (child == null) {
          return anyType();
        } else {
          ImmutableList<TypeDeclarationNode> types =
              ImmutableList.of(convertTypeNodeAST(child), new TypeDeclarationNode(Token.NULL));
          return flatUnionType(types);
        }
      case STRING:
        String typeName = n.getString();
        switch (typeName) {
          case "boolean":
            return booleanType();
          case "number":
            return numberType();
          case "string":
            return stringType();
          case "null":
            // TODO(renez): refactor this once Token.NULL_TYPE exists
            return new TypeDeclarationNode(Token.NULL);
            // Both undefined and void are converted to undefined for all non-return types.
            // In closure, "void" and "undefined" are type aliases and thus, equivalent types.
            // However, in TS, it is more ideomatic to emit "void" for return types.
            // Additionally, there is semantic difference to note: TS "undefined" return types
            // require
            // a return statement, while "void" does not.
          case "undefined":
          case "void":
            return isReturnType ? voidType() : undefinedType();
          default:
            if (typeName.equals("Array") && !n.hasChildren()) {
              // This handles the case if something is annotated as type `Array` without
              // a type parameter specified.  For example,
              //   /** @type {Array} */ const y = [];
              // Note that the type is just `Array` and not `Array<T>` for some type T.
              //
              // In this case, gents should emit an array of `any`s, because without this case here,
              // gents would instead emit `Array`.
              //
              // By emitting an array of `any`s, later code in gents will update the `any` to
              // be whatever type is specified to use as an alias of `any` (if the user
              // provided an alias).
              return arrayType(anyType());
            }

            String newTypeName = convertTypeName(n.getSourceFileName(), typeName);
            newTypeName = convertExternNameToTypingName(newTypeName);
            TypeDeclarationNode root = namedType(newTypeName);

            if (!n.hasChildren()) {
              if (typeName.equals("Promise") || typeName.equals("IPromise")) {
                return parameterizedType(namedType("Promise"), ImmutableList.of(anyType()));
              }
            }

            if (n.getChildCount() > 0 && n.getFirstChild().isNormalBlock()) {
              Node block = n.getFirstChild();
              switch (typeName) {
                case "Array":
                  // Convert {Array<t>} to t[]
                  return arrayType(convertTypeNodeAST(block.getFirstChild()));
                case "Object":
                  // Convert index signature types
                  TypeDeclarationNode indexSignatureNode =
                      indexSignatureType(
                          convertTypeNodeAST(block.getFirstChild()),
                          convertTypeNodeAST(block.getSecondChild()));
                  return indexSignatureNode;
                case "IPromise":
                case "Promise":
                  // I am not sure why == TOKEN.VOID doesn't work here, but it appears
                  // that Promise<undefined> and Promise<void> have the generic parameters as
                  // TOKEN.String.
                  Node genericParam = block.getFirstChild();
                  boolean promiseOfVoidOrUndefined =
                      genericParam.isString()
                          && (genericParam.getString().equals("undefined")
                              || genericParam.getString().equals("void"));
                  return parameterizedType(
                      namedType("Promise"),
                      ImmutableList.of(
                          promiseOfVoidOrUndefined
                              ? namedType("void")
                              : convertTypeNodeAST(genericParam)));
                default:
                  // N/A
              }

              // Convert generic types
              return parameterizedType(
                  root,
                  Iterables.filter(
                      Iterables.transform(block.children(), this::convertTypeNodeAST),
                      Predicates.notNull()));
            }
            return root;
        }
        // Convert records
      case LC:
        LinkedHashMap<String, TypeDeclarationNode> properties = new LinkedHashMap<>();
        for (Node field : n.getFirstChild().children()) {
          boolean isFieldTypeDeclared = field.getToken() == Token.COLON;
          Node fieldNameNode = isFieldTypeDeclared ? field.getFirstChild() : field;
          String fieldName = fieldNameNode.getString();
          if (fieldName.startsWith("'") || fieldName.startsWith("\"")) {
            fieldName = fieldName.substring(1, fieldName.length() - 1);
          }
          TypeDeclarationNode fieldType =
              isFieldTypeDeclared ? convertTypeNodeAST(field.getLastChild()) : null;

          // If the union contains "undefined", we emit prop? and drop the undefined in TypeScript.
          // This is a better translation which matches closure semantics that a field with
          // optional undefined can be completely omitted from the assigned object.
          if (fieldType.getToken() == Token.UNION_TYPE && unionContainsUndefined(fieldType)) {
            TypeDeclarationNode unionNoUndefined = getUnionTypeNoUndefined(fieldType);
            fieldName += "?";
            fieldType = unionNoUndefined;
          }

          properties.put(fieldName, fieldType);
        }

        return recordType(properties);
        // Convert unions
      case PIPE:
        ImmutableList<TypeDeclarationNode> types =
            FluentIterable.from(n.children())
                .transform(this::convertTypeNodeAST)
                .filter(Predicates.notNull())
                .toList();
        switch (types.size()) {
          case 0:
            return null;
          case 1:
            return types.get(0);
          default:
            return flatUnionType(types);
        }
        // Convert function types
      case FUNCTION:
        Node returnType = null;
        LinkedHashMap<String, TypeDeclarationNode> requiredParams = new LinkedHashMap<>();
        LinkedHashMap<String, TypeDeclarationNode> optionalParams = new LinkedHashMap<>();
        String restName = null;
        TypeDeclarationNode restType = null;
        boolean isNew = false;
        for (Node child2 : n.children()) {
          if (child2.isParamList()) {
            int paramIdx = 1;
            for (Node param : child2.children()) {
              String paramName = "p" + paramIdx++;
              if (param.getToken() == Token.ITER_REST) {
                if (param.hasChildren()) {
                  restType = convertTypeNodeAST(param);
                }
                restName = paramName;
              } else if (param.getToken() == Token.EQUALS) {
                optionalParams.put(paramName, convertTypeNodeAST(param));
              } else {
                requiredParams.put(paramName, convertTypeNodeAST(param));
              }
            }
          } else if (child2.isNew()) {
            returnType = convertTypeNodeAST(child2.getFirstChild(), /* isReturnType */ true);
            isNew = true;
          } else if (child2.isThis()) {
            requiredParams.put("this", convertTypeNodeAST(child2.getFirstChild()));
          } else if (returnType == null) {
            returnType = convertTypeNodeAST(child2, true);
          }
        }
        if (returnType == null) {
          returnType = anyType();
        }
        TypeDeclarationNode fn =
            functionType(returnType, requiredParams, optionalParams, restName, restType);
        if (isNew) {
          fn.putBooleanProp(Node.CONSTRUCT_SIGNATURE, true);
        }
        return fn;
        // Variable function parameters are encoded as an array.
      case ITER_REST:
        Node arrType = convertTypeNodeAST(n.getFirstChild());
        if (arrType == null) {
          arrType = anyType();
        }
        return arrayType(arrType);
        // Optional parameters are entirely encoded within the parameter name while the type
        // remains the same.
      case EQUALS:
      case BANG: // TypeScript types are non-nullable by default with --strictNullChecks
        return convertTypeNodeAST(n.getFirstChild());
      case NAME:
        return namedType(n.getString());
      default:
        throw new IllegalArgumentException("Unsupported node type:\n" + n.toStringTree());
    }
  }

  /** Returns whether a union type contains `undefined`. */
  private static boolean unionContainsUndefined(TypeDeclarationNode union) {
    for (Node unionChild : union.children()) {
      if (unionChild.getToken() == Token.UNDEFINED_TYPE) {
        return true;
      }
    }
    return false;
  }

  /** Converts a union type to one without `undefined`, if it is present, detaching the original union. */
  private static TypeDeclarationNode getUnionTypeNoUndefined(TypeDeclarationNode union) {
    List<TypeDeclarationNode> nonUndefinedChildren = new ArrayList<>();
    for (Node unionChild : union.children()) {
      if (unionChild.getToken() != Token.UNDEFINED_TYPE) {
        nonUndefinedChildren.add((TypeDeclarationNode) unionChild);
      }
    }
    union.detachChildren();
    return unionType(nonUndefinedChildren);
  }

  /** Returns a new node representing an index signature type. */
  private TypeDeclarationNode indexSignatureType(
      TypeDeclarationNode keyType, TypeDeclarationNode valueType) {
    TypeDeclarationNode node = new TypeDeclarationNode(Token.INDEX_SIGNATURE);
    TypeDeclarationNode first = new TypeDeclarationNode(Token.STRING_KEY, "key");
    // In TypeScript index signatures can only have string or number types, everything
    // else is a type error. It cannot even be a type alias.
    if (keyType.getToken() == Token.STRING_TYPE || keyType.getToken() == Token.NUMBER_TYPE) {
      first.setDeclaredTypeExpression(keyType);
    } else {
      // We don't have info about what was the original type, so we emit 'string' which is the
      // closest to the runtime behavior and the most general widening. At the end object keys are
      // strings at runtime.
      // TODO(radokirov): add a comment describing the original type.
      first.setDeclaredTypeExpression(new TypeDeclarationNode(Token.STRING_KEY, "string"));
    }
    node.addChildToBack(first);
    node.setDeclaredTypeExpression(valueType);
    return node;
  }

  /** Converts the global type name to the local type name. */
  private String convertTypeName(String sourceFile, String typeName) {
    Map<String, String> rewriteMap =
        typeRewrite.containsRow(sourceFile)
            ? typeRewrite.rowMap().get(sourceFile)
            : new HashMap<>();

    // All type symbols declared anywhere in the compilation unit
    Set<String> allTypes = new HashSet<>();
    allTypes.addAll(rewriteMap.keySet());
    allTypes.addAll(symbolToModule.keySet());

    String importedNamespace = nameUtil.findLongestNamePrefix(typeName, allTypes);
    // Closure compilation can be permissive to the point where there are missing types.
    // Gents supports these usecases by syntactically emitting the type as written. The file emitted
    // file might not work with TS compiler, but at least the type is not lost.
    if (importedNamespace == null) {
      return typeName;
    }

    if (rewriteMap.containsKey(importedNamespace)) {
      // Rewrite already imported types
      String symbol = rewriteMap.get(importedNamespace);
      return nameUtil.replacePrefixInName(typeName, importedNamespace, symbol);
    } else {
      // Rewrite ALL types in compilation unit
      FileModule module = symbolToModule.get(importedNamespace);
      String symbol = module.importedNamespacesToSymbols.get(importedNamespace);

      FileModule typeModule = symbolToModule.get(typeName);

      // Create a new import statement if the symbol to import isn't from the same file or the type
      // is not part of the compilation unit.
      if (typeModule != null && !sourceFile.equals(typeModule.file)) {
        Node importSpec;
        Node importFile;
        if (module.shouldUseOldSyntax()) {
          importSpec = Node.newString(Token.NAME, symbol);
          importFile = Node.newString("goog:" + importedNamespace);
        } else {
          Node spec = new Node(Token.IMPORT_SPEC, IR.name(symbol));
          spec.setShorthandProperty(true);
          importSpec = new Node(Token.IMPORT_SPECS, spec);
          importFile = Node.newString(pathUtil.getImportPath(sourceFile, module.file));
        }
        Node importNode = new Node(Token.IMPORT, IR.empty(), importSpec, importFile);
        importsNeeded.put(sourceFile, importNode);
      }
      typeRewrite.put(sourceFile, importedNamespace, symbol);
      return nameUtil.replacePrefixInName(typeName, importedNamespace, symbol);
    }
  }

  /**
   * If an extern-to-typing map is provided, try to look up the extern type name and replace it with
   * the TypeScript version.
   */
  private String convertExternNameToTypingName(String externTypeName) {
    String typingName = this.externsMap.get(externTypeName);
    if (typingName != null) {
      return typingName;
    } else {
      return externTypeName;
    }
  }

  /** Helper function to recursively flatten union types. */
  private void flatten(
      Iterable<TypeDeclarationNode> types, List<TypeDeclarationNode> result, boolean hasNull) {
    for (TypeDeclarationNode t : types) {
      switch (t.getToken()) {
        case NULL:
          if (!hasNull) {
            result.add(new TypeDeclarationNode(Token.NULL));
            hasNull = true;
          }
          break;
        case UNION_TYPE:
          Iterable<TypeDeclarationNode> children =
              FluentIterable.from(t.children())
                  .transform(node -> (TypeDeclarationNode) node)
                  .toList();
          // We had to invoke .toList() as detachChildren() breaks the Iterable.
          t.detachChildren();
          flatten(children, result, hasNull);
          break;
        default:
          result.add(t);
          break;
      }
    }
  }

  /**
   * Deep flattens a list of types into a single union type.
   *
   * @return A flattened union type with at most 1 null.
   */
  private TypeDeclarationNode flatUnionType(Iterable<TypeDeclarationNode> types) {
    List<TypeDeclarationNode> flatTypes = new ArrayList<>();
    flatten(types, flatTypes, false);
    return unionType(flatTypes);
  }
}
