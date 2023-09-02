import * as M from "@effectful/core";
(function () {
  var a;
  a = true;
  return M.jump(void 0, _1);
  function _1() {
    if (a) {
      return M.chain(eff(1), _2);
    } else {
      return M.jump(void 0, _6);
    }
  }
  function _2(a) {
    if (a) {
      return M.jump(void 0, _4);
    } else {
      return M.chain(eff(2), _3);
    }
  }
  function _3(a) {
    if (a) {
      return M.jump(void 0, _6);
    } else {
      return M.chain(eff(3), _4);
    }
  }
  function _4() {
    return M.chain(eff(4), _5);
  }
  function _5(b) {
    a = b;
    return M.jump(void 0, _1);
  }
  function _6() {
    return M.chain(eff(5), _7);
  }
  function _7() {}
});