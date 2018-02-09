import * as M from '@effectful/core';

function a(i) {
  var k;
  k = 0;
  return M.chainBH(eff(i), _1, _8, i, k);

  function _1(i, k) {
    var j, a, b;
    a = i++;
    b = j = 1;
    return M.chainBH(eff(a, b), _2, _8, i, j, k);
  }

  function _2(i, j, k) {
    var a, b;
    a = j++;
    b = k++;
    return M.chainBH(eff(a, b), _3, _8, i);
  }

  function _3(i) {
    return M.chainBH(eff(i), _4, _8, i);
  }

  function _4(i) {
    var j, a;
    a = j = 3;
    return M.chainBH(eff(a), _5, _8, i, j);
  }

  function _5(i, j) {
    return M.chainBH(eff(j), _6, _8, i);
  }

  function _6(i) {
    return M.chainBH(eff(i), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}