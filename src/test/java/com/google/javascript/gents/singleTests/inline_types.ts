
interface Foo {}
let foo: Foo = {};
const x: string = 'fruit';

function f(x: number, z, y: string): string {
  return x + y + ' apples';
}

/**
 * This line says what the function does!
 */
function g(x: number, y: string, z: number): string {
  return x + y + ' apples' + z;
}
