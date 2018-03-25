import * as M from "@effectful/core";

function a() {
  return M.chain(eff0(), _1);

  function _1() {
    var i;
    i = 0;
    i++;
    return M.chain(eff1(i), _2, i);
  }

  function _2(i) {
    if (t) {
      return M.chain(eff2(i), _3, i);
    } else {
      return M.chain(eff3(i), _4, i);
    }
  }

  function _3(i) {
    i++;
    return M.chain(eff4(i), _4, i);
  }

  function _4(i) {
    return M.chain(eff5(i), _5, i);
  }

  function _5(i) {
    i++;
    return M.chain(eff6(i), _6);
  }

  function _6() {}
}