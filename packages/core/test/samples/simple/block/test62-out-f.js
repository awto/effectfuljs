import * as M from '@effectful/core';

function a(i) {
  var j, k;
  k = 0;
  return M.chainBH(eff(i), _1, _8);

  function _1() {
    var a, b;
    a = i++;
    b = j = 1;
    return M.chainBH(eff(a, b), _2, _8);
  }

  function _2() {
    var a, b;
    a = j++;
    b = k++;
    return M.chainBH(eff(a, b), _3, _8);
  }

  function _3() {
    return M.chainBH(eff(i), _4, _8);
  }

  function _4() {
    var a;
    a = j = 3;
    return M.chainBH(eff(a), _5, _8);
  }

  function _5() {
    return M.chainBH(eff(j), _6, _8);
  }

  function _6() {
    return M.chainBH(eff(i), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}