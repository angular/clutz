export function aFunction() {}

export class ImportedClass {
  static NotProvidedSubclass: any;
}

export class ProvidedSubclass {}

ImportedClass.NotProvidedSubclass = class {};
