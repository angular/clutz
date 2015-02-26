package com.google.javascript.jscomp

import com.google.javascript.jscomp.Compiler
import com.google.javascript.jscomp.SourceFile
import com.google.javascript.jscomp.ClosureToDts

import static com.google.common.truth.Truth.assertThat

class DtsPrintingTest extends GroovyTestCase {

  def converter = new ClosureToDts(new Compiler(System.err))

  void testInterface() {
    assertThat(converter.translate(SourceFile.fromCode("classes.js", """
/**
 * A shape.
 * @interface
 */
function Shape() {};
Shape.prototype.draw = function() {};
"""))).is("""interface Shape {
  draw() {
  }
}
""")
  }

  void testImplements() {
    assertThat(converter.translate(SourceFile.fromCode("classes.js", """
/**
 * @constructor
 * @implements {Shape}
 */
function Square() {};
Square.prototype.draw = function() {};
"""))).is("""class Square implements Shape {
  draw() {
  }
}
""")
  }

  void testClass() {
    assertThat(converter.translate(SourceFile.fromCode("classes.js", """
/**
 * @constructor
 */
function MyClass() {};
"""))).is("""class MyClass {
}
""")
  }

  void testConstructorParameterTypes() {
    assertThat(converter.translate(SourceFile.fromCode("classes.js", """
/**
 * @constructor
 * @param {number|string} x
 */
function Square(x) {};
"""))).is("""class Square {
  constructor(x: number | string) {
  }
}
""")
  }

  void testClassMemberAssignment() {
    assertThat(converter.translate(SourceFile.fromCode("classes.js", """
/**
 * @constructor
 */
function MyClass() {
    /** @type {string} */
    this.thisAssignment = 'x'
}
"""))).is("""class MyClass {
  thisAssignment: string = "x";
}
""");
  }

  void testClassMemberDeclaration() {
    assertThat(converter.translate(SourceFile.fromCode("classes.js", """
/**
 * @constructor
 */
function MyClass() {
    /** @type {number} */
    this.thisDeclaration
}
"""))).is("""class MyClass {
  thisDeclaration: number;
}
""")
  }

  void testMethodDeclarationOnPrototype() {
    assertThat(converter.translate(SourceFile.fromCode("classes.js", """
/**
 * @constructor
 */
function MyClass() {}
/** @param {number} x */
MyClass.prototype.aMethod = function(x) {};
"""))).is("""class MyClass {
  aMethod(x: number) {
  }
}
""")
  }

  void xtestRealExample() {
    assertThat(converter.translate(SourceFile.fromCode("classes.js", """
/**
 * @constructor
 * @implements {example.Interface}
 * @param {number|string} x
 */
example.Class = function(x) {
    /** @type {string} */
    this.thisAssignment = 'x';

    /** @type {number} */
    this.thisDeclaration;

    /**
     * @type {number}
     * @private
     */
    this.privateAssignment = 1;

    /**
     * @type {number}
     * @private
     */
    this.privateDeclaration;

    /**
     * @type {number}
     * @private {number}
     */
    this.weirdPrivateAnnotation = 1;
};

/**
 * @param {number|string} x
 */
example.Class.prototype.overloadedMethod = function(x) {

};

/**
 * @override
 */
example.Class.prototype.interfaceMethod = function(x) { };
"""))).contains("number;")
  }
}