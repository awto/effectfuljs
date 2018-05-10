import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(eff(1), a_2);
}

function a_2(a, b) {
  a._ = b;
  return M.chain(eff(2), a_3);
}

function a_3(a, b) {
  a._1 = b;
  return M.chain(eff(3), a_4);
}

function a_4(a, b) {
  var c, d;
  c = a._, d = a._1, a._ = null, a._1 = null;
  return M.chain(c(d, b, 4), a_5);
}

function a_5(a) {}