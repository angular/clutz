/**
 * This comment describes a class
 */
class A {
  // This comment is moved with the method
  /* This one too (same comment block) */
  foo() {}
}

/**
 * This is a floating comment block
 * It stays together with anything not separated by an empty line
 */
/* Still the same block */
// Yup
// Here too

/**
 * This is a comment
 *
 * with empty line breaks that are preserved
 * @param notdeleted because this has a description
 * @return this also has a description
 */
// This is just some extra stuff
let foo = function(deleted: number, notdeleted: number): number {
  return deleted + notdeleted;
};

// The following comments should be mostly deleted
/**
 * @param foo description of foo
 */
let x: number;
const xConst: number = 1;

class X extends A {}

class B {
  twoLines: {param1: string|undefined} = {param1: 'param1'};
  multipleLines: {param2: string|undefined} = {param2: 'param2'};
  twoParams:
      {param3: string|undefined,
       param4: string|undefined} = {param3: 'param3', param4: 'param4'};

  /**
   * My special number.
   */
  private privateConstParam: number = 3;
}

/** @export */
let m: number = 4;

// head comment
// comment at the bottom of if block
if (m) {
} else {
}

// comment at the bottom of else block
let a = function() {
  return {b: function() {}};
};
let c = function() {};

// comment before GETPROP

// comment in GETPROP
a().b();

// comment after GETPROP
c();

// comment in the end
