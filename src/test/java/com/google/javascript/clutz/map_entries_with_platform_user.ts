import SpecialMap from 'goog:map_entries.Map';

const m = new SpecialMap<string, number>();
let sum = 0;
let keyName: string;
for (const [k, v] of m.entries()) {
  keyName = k;
  sum += v;
}
