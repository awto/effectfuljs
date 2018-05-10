const run = require("../../../es/test/templates/asyncGenerators")

describe("async generators with inlined operations", function() {
  context("with default options", function() {
    run(require("../default/links/asyncGenerators"))
    require("../default/links/asyncGeneratorsTest")
  })
  context("with single frame function", function() {
    run(require("../defunct/links/asyncGenerators"))
    require("../defunct/links/asyncGeneratorsTest")
  })
  context("with top level single frame function", function() {
    run(require("../defunctTopLevel/links/asyncGenerators"))
    require("../defunctTopLevel/links/asyncGeneratorsTest")
  })
})

describe("async generators with loose inlined operations", function() {
  context("with default options", function() {
    run(require("../loose/links/asyncGenerators"))
  })
  context("with single frame function", function() {
    run(require("../looseDefunct/links/asyncGenerators"))
  })
  context("with top level single frame function", function() {
    run(require("../looseDefunctTop/links/asyncGenerators"))
  })
})
