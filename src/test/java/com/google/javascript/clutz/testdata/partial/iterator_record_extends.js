goog.module('record.extending');

//!! This test checks that we do not accidentally add an [Symbol.iterator()]
//!! property on the record or interface.
/**
 * @record
 * @extends {MissingBaseR}
 */
var AnExtendingRecord = function() {};

/**
 * @interface
 * @extends {MissingBaseI}
 */
var AnExtendingInterface = function() {};

exports.AnExtendingRecord = AnExtendingRecord;
exports.AnExtendingInterface = AnExtendingInterface;