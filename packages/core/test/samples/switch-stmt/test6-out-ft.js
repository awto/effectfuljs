import * as M from "@effectful/core";
// *- without default branch
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  return M.chain(eff(1), a_2);
}
function a_2(a, b) {
  switch (b) {
    case 1:
      return M.chain(effB(1), a_3);
    case 2:
      return M.chain(effB(2), a_3);
    default:
  }
}
function a_3(a) {}