import {DictClass, ClassWithDottedProperties} from 'goog:dict';

var d = new DictClass('123');
var s: string = d['thing'];

var c = new ClassWithDottedProperties();
var n: number = c.foo;
n = c['foo'];
