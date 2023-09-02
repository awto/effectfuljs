import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  return M.chain(eff(1), a_2);
}
function a_2(a, b) {
  if (b) {
    return M.chain(eff(2), a_3);
  } else {
    return M.chain(eff(3), a_4);
  }
}
function a_3(a, b) {
  return b;
}
function a_4(a, b) {
  return b;
}