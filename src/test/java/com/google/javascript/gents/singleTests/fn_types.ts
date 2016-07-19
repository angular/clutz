var nop: Function = function() {
};
var foo: Function = function(a, b, c) {
  return a + b + c;
};
var inferRetAny: () => any = function() {
};
var typedRetVoid: () => void = function() {
};
var basicParams: (p1: number, p2: string) => number = function(n, s) {
  return n;
};
var optParams: (p1: number, p2?: string, p3?: boolean) => any = function(n, s, b) {
};
var restParams: (p1: number, ...p2) => any = function(n, r) {
};
var restParamsTyped: (p1: number, ...p2: boolean[]) => any = function(n, br) {
};
var complex: (p1: number, p2?: boolean, ...p3) => number = function(n, o, r) {
  return n;
};
