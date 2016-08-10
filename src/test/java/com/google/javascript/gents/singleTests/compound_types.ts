let n: number = 5;
let foo = function(s: string): boolean {
  return true;
};
let niln: null | number = null;
let bar = function(s: null | string): null | boolean {
  return null;
};
let sn: string | number = 9;
let snb: string | null | number | boolean = false;
let manyNulls: null | string | number | string = null;
let baz = function(s: number | null | string): null | boolean {
  return null;
};
