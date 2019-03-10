/** macro for running tests */
module.exports = require("./transform")
  .options({ importRT: "./main" })
  .macro();
