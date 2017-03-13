# Clutz - Closure to TypeScript Declarations (`.d.ts`) generator.








[![Build Status](https://travis-ci.org/angular/clutz.svg?branch=master)](https://travis-ci.org/angular/clutz)

This project uses the
[Closure Compiler](https://developers.google.com/closure/compiler/docs/js-for-compiler)
to parse Closure-style JSDoc type annotations from ES5/ES2015 code, and generates a suitable
TypeScript type definition file (`.d.ts`) for the exported API.

The intent is to allow TypeScript code to import libraries written with Closure-style type
declarations. Having the clutz generated declarations allows type-checking in the
TypeScript compiler and IDE tooling (for highlighting errors and type-sensitive
auto-complete) as if the imported code was written in TypeScript.

## Example usage

We don't offer a binary distribution, so first you need to build:
```shell
$ npm install 
$ gradle build installDist
...
BUILD SUCCESSFUL
```

You can use Clutz as a library from a Java based build, or execute the wrapper script produced by Gradle.
Here is a sample execution:
```shell
$ PATH=$PATH:./build/install/clutz/bin
$ clutz path/to/my/source1.js path/to/my/source2.js ...
        --externs path/to/closure-compiler/externs/es3.js path/to/closure-compiler/externs/es5.js ...
        -o out.d.ts \
```

This creates TypeScript type definitions in `out.d.ts` for all the closure types discovered in the inputs.
Symbols which were declared with `goog.provide('x')` may be imported in TypeScript as `import x from 'goog:x';`.
For full explanation of what TypeScript types are produced for different Closure usages, see the `.js` and `.d.ts`
files in `src/test/com/google/javascript/clutz`.

When compiling TypeScript code that depends on the closure code, include the
`src/resources/closure.lib.d.ts` file along with `out.d.ts`.

Note that clutz requires that your code can be compiled with Closure Compiler.
If you get errors, try reproducing them without clutz, by compiling your code
with Closure alone. The arguments for invoking clutz are intentionally similar
to the arguments for invoking the Closure compiler. You can find the additional
compiler flags that clutz passes to Closure Compiler in
`src/main/java/com/google/javascript/clutz/Options.java`. If the failure is
reproducible this way, then you have a closure type error in your code (or a
bug in Closure Compiler).

## Supported Version of TypeScript
Clutz produces declaration files that are guaranteed to be accepted by a
version of TypeScript
[2.1.6](https://github.com/Microsoft/TypeScript/tree/v2.1.6). The current test
suite runs against the version of `typescript` in `npm-shrinkwrap.json`, so that is
always a good choice.
