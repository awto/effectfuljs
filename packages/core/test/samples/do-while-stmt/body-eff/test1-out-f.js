import * as M from "@effectful/core";

(function () {
  return M.jump(void 0, _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _1);
    } else {
      return M.chain(eff(3), _3);
    }
  }

  function _3() {
    return M.chain(eff(1), _4);
  }

  function _4(a) {
    if (!a) {} else {
      return M.jump(void 0, _1);
    }
  }
});