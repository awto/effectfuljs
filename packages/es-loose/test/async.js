const run = require("../../es/test/templates/async")

describe("async/await using context passing runtime", function() {
  run("with default options", require("./default/links/async"))
  run("with top level handlers", require("./topLevel/links/async"))
})

