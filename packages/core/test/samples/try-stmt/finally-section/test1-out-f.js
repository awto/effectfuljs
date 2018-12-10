import * as M from "@effectful/core";

function a() {
  var fc, fe, err;
  return M.jump(void 0, _1, _8);

  function _1() {
    return M.chain(eff("in body"), _2, _8);
  }

  function _2(a) {
    if (a) {
      fc = _6, fe = _5;
      return M.jump(void 0, _3);
    } else {
      fc = _4, fe = _5;
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    return M.chain(eff("in `finally`"), fc, fe);
  }

  function _4() {
    return M.chain(eff("after `finally`"), _6);
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6() {}

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _5, err = a;
    return M.jump(void 0, _3);
  }
}