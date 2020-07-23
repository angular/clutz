export const map1: {[key: string]: number} = {};

export const map2: {[key: number]: string} = {
  1: 'foo'
};

export const map3: {[key: number]: string|number} = {
  1: 'foo',
  2: 2,
  3: 'bar'
};

export const map4: {[key: string]: {[key: number]: number}} = {
  'foo': {1: 1}
};

export enum StrEnum {
  A = 'a',
  B = 'b'
}

export const map5: {[key: string]: string} = {};
map5[StrEnum.A] = 'foo';

export enum E {
  A,
  B
}

export const map6: {[key: string]: string} = {};
map6[E.A] = 'foo';
