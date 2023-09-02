import * as M from "@effectful/core";
function a() {
  var a = M.context();
  a._a = function _a() {
    var a = M.context();
    return M.scope(a_1);
  };
  a._b = function _b() {
    var b = M.context();
    return M.scope(b_1);
  };
  return M.scope(_a_1);
}
function a_1(a) {
  console.log("hi");
  return M.chain(e1(), a_2);
}
function a_2(a) {
  return M.chain(e2(), a_3);
}
function a_3(a) {}
function b_1(b) {
  p4();
  p5();
  return M.chain(e1(), b_2);
}
function b_2(b) {
  return M.chain(e(2), b_3);
}
function b_3(b) {}
function _a_1(a) {
  return M.chain(p1(), _a_2);
}
function _a_2(a) {
  return M.chain(p2(), _a_3);
}
function _a_3(a) {
  return M.chain(p2(), a_4);
}
function a_4(a) {
  return M.chain(p3(), a_5);
}
function a_5(a) {}