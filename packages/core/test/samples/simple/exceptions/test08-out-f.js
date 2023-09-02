import * as M from "@effectful/core";
function a() {
  var fc, fe, err;
  return M.jump(void 0, _1, _6);
  function _1() {
    fc = _3, fe = _4;
    return M.chain(eff(1), _2);
  }
  function _2() {
    console.log("fin");
    return M.jump(void 0, fc, fe);
  }
  function _3() {}
  function _4(e) {
    return M.raise(e);
  }
  function _5() {
    return M.raise(err);
  }
  function _6(a) {
    fc = _5, fe = _4, err = a;
    return M.jump(void 0, _2);
  }
}