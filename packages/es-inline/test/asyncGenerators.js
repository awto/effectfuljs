const run = require("../../es/test/templates/asyncGenerators")

describe("async generators with inlined operations", function() {
  context("with default options", function() {
    run(require("./default/links/asyncGenerators"))
    require("./default/links/asyncGeneratorsTest")
  })
})

describe("async generators with loose inlined operations", function() {
  context("with default options", function() {
    // run(require("./loose/links/asyncGenerators"))
  })
})
