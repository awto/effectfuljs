import * as M from "@effectful/core";

function a() {
  return M.chain(eff1(), _1);

  function _1() {
    if (a1) {
      return M.chain(eff2(), _2);
    } else {
      return M.jump(void 0, _2);
    }
  }

  function _2() {
    return M.chain(eff3(), _3);
  }

  function _3() {
    if (a2) {
      return M.chain(eff4(), _4);
    } else {
      return M.jump(void 0, _4);
    }
  }

  function _4() {
    return M.chain(eff5(), _5);
  }

  function _5() {
    if (a3) {
      return M.chain(eff6(), _6);
    } else {
      return M.jump(void 0, _6);
    }
  }

  function _6() {
    return M.chain(eff7(), _7);
  }

  function _7() {
    if (a4) {
      return M.chain(eff8(), _8);
    }
  }

  function _8() {}
}