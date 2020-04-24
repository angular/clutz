export {
  // gents: force this file to be an ES6 module (no imports or exports)
};

console.log('为什么这个不好');
console.log('\u4e3a\u4ec0\u4e48\u8fd9\u4e2a\u4e0d\u597d');

console.log('חנות ממתקים');
console.log('\u05d7\u05e0\u05d5\u05ea \u05de\u05de\u05ea\u05e7\u05d9\u05dd');

console.log('为什么这个不好');
console.log('\u4e3a\u4ec0\u4e48\u8fd9\u4e2a\u4e0d\u597d');

console.log(`\u4e3a\u4ec0\u4e48\u8fd9\u4e2a\u4e0d\u597d`);
console.log(`\u4e3a\u4ec0\u4e48\u8fd9\u4e2a\u4e0d\u597d`);

// This test illustrates Gents' current behavior.  Note that unicode characters
// in literal strings are not preserved.  Also, the code in the string is not
// emitted as `name as string`.
const name = 'Someone';
console.log(`\u4f60\u597d${name}`);