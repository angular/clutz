goog.provide('some.SomeEnum');
goog.provide('some.ObjectValuedEnum');
goog.provide('some.setEnvironment');
goog.provide('some.StringEnum');
goog.provide('some.StringVariableEnum');

/** @enum {number} */
some.SomeEnum = {
  A: 1,
  B: 2
};

/** @constructor */
function X() {}

/** @enum {X} */
some.ObjectValuedEnum = {
  A: new X(),
  B: new X()
};

/**
 * @enum {number}
 */
const Environment = {
  FAKE: 0,
  PROD: 4
};

/** @param {!Environment} environment */
function setEnvironment(environment) {}

/** @param {!Environment} environment */
some.setEnvironment = setEnvironment;

/** @enum {string} */
some.StringEnum = {
  A: '1',
  B: '2'
};

/** @return {string} */
function returnString() {
  return 'AB';
}

const MSG_A = returnString();
const MSG_B = returnString();

/** @enum {string} */
some.StringVariableEnum = {
  A: MSG_A,
  B: MSG_B,
};