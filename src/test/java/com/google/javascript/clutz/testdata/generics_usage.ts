import {Foo, fooMissingAllTypeParams, identity, ExtendGenericInterface, ImplementsGenericInterface, GenericInterface, ExtendsGenericClass, DoesNotUseType} from 'goog:generics';

var f = new Foo<string, string>(1);
f.set("thing");
var s: string = identity(f.get());
f.loop<number, number>("thing", 123);
f = fooMissingAllTypeParams;

class Test implements ExtendGenericInterface<string> {}

var i: GenericInterface<string> = new ImplementsGenericInterface<string>();

var i2: GenericInterface<string> = new ExtendsGenericClass<string>();

/**
 * Test that the correct overloads are chosen when using a generic type that
 * doesn't use the generic type in its fields, e.g. an EventType.  Structural
 * matching would select the first matching overload regardless of the generic
 * type.
 */
class TestOverloads {
  public frobbers: Map<DoesNotUseType<any>, Function> = new Map();
  addFrobber(tag: DoesNotUseType<number>, func: (arg: number) => void): void;
  addFrobber(tag: DoesNotUseType<string>, func: (arg: string) => void): void;
  addFrobber(tag: any, func: Function): void { this.frobbers.set(tag, func); }

  frob<T>(type: DoesNotUseType<T>, val: T) {
    const frobber = this.frobbers.get(type);
    if (frobber) frobber(val);
  }
}

const overloads = new TestOverloads();
const numType = new DoesNotUseType<number>('number');
const strType = new DoesNotUseType<string>('string');
overloads.addFrobber(numType, (x) => { console.log(`${x - 1}`); });
// Compilation error if structural matching were allowed on DoesNotUseType.
overloads.addFrobber(strType, (x) => { console.log(`${x.trim()}`); });
overloads.frob(numType, 4);
overloads.frob(strType, '  wat');
