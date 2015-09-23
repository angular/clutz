import {elementMaybe, id, Error} from 'goog:typesWithExterns';

var el: Element = elementMaybe();
var els: ArrayLike<any> = id(document.getElementsByClassName('foo'));

var myError: Error = new Error();
