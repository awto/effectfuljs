const esOptions = require("@effectful/es/options")

module.exports = function esProfile(opts) {
  return esOptions(Object.assign({},{inline:true,defunct:true,loose:true},opts))
}

