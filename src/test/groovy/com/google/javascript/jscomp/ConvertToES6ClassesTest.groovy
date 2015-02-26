package com.google.javascript.jscomp

class ConvertToES6ClassesTest extends CompilerTestCase {

  public void setUp() throws Exception {
    super.setUp();
    setAcceptedLanguage(CompilerOptions.LanguageMode.ECMASCRIPT6);
    // TODO(alexeagle): preserve JSDoc in this pass, so we can eg. distinguish class from interface
    compareJsDoc = false;
  }

  @Override
  protected CompilerPass getProcessor(Compiler c) {
    PhaseOptimizer optimizer = new PhaseOptimizer(c, null, null);
    optimizer.addOneTimePass(new PassFactory("convertToTypedES6", true) {
      // To make sure types copied.
      @Override CompilerPass create(AbstractCompiler compiler) {
        return new ConvertToTypedES6(compiler);
      }
    });
    optimizer.addOneTimePass(new PassFactory("convertToES6Classes", true) {
      // Required for classes that don't have a ctor.
      @Override CompilerPass create(AbstractCompiler compiler) {
        return new ConvertToES6Classes(compiler);
      }
    });
    return optimizer;
  }

  void testConvertToClassSyntax() throws Exception {
    test("""

/** @constructor @struct */
var C = function() {};

""", "class C { }");
  }

  void testConvertClassWithConstructorBody() throws Exception {
    test("""

/** @constructor @struct */
var C = function(a) { this.a = a; };

""", "class C { constructor(a) { this.a = a; } }");
  }

  void testConvertClassWithMethod() throws Exception {
    test("""

/** @constructor @struct */
var C = function() {};
C.prototype.method = function() {};

    """, "class C { method() {} }");
  }

  void testConvertClassWithMethodAndConstructor() throws Exception {
    test("""

/** @constructor @struct */
var C = function(a) { this.a = a; };
C.prototype.foo = function() { console.log(this.a); };
C.prototype.bar = function() { alert(this.a); };

""", """

class C {
  constructor(a) { this.a = a; }
  foo() { console.log(this.a); }
  bar() { alert(this.a); }
}

""");
  }

  void testInterface() {
    test("""

/**
 * @interface
 */
var Converter = function() { };

/**
 * @param {X} x
 * @return {Y}
 */
Converter.prototype.convert = function(x) {};

""", """

/**
 * @interface
 */
class Converter {
  convert(x: X): Y {}
}

""");
  }

  void testClassDeclaredWithoutAssignment() throws Exception {
    test("""

/**
 * A shape.
 * @interface
 */
function Shape() {}
Shape.prototype.draw = function() {};

""", "/** @interface */ class Shape { draw() {} }");

  }
}
