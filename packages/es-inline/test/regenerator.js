require("../../es/test/kit/skip")();

describe("regenerator with inlined operations", function() {
  describe("with default options", function() {
    require("./default/links/regenerator");
  });
});

describe("regenerator with loose inlined operations", function() {
  global.skipTests = {
    // not supporting ES object model
    "@@iterator": true,
    isGeneratorFunction: true,
    "generator function prototype": true,
    "should get a reference to the caught error": true,
    "function declaration hoisting": true,
    // the check is disabled
    "generator reentry attempt": true
  };
  describe("with default options", function() {
    require("./loose/links/regenerator");
  });
});
