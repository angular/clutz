declare namespace ಠ_ಠ.clutz.package_visible_class {
  //!! This fails because the declaration below is only a value, not a type.
  type Class < PARAM > = ಠ_ಠ.clutz.module$contents$package_visible_class$Class_Class < PARAM > ;
  let Class : typeof ಠ_ಠ.clutz.module$contents$package_visible_class$Class_Class ;
}
declare module 'goog:package_visible_class.Class' {
  import Class = ಠ_ಠ.clutz.package_visible_class.Class;
  export default Class;
}
declare namespace ಠ_ಠ.clutz {
  let module$contents$package_visible_class$Class_Class : PrivateType;
}
