///<reference path="./dict"/>
import {DictClass, ClassWithDottedProperties} from 'goog:dict';

var d = new DictClass();
var s: string = d['thing'];

var c = new ClassWithDottedProperties();
var n: number = c.foo;
n = c['foo'];
