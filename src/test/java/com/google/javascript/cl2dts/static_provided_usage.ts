import aFunction from 'goog:a.b.StaticHolder.aFunction';
import StaticHolder from 'goog:a.b.StaticHolder';

// these are both calling same symbol
var b: boolean = aFunction();
b = StaticHolder.aFunction();
