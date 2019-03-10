const run = require("../../es/test/templates/generators");
require("../../es/test/kit/skip")();

describe("full inlined generators", function() {
  run("with default options", require("./default/links/generators"));
});

describe("loose inlined generators", function() {
  run("with default options", require("./loose/links/generators"));
});
