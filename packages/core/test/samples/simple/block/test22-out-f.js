import * as M from "@effectful/core";
function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.chain(eff0(i, j), _1);
  function _1() {
    var a, b;
    a = i++;
    b = j++;
    return M.chain(eff1(a, b), _2);
  }
  function _2() {
    return M.chain(eff2(i), _3);
  }
  function _3() {
    i += 1;
    return M.chain(eff3(2, j), _4);
  }
  function _4() {
    var a;
    a = i += 2;
    return M.chain(eff4(a, j), _5);
  }
  function _5() {
    return M.chain(eff5(j), _6);
  }
  function _6() {}
}