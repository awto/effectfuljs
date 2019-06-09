import * as M from "@effectful/core";

(function () {
  var a;
  a = true;
  return M.jump(void 0, _1);

  function _1() {
    if (a) {
      return M.chain(eff(2), _2);
    }
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _3);
    } else {
      return M.chain(eff(3), _3);
    }
  }

  function _3() {
    return M.chain(eff(1), _4);
  }

  function _4(b) {
    a = b;
    return M.jump(void 0, _1);
  }
});