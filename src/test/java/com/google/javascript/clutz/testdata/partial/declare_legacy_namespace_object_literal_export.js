goog.module("object.literal.exports");
goog.module.declareLegacyNamespace();

class Class1 {}

class Class2 {}

exports = {
  Class1,
  RenamedClass2: Class2,
  //!! Inline expressions won't show up in the declareLegacyNamespace, since it
  //!! doesn't have a predictable name
  aFunction: function () {},
  aConstant: 2 + 2
};