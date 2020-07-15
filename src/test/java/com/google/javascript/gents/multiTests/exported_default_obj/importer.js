goog.module('default_obj.importer');

const {C} = goog.require('default_obj.exporter');
const {I} = goog.requireType('default_obj.exporter');
const {badPi} = goog.require('default_obj.exporter');

let c = new C();

let badTau = 2 * badPi;
