goog.module('extern.reexport');

exports.x = someExtern.x;
//!! Deeper extern reexports currently fail with 'any'.
//!! TODO(rado): fix deeper reexports.
exports.y = someExtern.deeper.y;