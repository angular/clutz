goog.module('odd.npe.typedef');

class C {
    //!! The generics are significant here. Usually closure inlines typedefs by the time
    //!! clutz see them. But because of the missing type, closure only resolves ATypeDef
    //!! to modules$contents$...$ATypeDef but doesn't inline.
    /**
     * @return {!some.type<!ATypeDef>}
     */
    foo() {}
}

/** @typedef {{
 *   a: string,
 * }}
 */
let ATypeDef;

exports = C;