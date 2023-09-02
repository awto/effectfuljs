import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1, a_5);
}
function b() {
  var b = M.context();
  return M.scope(b_1, b_5);
}
function a_1(a) {
  console.log("1");
  return M.chain(eff(1), a_3);
}
function a_2(a) {
  var error;
  error = a._ex;
  a._e = error;
  console.log("2");
  a._ex = null;
  return M.jump(void 0, a_3);
}
function a_3(a) {
  var b;
  b = a._e, a._e = null;
  return M.chain(eff(b), a_4);
}
function a_4(a) {}
function a_5(a, b) {
  a._ex = b;
  return M.jump(void 0, a_2);
}
function b_1(b) {
  console.log("1");
  return M.chain(eff(1), b_3);
}
function b_2(b) {
  var error;
  error = b._ex;
  b._e = error;
  console.log("2");
  error = null;
  b._ex = null;
  return M.jump(void 0, b_3);
}
function b_3(b) {
  var a;
  a = b._e, b._e = null;
  return M.chain(eff(a), b_4);
}
function b_4(b) {}
function b_5(b, a) {
  b._ex = a;
  return M.jump(void 0, b_2);
}