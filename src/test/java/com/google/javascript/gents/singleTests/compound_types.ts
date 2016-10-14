
// Non-nullable types
// We ignore the non-nullability as we transpile to TS with --strictNullChecks
let n: number = 5;
let foo = function(s: string): boolean {
  return true;
};

// Nullable types
let niln: null|number = null;
let bar = function(s: null|string): null | boolean {
  return null;
};

// Union types
let sn: string|number = 9;
let snb: string|null|number|boolean = false;
let manyNulls: null|string|number|string = null;
let baz = function(s: number|null|string): null | boolean {
  return null;
};
