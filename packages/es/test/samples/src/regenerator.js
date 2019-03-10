global.regeneratorRuntime = {
  wrap: function() {
    throw new Error("should not be called");
  },
  mark: function() {
    throw new Error("should not be called");
  },
  isGeneratorFunction: function(v) {
    return v && v.constructor.name === "GeneratorFunction";
  }
};

require("./regenerator/async");
require("./regenerator/non-native");
require("./regenerator/tests.es6");
require("./regenerator/tests-node4.es6");
require("./regenerator/regression");
require("./regenerator/nothing-to-transform");
