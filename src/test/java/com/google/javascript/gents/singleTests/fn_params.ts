
// Optional Parameters
let optParams = function(n: number, s?: string, b?: boolean) {};

// Variadic parameters
let restParams = function(n: number, ...r: any[]) {};
let restParamsTyped = function(n: number, ...br: boolean[]) {};
let complex = function(n: number, o?: boolean, ...r: any[]): number {
  return n;
};
