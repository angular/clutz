goog.module('map_entries.Map');

/** @constructor @template K, V */
const Map = function() {};

/**
 * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
 * @return {!IteratorIterable<!Array<K|V>>} The iterator-iterable.
 */
Map.prototype.entries = function() {};

exports = Map;
