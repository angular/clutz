/** a constant num */
export const a = 1;
/**
 * a function that does something
 */
export function s(a: number, b: string) {}


/** a complicated constant */
export const x = 5 + 5 / 10 * 4;

/**
 * A complicated string
 */
export const abc_def: string = isFinite(Infinity) ? 'finite' : 'infinite';


/**
 * Function that does something
 */
export function fn(a: number|undefined) {}


/**
 * This function sums two numbers.
 * @param a first number to sum
 * @param b second number to sum
 * @return summed numbers
 */
export function sum(a: number, b: number): number {
  return a + b;
}

/** NB: This is translated incorrectly, as `this.a` no longer exists. */
export function bad() {
  // @ts-ignore `this.a` is implicitly `any`
  return this.a;
}
