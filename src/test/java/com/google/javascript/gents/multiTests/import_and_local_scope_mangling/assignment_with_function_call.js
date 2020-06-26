/**
 * @fileoverview Given some file in Closure JavaScript, if that file:
 *  - Has a dependency with a default export,
 *  - Imports that default export into a constant,
 *  - Declares a constant in a different scope with the same name,
 *
 * Gents will not mangle the later constant declaration.
 */

goog.module('anything');

const collidingName = goog.require('defaultexport');

function whatever() {
  const collidingName = 'whatever';
}

function whatever2() {
  let collidingName = 'whatever';
}

function whatever3() {
  var collidingName = 'whatever';
}
