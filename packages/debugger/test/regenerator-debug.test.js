require("./setup");
const { describe, run, opts } = require("./setup-regenerator");

describe("regenerator trace", function() {
  opts.debug = true;
  run(require("./es/links/regenerator"));
});
