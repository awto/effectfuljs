const esOptions = require("@effectful/es/options")

module.exports = function esProfile(opts) {
  return esOptions(Object.assign({inline:true,defunct:false,loose:true},opts))
}

