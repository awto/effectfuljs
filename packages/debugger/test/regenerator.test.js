const { describe, run, opts } = require("./setup-regenerator");

describe("regenerator run", function() {
  opts.debug = false;
  run(require("./es/links/regenerator"));
});
