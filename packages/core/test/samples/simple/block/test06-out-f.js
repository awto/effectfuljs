import * as M from "@effectful/core";
function a() {
  var i;
  return M.chain(eff0(), _1);
  function _1() {
    i = 0;
    i++;
    return M.chain(eff1(i), _2);
  }
  function _2() {
    if (t) {
      return M.chain(eff2(i), _3);
    } else {
      return M.chain(eff3(i), _4);
    }
  }
  function _3() {
    i++;
    return M.chain(eff4(i), _4);
  }
  function _4() {
    return M.chain(eff5(i), _5);
  }
  function _5() {
    i++;
    return M.chain(eff6(i), _6);
  }
  function _6() {}
}