
export const a = 1;

export const b: number = 2;

export const c = 3;

export function foo() {}

class A {
  y: Object;
  x: any;
  constructor() {
    this.x = function() {
      console.log('before');
      console.log('after');
    };
  }
}

export function bar(n: number): number {
  return n;
}
