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
  function _3(a) {
    return M.chain(b(a), _4);
  }
  function _4(b) {
    return M.chain(a(b), _5);
  }
  function _5() {}
}