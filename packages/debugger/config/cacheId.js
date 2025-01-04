const babel = require("@babel/core");

const path = require("path");
const config = require("./deriveConfig");
const version = require("../package.json").version;

module.exports = {
  version,
  dir:
    (config.cache && process.env.EFFECTFUL_DEBUGGER_CACHE_DIR) ||
    path.join(config.packageRoot, ".edbgcache"),
  key: `${JSON.stringify({
    babel: babel.version,
    timeTravel: config.timeTravel,
    version
  })}`
};
