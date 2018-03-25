import * as M from "@effectful/core";

function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.chain(eff0(i, j), _1, i, j);

  function _1(i, j) {
    var a, b;
    a = i++;
    b = j++;
    return M.chain(eff1(a, b), _2, i, j);
  }

  function _2(i, j) {
    return M.chain(eff2(i), _3, i, j);
  }

  function _3(i, j) {
    i += 1;
    return M.chain(eff3(2, j), _4, i, j);
  }

  function _4(i, j) {
    var a;
    a = i += 2;
    return M.chain(eff4(a, j), _5, j);
  }

  function _5(j) {
    return M.chain(eff5(j), _6);
  }

  function _6() {}
}