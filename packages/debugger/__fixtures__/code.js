const { mod } = require("mod");

function C(a) {
  try {
    mod.proc1(mod.fn1(a));
    mod.proc2();
  } catch (e) {
    mod.proc3(e);
  }
}

class Cl {
  constructor() {
    not_traced();
  }
  get prop1() {
    not_traced();
  }
  set prop1(value) {
    not_traced();
  }
  async func() {
    not_traced();
  }
  *func() {
    not_traced(() => traced(1) + traced(2));
  }
}

exports.fn2 = function fn1() {
  return mod.some({ a: mod.f2(), b: [new C()] });
};
