# Hacking on Clutz

## Prerequisites

- Java JDK version 7 or 8
- gradle 3.0
- NodeJS 5 or later, including NPM

## NPM dependencies

Clutz uses some tools that are installed using NPM (`clang-format` and
`typescript`, specifically). Run `npm install` in your project folder to install
them.

## Building

Run `gradle assemble` to build, `gradle test` to, well, test.

## IDE setup

Run `gradle eclipse` to generate Eclipse project configuration.

## Running tests from an IDE

The `gradle` configuration makes sure that tests use the locally installed
`clang-format` by setting the system property `gents.clangFormat`, see
`build.gradle`. Make sure to configure your IDE's test runner to pass the same
property for reproducible results.
