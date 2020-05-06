// Non-nullable types
// We ignore the non-nullability as we transpile to TS with --strictNullChecks
let n: number = 5;

export const foo = function(s: string): boolean {
  return true;
};

// Nullable types
let niln: number|null = null;

export const bar = function(s: string|null): boolean|null {
  return null;
};

// Union types
let sn: string|number = 9;

let snb: string|number|null|boolean = false;

let manyNulls: string|null|number|string|null = null;

export const baz = function(s: number|string|null): null|boolean {
  return null;
};
