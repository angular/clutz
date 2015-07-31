# Closure to `.d.ts` generator. [![Build Status](https://magnum.travis-ci.com/angular/closure-to-dts.svg?token=9vdUxrDAzb8YJaFstxmz&branch=master)](https://magnum.travis-ci.com/angular/closure-to-dts)

**Experimental: do not use yet**

This project builds on the
[Closure Compiler](https://developers.google.com/closure/compiler/docs/js-for-compiler)
to parse Closure-style JSDoc type annotations from code, and generates a suitable
TypeScript type definition file (`.d.ts`) for the exported API.

The intent is to allow TypeScript code to re-use libraries written with Closure-style type
declarations, and still benefit from type checking in the TypeScript compiler and IDE tooling
for highlighting errors and type-sensitive auto-complete.
