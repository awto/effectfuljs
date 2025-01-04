const compile = require("./config/node/compile");
const config = require("./deriveConfig");

module.exports = function (source) {
  const savedLoaderPrefix = config.loaderPrefix;
  try {
    config.loaderPrefix = "@effectful/debugger/loader!";
    return compile(source, this.resourcePath, this._module);
  } finally {
    config.loaderPrefix = savedLoaderPrefix;
  }
};
