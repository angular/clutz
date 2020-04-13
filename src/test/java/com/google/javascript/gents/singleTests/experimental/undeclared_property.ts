export class Bar {
  undeclaredProperty: any;

  baz() {
    Promise.resolve().then(goog.bind(function(names) {
      this.undeclaredProperty = {};
    }, this));
  }
}
