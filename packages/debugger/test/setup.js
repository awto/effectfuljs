const config = require("../config").default;
const D = require("../state");
D.context.debug = true;
D.context.needsBreak = () => true;
config.verbose = false;
module.exports = config;
