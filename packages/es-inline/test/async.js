const run = require("../../es/test/templates/async")
describe("async/await with inlined operations", function() {
  run("with default options", require("./default/links/async"))
  run("with right associative bind", require("./right/links/async"))
})

describe("async/await with loose inlined operations", function() {
  run("with default options",require("./loose/links/async"))
})

