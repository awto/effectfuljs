require("../../es/test/kit/skip")
const top = global.skipTests = {
  // not supporting ES object model
  "@@iterator": true,
  "isGeneratorFunction": true,
  "generator function prototype": true,
  "should get a reference to the caught error": true,
  "function declaration hoisting": true,
  // the check is disabled
  "generator reentry attempt": true
}

describe("regenerator tests", function() {
  describe("with default options", function() {
    require("./default/links/regenerator")
  })
  /*
  describe("with top level handlers", function() {
    global.skipTests = Object.assign({},top,{
      // not implemented arguments object aliasing
      "should alias function parameters": true,
      // preserved but moved out of function
      "should be preserved in generated code": true
    })
    require("./topLevel/links/regenerator")
  })
  */
  /*
  describe("with single frame function",function() {
    require("./defunct/links/regenerator")
  })
  describe("with top level single frame function",function() {
    global.skipTests = Object.assign({},top,{
      // not implemented arguments object aliasing
      "should alias function parameters": true,
      // preserved but moved out of function
      "should be preserved in generated code": true
    })
    require("./defunctTopLevel/links/regenerator")
  })
  */
})

