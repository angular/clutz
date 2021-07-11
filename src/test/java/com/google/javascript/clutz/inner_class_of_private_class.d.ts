declare namespace ಠ_ಠ.clutz.ns.inner_class_of_private_class {
  class FooType_ {
    private noStructuralTyping_ns_inner_class_of_private_class_FooType_ : any;
    foo (inner : ಠ_ಠ.clutz.ns.inner_class_of_private_class.FooType_.Inner ) : void ;
  }
}
declare module 'goog:ns.inner_class_of_private_class' {
  import inner_class_of_private_class = ಠ_ಠ.clutz.ns.inner_class_of_private_class;
  export = inner_class_of_private_class;
}
declare namespace ಠ_ಠ.clutz.ns.inner_class_of_private_class {
  let FooInstance : ಠ_ಠ.clutz.ns.inner_class_of_private_class.FooType_ ;
}
declare module 'goog:ns.inner_class_of_private_class.FooInstance' {
  import FooInstance = ಠ_ಠ.clutz.ns.inner_class_of_private_class.FooInstance;
  export default FooInstance;
}
declare namespace ಠ_ಠ.clutz.ns.inner_class_of_private_class.FooType_ {
  class Inner {
    private noStructuralTyping_ns_inner_class_of_private_class_FooType__Inner : any;
  }
}
