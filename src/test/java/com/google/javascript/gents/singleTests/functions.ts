let nop = function() {};

// Function params
let oneParam = function(n: number) {};

function twoParams(b: boolean, s: string) {}

function withDefaultValue(list: any[] = []) {}

// Function returns
let anyReturn = function(): any {
  return 'hello';
};

function typedReturn(): number {
  return 4;
}
let partiallyTyped = function(n: number, u1, b: boolean, u2) {};

// Both params and returns
let complex = function(b: boolean, s: string, x: any): string|null {
  if (b) {
    return s;
  }
  return null;
};

// Undefined params
let paramUndef = function(u: undefined, v: undefined) {};

// Void returns
let retVoid = function(): void {};
let retUndef = function(): void {};

// These tests are disabled, because they are broken by recent Closure change.
// See https://github.com/angular/clutz/issues/853
// const arrowWithJsDoc = a => { return a; };

// const arrowWithJsDocAndParens = (a) => { return a; };
const arrowWithJsDocMultiArg = (a: number, b: number): number => {
  return a;
};
const arrowNoJsDoc = a => {
  return a;
};
const implicitReturnArrow = a => a;
