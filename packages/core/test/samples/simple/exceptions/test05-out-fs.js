import * as M from "@effectful/core";

function a() {
  var e;
  return M.jump(void 0, _1, _7);

  function _1() {
    return M.chain(eff(1), _3, _4, _5);
  }

  function _2(ex) {
    e = ex;
    console.log(e);
    return M.jump(void 0, _3, _4, _5);
  }

  function _3(fc, fe, err) {
    console.log("fin");
    return M.jump(void 0, fc, fe, err);
  }

  function _4() {}

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(void 0, _2, _8, a);
  }

  function _8(a) {
    return M.jump(void 0, _3, _6, _5, a);
  }
}