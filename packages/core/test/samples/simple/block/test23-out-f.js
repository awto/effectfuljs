import * as M from "@effectful/core";
function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  return M.chain(eff4(i, j), _1);
  function _1(a) {
    var b;
    b = j++;
    return M.chain(eff3(a, b), _2);
  }
  function _2(a) {
    b = a;
    return M.chain(eff5(i), _3);
  }
  function _3(c) {
    return M.chain(eff2(a, b, c), _4);
  }
  function _4(a) {
    var b;
    b = i++;
    return M.chain(eff1(a, b), _5);
  }
  function _5(a) {
    return M.chain(eff0(a, i), _6);
  }
  function _6() {}
}