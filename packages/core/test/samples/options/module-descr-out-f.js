import * as M from "@effectful/core";
var $module = M.module("*");

const {
  mod
} = require("mod");

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

  func() {
    var r;
    return M.scope(_1);

    function _1() {
      not_traced();
      return M.pure();
    }

    function _2(r) {
      return M.pure(r);
    }
  }

  func() {
    var r;
    return M.scope(_1);

    function _1() {
      not_traced(() => traced(1) + traced(2));
      return M.pure();
    }

    function _2(r) {
      return M.pure(r);
    }
  }

}

M.eff(Cl.prototype.func, $module), M.eff(Cl.prototype.func, $module);
const obj1 = {
  objFn(a) {
    new Cl().fn(a);
  }

};

exports.fn2 = function fn1() {
  return mod.some({
    a: mod.f2(),
    b: [new C()]
  });
};