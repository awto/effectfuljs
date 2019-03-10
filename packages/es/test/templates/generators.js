const Kit = require("../kit");
const expected = require("../samples/src/generators");

function eqlGens(n, a, b) {
  return global.effectfulTrace === true
    ? Kit.eqlGens(
        Kit.traceGens(`RES:{${n}}`, a),
        Kit.traceGens(`EXP:{${n}}`, b)
      )
    : Kit.eqlGens(a, b);
}

global.skipTests = {};

module.exports = function generators(name, from) {
  describe(name, function() {
    for (const i in from) {
      it(i, function() {
        Kit.runAll(eqlGens(i, from[i](), expected[i]()));
      });
    }
  });
};
