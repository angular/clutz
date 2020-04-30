/**
 * Comment
 */
type MyString = string;

interface MyInterface {
  x: string;
  y: number;
}
export interface MyExportedInterface {
  x: string;
  y: number;
}
const x: MyString = 'x';

/**
 * This is a comment. It should not go away. It should stay here.
 *   So should this line of overflow text.
 *
 */
export interface TypeDefWithComment {
  a: string;
  b: string;
}

interface TypeDefWithTypeMissing {
  key1: string;
  key2: any;
  key3: number;
}