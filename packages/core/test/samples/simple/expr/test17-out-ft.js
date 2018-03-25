import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(effc(3), a_2);
}

function a_2(a, b) {
  a._ = b;
  return M.chain(effb(2), a_3);
}

function a_3(a, b) {
  return M.chain(eff(b + 4), a_4);
}

function a_4(a, b) {
  5 + a._ + b;
}