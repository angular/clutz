let nop = function() {};

// Function params
let oneParam = function(n: number) {};

function twoParams(b: boolean, s: string) {}

function withDefaultValue(list: any[] = []) {}

function undefinedDefault(a: boolean|undefined = undefined) {}

function undefinedDefaultArray(list: any[]|undefined = undefined) {}

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
const arrowWithJsDoc = (a: number): number => {
  return a;
};
const arrowWithJsDocAndParens = (a: number): number => {
  return a;
};
const arrowWithJsDocMultiArg = (a: number, b: number): number => {
  return a;
};
const arrowNoJsDoc = (a) => {
  return a;
};
const implicitReturnArrow = (a) => a;

// Argument descructuring
// TODO(b/142972217): Add more tests, e.g. with default parameters
// TODO(b/142972217): Fix, this should output
// `function namedParams({a}: {a: number}) {}`
/**
 * @param {{
 *   a: number,
 * }} params
 */
function namedParams({a}) {}
