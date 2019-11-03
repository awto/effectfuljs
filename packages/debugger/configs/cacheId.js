const config = require("./defaults");
const babel = require("@babel/core");
const version = require("../package.json").version;
module.exports = `${JSON.stringify({
  babel: babel.version,
  timeTravel: config.timeTravel,
  version
})}`;
