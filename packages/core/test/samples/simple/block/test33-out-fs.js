import * as M from "@effectful/core";

function a() {
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2(a) {
    if (a) {
      return M.chain(eff3(), _3);
    } else {
      b;
    }
  }

  function _3() {
    return M.chain(eff4(), _4);
  }

  function _4() {}
}