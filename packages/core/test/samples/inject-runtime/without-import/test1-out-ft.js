import * as M from "@effectful/generators";
function a() {
  var a = M.generator();
  return M.scope(a_1);
}
function a_1(a) {
  return M.yld(1, a_2);
}
function a_2(a) {
  return M.yld(2, a_3);
}
function a_3(a) {
  return M.pure();
}