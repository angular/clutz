import {fn} from 'goog:collapsed.union';

fn({});
fn({opt_some: ''});
//!! Surprisingly, this is accepted by TS even if we emit {opt_some?: string},
//!! but that sounds more like a bug with weak types.
fn(() => {});