const run = require("../../es/test/templates/async")

describe("async/await with inlined operations", function() {
  run("with default options", require("./default/links/async"))
  run("with single frame function",require("./defunct/links/async"))
  run("with top level single frame function",
      require("./defunctTopLevel/links/async"))
})

describe("async/await with loose inlined operations", function() {
  run("with default options", require("./loose/links/async"))
  run("with single frame function",require("./looseDefunct/links/async"))
  run("with top level single frame function",
      require("./looseDefunctTop/links/async"))
})

