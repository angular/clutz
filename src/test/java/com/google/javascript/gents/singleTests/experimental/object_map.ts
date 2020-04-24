
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
