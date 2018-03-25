import * as M from "@effectful/core";

(function () {
  return M.jump(void 0, _1);

  function _1() {
    return M.chain(eff(1), _2);
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _1);
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

  function _5(a) {
    if (!a) {
      return M.jump(void 0, _6);
    } else {
      return M.jump(void 0, _1);
    }
  }

  function _6() {
    return M.chain(eff(5), _7);
  }

  function _7() {}
});