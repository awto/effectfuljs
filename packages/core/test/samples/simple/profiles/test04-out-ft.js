import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  console.log("hi");
  return M.chain(e1(), a_2);
}
function a_2(a) {
  return M.chain(e2(), a_3);
}
function a_3(a) {
  return M.chain(p1(), a_4);
}
function a_4(a) {
  console.profile("minimal");
  return M.chain(p2(), a_5);
}
function a_5(a) {
  console.profileEnd();
  return M.chain(e1(), a_6);
}
function a_6(a) {
  return M.chain(e(2), a_7);
}
function a_7(a) {}