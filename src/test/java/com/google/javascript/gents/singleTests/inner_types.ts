
export class MyClass {
  /** @export type property*/
  type: InnerTypedefWithAssignment;

  /**
   * Constructor for MyClass
   */
  constructor(data: {type: InnerTypedefWithAssignment}) {
    this.type = data.type;
  }

  /**
   * equal function
   * @export
   */
  equals(otherData: MyClass): boolean {
    return this.type.a === otherData.type.a;
  }
}

export interface InnerTypedefWithAssignment {
  a: number;
  b: number;
}

export interface InnerTypedef { a: number; }

export interface InnerTypedefWithNestedTypes {
  a: {b: {c: number}};
  d: string;
  e: (p1: string, p2: number) => number;
}
type Typedef = {
  a: {b: {c: number}}
};
