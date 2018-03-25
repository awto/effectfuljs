import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return M.scope(a_1, a_5);
}

function a() {
  var a = M.context();
  return M.scope(_a_1, _a_5);
}

function a_1(a) {
  console.log("1");
  return M.chain(eff(1), a_3);
}

function a_2(a) {
  a._error1 = a._ex;
  a._e = a._error1;
  console.log("2");
  return M.jump(void 0, a_3);
}

function a_3(a) {
  return M.chain(eff(a._e), a_4);
}

function a_4(a) {}

function a_5(a, b) {
  a._ex = b;
  return M.jump(void 0, a_2);
}

function _a_1(a) {
  console.log("1");
  return M.chain(eff(1), _a_3);
}

function _a_2(a) {
  a._error1 = a._ex;
  a._e = a._error1;
  console.log("2");
  a._error1 = null;
  return M.jump(void 0, _a_3);
}

function _a_3(a) {
  return M.chain(eff(a._e), _a_4);
}

function _a_4(a) {}

function _a_5(a, b) {
  a._ex = b;
  return M.jump(void 0, _a_2);
}