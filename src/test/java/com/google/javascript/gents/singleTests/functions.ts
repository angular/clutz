let nop = function() {
};
let oneParam = function(n: number) {
};
function twoParams(b: boolean, s: string) {
}
let anyReturn = function(): any {
  return "hello";
};
function typedReturn(): number {
  return 4;
}
let partiallyTyped = function(n: number, u1, b: boolean, u2) {
};
let complex = function(b: boolean, s: string, x: any): string {
  if (b) {
    return s;
  }
};
let paramUndef = function(u: undefined, v: undefined) {
};
let retVoid = function(): void {
};
let retUndef = function(): void {
};
