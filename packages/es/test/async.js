const run = require("./templates/async")

describe("async/await using context passing runtime", function() {
  run("with default options", require("./default/links/async"))
  run("with top level handlers", require("./topLevel/links/async"))
  // run("with top level handlers", require("./topLevel/links/async"))
  // run("with single frame function",require("./defunct/links/async"))
  // run("with top level single frame function",
  //    require("./defunctTopLevel/links/async"))
})
