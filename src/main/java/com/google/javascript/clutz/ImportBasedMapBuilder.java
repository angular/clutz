package com.google.javascript.clutz;

import com.google.javascript.rhino.Node;
import java.util.*;

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
    Map<String, String> importRenameMap = new HashMap<>();
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
        googScopes.add(statement.getFirstChild().getChildAtIndex(1).getChildAtIndex(2));
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
   * Matches either `const foo = goog.require()` or `const foo = goog.module.get()` depending on if
   * statement is in a goog.module or a goog.scope.
   */
  protected static boolean isImportAssignment(Node statement) {
    if (!(statement.isConst() || statement.isVar() || statement.isLet())) {
      return false;
    }

    Node rightHandSide = statement.getFirstFirstChild();

    return rightHandSide != null
        && rightHandSide.isCall()
        && (rightHandSide.getFirstChild().matchesQualifiedName("goog.require")
            || rightHandSide.getFirstChild().matchesQualifiedName("goog.module.get"));
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

    Node rightHandSide = destructuringAssignment.getChildAtIndex(1);

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

    Node rightHandSide = destructuringAssignment.getChildAtIndex(1);

    return rightHandSide.isCall()
        && (rightHandSide.getFirstChild().matchesQualifiedName("goog.require")
            || rightHandSide.getFirstChild().matchesQualifiedName("goog.module.get"));
  }

  protected static String getGoogModuleId(Node astRoot) {
    if (astRoot.getFirstChild() == null || !astRoot.getFirstChild().isModuleBody()) {
      return null;
    }

    Node moduleBody = astRoot.getFirstChild();
    for (Node statement : moduleBody.children()) {
      if (isGoogModuleCall(statement)) {
        return statement.getFirstChild().getChildAtIndex(1).getString();
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

    if (!statement.getFirstChild().getFirstChild().isName()) {
      return false;
    }

    if (!statement.getFirstChild().getChildAtIndex(1).isName()) {
      return false;
    }

    return statement.getFirstChild().getFirstChild().getString().equals("exports");
  }

  /** Matches `exports.foo = foo;` */
  protected boolean isNamedExportAssignment(Node statement) {
    if (!statement.isExprResult()) {
      return false;
    }

    if (!statement.getFirstChild().isAssign()) {
      return false;
    }

    if (!statement.getFirstChild().getFirstChild().isGetProp()) {
      return false;
    }

    if (!statement.getFirstChild().getFirstChild().getFirstChild().isName()) {
      return false;
    }

    if (!statement.getFirstChild().getChildAtIndex(1).isName()) {
      return false;
    }

    return statement.getFirstChild().getFirstChild().getFirstChild().getString().equals("exports");
  }

  /** Returns `foo` from 'exports.foo = bar` */
  protected String getNamedExportName(Node statement) {
    return statement.getFirstChild().getFirstChild().getChildAtIndex(1).getString();
  }

  /** Returns `foo` from `exports = foo` or `exports.foo = foo` */
  protected String getExportsAssignmentRHS(Node statement) {
    return statement.getFirstChild().getChildAtIndex(1).getString();
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
    return "module$exports$" + importedModuleId.replace(".", "$");
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
    return "module$exports$" + importedModuleId.replace(".", "$") + "." + originalName;
  }

  protected static String buildLocalSymbolName(String importingModuleId, String variableName) {
    return "module$contents$" + importingModuleId.replace(".", "$") + "_" + variableName;
  }
}
