import * as M from "@effectful/core";
function a() {
  var i;
  i = 0;
  return M.chain(eff0(i), _1);
  function _1() {
    i++;
    return M.chain(eff1(i), _2);
  }
  function _2() {
    return M.chain(eff1(i), _3);
  }
  function _3() {
    i++;
    return M.chain(eff1(i), _4);
  }
  function _4() {}
}