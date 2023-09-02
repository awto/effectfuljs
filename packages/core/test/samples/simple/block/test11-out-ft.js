import * as M from "@effectful/core";
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  return M.chain(eff0(), a_2);
}
function a_2(a) {
  a._i = 0;
  a._i++;
  return M.chain(eff1(a._i), a_3);
}
function a_3(a) {
  a._i++;
  if (t) {
    return M.chain(eff2(a._i), a_4);
  } else {
    a._i++;
    return M.jump(void 0, a_5);
  }
}
function a_4(a) {
  a._i++;
  return M.chain(eff4(a._i), a_5);
}
function a_5(a) {
  var b;
  b = a._i, a._i = null;
  return M.chain(eff5(b), a_6);
}
function a_6(a) {}