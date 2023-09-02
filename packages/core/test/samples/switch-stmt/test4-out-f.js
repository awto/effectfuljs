import * as M from "@effectful/core";
function a() {
  return M.chain(eff(1), _1);
  function _1(a) {
    switch (a) {
      case 1:
        return M.chain(effB(1), _2);
      case 2:
        return M.jump(void 0, _2);
      default:
        return M.chain(effB(3), _3);
    }
  }
  function _2() {
    return M.chain(effB(2), _3);
  }
  function _3() {}
}