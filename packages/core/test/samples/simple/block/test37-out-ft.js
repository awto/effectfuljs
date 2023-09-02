import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  if (true) {
    1 + 1;
  }
  return M.chain(M.pure(), a_2);
}
function a_2(a, b) {
  return b;
}