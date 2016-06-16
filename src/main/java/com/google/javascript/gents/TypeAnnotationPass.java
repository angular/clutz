package com.google.javascript.gents;

import static com.google.javascript.rhino.TypeDeclarationsIR.anyType;
import static com.google.javascript.rhino.TypeDeclarationsIR.arrayType;
import static com.google.javascript.rhino.TypeDeclarationsIR.booleanType;
import static com.google.javascript.rhino.TypeDeclarationsIR.functionType;
import static com.google.javascript.rhino.TypeDeclarationsIR.namedType;
import static com.google.javascript.rhino.TypeDeclarationsIR.numberType;
import static com.google.javascript.rhino.TypeDeclarationsIR.optionalParameter;
import static com.google.javascript.rhino.TypeDeclarationsIR.parameterizedType;
import static com.google.javascript.rhino.TypeDeclarationsIR.recordType;
import static com.google.javascript.rhino.TypeDeclarationsIR.stringType;
import static com.google.javascript.rhino.TypeDeclarationsIR.unionType;
import static com.google.javascript.rhino.TypeDeclarationsIR.voidType;

import com.google.common.base.Function;
import com.google.common.base.Predicates;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;
import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.CompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.JSTypeExpression;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Node.TypeDeclarationNode;
import com.google.javascript.rhino.Token;

import java.util.LinkedHashMap;

import javax.annotation.Nullable;

/**
 * Converts JavaScript code into JavaScript code annotated with TypeScript {@code
 * TypeDeclarationNode} information provided by the corresponding jsdoc.
 *
 * This compiler pass is based off of the {@code JsdocToEs6TypedConverter} compiler pass.
 */
public final class TypeAnnotationPass extends AbstractPostOrderCallback implements CompilerPass {

  private final AbstractCompiler compiler;

  public TypeAnnotationPass(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverseEs6(compiler, root, this);
  }

  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    JSDocInfo bestJSDocInfo = NodeUtil.getBestJSDocInfo(n);
    switch (n.getType()) {
      // Functions are annotated with their return type
      case Token.FUNCTION:
        if (bestJSDocInfo != null) {
          setTypeExpression(n, bestJSDocInfo.getReturnType());
        }
        break;
      // Names and properties are annotated with their types
      case Token.NAME:
      case Token.GETPROP:
        if (parent == null) {
          break;
        }
        if (parent.isVar() || parent.isLet()) { // Variable declaration
          // TODO(renez): convert all vars into lets
          if (bestJSDocInfo != null) {
            setTypeExpression(n, bestJSDocInfo.getType());
          }
        } else if (parent.isParamList()) { // Function parameters
          JSDocInfo parentDocInfo = NodeUtil.getBestJSDocInfo(parent.getParent());
          if (parentDocInfo == null) {
            break;
          }
          JSTypeExpression parameterType = parentDocInfo.getParameterType(n.getString());
          if (parameterType != null) {
            Node attachTypeExpr = n;
            // Modify the primary AST to represent a function parameter as a
            // REST node, if the type indicates it is a rest parameter.
            // This should be the ONLY place Token.ELLIPSIS is found.
            if (parameterType.getRoot().getType() == Token.ELLIPSIS) {
              attachTypeExpr = IR.rest(n.getString());
              n.getParent().replaceChild(n, attachTypeExpr);
              compiler.reportCodeChange();
            }
            setTypeExpression(attachTypeExpr, parameterType);
          }
        }
        break;
      default:
        break;
    }
  }

  /**
   * Sets the annotated type expression corresponding to Node {@code n}.
   */
  private void setTypeExpression(Node n, JSTypeExpression type) {
    TypeDeclarationNode node = TypeDeclarationsIRFactory.convert(type);
    if (node != null) {
      n.setDeclaredTypeExpression(node);
      compiler.reportCodeChange();
    }
  }

  /**
   * Converts root nodes of JSTypeExpressions into TypeDeclaration ASTs.
   */
  public static final class TypeDeclarationsIRFactory {

    // Allow functional-style Iterables.transform over collections of nodes.
    private static final Function<Node, TypeDeclarationNode> CONVERT_TYPE_NODE =
        new Function<Node, TypeDeclarationNode>() {
          @Override
          public TypeDeclarationNode apply(Node node) {
            return convertTypeNodeAST(node);
          }
        };

    @Nullable
    public static TypeDeclarationNode convert(@Nullable JSTypeExpression typeExpr) {
      if (typeExpr == null) {
        return null;
      }
      return convertTypeNodeAST(typeExpr.getRoot());
    }

    /**
     * The root of a JSTypeExpression is very different from an AST node, even though we use the
     * same Java class to represent them. This function converts root nodes of JSTypeExpressions
     * into TypeDeclaration ASTs, to make them more similar to ordinary AST nodes.
     *
     * @return the root node of a TypeDeclaration AST, or null if no type is available for the node.
     */
    @Nullable
    public static TypeDeclarationNode convertTypeNodeAST(Node n) {
      int token = n.getType();
      switch (token) {
        // for function types that don't declare a return type
        // ex. /** @return */ var f = function() {};
        case Token.EMPTY:
          return null;
        // TODO(renez): re-evaluate whether or not we want to convert {*} to the any type.
        case Token.STAR:
          return anyType();
        case Token.VOID:
          return voidType();
        // TypeScript types are non-nullable by default with --strictNullChecks
        case Token.BANG:
          return convertTypeNodeAST(n.getFirstChild());
        case Token.QMARK:
          Node child = n.getFirstChild();
          return child == null
              ? anyType()
              // TODO(renez): convert {?type} to "null | type" instead of "type"
              : convertTypeNodeAST(child);
        case Token.STRING:
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
            case "undefined":
              // TODO(renez): refactor this once CodeGenerator provides support for
              // Token.UNDEFINED_TYPE
              return namedType("undefined");
            case "void":
              return voidType();
            default:
              TypeDeclarationNode root = namedType(typeName);
              if (n.getChildCount() > 0 && n.getFirstChild().isBlock()) {
                Node block = n.getFirstChild();
                // Convert {Array<t>} to t[]
                if ("Array".equals(typeName)) {
                  return arrayType(convertTypeNodeAST(block.getFirstChild()));
                }
                // Convert generic types
                return parameterizedType(root,
                    Iterables.filter(
                        Iterables.transform(block.children(), CONVERT_TYPE_NODE),
                        Predicates.notNull()));
              }
              return root;
          }
        // Convert records
        case Token.LC:
          LinkedHashMap<String, TypeDeclarationNode> properties = new LinkedHashMap<>();
          for (Node field : n.getFirstChild().children()) {
            boolean isFieldTypeDeclared = field.getType() == Token.COLON;
            Node fieldNameNode = isFieldTypeDeclared ? field.getFirstChild() : field;
            String fieldName = fieldNameNode.getString();
            if (fieldName.startsWith("'") || fieldName.startsWith("\"")) {
              fieldName = fieldName.substring(1, fieldName.length() - 1);
            }
            TypeDeclarationNode fieldType = isFieldTypeDeclared
                ? convertTypeNodeAST(field.getLastChild()) : null;
            properties.put(fieldName, fieldType);
          }
          return recordType(properties);
        // Convert unions
        case Token.PIPE:
          ImmutableList<TypeDeclarationNode> types = FluentIterable
              .from(n.children()).transform(CONVERT_TYPE_NODE)
              .filter(Predicates.notNull()).toList();
          switch (types.size()) {
            case 0:
              return null;
            case 1:
              return types.get(0);
            default:
              return unionType(types);
          }
        // Convert function types
        case Token.FUNCTION:
          Node returnType = anyType();
          LinkedHashMap<String, TypeDeclarationNode> requiredParams = new LinkedHashMap<>();
          LinkedHashMap<String, TypeDeclarationNode> optionalParams = new LinkedHashMap<>();
          String restName = null;
          TypeDeclarationNode restType = null;
          for (Node child2 : n.children()) {
            if (child2.isParamList()) {
              int paramIdx = 1;
              for (Node param : child2.children()) {
                String paramName = "p" + paramIdx++;
                if (param.getType() == Token.ELLIPSIS) {
                  if (param.getFirstChild() != null) {
                    restType = arrayType(convertTypeNodeAST(param.getFirstChild()));
                  }
                  restName = paramName;
                } else {
                  TypeDeclarationNode paramNode = convertTypeNodeAST(param);
                  if (paramNode.getType() == Token.OPTIONAL_PARAMETER) {
                    optionalParams.put(paramName,
                        (TypeDeclarationNode) paramNode.removeFirstChild());
                  } else {
                    requiredParams.put(paramName, convertTypeNodeAST(param));
                  }
                }
              }
            } else if (child2.isNew()) {
              // keep the constructor signatures on the tree, and emit them following
              // the syntax in TypeScript 1.8 spec, section 3.8.9 Constructor Type Literals
            } else if (child2.isThis()) {
              // Not expressible in TypeScript syntax, so we omit them from the tree.
              // They could be added as properties on the result node.
            } else {
              returnType = convertTypeNodeAST(child2);
            }
          }
          return functionType(returnType, requiredParams, optionalParams, restName, restType);
        // TODO(renez): confirm this is unreachable code and remove in future.
        case Token.ELLIPSIS:
          return arrayType(convertTypeNodeAST(n.getFirstChild()));
        // TODO(renez): this is incorrect. optional parameters only modify the parameter name and
        // ignore the type. This logic should be hoisted up into visit()
        case Token.EQUALS:
          TypeDeclarationNode optionalParam = convertTypeNodeAST(n.getFirstChild());
          return optionalParam == null ? null : optionalParameter(optionalParam);
        default:
          throw new IllegalArgumentException(
              "Unsupported node type: " + Token.name(n.getType())
                  + " " + n.toStringTree());
      }
    }
  }
}
