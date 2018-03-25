import * as M from "@effectful/core";

function a() {
  var e, ex, fc, fe, err;
  return M.jump(void 0, _1, _7);

  function _1() {
    fc = _4, fe = _5;
    return M.chain(eff(1), _3);
  }

  function _2() {
    e = ex;
    console.log(e);
    fc = _4, fe = _5;
    return M.jump(void 0, _3);
  }

  function _3() {
    console.log("fin");
    return M.jump(void 0, fc, fe);
  }

  function _4() {}

  function _5(e) {
    return M.raise(e);
  }

  function _6() {
    return M.raise(err);
  }

  function _7(a) {
    ex = a;
    return M.jump(void 0, _2, _8);
  }

  function _8(a) {
    fc = _6, fe = _5, err = a;
    return M.jump(void 0, _3);
  }
}