import * as M from "@effectful/core";

function a() {
  return M.chain(eff1(), _1);

  function _1() {
    return M.chain(eff2(), _2);
  }

  function _2(a) {
    var i;
    i = a;
    return M.jump(void 0, _3, i);
  }

  function _3(i) {
    return M.chain(eff(3), _4, i);
  }

  function _4(a, i) {
    if (i !== a) {
      return M.chain(eff5(i), _5, i);
    } else {
      return M.chain(eff7(i), _8);
    }
  }

  function _5(i) {
    return M.chain(eff6(i), _6, i);
  }

  function _6(i) {
    return M.chain(eff4(i), _7);
  }

  function _7(a) {
    var i;
    i = a;
    return M.jump(void 0, _3, i);
  }

  function _8() {}
}