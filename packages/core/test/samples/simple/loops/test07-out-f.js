import * as M from "@effectful/core";
function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.chain(eff(i, j, k), _1);
  function _1() {
    return M.chain(eff1(i), _2);
  }
  function _2() {
    k = 10;
    return M.chain(eff2(), _3);
  }
  function _3() {
    return M.chain(eff4(k, j), _3);
  }
}