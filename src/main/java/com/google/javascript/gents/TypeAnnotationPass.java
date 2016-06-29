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
import com.google.common.collect.Lists;
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
import java.util.List;

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
          setTypeExpression(n, bestJSDocInfo.getReturnType(), true);
        }
        break;
      // Names and properties are annotated with their types
      case NAME:
      case GETPROP:
        if (parent == null) {
          break;
        }
        if (parent.isVar() || parent.isLet()) { // Variable declaration
          // TODO(renez): convert all vars into lets
          if (bestJSDocInfo != null) {
            setTypeExpression(n, bestJSDocInfo.getType(), false);
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
            setTypeExpression(attachTypeExpr, parameterType, false);
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
  private void setTypeExpression(Node n, JSTypeExpression type, boolean isReturnType) {
    TypeDeclarationNode node = TypeDeclarationsIRFactory.convert(type, isReturnType);
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

    private static final Function<Node, TypeDeclarationNode> CAST_TYPE_NODE =
        new Function<Node, TypeDeclarationNode>() {
          @Override
          public TypeDeclarationNode apply(Node node) {
            return (TypeDeclarationNode) node;
          }
        };

    @Nullable
    public static TypeDeclarationNode convert(@Nullable JSTypeExpression typeExpr,
        boolean isReturnType) {
      if (typeExpr == null) {
        return null;
      }
      return convertTypeNodeAST(typeExpr.getRoot(), isReturnType);
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
      return convertTypeNodeAST(n, false);
    }

    @Nullable
    public static TypeDeclarationNode convertTypeNodeAST(Node n, boolean isReturnType) {
      switch (n.getType()) {
        // for function types that don't declare a return type
        // ex. /** @return */ var f = function() {};
        case EMPTY:
          return null;
        // TODO(renez): re-evaluate whether or not we want to convert {*} to the any type.
        case STAR:
          return anyType();
        case VOID:
          return isReturnType ? voidType() : namedType("undefined");
        // TypeScript types are non-nullable by default with --strictNullChecks
        case BANG:
          return convertTypeNodeAST(n.getFirstChild());
        case QMARK:
          Node child = n.getFirstChild();
          if (child == null) {
            return anyType();
          } else {
            ImmutableList<TypeDeclarationNode> types = ImmutableList.of(
                new TypeDeclarationNode(Token.NULL),
                convertTypeNodeAST(child)
            );
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
            // Additionally, there is semantic difference to note: TS "undefined" return types require
            // a return statement, while "void" does not.
            case "undefined":
            case "void":
              // TODO(renez): refactor this once CodeGenerator provides support for
              // Token.UNDEFINED_TYPE
              return isReturnType ? voidType() : namedType("undefined");
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
        case LC:
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
        case PIPE:
          ImmutableList<TypeDeclarationNode> types = FluentIterable
              .from(n.children()).transform(CONVERT_TYPE_NODE)
              .filter(Predicates.notNull()).toList();
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
              returnType = convertTypeNodeAST(child2, true);
            }
          }
          return functionType(returnType, requiredParams, optionalParams, restName, restType);
        // TODO(renez): confirm this is unreachable code and remove in future.
        case ELLIPSIS:
          return arrayType(convertTypeNodeAST(n.getFirstChild()));
        // TODO(renez): this is incorrect. optional parameters only modify the parameter name and
        // ignore the type. This logic should be hoisted up into visit()
        case EQUALS:
          TypeDeclarationNode optionalParam = convertTypeNodeAST(n.getFirstChild());
          return optionalParam == null ? null : optionalParameter(optionalParam);
        default:
          throw new IllegalArgumentException(
              "Unsupported node type:\n" + n.toStringTree());
      }
    }

    /**
     * Helper function to recursively flatten union types.
     */
    static void flatten(Iterable<TypeDeclarationNode> types,
        List<TypeDeclarationNode> result, boolean hasNull) {
      for (TypeDeclarationNode t : types) {
        switch (t.getType()) {
          case NULL:
            if (!hasNull) {
              result.add(new TypeDeclarationNode(Token.NULL));
              hasNull = true;
            }
            break;
          case UNION_TYPE:
            Iterable<TypeDeclarationNode> children = FluentIterable
                .from(t.children())
                .transform(CAST_TYPE_NODE)
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
    static TypeDeclarationNode flatUnionType(Iterable<TypeDeclarationNode> types) {
      List<TypeDeclarationNode> flatTypes = Lists.newArrayList();
      flatten(types, flatTypes, false);
      return unionType(flatTypes);
    }
  }
}
