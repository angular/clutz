
/**
 * A non-trivial comment.
 * @enum {number}
 */
export enum NumEnum {
  A,
  B
}

/** @enum {number} */
export enum NonConseqNumEnum {
  A,
  B = 2,
  C,
  D = -2,
  E
}

/** @enum {number} */
export enum RepeatedNumEnum {
  A,
  B = 0,
  C = 2,
  D = 2
}

/** @enum {number} */
export enum EnumWithArithmetics {
  A = 10 * 10 + 2,
  B = 2
}

/** @enum {string} */
export enum StrEnum {
  A = 'foo',
  B = 'bar'
}

/** @enum {{a: number}} */
export const OtherEnum = {
  A: {a: 0},
  B: {a: 1}
};

export class C {}
