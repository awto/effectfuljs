const run = require("../../../es/test/templates/asyncGenerators")

describe("async generators with inlined operations", function() {
  run("with default options", require("../default/links/asyncGenerators"))
  run("with single frame function",require("../defunct/links/asyncGenerators"))
  run("with top level single frame function",
      require("../defunctTopLevel/links/asyncGenerators"))
})

describe("async generators with loose inlined operations", function() {
  run("with default options", require("../loose/links/asyncGenerators"))
  run("with single frame function",require("../looseDefunct/links/asyncGenerators"))
  run("with top level single frame function",
      require("../looseDefunctTop/links/asyncGenerators"))
})
