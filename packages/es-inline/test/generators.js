const run = require("../../es/test/templates/generators")

describe("generators using context passing runtime", function() {
  run("with default options",require("./default/links/generators"))
  run("with single frame function",require("./defunct/links/generators"))
  run("with top level single frame function",
      require("./defunctTopLevel/links/generators"))
})

describe("loose generators using context passing runtime", function() {
  run("with default options",require("./loose/links/generators"))
  run("with single frame function",require("./looseDefunct/links/generators"))
  run("with top level single frame function",
      require("./looseDefunctTop/links/generators"))
})
