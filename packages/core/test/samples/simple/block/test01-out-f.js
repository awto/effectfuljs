import * as M from "@effectful/core";
function a() {
  var j;
  j = 0;
  return M.chain(eff(j), _1);
  function _1() {
    var a;
    a = j++;
    return M.chain(eff(a), _2);
  }
  function _2() {
    return M.chain(eff2(j), _3);
  }
  function _3() {
    var a;
    a = j++;
    return M.chain(eff3(a), _4);
  }
  function _4() {}
}