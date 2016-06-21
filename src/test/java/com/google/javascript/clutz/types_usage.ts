import * as t from 'goog:types';
t.functionAndUnion(1, "something");

function thing({a, b}: {a: string, b: number}) {
  console.log(a, 1 + b);
}
thing(t.recordType);

let arr: any[] = t.f;
