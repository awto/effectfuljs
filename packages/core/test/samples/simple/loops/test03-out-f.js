import * as M from '@effectful/core';

function a() {
  var k, i, j, l;
  k = 0;
  return M.chainBH(eff1(), _1, _8);

  function _1() {
    return M.chainBH(eff2(), _2, _8);
  }

  function _2(a) {
    i = a;
    return M.jumpH(_3, _8);
  }

  function _3() {
    if (i < 10) {
      k++;
      return M.chainBH(eff3(i), _4, _8);
    } else {
      return M.chainBH(eff6(i, j, k), _7, _8);
    }
  }

  function _4(a) {
    j = a;
    return M.chainBH(eff4(i), _5, _8);
  }

  function _5(a) {
    var b;
    l = a;
    l++;
    b = j++;
    return M.chainBH(eff5(b, k, l), _6, _8);
  }

  function _6() {
    i++;
    return M.jumpRH(_3, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}