import './export_sideeffect';
import {A} from './export_default';
import {A as X} from './export_default';
import {foo} from './export_named';
import * as namespace from './export_namespace';
import {D} from './export_both';
import * as DExports from './export_both';
import {bar} from './export_both';
import R from 'goog:module.R';
import foobar from 'goog:provides';

// Use code in JS.
R();
foobar();

// Use imports from a namespace.
namespace.foo();
namespace.bar(namespace.x);

// Use destructured import.
foo();

// Use import from a file that has both default and named exports.
const D;
bar(DExports.x);

// Use imports with default and local names.
const aInstance = new A();
const aInstanceAsX = new X();
