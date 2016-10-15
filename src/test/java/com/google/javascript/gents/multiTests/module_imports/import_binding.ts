import {A} from './export_default';
import {A as X} from './export_default';

// TODO(#392): THIS LINE IS BROKEN
const {namedExport1, namedExport2} = goog.require('named.A.B');
import * as B from './export_namespace';
import './export_sideeffect';
import {D} from './export_both';
import * as DExports from './export_both';

export const barrel = {namedExport1, X};
