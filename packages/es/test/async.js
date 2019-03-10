const run = require("./templates/async");

describe("async/await using context passing runtime", function() {
  describe("with default options", function() {
    run("comparing", require("./default/links/async"));
    require("./default/links/asyncTest");
  });
  describe("with top level handlers", function() {
    run("comparing", require("./topLevel/links/async"));
    // require("./topLevel/links/asyncTest")
  });
});
