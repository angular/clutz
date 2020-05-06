// 'Function' type
let nop: Function = function() {};

let foo: Function = function(a, b, c) {
  return a + b + c;
};

// Infers return type as 'any' by default
let inferRetAny: () => any = function() {};

let typedRetVoid: () => void = function() {};

// Normal Parameters
let basicParams: (p1: number, p2: string) => number = function(n, s) {
  return n;
};

// Optional Parameters
let optParams: (p1: number, p2?: string, p3?: boolean) =>
    any = function(n, s, b) {};

// Variadic parameters
let restParams: (p1: number, ...p2) => any = function(n, r) {};

let restParamsTyped: (p1: number, ...p2: boolean[]) => any = function(n, br) {};

function complex(n: number, o?: boolean, ...r: any[]): number {
  return n;
}

export const f1: (() => string)|null = null;

export const f2: (() => any)|string = 'string';

export const f3: (() => string)|(() => string) = function() {
  return 'string';
};

export function f4(): string|(() => string) {
  return 'string';
}
