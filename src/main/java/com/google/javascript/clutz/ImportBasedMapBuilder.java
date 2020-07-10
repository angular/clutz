package com.google.javascript.clutz;

import com.google.javascript.rhino.Node;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * ImportBasedMapBuilder is a base class for walking the closure AST and gathering information about
 * imports and exports that the closure compiler doesn't give access to in incremental mode.
 */
public abstract class ImportBasedMapBuilder {
  protected abstract Map<String, String> build(
      String localModuleId, Node moduleBody, Set<String> googProvides);

  /**
   * Build takes a collection of parsed inputs and walks the ast to find any imports into local
   * variables to build a map based on the concrete class's implementation of build.
   */
  public Map<String, String> build(Collection<Node> parsedInputs, Set<String> googProvides) {
    Map<String, String> importRenameMap = new LinkedHashMap<>();
    for (Node ast : parsedInputs) {
      // Symbols can be imported into a variable in a goog.module() file, so look for imports in the
      // body of the goog module.
      String moduleId = getGoogModuleId(ast);
      if (moduleId != null) {
        importRenameMap.putAll(build(moduleId, ast.getFirstChild(), googProvides));
      }

      // Or symbols can be imported into a variable in a top-level goog.scope() block, so look for
      // imports in the bodies of any goog scopes.
      List<Node> googScopes = getTopLevelGoogScopes(ast);
      if (!googScopes.isEmpty()) {
        for (Node googScope : googScopes) {
          importRenameMap.putAll(build(null, googScope, googProvides));
        }
      }
    }
    return importRenameMap;
  }

  protected static List<Node> getTopLevelGoogScopes(Node astRoot) {
    List<Node> googScopes = new ArrayList<>();
    for (Node statement : astRoot.children()) {
      if (isGoogScopeCall(statement)) {
        googScopes.add(statement.getFirstChild().getSecondChild().getChildAtIndex(2));
      }
    }
    return googScopes;
  }

  protected static boolean isGoogScopeCall(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    Node expression = statement.getFirstChild();
    return expression.isCall() && expression.getFirstChild().matchesQualifiedName("goog.scope");
  }

  protected static boolean isGoogModuleCall(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    Node expression = statement.getFirstChild();
    return expression.isCall() && expression.getFirstChild().matchesQualifiedName("goog.module");
  }

  /**
   * Matches either `const foo = goog.require()` or `const foo = goog.module.get()` or `const foo =
   * goog.forwardDeclare()` or `const foo = goog.requireType` depending on if statement is in a
   * goog.module or a goog.scope.
   */
  protected static boolean isImportAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    Node rightHandSide = statement.getFirstFirstChild();

    return rightHandSide != null
        && rightHandSide.isCall()
        && (rightHandSide.getFirstChild().matchesQualifiedName("goog.require")
            || rightHandSide.getFirstChild().matchesQualifiedName("goog.module.get")
            || rightHandSide.getFirstChild().matchesQualifiedName("goog.forwardDeclare")
            || rightHandSide.getFirstChild().matchesQualifiedName("goog.requireType"));
  }

  /** Matches destructing from a variable ie `const {foo, bar: baz} = quux;` */
  protected static boolean isVariableDestructuringAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    if (!statement.getFirstChild().isDestructuringLhs()) {
      return false;
    }

    Node destructuringAssignment = statement.getFirstChild();

    Node rightHandSide = destructuringAssignment.getSecondChild();

    return rightHandSide.isName();
  }

  /**
   * Matches either `const {foo} = goog.require()` or `const {foo} = goog.module.get()` depending on
   * if statement is in a goog.module or a goog.scope.
   */
  protected static boolean isImportDestructuringAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    if (!statement.getFirstChild().isDestructuringLhs()) {
      return false;
    }

    Node destructuringAssignment = statement.getFirstChild();

    Node rightHandSide = destructuringAssignment.getSecondChild();

    return rightHandSide.isCall()
        && (rightHandSide.getFirstChild().matchesQualifiedName("goog.require")
            || rightHandSide.getFirstChild().matchesQualifiedName("goog.module.get"));
  }

  protected static String getGoogModuleId(Node astRoot) {
    if (!astRoot.hasChildren() || !astRoot.getFirstChild().isModuleBody()) {
      return null;
    }

    Node moduleBody = astRoot.getFirstChild();
    for (Node statement : moduleBody.children()) {
      if (isGoogModuleCall(statement)) {
        return statement.getFirstChild().getSecondChild().getString();
      }
    }
    return null;
  }

  /** Matches `exports = foo;` */
  protected boolean isWholeModuleExportAssignment(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    if (!statement.getFirstChild().isAssign()) {
      return false;
    }

    if (!statement.getFirstFirstChild().isName()) {
      return false;
    }

    if (!statement.getFirstChild().getSecondChild().isName()) {
      return false;
    }

    return statement.getFirstFirstChild().getString().equals("exports");
  }

  /** Matches `exports = {foo, bar};` */
  protected boolean isObjectLiteralExport(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    if (!statement.getFirstChild().isAssign()) {
      return false;
    }

    if (!statement.getFirstFirstChild().isName()) {
      return false;
    }

    if (!statement.getFirstChild().getSecondChild().isObjectLit()) {
      return false;
    }

    return statement.getFirstFirstChild().getString().equals("exports");
  }

  /** Matches `exports.foo = foo;` */
  protected boolean isNamedExportAssignment(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    if (!statement.getFirstChild().isAssign()) {
      return false;
    }

    if (!statement.getFirstFirstChild().isGetProp()) {
      return false;
    }

    if (!statement.getFirstFirstChild().getFirstChild().isName()) {
      return false;
    }

    if (!statement.getFirstChild().getSecondChild().isName()) {
      return false;
    }

    return statement.getFirstFirstChild().getFirstChild().getString().equals("exports");
  }

  /** Matches `exports.foo = foo.bar;` */
  protected boolean isNamedExportPropAssignment(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    if (!statement.getFirstChild().isAssign()) {
      return false;
    }

    if (!statement.getFirstFirstChild().isGetProp()) {
      return false;
    }

    if (!statement.getFirstFirstChild().getFirstChild().isName()) {
      return false;
    }

    if (!statement.getFirstChild().getSecondChild().isGetProp()) {
      return false;
    }

    if (!statement.getFirstChild().getSecondChild().getFirstChild().isName()) {
      return false;
    }

    return statement.getFirstFirstChild().getFirstChild().getString().equals("exports");
  }

  /** Returns `foo` from 'exports.foo = bar` */
  protected String getNamedExportName(Node statement) {
    return statement.getFirstFirstChild().getSecondChild().getString();
  }

  /** Returns `foo` from `exports = foo` or `exports.foo = foo` */
  protected String getExportsAssignmentRHS(Node statement) {
    return statement.getFirstChild().getSecondChild().getString();
  }

  /** Returns `foo` from `exports = foo.bar` or `exports.foo = foo.bar` */
  protected String getExportsAssignmentPropRootName(Node statement) {
    return statement.getFirstChild().getSecondChild().getFirstChild().getString();
  }

  /** Returns `bar` from `exports = foo.bar` or `exports.foo = foo.bar` */
  protected String getExportsAssignmentPropName(Node statement) {
    return statement.getFirstChild().getSecondChild().getSecondChild().getString();
  }

  protected Map<String, String> objectLiteralASTToStringMap(Node objectLiteral) {
    Map<String, String> stringMap = new LinkedHashMap<>();
    for (Node objectMember : objectLiteral.children()) {
      String originalName = objectMember.getString();
      // Object literals can use the original name `{A}` or rename it `{RenameA: A}`.
      String variableName;
      if (objectMember.hasChildren()) {
        // RHS is an expression, not a name
        if (!objectMember.getFirstChild().isName()) {
          continue;
        }
        // Renaming
        variableName = objectMember.getFirstChild().getString();
      } else {
        // No rename
        variableName = originalName;
      }

      stringMap.put(originalName, variableName);
    }
    return stringMap;
  }

  /**
   * The exported symbol can take 2 forms - one where it refers to everything that the module
   * exports and another where it refers to just one thing the module exports. If the original
   * module used the `exports = ...` style, the symbol name is just the module name.
   *
   * <p>TODO(lucassloan): this only holds for importing from a goog.module see:
   * https://github.com/angular/clutz/issues/596
   */
  protected static String buildWholeModuleExportSymbolName(String importedModuleId) {
    return "module$exports$" + importedModuleId.replace('.', '$');
  }

  /**
   * The exported symbol can take 2 forms - one where it refers to everything that the module
   * exports and another where it refers to just one thing the module exports. If the original
   * module used the `exports.foo = ...` style, the symbol name is the module name plus the
   * individual export's name.
   *
   * <p>TODO(lucassloan): this only holds for importing from a goog.module see:
   * https://github.com/angular/clutz/issues/596
   */
  protected static String buildNamedExportSymbolName(String importedModuleId, String originalName) {
    return "module$exports$" + importedModuleId.replace('.', '$') + "." + originalName;
  }

  protected static String buildLocalSymbolName(String importingModuleId, String variableName) {
    return "module$contents$" + importingModuleId.replace('.', '$') + "_" + variableName;
  }
}
