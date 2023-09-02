import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  a._i = 0;
  return M.chain(eff0(a._i), a_2);
}
function a_2(a) {
  a._i++;
  return M.chain(eff1(a._i), a_3);
}
function a_3(a) {
  return M.chain(eff1(a._i), a_4);
}
function a_4(a) {
  var b;
  a._i++;
  b = a._i, a._i = null;
  return M.chain(eff1(b), a_5);
}
function a_5(a) {}