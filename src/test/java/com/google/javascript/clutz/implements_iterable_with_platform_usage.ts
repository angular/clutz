import ImplIterableGeneric from 'goog:implements_iterable.ImplIterableGeneric';

for (const x of new ImplIterableGeneric<string>()) {
  console.log(x);
}
