import * as M from "@effectful/core";
function a() {
  return M.chain(effb(2), _1);
  function _1(a) {
    return M.chain(eff(a), _2);
  }
  function _2(a) {
    a + 2;
  }
}