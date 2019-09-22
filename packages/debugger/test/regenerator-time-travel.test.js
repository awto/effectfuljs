require("./setup-time-travel");
const { describe, run, opts } = require("./setup-regenerator");

describe("regenerator run", function() {
  opts.debug = false;
  run(require("./es-time-travel/links/regenerator"));
});
