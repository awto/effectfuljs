const run = require("./templates/asyncGenerators")
describe("async generators using context passing runtime", function() {
  context("with default options", function() {
    run(require("./default/links/asyncGenerators"))
    require("./default/links/asyncGeneratorsTest")
  })
  context("with top level handlers", function() {
    run(require("./topLevel/links/asyncGenerators"))
    require("./topLevel/links/asyncGeneratorsTest")
  })
  context("with single frame function", function() {
    run(require("./defunct/links/asyncGenerators"))
    require("./defunct/links/asyncGeneratorsTest")
  })
  context("with top level single frame function", function() {
    run(require("./defunctTopLevel/links/asyncGenerators"))
    require("./defunctTopLevel/links/asyncGeneratorsTest")
  })
})


