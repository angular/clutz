declare namespace ಠ_ಠ.clutz.sim_nested {
  class Child extends Child_Instance {
  }
  class Child_Instance extends ಠ_ಠ.clutz.sim_nested.Parent_Instance {
  }
}
declare namespace ಠ_ಠ.clutz.sim_nested.Child {
  enum Nested {
    B = 12.0 ,
  }
}
declare module 'goog:sim_nested.Child' {
  import Child = ಠ_ಠ.clutz.sim_nested.Child;
  export default Child;
}
declare namespace ಠ_ಠ.clutz.sim_nested.Child {
  enum NestedAndProvided {
    B = 12.0 ,
  }
}
declare module 'goog:sim_nested.Child.NestedAndProvided' {
  import NestedAndProvided = ಠ_ಠ.clutz.sim_nested.Child.NestedAndProvided;
  export default NestedAndProvided;
}
declare namespace ಠ_ಠ.clutz.sim_nested {
  class Parent extends Parent_Instance {
  }
  class Parent_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.sim_nested.Parent {
  enum Nested {
    A = 'a' ,
  }
}
declare module 'goog:sim_nested.Parent' {
  import Parent = ಠ_ಠ.clutz.sim_nested.Parent;
  export default Parent;
}
declare namespace ಠ_ಠ.clutz.sim_nested.Parent {
  enum NestedAndProvided {
    A = 'a' ,
  }
}
declare module 'goog:sim_nested.Parent.NestedAndProvided' {
  import NestedAndProvided = ಠ_ಠ.clutz.sim_nested.Parent.NestedAndProvided;
  export default NestedAndProvided;
}
