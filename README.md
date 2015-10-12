# clutz - Closure to `.d.ts` generator.
[![Build Status](https://travis-ci.org/angular/clutz.svg?branch=master)](https://travis-ci.org/angular/clutz)

**Experimental: do not use yet**

This project builds on the
[Closure Compiler](https://developers.google.com/closure/compiler/docs/js-for-compiler)
to parse Closure-style JSDoc type annotations from code, and generates a suitable
TypeScript type definition file (`.d.ts`) for the exported API.

The intent is to allow TypeScript code to re-use libraries written with Closure-style type
declarations, and still benefit from type checking in the TypeScript compiler and IDE tooling
for highlighting errors and type-sensitive auto-complete.
