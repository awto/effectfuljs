require("../../es/test/kit/skip")
global.skipTests = {}

describe("regenerator with inlined operations", function() {
  describe("with default options", function() {
    require("./default/links/regenerator")
  })
  describe("with single frame function",function() {
    require("./defunct/links/regenerator")
  })
  describe("with top level single frame function",function() {
    global.skipTests = {
      "@@iterator": true,
      "isGeneratorFunction": true,
      "generator function prototype": true,
      "should get a reference to the caught error": true,
      "function declaration hoisting": true,
      // the check is disabled
      "generator reentry attempt": true,
      // not implemented arguments object aliasing
      "should alias function parameters": true,
      // preserved but moved out of function
      "should be preserved in generated code": true
    }
    require("./defunctTopLevel/links/regenerator")
  })
})

describe("regenerator with loose inlined operations", function() {
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
  describe("with default options", function() {
    require("./loose/links/regenerator")
  })
  describe("with single frame function",function() {
    require("./looseDefunct/links/regenerator")
  })
  describe("with top level single frame function",function() {
    global.skipTests = Object.assign({},top,{
      // not implemented arguments object aliasing
      "should alias function parameters": true,
      // preserved but moved out of function
      "should be preserved in generated code": true
    })
    require("./looseDefunctTop/links/regenerator")
  })
  /*
  describe("with inverted for-of", function() {
    global.skipTests = Object.assign({},top,{
    })
    require("./looseDelegate/links/regenerator")
  })*/
})
