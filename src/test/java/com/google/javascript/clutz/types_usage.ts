import * as t from 'goog:types';

function thing({a, b}: {a: string, b: number}) {
  console.log(a, 1 + b);
}

function thingMaybe({a, optional}: {a: string, optional?: string}) {
  console.log(a, optional);
}

thing(t.recordType);
thingMaybe(t.recordTypeOptional);

const arr: Array<() => string>|null = t.f;
