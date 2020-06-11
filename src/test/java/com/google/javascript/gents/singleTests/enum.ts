enum NumEnumNoExport {
  A,
  B = 1000
}

/**
 * A non-trivial comment.
 */
export enum NumEnum {
  C,
  D = 1000
}

export enum NonConseqNumEnum {
  // Comment A
  A,
  B = 2,
  // Comment C
  C,
  D = -2,
  E
}

export enum RepeatedNumEnum {
  A,
  B = 0,
  C = 2,
  D = 2
}

export enum EnumWithArithmetics {
  A = 10 * 10 + 2,
  B = 2
}

/** My useful comment */
export enum StrEnum {
  A = 'foo',
  B = 'bar'
}

export const OtherEnum = {
  A: {a: 0},
  B: {a: 1}
};

export class C {
  static InnerEnum = {A: 0, B: 1};
}

// This cannot be easily converted without structurally changing the code.
// TypeScript does not support inner enums. The enum and the class have to be
// module level siblings, which would lead to having to rewrite all references
// too.
