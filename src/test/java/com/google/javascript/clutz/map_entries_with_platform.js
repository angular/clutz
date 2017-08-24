goog.provide('map_entries.Map');

/** @constructor @template K, V */
map_entries.Map = function() {};

/**
 * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
 * @return {!IteratorIterable<!Array<K|V>>} The iterator-iterable.
 */
map_entries.Map.prototype.entries = function() {};
