import * as M from '@effectful/core';

function a() {
  var i, a;
  a = i = 0;
  return M.chainBH(eff2(a), _1, _11, i);

  function _1(a, i) {
    var b;
    b = i++;
    return M.chainBH(eff1(a, b), _2, _11, i);
  }

  function _2(i) {
    var a;
    a = i++;
    return M.chainBH(eff3(a), _3, _11, i);
  }

  function _3(i) {
    var a;
    a = i++;
    return M.chainBH(eff4(a), _4, _11, i);
  }

  function _4(i) {
    var a;
    a = i++;
    return M.chainBH(eff5(a), _5, _11, i);
  }

  function _5(i) {
    var a;
    a = i++;
    return M.chainBH(eff6(a), _6, _11, i);
  }

  function _6(a, i) {
    var b;

    if (a) {
      b = i++;
      return M.chainBH(eff7(b), _8, _11, i);
    } else {
      return M.chainBH(eff7(i), _7, _11, i);
    }
  }

  function _7(a, i) {
    var b;

    if (a) {
      i++;
      b = i++;
      return M.chainBH(eff8(b), _8, _11, i);
    } else {
      return M.pure(10);
    }
  }

  function _8(i) {
    var a;
    a = i++;
    return M.chainBH(eff9(a), _9, _11, i);
  }

  function _9(i) {
    var a;
    a = i++;
    return M.chainBH(eff10(a), _10, _11);
  }

  function _10() {
    var r;
    return M.pure(r);
  }

  function _11(e) {
    return M.raise(e);
  }
}