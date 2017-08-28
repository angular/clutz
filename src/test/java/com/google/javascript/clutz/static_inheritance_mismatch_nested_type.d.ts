declare namespace ಠ_ಠ.clutz.sim_nested {
  class Child extends Child_Instance {
  }
  class Child_Instance extends ಠ_ಠ.clutz.sim_nested.Parent_Instance {
  }
}
declare namespace ಠ_ಠ.clutz.sim_nested.Child {
  type Nested = number ;
  var Nested : {
    B : Nested ,
  };
}
declare module 'goog:sim_nested.Child' {
  import alias = ಠ_ಠ.clutz.sim_nested.Child;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.sim_nested.Child {
  type NestedAndProvided = number ;
  var NestedAndProvided : {
    B : NestedAndProvided ,
  };
}
declare module 'goog:sim_nested.Child.NestedAndProvided' {
  import alias = ಠ_ಠ.clutz.sim_nested.Child.NestedAndProvided;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.sim_nested {
  class Parent extends Parent_Instance {
  }
  class Parent_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.sim_nested.Parent {
  type Nested = string ;
  var Nested : {
    A : Nested ,
  };
}
declare module 'goog:sim_nested.Parent' {
  import alias = ಠ_ಠ.clutz.sim_nested.Parent;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.sim_nested.Parent {
  type NestedAndProvided = string ;
  var NestedAndProvided : {
    A : NestedAndProvided ,
  };
}
declare module 'goog:sim_nested.Parent.NestedAndProvided' {
  import alias = ಠ_ಠ.clutz.sim_nested.Parent.NestedAndProvided;
  export default alias;
}
