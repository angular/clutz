/**
 * This is testing that the keywords private/static/abstract/async are in an
 * acceptable to TS order.
 */
export abstract class C {
  protected abstract async f(): Promise<void>;

  private async g(): Promise<void> {}

  protected static async h() {}
}
