import * as M from "@effectful/core";
var $module = M.module("*", module);

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
    var ctx = M.context(Cl.prototype.func);
    return M.scope(func_1);
  }

  func() {
    var ctx = M.context(Cl.prototype.func);
    return M.scope(_func_1);
  }

}

M.eff(Cl.prototype.func), M.eff(Cl.prototype.func);
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

function func_1(ctx) {
  not_traced();
  return M.pure();
}

function func_2(ctx, r) {
  return M.pure(r);
}

function _func_1(ctx) {
  not_traced(() => traced(1) + traced(2));
  return M.pure();
}

function _func_2(ctx, r) {
  return M.pure(r);
}