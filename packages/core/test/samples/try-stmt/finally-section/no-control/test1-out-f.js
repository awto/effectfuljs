import * as M from '@effectful/core';

function a() {
  var fc, fe, err;
  return M.jumpH(_1, _7);

  function _1() {
    fc = _3, fe = _5;
    return M.chainBH(eff('in body'), _2, _5);
  }

  function _2() {
    return M.chainBH(eff('in `finally`'), fc, fe);
  }

  function _3() {
    return M.chainBH(eff('after `finally`'), _4, _5);
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
    return M.jumpH(_2, _5);
  }
}

function b() {
  var e, ex, fc, fe, err;
  return M.jumpH(_1, _8);

  function _1() {
    fc = _4, fe = _6;
    return M.chainBH(eff('in body'), _3, _6);
  }

  function _2() {
    e = ex;
    fc = _4, fe = _6;
    return M.chainBH(eff('in `catch`', e), _3, _6);
  }

  function _3() {
    return M.chainBH(eff('in `finally`'), fc, fe);
  }

  function _4() {
    return M.chainBH(eff('after `finally`'), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    ex = a;
    return M.jumpH(_2, _9);
  }

  function _9(a) {
    fc = _7, fe = _6, err = a;
    return M.jumpH(_3, _6);
  }
}

function c() {
  var fc, fe, err;
  return M.jumpH(_1, _7);

  function _1() {
    fc = _3, fe = _5;
    return M.chainBH(eff('in body'), _2, _5);
  }

  function _2() {
    console.log('in `finally`');
    return M.jumpH(fc, fe);
  }

  function _3() {
    return M.chainBH(eff('after `finally`'), _4, _5);
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
    return M.jumpH(_2, _5);
  }
}

function d() {
  var fc, fe, err;
  return M.jumpH(_1, _7);

  function _1() {
    console.log('in body');
    fc = _3, fe = _5;
    return M.jumpH(_2, _5);
  }

  function _2() {
    return M.chainBH(eff('in `finally`'), fc, fe);
  }

  function _3() {
    return M.chainBH(eff('after `finally`'), _4, _5);
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
    return M.jumpH(_2, _5);
  }
}

function e() {
  var e, ex, fc, fe, err;
  console.log('before');
  return M.chainBH(eff('before'), _1, _10);

  function _1() {
    console.log('in body');
    fc = _6, fe = _8;
    return M.chainBH(eff('in body'), _4, _8);
  }

  function _2() {
    e = ex;
    console.log('catch', e);
    return M.chainBH(eff('catch', e), _3, _11);
  }

  function _3() {
    console.log('catch', e);
    fc = _6, fe = _8;
    return M.jumpH(_4, _8);
  }

  function _4() {
    console.log('in finally');
    return M.chainBH(eff('in `finally`'), _5, _8);
  }

  function _5() {
    console.log('in finally 2');
    return M.jumpH(fc, fe);
  }

  function _6() {
    console.log('after `finally`');
    return M.chainBH(eff('after `finally`'), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9() {
    return M.raise(err);
  }

  function _10(a) {
    ex = a;
    return M.jumpH(_2, _11);
  }

  function _11(a) {
    fc = _9, fe = _8, err = a;
    return M.jumpH(_4, _8);
  }
}

function f() {
  var e, ex, fc, fe, err;
  return M.jumpH(_1, _8);

  function _1() {
    fc = _4, fe = _6;
    return M.chainBH(eff('in body'), _3, _6);
  }

  function _2() {
    e = ex;
    fc = _4, fe = _6;
    return M.chainBH(eff('in `catch`'), _3, _6);
  }

  function _3() {
    console.log('in `finally`');
    return M.jumpH(fc, fe);
  }

  function _4() {
    return M.chainBH(eff('after `finally`'), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    ex = a;
    return M.jumpH(_2, _9);
  }

  function _9(a) {
    fc = _7, fe = _6, err = a;
    return M.jumpH(_3, _6);
  }
}

function g() {
  var e, ex, fc, fe, err;
  return M.jumpH(_1, _8);

  function _1() {
    fc = _4, fe = _6;
    return M.chainBH(eff('in body'), _3, _6);
  }

  function _2() {
    e = ex;
    console.log('in `catch`');
    fc = _4, fe = _6;
    return M.jumpH(_3, _6);
  }

  function _3() {
    console.log('in `finally`');
    return M.jumpH(fc, fe);
  }

  function _4() {
    return M.chainBH(eff('after `finally`'), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    ex = a;
    return M.jumpH(_2, _9);
  }

  function _9(a) {
    fc = _7, fe = _6, err = a;
    return M.jumpH(_3, _6);
  }
}