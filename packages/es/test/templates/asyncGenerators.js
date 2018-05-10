const Kit = require("../kit")
const expected = require("../samples/src/asyncGenerators")

global.skipTests = {}

function eqlAsyncGens(n,a,b) {
  return global.effectfulTrace === true
    ? Kit.eqlAsyncGens(Kit.traceAsync("RES",a),Kit.traceAsync("EXP",b))
    : Kit.eqlAsyncGens(a,b) 
}

module.exports = function asyncGenerators(from) {
  for(const n in from) {
    it(from[n].name, function() {
      return Kit.asyncRunAll(eqlAsyncGens(n,from[n](),expected[n]()))
    })
  }
}
