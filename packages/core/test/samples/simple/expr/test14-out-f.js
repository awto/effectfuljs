import * as M from "@effectful/core";
function a() {
  var a, b;
  return M.chain(eff(1), _1);
  function _1(b) {
    a = b;
    return M.chain(eff(2), _2);
  }
  function _2(a) {
    b = a;
    return M.chain(eff(3), _3);
  }
  function _3(c) {
    return M.chain(a(b, c, 4), _4);
  }
  function _4() {}
}