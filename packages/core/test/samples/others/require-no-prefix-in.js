const a = require("module-A");
const b = require(a+"module-B");
module.exports = b;