const run = require("./templates/generators")

describe("generators using abstract context passing runtime", function() {
  run("with default options",require("./default/links/generators"))
  run("with top level handlers",require("./topLevel/links/generators"))
})

