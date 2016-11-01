let nop = function() {};

// Function params
let oneParam = function(n: number) {};

function twoParams(b: boolean, s: string) {}

// Function returns
let anyReturn = function(): any {
  return 'hello';
};

function typedReturn(): number {
  return 4;
}
let partiallyTyped = function(n: number, u1, b: boolean, u2) {};

// Both params and returns
let complex = function(b: boolean, s: string, x: any): string {
  if (b) {
    return s;
  }
};

// Undefined params
let paramUndef = function(u: undefined, v: undefined) {};

// Void returns
let retVoid = function(): void {};
let retUndef = function(): void {};
const arrowWithJsDoc = (a: number): number => {
  return a;
};
const arrowNoJsDoc = (a) => {
  return a;
};
const implicitReturnArrow = (a) => a;
