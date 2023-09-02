import * as M from "@effectful/core";
function a() {
  return M.chain(p1(), _1);
  function _1() {
    return M.chain(p2(), _2);
  }
  function _2() {
    return M.chain(e1(), _3);
  }
  function _3() {
    return M.chain(e(2), _4);
  }
  function _4() {}
}