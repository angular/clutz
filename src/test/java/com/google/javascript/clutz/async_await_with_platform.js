goog.module('asyncawait');

class C {
  async foo() {}
  async bar() {
    const x = await this.foo();
  }
}

exports = C;
