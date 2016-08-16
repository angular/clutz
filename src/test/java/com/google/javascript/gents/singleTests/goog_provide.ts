export class B {
  n: number;
  constructor(n: number) { this.n = n; }
}
// Aggressively export rather than create static methods/fields
export function foo(): number {
  return 4;
}
export const num: number = 8;
export class C {
  constructor() {}
}
export function bar(): boolean {
  return false;
}
