
class C {
  private a: number;
  private b: number;
  private c: number;

  /**
   * @param c with default
   */
  constructor({a}, {b} = {b: 1}, c = 0, private d: number) {
    this.a = a;
    this.b = b;
    //!! Due to a closure bug this one stays behind even though it is possible
    //!! to write it in shorthand form.
    //!! Note: Tslint fix pass will pick it up.
    this.c = c;
  }
}
