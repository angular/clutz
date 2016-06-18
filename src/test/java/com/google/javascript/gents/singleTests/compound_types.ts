var n: number = 5;
var foo = function(s: string): boolean {
  return true;
};
var niln: null | number = null;
var bar = function(s: null | string): null | boolean {
  return null;
};
var sn: string | number = 9;
var snb: string | null | number | boolean = false;
var manyNulls: null | string | number | string = null;
var baz = function(s: number | null | string): null | boolean {
  return null;
};
