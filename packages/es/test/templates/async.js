const Kit = require("../kit")
const expected = require("../samples/src/async")

global.skipTests = {}

module.exports = function generators(name, from) {
  describe(name, function() {
    for(const n in from) {
      it(from[n].name, function() {
        return Kit.eqlPromises(from[n](),expected[n]())
      })
    }
  })
}
