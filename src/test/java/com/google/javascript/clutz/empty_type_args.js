goog.provide('empty_type_args.X');
goog.provide('empty_type_args.ITemplated');
goog.provide('empty_type_args.NoMoreTemplateArgs');

/**
 * @interface
 * @template T
 */
empty_type_args.ITemplated = function() {};

/**
 * @constructor
 * @implements {empty_type_args.ITemplated<number>}
 */
empty_type_args.NoMoreTemplateArgs = function() {};

/**
 * @constructor
 * @param {empty_type_args.NoMoreTemplateArgs} a
 */
empty_type_args.X = function(a) {};
