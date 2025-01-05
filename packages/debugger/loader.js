const compile = require("./config/node/compile");
const config = require("./config/deriveConfig");
const path = require("path");

module.exports = function (source) {
  if (typeof source !== "string" || !/\.[cme]?[tj]sx?$/.test(path.extname(this.resourcePath)))
    return source;
  const savedLoaderPrefix = config.loaderPrefix;
  try {
    config.loaderPrefix = "@effectful/debugger/loader!";
    return compile(source, this.resourcePath, this._module);
  } catch (e) {
    console.error(`couldn't transpile ${this.resourcePath}`, e);
    return source;
  } finally {
    config.loaderPrefix = savedLoaderPrefix;
  }
};
