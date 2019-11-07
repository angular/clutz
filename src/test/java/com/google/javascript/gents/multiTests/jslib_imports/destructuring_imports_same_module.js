//!! When multiple sources migrate together and destructuring import from the
//!! same module all imports should be migrated independently of one another.
const already_converted_to_ts_keep_module = goog.require("google3.src.test.java.com.google.javascript.gents.multiTests.converts_ts_module_require.already_converted_to_ts_keep");
const {foo, bar} = already_converted_to_ts_keep_module;
