const Kit = require("../kit");
const expected = require("../samples/src/async");

global.skipTests = {};

function eqlPromises(n, a, b) {
  return global.effectfulTrace === true
    ? Kit.eqlPromises(
        Kit.tracePromise(`RES:{${n}}`, a),
        Kit.tracePromise(`EXP:{${n}}`, b)
      )
    : Kit.eqlPromises(a, b);
}

module.exports = function asyncFun(name, from) {
  describe(name, function() {
    for (const n in from) it(n, () => eqlPromises(n, from[n](), expected[n]()));
  });
};
