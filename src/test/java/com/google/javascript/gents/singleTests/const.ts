const a = 1;
const b: number = 2;
const c = 3;

function foo() {}

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

function bar(n: number): number {
  return n;
}
