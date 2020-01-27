// Optional Parameters
export const optParams = function(n: number, s?: string, b?: boolean) {};

// Variadic parameters
export const restParams = function(n: number, ...r: any[]) {};

export const restParamsTyped = function(n: number, ...br: boolean[]) {};

export const complex = function(n: number, o?: boolean, ...r: any[]): number {
  return n;
};
