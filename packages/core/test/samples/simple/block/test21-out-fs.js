import * as M from "@effectful/core";

function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  b = j++;
  return M.chain(eff0(a, b), _1, i, j);

  function _1(i, j) {
    return M.chain(eff1(i), _2, i, j);
  }

  function _2(i, j) {
    i += 1;
    return M.chain(eff2(2, j), _3, i, j);
  }

  function _3(i, j) {
    var a;
    a = i += 2;
    return M.chain(eff3(a, j), _4, j);
  }

  function _4(j) {
    return M.chain(eff4(j), _5);
  }

  function _5() {}
}