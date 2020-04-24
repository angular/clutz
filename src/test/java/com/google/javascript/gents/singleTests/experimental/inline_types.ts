
export interface Foo {}

let foo: Foo = {};

const x: string = 'fruit';

export function f(x: number, z, y: string): string {
  return x + y + ' apples';
}

/**
 * This line says what the function does!
 */
export function g
    /** string */
    (x: number, y: string, z: number): string {
  return x + y + ' apples' + z;
}
