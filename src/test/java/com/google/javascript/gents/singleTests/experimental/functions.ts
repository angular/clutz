// TODO(b/142972217): Add more tests, e.g. with default parameters, aliasing,
// and multiline blocks.

export const nop = function() {};

// Function params
export const oneParam = function(n: number) {};

export function twoParams(b: boolean, s: string) {}

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

function typedReturnTwo(): Promise<number> {
  return Promise.resolve(4);
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

let retUndefTwo = function(): void {
  return undefined;
};

let retUndefThree = async function(): Promise<void> {
  return undefined;
};

let retUndefFour = async function(): Promise<void> {
  return undefined;
};

let retUndefFive = async function(): Promise<void> {};

let retUndefSix = async function(): Promise<any> {};

let retMaybeNumber = async function(): Promise<number|null> {
  return 0;
};

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
export function namedParams({a}: {a: number}) {}

export function namedParamsMultiLine({a}: {a: number}) {}

export function namedParamsWithDefaultValues({a = 1} = {}) {}
