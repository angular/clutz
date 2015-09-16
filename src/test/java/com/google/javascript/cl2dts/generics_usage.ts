/// <reference path="./generics"/>
import {Foo, fooMissingAllTypeParams, identity, ExtendGenericInterface, ImplementsGenericInterface, GenericInterface, ExtendsGenericClass} from 'goog:generics';

var f = new Foo<string, string>(1);
f.set("thing");
var s: string = identity(f.get());
f.loop<number, number>("thing", 123);
f = fooMissingAllTypeParams;

class Test implements ExtendGenericInterface<string> {}

var i: GenericInterface<string> = new ImplementsGenericInterface<string>();

var i2: GenericInterface<string> = new ExtendsGenericClass<string>(0);
