import * as M from "@effectful/core";

function a() {
  var e;
  return M.jump(void 0, _1, _5);

  function _1() {
    return M.chain(eff(1), _4);
  }

  function _2(ex) {
    e = ex;
    console.log(e, 1);
    return M.chain(eff(2), _3);
  }

  function _3() {
    console.log(e, 2);
  }

  function _4() {}

  function _5(a) {
    return M.jump(void 0, _2, a);
  }
}