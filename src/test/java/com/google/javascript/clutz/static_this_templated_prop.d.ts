declare namespace ಠ_ಠ.clutz.static_this_templated_prop {
  /**
   * Some container to hold the static property.
   */
  class SomeContainer extends SomeContainer_Instance {
    static nestedClass ( ) : void ;
  }
  class SomeContainer_Instance {
    private noStructuralTyping_: any;
  }
}
declare module 'goog:static_this_templated_prop' {
  import static_this_templated_prop = ಠ_ಠ.clutz.static_this_templated_prop;
  export = static_this_templated_prop;
}
