let nop: Function = function() {};
let foo: Function = function(a, b, c) {
  return a + b + c;
};
let inferRetAny: () => any = function() {};
let typedRetVoid: () => void = function() {};
let basicParams: (p1: number, p2: string) => number = function(n, s) {
  return n;
};
let optParams: (p1: number, p2?: string, p3?: boolean) =>
    any = function(n, s, b) {};
let restParams: (p1: number, ...p2) => any = function(n, r) {};
let restParamsTyped: (p1: number, ...p2: boolean[]) => any = function(n, br) {};
let complex: (p1: number, p2?: boolean, ...p3) => number = function(n, o, r) {
  return n;
};
