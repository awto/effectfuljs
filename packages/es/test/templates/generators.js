const Kit = require("../kit")
const expected = require("../samples/src/generators")

function eqlGens(a,b) {
  return global.generatorsTrace === true
    ? Kit.eqlGens(Kit.trace("RES",a),Kit.trace("EXP",b))
    : Kit.eqlGens(a,b) 
}

global.skipTests = {}

module.exports = function generators(name, from) {
  describe(name, function() {
    for(const i in from) {
      it(i, function() {
        Kit.runAll(eqlGens(from[i](), expected[i]()))
      })
    }
  })
}

