import Enum from 'goog:nested.baz.Enum';
import HahaEnum from 'goog:nested.bar.HahaEnum';

var a: Enum = Enum.A;
var a2: HahaEnum = HahaEnum.A;
// Because the two enums are just type aliases of the same underlying type, they are assignable to
// each other. This matches Closure's semantics.
a = a2;
