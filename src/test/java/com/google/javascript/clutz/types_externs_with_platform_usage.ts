import {elementMaybe, Error} from 'goog:typesWithExterns';

//!! TS Element disagrees with Closure's Element because of missing msContentZoomFactor field.
var el: Element = <any> (elementMaybe());
var myError: Error = new Error();
