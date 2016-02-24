import * as names from "goog:invalid.names";

// The invalid symbol object can only be accessed through an index operator.
// To avoid noImplicitAny errors we need to explicitly type <any>.
var fn: () => void = (<any> names)['0'];
fn();