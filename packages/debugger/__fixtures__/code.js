const { mod } = require("mod");

let v0 = 10;

function C(a) {
  let v1 = 10;
  try {
    const v2 = 11;
    var v3;
    mod.proc1(mod.fn1(a), v0, v1, v2, v3);
    mod.proc2();
    var v4 = 100;
  } catch (e) {
    mod.proc3(e, v4);
  }
}

class Cl {
  constructor() {
    var v4;
    not_traced(v0, v4);
  }
  get prop1() {
    not_traced();
  }
  set prop1(value) {
    not_traced();
  }
  async funcAsync() {
    not_traced(v0);
  }
  *func() {
    not_traced(() => traced(1) + traced(2));
  }
}

exports.fn2 = function fn1() {
  const v5 = 10;
  return mod.some({ a: mod.f2(), b: [new C(v0, v5)] });
};

const obj1 = {
  objFn(a) {
    var k = new Cl().fn(a, v0);
  }
};
