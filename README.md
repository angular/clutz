# clutz - Closure to `.d.ts` generator.
[![Build Status](https://travis-ci.org/angular/clutz.svg?branch=master)](https://travis-ci.org/angular/clutz)

This project uses the
[Closure Compiler](https://developers.google.com/closure/compiler/docs/js-for-compiler)
to parse Closure-style JSDoc type annotations from ES5/ES2015 code, and generates a suitable
TypeScript type definition file (`.d.ts`) for the exported API.

The intent is to allow TypeScript code to re-use libraries written with Closure-style type
declarations, and still benefit from type checking in the TypeScript compiler and IDE tooling
for highlighting errors and type-sensitive auto-complete.

## Example usage

We don't offer a binary distribution, so first you need to build:
```shell
$ gradle build installDist
...
BUILD SUCCESSFUL
```

You can use Clutz as a library from a Java based build, or execute the wrapper script produced by Gradle:
```shell
$ PATH=$PATH:./build/install/clutz/bin
$ clutz --externs src/resources/es6_min.js -o out.d.ts path/to/my/sources.js
```

This creates TypeScript type definitions in `out.d.ts` for all the closure types discovered in the inputs.
Symbols which were declared with `goog.provide('x')` may be imported as `import x from 'goog:x';`.
For full explanation of what TypeScript types are produced for different Closure usages, see the `.js` and `.d.ts`
files in `src/test/com/google/javascript/clutz`.

When compiling TypeScript code that depends on the closure code, include the `src/resources/closure.lib.d.ts` along with
`out.d.ts`.

Note that clutz requires that your code can be compiled with Closure Compiler. If you get errors, try reproducing them
without clutz, just compiling your code with Closure. You can find the options we pass to Closure Compiler in
`src/main/java/com/google/javascript/clutz/Options.java`. If the failure is reproducible this way, then you have a mistake
in your code (or a bug in Closure Compiler).

## Supported Version of TypeScript
Clutz produces declaration files that are guaranteed to be accepted by a version
of TypeScript newer than
[ac6224d6](https://github.com/Microsoft/TypeScript/archive/ac6224d6.zip). The
current test suite runs against `typescript@next`, so that is always a good
choice.
