const run = require("../../es/test/templates/generators")

describe("generators using context passing runtime", function() {
  run("with default options",require("./default/links/generators"))
})
