declare namespace ಠ_ಠ.clutz {
  class module$exports$sim_nested$Child extends module$exports$sim_nested$Child_Instance {
  }
  class module$exports$sim_nested$Child_Instance extends ಠ_ಠ.clutz.module$exports$sim_nested$Parent_Instance {
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested {
  export import Child = ಠ_ಠ.clutz.module$exports$sim_nested$Child;
}
declare namespace ಠ_ಠ.clutz {
  enum module$exports$sim_nested$Child$Nested {
    B ,
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested.Child {
  export import Nested = ಠ_ಠ.clutz.module$exports$sim_nested$Child$Nested;
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested$Child {
  export import Nested = ಠ_ಠ.clutz.module$exports$sim_nested$Child$Nested;
}
declare module 'goog:sim_nested.Child' {
  import alias = ಠ_ಠ.clutz.module$exports$sim_nested$Child;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  enum module$exports$sim_nested$Child$NestedAndProvided {
    B ,
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested.Child {
  export import NestedAndProvided = ಠ_ಠ.clutz.module$exports$sim_nested$Child$NestedAndProvided;
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested$Child {
  export import NestedAndProvided = ಠ_ಠ.clutz.module$exports$sim_nested$Child$NestedAndProvided;
}
declare module 'goog:sim_nested.Child.NestedAndProvided' {
  import alias = ಠ_ಠ.clutz.module$exports$sim_nested$Child$NestedAndProvided;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$sim_nested$Parent extends module$exports$sim_nested$Parent_Instance {
  }
  class module$exports$sim_nested$Parent_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested {
  export import Parent = ಠ_ಠ.clutz.module$exports$sim_nested$Parent;
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$sim_nested$Parent$Nested = string &{clutzEnumBrand: never} ;
  var module$exports$sim_nested$Parent$Nested : {
    A : module$exports$sim_nested$Parent$Nested ,
  };
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested.Parent {
  export import Nested = ಠ_ಠ.clutz.module$exports$sim_nested$Parent$Nested;
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested$Parent {
  export import Nested = ಠ_ಠ.clutz.module$exports$sim_nested$Parent$Nested;
}
declare module 'goog:sim_nested.Parent' {
  import alias = ಠ_ಠ.clutz.module$exports$sim_nested$Parent;
  export default alias;
}
declare namespace ಠ_ಠ.clutz {
  type module$exports$sim_nested$Parent$NestedAndProvided = string &{clutzEnumBrand: never} ;
  var module$exports$sim_nested$Parent$NestedAndProvided : {
    A : module$exports$sim_nested$Parent$NestedAndProvided ,
  };
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested.Parent {
  export import NestedAndProvided = ಠ_ಠ.clutz.module$exports$sim_nested$Parent$NestedAndProvided;
}
declare namespace ಠ_ಠ.clutz.module$exports$sim_nested$Parent {
  export import NestedAndProvided = ಠ_ಠ.clutz.module$exports$sim_nested$Parent$NestedAndProvided;
}
declare module 'goog:sim_nested.Parent.NestedAndProvided' {
  import alias = ಠ_ಠ.clutz.module$exports$sim_nested$Parent$NestedAndProvided;
  export default alias;
}
