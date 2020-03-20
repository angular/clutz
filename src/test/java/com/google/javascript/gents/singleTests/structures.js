goog.module('gents.structures');

// eventual test to ensure
//   if(){...}else if (...){...}
// does not get translated to
//   if(){...}else{if(...){...}}
if (true) {
} else if (true) {
}
