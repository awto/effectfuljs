require("../../es/test/kit/skip")
global.skipTests = {}

describe("regenerator tests", function() {
  describe("with default options", function() {
    require("./default/links/regenerator")
  })
  describe("with top level handlers", function() {
    global.skipTests = {
      // not supporting ES object model
      "@@iterator": true,
      "isGeneratorFunction": true,
      "generator function prototype": true,
      "should get a reference to the caught error": true,
      "function declaration hoisting": true,
      // not implemented arguments object aliasing
      "should alias function parameters": true,
      // preserved but moved out of function
      "should be preserved in generated code": true
    }
    require("./topLevel/links/regenerator")
  })
})

