import * as M from "@effectful/core";
function a1(a, b) {
  var a1 = M.context();
  a1._a = a;
  a1._b = b;
  return M.scope(a1_1, a1_4);
}
function a2(a, b) {
  var a2 = M.context();
  a2._a = a;
  a2._b = b;
  return M.scope(a2_1, a2_4);
}
function a1_1(a1) {
  var a;
  a = a1._a, a1._a = null;
  return M.chain(eff(a), a1_3);
}
function a1_2(a1) {
  var a;
  a = a1._b, a1._b = null;
  return M.chain(eff(a), a1_3);
}
function a1_3(a1) {}
function a1_4(a1, a) {
  return M.jump(void 0, a1_2);
}
function a2_1(a2) {
  var a;
  a = a2._a, a2._a = null;
  return M.chain(eff(a), a2_3);
}
function a2_2(a2) {
  return a2._b;
}
function a2_3(a2) {
  return a2._r;
}
function a2_4(a2, a) {
  return M.jump(void 0, a2_2);
}