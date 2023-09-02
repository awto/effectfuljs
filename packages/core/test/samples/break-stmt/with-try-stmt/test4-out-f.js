import * as M from "@effectful/core";
(function () {
  var e, ex;
  return M.jump(void 0, _1, _8);
  function _1() {
    return M.chain(eff(2), _2, _8);
  }
  function _2() {
    return M.chain(eff(3), _3, _8);
  }
  function _3(a) {
    if (a) {
      return M.jump(void 0, _6);
    } else {
      throw new Error("error");
    }
  }
  function _4() {
    e = ex;
    return M.chain(eff(5), _5);
  }
  function _5() {
    return M.chain(eff(6), _6);
  }
  function _6() {
    return M.chain(eff(7), _7);
  }
  function _7() {}
  function _8(a) {
    ex = a;
    return M.jump(void 0, _4);
  }
});