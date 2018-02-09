import * as M from '@effectful/core';

function a() {
  return M.jumpH(_1, _7);

  function _1() {
    return M.chainBH(eff('in body'), _2, _5, _3, _5);
  }

  function _2(fc, fe, err) {
    return M.chainBH(eff('in `finally`'), fc, fe, err);
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

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jumpH(_2, _5, _6, _5, a);
  }
}

function b() {
  var e;
  return M.jumpH(_1, _8);

  function _1() {
    return M.chainBH(eff('in body'), _3, _6, _4, _6);
  }

  function _2(ex) {
    e = ex;
    return M.chainBH(eff('in `catch`', e), _3, _6, _4, _6);
  }

  function _3(fc, fe, err) {
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

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jumpH(_2, _9, a);
  }

  function _9(a) {
    return M.jumpH(_3, _6, _7, _6, a);
  }
}

function c() {
  return M.jumpH(_1, _7);

  function _1() {
    return M.chainBH(eff('in body'), _2, _5, _3, _5);
  }

  function _2(fc, fe, err) {
    console.log('in `finally`');
    return M.jumpH(fc, fe, err);
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

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jumpH(_2, _5, _6, _5, a);
  }
}

function d() {
  return M.jumpH(_1, _7);

  function _1() {
    console.log('in body');
    return M.jumpH(_2, _5, _3, _5);
  }

  function _2(fc, fe, err) {
    return M.chainBH(eff('in `finally`'), fc, fe, err);
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

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jumpH(_2, _5, _6, _5, a);
  }
}

function e() {
  var e;
  console.log('before');
  return M.chainBH(eff('before'), _1, _10);

  function _1() {
    console.log('in body');
    return M.chainBH(eff('in body'), _4, _8, _6, _8);
  }

  function _2(ex) {
    e = ex;
    console.log('catch', e);
    return M.chainBH(eff('catch', e), _3, _11);
  }

  function _3() {
    console.log('catch', e);
    return M.jumpH(_4, _8, _6, _8);
  }

  function _4(fc, fe, err) {
    console.log('in finally');
    return M.chainBH(eff('in `finally`'), _5, _8, fc, fe, err);
  }

  function _5(fc, fe, err) {
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

  function _9(err) {
    return M.raise(err);
  }

  function _10(a) {
    return M.jumpH(_2, _11, a);
  }

  function _11(a) {
    return M.jumpH(_4, _8, _9, _8, a);
  }
}

function f() {
  var e;
  return M.jumpH(_1, _8);

  function _1() {
    return M.chainBH(eff('in body'), _3, _6, _4, _6);
  }

  function _2(ex) {
    e = ex;
    return M.chainBH(eff('in `catch`'), _3, _6, _4, _6);
  }

  function _3(fc, fe, err) {
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

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jumpH(_2, _9, a);
  }

  function _9(a) {
    return M.jumpH(_3, _6, _7, _6, a);
  }
}

function g() {
  var e;
  return M.jumpH(_1, _8);

  function _1() {
    return M.chainBH(eff('in body'), _3, _6, _4, _6);
  }

  function _2(ex) {
    e = ex;
    console.log('in `catch`');
    return M.jumpH(_3, _6, _4, _6);
  }

  function _3(fc, fe, err) {
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

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jumpH(_2, _9, a);
  }

  function _9(a) {
    return M.jumpH(_3, _6, _7, _6, a);
  }
}