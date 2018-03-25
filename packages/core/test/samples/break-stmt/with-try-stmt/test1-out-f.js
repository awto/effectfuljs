import * as M from "@effectful/core";

(function () {
  var e, ex;
  return M.jump(void 0, _1, _7);

  function _1() {
    return M.chain(eff(1), _2, _7);
  }

  function _2(a) {
    if (a) {
      return M.chain(eff("before break"), _5);
    } else {
      return M.chain(eff(2), _4);
    }
  }

  function _3() {
    e = ex;
    return M.chain(eff(3), _4);
  }

  function _4() {
    return M.chain(eff(4), _5);
  }

  function _5() {
    return M.chain(eff(5), _6);
  }

  function _6() {}

  function _7(a) {
    ex = a;
    return M.jump(void 0, _3);
  }
});