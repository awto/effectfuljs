import * as M from "@effectful/core";
// *- with state
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a_1(a) {
  a._i = 0;
  return M.chain(eff(), a_2);
}
function a_2(a) {
  var b;
  b = a._i += 1;
  return M.chain(eff(b), a_3);
}
function a_3(a, b) {
  var c, d;
  switch (b) {
    case 1:
      c = a._i += 3;
      return M.chain(effB(c), a_4);
    case 2:
      d = a._i += 5;
      return M.chain(effB(d), a_4);
    case 3:
      {
        console.log("hi", a._i);
      }
    default:
      return M.jump(void 0, a_4);
  }
}
function a_4(a) {
  var b;
  b = a._i, a._i = null;
  return M.chain(eff(b), a_5);
}
function a_5(a) {}