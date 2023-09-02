import * as M from "@effectful/core";
function a() {
  var i;
  return M.chain(eff1(), _1);
  function _1() {
    return M.chain(eff2(), _2);
  }
  function _2(a) {
    i = a;
    return M.jump(void 0, _3);
  }
  function _3() {
    return M.chain(eff(3), _4);
  }
  function _4(a) {
    if (i !== a) {
      return M.chain(eff5(i), _5);
    } else {
      return M.chain(eff7(i), _8);
    }
  }
  function _5() {
    return M.chain(eff6(i), _6);
  }
  function _6() {
    return M.chain(eff4(i), _7);
  }
  function _7(a) {
    i = a;
    return M.jump(void 0, _3);
  }
  function _8() {}
}