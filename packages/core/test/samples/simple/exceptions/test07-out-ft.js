import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1, a_7);
}

function a_1(a) {
  a._fc = a_4, a._fe = a_5;
  return M.chain(eff(1), a_2);
}

function a_2(a) {
  console.log(1);
  return M.chain(eff(2), a_3);
}

function a_3(a) {
  var b, c;
  console.log(2);
  b = a._fc, c = a._fe, a._fc = null, a._fe = null;
  return M.jump(void 0, b, c);
}

function a_4(a) {}

function a_5(a, e) {
  return M.raise(e);
}

function a_6(a) {
  return M.raise(a._err1);
}

function a_7(a, b) {
  a._fc = a_6, a._fe = a_5, a._err1 = b;
  return M.jump(void 0, a_2);
}