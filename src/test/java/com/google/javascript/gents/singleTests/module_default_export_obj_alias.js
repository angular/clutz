goog.module('mod.default.export.obj.alias');

class C {}

class D {}

exports = {
  C,
  AliasOfC: C,
  AnotherAliasOfC: C,
  AliasOfD: D,
};
