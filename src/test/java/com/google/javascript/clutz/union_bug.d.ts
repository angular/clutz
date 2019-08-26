declare namespace ಠ_ಠ.clutz.module$exports$union$collapse {
  type A = { b ? : string , type : string } ;
  type B = { a ? : string , type : string } ;
  //!! This should A | B, but they are collapsed because only
  //!! optional fields differ.
  //!! Unfortunately, that has implications to TS because one cannot assign
  //!! object literals with unknown fields to this type.
  //!! After collapse {b: 'foo', type: 'B'} is not assignable to 'u', because
  //!! "b" is an unknown field.
  type Top = { u : ಠ_ಠ.clutz.module$exports$union$collapse.A } ;
  type U = ಠ_ಠ.clutz.module$exports$union$collapse.A ;
}
declare module 'goog:union.collapse' {
  import collapse = ಠ_ಠ.clutz.module$exports$union$collapse;
  export = collapse;
}
