// export_mixed_default_namespaces_keep.js exports 2 different namespaces
// non_default.Nums isn't a default export, but default_export.Enum is
goog.provide('non_default.Nums');
non_default.Nums.One = 1;

non_default.Nums.Two = 2;

goog.provide('default_export.Enum');
/** @enum{number} */
default_export.Enum = {
    A: 0,
    B: 1,
    C: 2,
};
