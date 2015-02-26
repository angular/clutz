/*
 * Copyright 2015 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.javascript.jscomp;

import static com.google.javascript.jscomp.NodeUtil.*;
import static com.google.javascript.jscomp.NodeUtil.getPrototypeClassName;
import static com.google.javascript.jscomp.NodeUtil.getPrototypePropertyName;
import static com.google.javascript.jscomp.NodeUtil.isPrototypePropertyDeclaration;

import com.google.common.base.Preconditions;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;

import java.util.HashMap;
import java.util.Map;

/**
 * Convert from prototype-assignment style to ES6 classes
 *
 * @author alexeagle@google.com (Alex Eagle)
 */
public class ConvertToES6Classes
    extends AbstractPostOrderCallback implements CompilerPass {

  private final AbstractCompiler compiler;
  private final Map<String, Node> classMemberRoots = new HashMap<>();

  public ConvertToES6Classes(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverse(compiler, root, this);
  }

  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    JSDocInfo bestJSDocInfo = getBestJSDocInfo(n);
    switch (n.getType()) {
      case Token.FUNCTION:

        Node anonymousCopy = IR.function(
            IR.name(""),
            n.getChildAtIndex(1).cloneTree(),
            n.getLastChild().cloneTree());
        anonymousCopy.setDeclaredTypeExpression(n.getDeclaredTypeExpression());

        if (bestJSDocInfo != null) {
          if (bestJSDocInfo.isConstructor() || bestJSDocInfo.isInterface()) {
            visitConstructor(n, parent, anonymousCopy);
          }
        }
        if (isPrototypePropertyDeclaration(parent.getParent())) {
          visitClassMember(parent, anonymousCopy,
              getPrototypeClassName(parent.getFirstChild()).getQualifiedName(),
              getPrototypePropertyName(parent.getFirstChild()));
        }
        break;
      default:
        break;
    }
  }

  private void visitConstructor(Node originalFunc, Node parent, Node constructorFunc) {
    Node toReplace;
    Node name;
    if (parent.isName() && parent.getParent().isVar()) {
      toReplace = parent.getParent();
      name = parent;
    } else {
      toReplace = originalFunc;
      name = originalFunc.getFirstChild();
    }
    Node members = new Node(Token.CLASS_MEMBERS);

    boolean hasStatementsInBody = constructorFunc.getLastChild().hasChildren();
    boolean hasParameters = constructorFunc.getChildAtIndex(1).hasChildren();
    // Don't create a constructor() member if none is needed
    if (hasStatementsInBody || hasParameters) {
      members.addChildToBack(IR.memberFunctionDef("constructor", constructorFunc));
    }
    Node asClass = new Node(Token.CLASS, name.cloneNode(), IR.empty(), members);
    asClass.setJSDocInfo(originalFunc.getJSDocInfo());
    classMemberRoots.put(name.getQualifiedName(), members);

    asClass.useSourceInfoIfMissingFromForTree(toReplace);
    toReplace.getParent().replaceChild(toReplace, asClass);
    compiler.reportCodeChange();
  }

  private void visitClassMember(Node parent, Node memberFunc, String owningClass, String memberName) {
    Node members = classMemberRoots.get(owningClass);
    Preconditions.checkNotNull(members, "Didn't previously create class " + owningClass);
    members.addChildToBack(IR.memberFunctionDef(memberName, memberFunc));
    members.useSourceInfoIfMissingFromForTree(parent.getParent());
    parent.getParent().getParent().removeChild(parent.getParent());
    compiler.reportCodeChange();
  }
}
