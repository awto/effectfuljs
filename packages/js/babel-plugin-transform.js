const Transform = require("@effectful/core/v2/presets/debugger").default;
const { babelPlugin } = require("@effectful/core/v2/compiler");

module.exports = babelPlugin(Transform).config({
  timeTravel: false,
  blackbox: true,
  loopsSubScopes: "always",
  rt: "@effectful/debugger/apiMin"
});
