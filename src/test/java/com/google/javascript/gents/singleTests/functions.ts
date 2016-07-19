var nop = function() {
};
var oneParam = function(n: number) {
};
function twoParams(b: boolean, s: string) {
}
var anyReturn = function(): any {
  return "hello";
};
function typedReturn(): number {
  return 4;
}
var partiallyTyped = function(n: number, u1, b: boolean, u2) {
};
var complex = function(b: boolean, s: string, x: any): string {
  if (b) {
    return s;
  }
};
var paramUndef = function(u: undefined, v: undefined) {
};
var retVoid = function(): void {
};
var retUndef = function(): void {
};
