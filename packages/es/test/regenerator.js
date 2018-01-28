require("../../es/test/kit/skip")()
global.skipTests = {}

describe("regenerator with abstract interface", function() {
  describe("with default options", function() {
    require("./default/links/regenerator")
  })
  const topLevelSkip = {
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
  describe("with top level handlers", function() {
    global.skipTests = topLevelSkip
    require("./topLevel/links/regenerator")
  })
  describe("with single frame function",function() {
    require("./defunct/links/regenerator")
  })
  describe("with top level single frame function",function() {
    global.skipTests = Object.assign({},topLevelSkip,{
      // not implemented arguments object aliasing
      "should alias function parameters": true,
      // preserved but moved out of function
      "should be preserved in generated code": true
    })
    require("./defunctTopLevel/links/regenerator")
  })
})

