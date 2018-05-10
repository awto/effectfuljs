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
  var c;
  c = a._, a._ = null;
  return M.chain(c(b + 2), a_4);
}

function a_4(a) {}