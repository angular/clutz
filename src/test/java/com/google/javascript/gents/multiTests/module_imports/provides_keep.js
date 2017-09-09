goog.provide('provides');

// This fails to be required at all. It adds "ERROR - Module provides.foobar does not exist."
provides.foobar = function() {}
