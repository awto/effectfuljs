var M = require("./mfjscore");
if (M.compileTime)
  module.exports = {
    _compile: function(v) {
      var p = {}
      p[v] = true
      this.profile("defaultMinimal");
      this.option({minimal:{CallExpression:{match:{name:p}}}});
    }
  }
else
  throw new Error("runtime");

