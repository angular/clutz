# Clutz - Closure to TypeScript Declarations (`.d.ts`) generator.

[![Build Status](https://travis-ci.org/angular/clutz.svg?branch=master)](https://travis-ci.org/angular/clutz)

This project uses the
[Closure Compiler](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler)
to parse Closure-style JSDoc type annotations from ES5/ES2015 code, and
generates a suitable TypeScript type definition file (`.d.ts`) for the exported
API.

The intent is to allow TypeScript code to import libraries written with
Closure-style type declarations. Having the clutz generated declarations allows
type-checking in the TypeScript compiler and IDE tooling (for highlighting
errors and type-sensitive auto-complete) as if the imported code was written in
TypeScript.

## Supported versions

We lack the resources to make Clutz releases or support multiple versions of
dependent tools simultaneously. You'll have the most success with Clutz if you
use it with:

-   Closure Compiler at HEAD: whatever maven thinks -SNAPSHOT is.
-   A recent version of TypeScript: the test suite runs against the version of
    `typescript` in `npm-shrinkwrap.json`, so that is always a good choice.

## Example usage

We don't offer a binary distribution, so first you need to build from source:

```shell
$ npm install
$ ./gradlew build installDist # or just "gradlew" on Windows
...
BUILD SUCCESSFUL
```

You can use Clutz from the command line using the wrapper script produced by
Grade or by executing the JAR file in `build/libs/` yourself. Here is a sample
execution:

```shell
$ PATH=$PATH:./build/install/clutz/bin
$ clutz path/to/my/source1.js path/to/my/source2.js ...
        --externs path/to/closure-compiler/externs/es3.js path/to/closure-compiler/externs/es5.js ...
        -o out.d.ts
```

This creates TypeScript type definitions in `out.d.ts` for all the closure types
discovered in the inputs. Symbols which were declared with `goog.provide('x')`
may be imported in TypeScript as `import x from 'goog:x';`. For full explanation
of what TypeScript types are produced for different Closure usages, see the
`.js` and `.d.ts` files in `src/test/com/google/javascript/clutz`.

When compiling TypeScript code that depends on the closure code, include the
`src/resources/closure.lib.d.ts` file along with `out.d.ts`.

Note that clutz requires that your code can be compiled with Closure Compiler.
If you get errors, try reproducing them without clutz, by compiling your code
with Closure alone. The arguments for invoking clutz are intentionally similar
to the arguments for invoking the Closure compiler. You can find the additional
compiler flags that clutz passes to Closure Compiler in
`src/main/java/com/google/javascript/clutz/Options.java`. If the failure is
reproducible this way, then you have a closure type error in your code (or a bug
in Closure Compiler).

# Gents - Closure to TypeScript converter

This repository also hosts `gents` - tool that generates TypeScript code out of
Closure annotated `.js`. We host it in this repo together with `clutz` because
they both wrap Closure Compiler to get the type information. As such `gents`
shares `clutz` restriction that it only accepts code that is valid well-typed
Closure JavaScript.

Details about some specific conversions follow:

### Module Conversion

`gents` converts Closure `goog.module` and `goog.provide` module/namespaces into
TypeScript modules. On the exporting side, it converts export assignments into
TypeScript export statements. On the importing side, it converts `goog.require`
statements into TypeScript imports. Due to naming issues, this may result in the
renaming of the imported symbols.

```javascript {.good}
// file a.js
goog.module('mod.A');
exports = function(n) { return n; };

// file b.js
goog.provide('provided.B');
provided.B.val = 4;

// file c.js
goog.module('importer.C');
var A = goog.require('mod.A');
var B = goog.require('provided.B');

/** @type {number} */
var num = A(B.val);
```

Is converted to:

```javascript {.good}
// file a.ts
export const A = function(n) { return n; };

// file b.ts
export const val = 4;

// file c.ts
export {};
import {A} from "./a";
import * as B from "./b";

let num: number = A(B.val);
```

### Class Conversion

`gents` converts `@constructor` annotated functions and `goog.defineClass` into
ES6 class declarations. Additionally, it moves all prototype and static
method/field declarations into the class.

```javascript {.good}
/**
 * @param {number} n
 * @constructor
 */
function A(n) {
  /** @type {number} */
  this.num = n;
}

/** @return {number} */
A.prototype.foo = function() { return 4; };
/** @return {boolean} */
A.bar = function() { return false; };
/** @type {boolean} */
A.x = true;
```

Is converted to:

```javascript {.good}
class A {
  num: number;
  static x: boolean = true;

  constructor(n: number) {
    this.num = n;
  }
  foo(): number {
    return 4;
  }
  static bar(): boolean {
    return false;
  }
}
```

### Type Conversion

`gents` converts JSDoc annotated JavaScript into the proper TypeScript
declaration. Note that just like with classes, `gents` only converts explicitly
annotated types. This is to make sure `gents` doesn't accidentally aggressively
infer the types of every variable and generate giant type declarations.

### Known Issues and TODOs

[Github issues](https://github.com/angular/clutz/issues?q=is%3Aopen+is%3Aissue+label%3Agents)
