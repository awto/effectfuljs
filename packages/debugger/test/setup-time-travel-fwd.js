// otherwise jest won't work
const config = require("./setup");
config.timeTravel = true;
config.timeTravelForward = true;
module.exports = config;
