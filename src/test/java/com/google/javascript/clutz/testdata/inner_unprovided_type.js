goog.provide('ns');

/**
 * Using the inner typedef to make sure that two different passes don't
 * emit it.
 * @returns {ns.f.Inner}
 */
ns.f = function() {};


/**
 * @typedef {{
 *   a: number
 * }}
 */
ns.f.Inner;
