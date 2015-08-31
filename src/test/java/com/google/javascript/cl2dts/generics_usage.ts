/// <reference path="./generics"/>
import {Foo, fooMissingAllTypeParams, identity, ExtendGenericInterface} from 'goog:generics';

var f = new Foo<string, string>();
f.set("thing");
var s: string = identity(f.get());
f.loop<number, number>("thing", 123);
f = fooMissingAllTypeParams;

class Test implements ExtendGenericInterface<string> {}
