const run = require("./templates/async")

describe("async/await using context passing runtime", function() {
  run("with default options", require("./default/links/async"))
//  run("with frames moved to top level", require("./topLevel/links/async"))
})
