import {elementMaybe, id} from 'goog:typesWithExterns';

var el: Element = elementMaybe();
var els: ArrayLike<any> = id(document.getElementsByClassName('foo'));
