import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  return M.chain(effb(2), a_2);
}
function a_2(a, b) {
  return M.chain(eff(b), a_3);
}
function a_3(a, b) {
  b + 2;
}