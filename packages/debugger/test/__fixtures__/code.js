const { mod } = require("mod");
const n = require("mod2_" + mod);
const k = require("mod3_" + n.n);
k();
n();

let v0 = 10;

function C(a) {
  let v1 = 10;
  try {
    const v2 = 11;
    var v3;
    mod.proc1(mod.fn1(a), v0, v1, v2, v3);
    for (const i of something) {
      mod.proc2(i);
    }
    for (var i of something) mod.proc3(i);
    var v4 = 100;
  } catch (e) {
    mod.proc4(e, v4, i);
  }
}

exports.fn2 = function fn1() {
  const v5 = 10;
  return mod.some({ a: mod.f2(), b: [new C(v0, v5)] });
};
