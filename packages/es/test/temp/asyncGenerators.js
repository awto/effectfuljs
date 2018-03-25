const run = require("../templates/asyncGenerators")

describe("async/await using context passing runtime", function() {
  run("with default options", require("../default/links/asyncGenerators"))
  run("with top level handlers", require("../topLevel/links/asyncGenerators"))
  run("with single frame function",require("../defunct/links/asyncGenerators"))
  run("with top level single frame function",
      require("../defunctTopLevel/links/asyncGenerators"))
})


