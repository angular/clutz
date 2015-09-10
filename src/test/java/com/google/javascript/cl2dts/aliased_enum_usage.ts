/// <reference path="./aliased_enums"/>
import Enum from 'goog:nested.bar.Enum';
import EnumAlias from 'goog:nested.baz.Enum';

var a: Enum = Enum.A;
var a2: EnumAlias = EnumAlias.A;
// Because the twp enums are just type aliases of the same underlying type, they are assignable to
// each other. This matches Closure's semantics.
a = a2;