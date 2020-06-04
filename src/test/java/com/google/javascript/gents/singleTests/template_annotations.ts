/**
 * @template
 */
export class InvalidAnnotation {}

export class SimpleGenericClass<A_LONG_NAME> {
  getType(x: A_LONG_NAME) {
    return typeof x;
  }
}

class ClassA {}

/**
 * Some comment
 */
export abstract class SingleInheritance<T, K> extends ClassA {}

export class CorrectTemplateVars<SOME_OTHER_NAME, A_LONG_NAME> extends
    SimpleGenericClass<A_LONG_NAME> {}

export class CorrectUseOfConcreteType extends SimpleGenericClass<string> {}

export class CorrectUseOfConcreteCompoundType extends SimpleGenericClass {}

/**
 * TODO(lukemizuhashi): Investigate parent classes and interfaces in G3 ES6
 * annotated with and @template annotations.
 * Also, address @implements annotations.
 *
 */
export interface Interface<VALUE> {}

export abstract class HasGenericMethods {
  genericMethod<T, U>(): void {}

  abstract abstractGenericMethod<T, U>(): void;
}

export function genericFn<T, U>(t: T, u: U): T {
  return t;
}
