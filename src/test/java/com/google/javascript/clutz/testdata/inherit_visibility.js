goog.module('inherit_visibility');

/** @constructor */
function Parent() {}

Parent.prototype.publicImplicit = function() {};
/** @public */
Parent.prototype.publicExplicit = function() {};
/** @protected */
Parent.prototype.protected = function() {};
/** @protected */
Parent.prototype.protectedNoJSDoc = function() {};

/** @constructor @extends {Parent} */
function Child() {}

/** @override */
Child.prototype.publicImplicit = function() {};
/** @override */
Child.prototype.publicExplicit = function() {};
/** @override */
Child.prototype.protected = function() {};
Child.prototype.protectedNoJSDoc = function() {};

/** @constructor @extends {Child} */
function GrandChild() {}

// In Closure, a child class can override an implicit public property with protected.
/** @override @protected */
GrandChild.prototype.publicImplicit = function() {};
/** @override */
GrandChild.prototype.publicExplicit = function() {};
/** @override */
GrandChild.prototype.protected = function() {};
GrandChild.prototype.protectedNoJSDoc = function() {};

exports.Parent = Parent;
exports.Child = Child;
exports.GrandChild = GrandChild;
