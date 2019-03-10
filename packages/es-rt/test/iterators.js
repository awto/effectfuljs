var Lib = require("../src/main");

describe(
  Object.entries(Lib.opts)
    .map(([k, v]) => (v ? k : false))
    .filter(i => i)
    .join(),
  function() {
    require("./templates/iterators")(Lib);
  }
);
