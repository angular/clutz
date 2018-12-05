declare namespace ಠ_ಠ.clutz.static_this_templated_prop {
  /**
   * Some container to hold the static property.
   */
  class SomeContainer {
    private noStructuralTyping_: any;
    static nestedClass < SCOPE > (this : SCOPE ) : void ;
  }
}
declare module 'goog:static_this_templated_prop' {
  import static_this_templated_prop = ಠ_ಠ.clutz.static_this_templated_prop;
  export = static_this_templated_prop;
}
