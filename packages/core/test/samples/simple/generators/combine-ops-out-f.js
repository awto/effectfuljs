import * as M from '@effectful/core';

function d(i) {
  var j, r;
  return M.scopeH(_1, _7);

  function _1() {
    var a;
    j = 0;
    a = i++;
    return M.yldBH(a, _2, _7);
  }

  function _2(a) {
    var b;
    b = j++;
    return M.yldBH((a, b), _3, _7);
  }

  function _3() {
    return M.yldStarBH(some(i += 2, j) + j, _4, _7);
  }

  function _4(a) {
    return M.yldBH(a, _5, _7);
  }

  function _5(a) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStarBH(b, _6, _7);
    } else {
      return M.pure(i);
    }
  }

  function _6(r) {
    return M.pure(r);
  }

  function _7(e) {
    return M.raise(e);
  }
}

function a4() {
  var e, ex, a, fc, fe, err;
  return M.scopeH(_1, _12);

  function _1() {
    return M.yldBH(1, _2, _14);
  }

  function _2() {
    return M.yldBH(2, _3, _14);
  }

  function _3() {
    fc = _8, fe = _12;
    return M.yldBH(3, _6, _12);
  }

  function _4() {
    e = ex;
    return M.yldBH('excep', _5, _15);
  }

  function _5() {
    fc = _8, fe = _12;
    return M.yldBH(e, _6, _12);
  }

  function _6() {
    return M.yldBH('f', _7, _12);
  }

  function _7() {
    return M.yldBH('e', fc, fe);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStarBH(a, _9, _12);
  }

  function _9(c) {
    var b;
    a = c;
    b = a3();
    return M.yldStarBH(b, _10, _12);
  }

  function _10(c) {
    var b;
    b = a1(a, c);
    return M.yldBH(b, _11, _12);
  }

  function _11() {
    return M.pure();
  }

  function _12(e) {
    return M.raise(e);
  }

  function _13() {
    return M.raise(err);
  }

  function _14(a) {
    ex = a;
    return M.jumpH(_4, _15);
  }

  function _15(a) {
    fc = _13, fe = _12, err = a;
    return M.jumpH(_6, _12);
  }
}

function a5() {
  var i, loop, fc, fe, err;
  return M.scopeH(_1, _5);

  function _1() {
    loop = M.iterator(a4());
    return M.jumpH(_2, _7);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.yldBH(i, _2, _7);
    } else {
      fc = _4, fe = _5;
      return M.jumpH(_3, _5);
    }
  }

  function _3() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jumpH(fc, fe);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6() {
    return M.raise(err);
  }

  function _7(a) {
    fc = _6, fe = _5, err = a;
    return M.jumpH(_3, _5);
  }
}