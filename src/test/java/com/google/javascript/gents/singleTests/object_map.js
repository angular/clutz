goog.module('gents.object_map');

/** @type {Object<string, number>} */
var map1 = {};

/** @type {Object<number, string>} */
var map2 = {1: 'foo'};

/** @type {Object<number, string|number>} */
var map3 = {1: 'foo', 2: 2, 3: 'bar'};

/** @type {Object<string, Object<number, number>>} */
var map4 = {'foo': {1: 1}};

/** @enum {string} */
let StrEnum = {A: 'a', B: 'b'};

/** @type {Object<StrEnum, string>} */
const map5 = {};
map5[StrEnum.A] = 'foo';

/** @enum */
let E = {A: 0, B: 1};

/** @type {Object<E, string>} */
const map6 = {};
map6[E.A] = 'foo';

exports = {
  map1,
  map2,
  map3,
  map4,
  map5,
  map6,
  StrEnum,
  E
};
