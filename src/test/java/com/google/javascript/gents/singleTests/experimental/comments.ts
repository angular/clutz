
/**
 * This comment describes a class
 */
export class A {
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

export class X extends A {}

export class B {
  twoLines: {param1: string|undefined} = {param1: 'param1'};

  multipleLines: {param2: string|undefined} = {param2: 'param2'};

  twoParams:
      {param3: string|undefined,
       param4: string|undefined} = {param3: 'param3', param4: 'param4'};

  /**
   * My special number.
   */
  private privateConstParam: number = 3;
  constructor() {}
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

Promise.resolve().then(
    /** before `() =>` but after `.then(` */
    () => {
      a();
    });

Promise.resolve()
    .then(() => 'a')
    .then(  // on the same line as `.then(() => 'b');`
        () => 'b');

if (true) {
  if (true) {
    if (true) {
    }
  }
}
//  on the same line as innermost }
//  on the same line as the middle }
//  on the same line as the outermost }

// ob1 comment
const ob1 = {
  a: 'a',  // on the same line as `a: 'a'`
  b: 'b',  /* on the same line as `b: 'b'` */
  // on the line after `b: 'b'`
  c: 'c',  // on the same line as `c: 'c'`
  // on the line after `c: 'c'`
  d: [
    1,  // one the same line as `1,`
    2,
    3
  ],  // one the same line as `3,`
  // on the line after `3,`
  e: new RegExp('pattern', 'g')
};
// on the same line as `'g'` in the RegExp constructor

function f1() {}
// no blank line separating
function f2() {}
// no blank line separating
let x1;
// no blank line separating
let x2;

function f3() {}
// one blank line separating

function f4() {}
// two blank lines separating


let x3;
// three blank lines separating



let x4;

let p;
// no space before comment
let q;
// one space before comment
let r;
// two spaces before comment
