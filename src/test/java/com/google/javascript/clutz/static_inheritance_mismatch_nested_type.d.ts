declare namespace ಠ_ಠ.clutz.sim_nested {
  class Child extends ಠ_ಠ.clutz.sim_nested.Parent {
  }
}
declare namespace ಠ_ಠ.clutz.sim_nested.Child {
  type Nested = number ;
  var Nested : {
    B : Nested ,
  } &
  (/* Incompatible inherited static property */ typeof ಠ_ಠ.clutz.sim_nested.Parent.Nested );
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'sim_nested.Child'): typeof ಠ_ಠ.clutz.sim_nested.Child;
}
declare module 'goog:sim_nested.Child' {
  import alias = ಠ_ಠ.clutz.sim_nested.Child;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.sim_nested {
  class Parent {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.sim_nested.Parent {
  type Nested = string ;
  var Nested : {
    A : Nested ,
  };
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'sim_nested.Parent'): typeof ಠ_ಠ.clutz.sim_nested.Parent;
}
declare module 'goog:sim_nested.Parent' {
  import alias = ಠ_ಠ.clutz.sim_nested.Parent;
  export default alias;
}
