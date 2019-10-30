import {SomeClass, someConstant} from 'goog:keyword.delete.namespace';

console.log(
    new SomeClass().hasKeywordNamespace(),
    someConstant.hasKeywordNamespace(),
);
