import SomeEnum from 'goog:some.SomeEnum';

const v: SomeEnum = SomeEnum.A;

function exhaustive(v: SomeEnum) {
  switch (v) {
    case SomeEnum.A:
    case SomeEnum.B:
      break;

    default:
      neverSayNever(v);
  }
}

function neverSayNever(never: never): never {
  return never;
}
