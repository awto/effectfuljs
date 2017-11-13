const run = require("../../es/test/templates/generators")

describe("loose generators using context passing runtime", function() {
  run("with default options",require("./default/links/generators"))
  run("with top level handlers",require("./topLevel/links/generators"))
})
