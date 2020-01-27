goog.module('gents.object_map');

/** @type {Object<string, number>} */
var map1 = {};

/** @type {Object<number, string>} */
var map2 = {1: 'foo'};

/** @type {Object<number, string|number>} */
var map3 = {1: 'foo', 2: 2, 3: 'bar'};

/** @type {Object<string, Object<number, number>>} */
var map4 = {'foo': {1: 1}};

exports = {map1, map2, map3, map4};
