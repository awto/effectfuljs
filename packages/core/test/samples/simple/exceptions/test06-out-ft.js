import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1, a_5);
}

function a_1(a) {
  return M.chain(eff(1), a_4);
}

function a_2(a) {
  a._e = a._ex;
  console.log(a._e, 1);
  a._ex = null;
  return M.chain(eff(2), a_3);
}

function a_3(a) {
  console.log(a._e, 2);
}

function a_4(a) {}

function a_5(a, b) {
  a._ex = b;
  return M.jump(void 0, a_2);
}