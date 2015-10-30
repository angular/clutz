import StaticHolder from 'goog:a.b.StaticHolder';
// goog:a.b.StaticHolder.aFunction cannot be required, because it is not provided
var b: boolean = StaticHolder.aFunction();
