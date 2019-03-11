import * as ImportedClassExports from './export';
import {aFunction} from './export';
import {ImportedClass} from './export';
import {ProvidedSubclass} from './export';

let instanceOfAlias = new ImportedClass();
let instanceofProvidedAlias = new ImportedClass.ProvidedSubclass();
let instanceofNotProvidedAlias = new ImportedClass.NotProvidedSubclass();

export class Foo {
  static num: number = 8;

  constructor(public n: number) {}

  static staticFunction(): string {
    return 'this is a static method on Foo, since it is NOT goog.provided';
  }

  instanceMethod() {}
}

export function qux(): string {
  return 'this is directly exported since it is goog.provided';
}

export class Bar {
  instanceFunction(): boolean {
    return false;
  }

  setA(a: number): Bar {
    return this;
  }

  setB(b: number): Bar {
    return this;
  }

  static staticBar(): boolean {
    return false;
  }
}

export const exportedValue = aFunction();
exportedValue.setA(1).setB(2);

export function baz(): boolean {
  return false;
}

export interface InnerTypedef {
  key: number;
  value: string;
}

export interface InnerTypedefWithAssignment {
  key: number;
  value: string;
}
type PrivateTypedef_ = {
  myFunction: (p1: any) => PrivateTypedef_
};
Foo.FruitType = {
  UNKNOWN: 0,
  APPLE: 1,
  ORANGE: 2
};

// Manually export enum keys.
Foo.FruitType['UNKNOWN'] = Foo.Container.UNKNOWN;
Foo.FruitType['APPLE'] = Foo.Container.APPLE;
Foo.FruitType['ORANGE'] = Foo.Container.ORANGE;

// -----------------------------------------------------------------------
const insertGoogScopeContentsAboveMe = true;
