import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function b() {
  var b = M.context();
  return M.scope(b_1);
}
function c() {
  var c = M.context();
  return M.scope(c_1);
}
function a_1(a) {
  return M.chain(eff(1), a_2);
}
function a_2(a) {
  return M.chain(eff(2), a_3);
}
function a_3(a) {
  return M.chain(eff(3), a_4);
}
function a_4(a) {
  return M.chain(eff(4), a_5);
}
function a_5(a) {}
function b_1(b) {
  return M.chain(eff(1), b_2);
}
function b_2(b) {
  return M.chain(eff(2), b_3);
}
function b_3(b) {
  return M.chain(eff(3), b_4);
}
function b_4(b) {
  return M.chain(eff(4), b_5);
}
function b_5(b) {
  return M.chain(eff(5), b_6);
}
function b_6(b) {
  return M.chain(eff(6), b_7);
}
function b_7(b) {
  console.log("7");
}
function c_1(c) {
  return M.chain(eff(1), c_2);
}
function c_2(c) {
  return M.chain(eff(2), c_3);
}
function c_3(c) {
  return M.chain(eff(3), c_4);
}
function c_4(c) {
  return M.chain(eff(4), c_5);
}
function c_5(c) {
  return M.chain(eff(5), c_6);
}
function c_6(c) {
  return M.chain(eff(6), c_7);
}
function c_7(c) {
  console.log("7");
}