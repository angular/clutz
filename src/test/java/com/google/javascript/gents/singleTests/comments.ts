/**
 * This comment describes a class
 */
class A {
  // This comment is moved with the method
  /* This one too (same comment block) */
  foo() {}
}
/**
 * This is a floating comment block
 * It stays together with anything not separated by an empty line
 */
/* Still the same block */
// Yup
// Here too

/**
 * @param notdeleted because this has a description
 * @return this also has a description
 */
// This is just some extra stuff
let foo = function(deleted: number, notdeleted: number): number {
  return deleted + notdeleted;
};
// The following comment should be entirely deleted
const x;
/** @export */
let m: number = 4;
