function a() {
  var fc, err;
  return M.jump(_1, _7);

  function _1() {
    fc = _3;
    return M.chain(eff('in body'), _2, _5);
  }

  function _2() {
    return M.chain(eff('in `finally`'), fc);
  }

  function _3() {
    return M.chain(eff('after `finally`'), _4, _5);
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
    fc = _6, err = a;
    return M.jump(_2, _5);
  }
}

function b() {
  var e, ex, fc, err;
  return M.jump(_1, _8);

  function _1() {
    fc = _4;
    return M.chain(eff('in body'), _3, _6);
  }

  function _2() {
    e = ex;
    fc = _4;
    return M.chain(eff('in `catch`', e), _3, _6);
  }

  function _3() {
    return M.chain(eff('in `finally`'), fc);
  }

  function _4() {
    return M.chain(eff('after `finally`'), _5, _6);
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
    return M.jump(_2, _9);
  }

  function _9(a) {
    fc = _7, err = a;
    return M.jump(_3, _6);
  }
}

function c() {
  var fc, err;
  return M.jump(_1, _7);

  function _1() {
    fc = _3;
    return M.chain(eff('in body'), _2, _5);
  }

  function _2() {
    console.log('in `finally`');
    return M.jump(fc);
  }

  function _3() {
    return M.chain(eff('after `finally`'), _4, _5);
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
    fc = _6, err = a;
    return M.jump(_2, _5);
  }
}

function d() {
  var fc, err;
  return M.jump(_1, _7);

  function _1() {
    console.log('in body');
    fc = _3;
    return M.jump(_2, _5);
  }

  function _2() {
    return M.chain(eff('in `finally`'), fc);
  }

  function _3() {
    return M.chain(eff('after `finally`'), _4, _5);
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
    fc = _6, err = a;
    return M.jump(_2, _5);
  }
}

function e() {
  var e, ex, fc, err;
  console.log('before');
  return M.chain(eff('before'), _1, _10);

  function _1() {
    console.log('in body');
    fc = _6;
    return M.chain(eff('in body'), _4, _8);
  }

  function _2() {
    e = ex;
    console.log('catch', e);
    return M.chain(eff('catch', e), _3, _11);
  }

  function _3() {
    console.log('catch', e);
    fc = _6;
    return M.jump(_4, _8);
  }

  function _4() {
    console.log('in finally');
    return M.chain(eff('in `finally`'), _5, _8);
  }

  function _5() {
    console.log('in finally 2');
    return M.jump(fc);
  }

  function _6() {
    console.log('after `finally`');
    return M.chain(eff('after `finally`'), _7, _8);
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
    return M.jump(_2, _11);
  }

  function _11(a) {
    fc = _9, err = a;
    return M.jump(_4, _8);
  }
}

function f() {
  var e, ex, fc, err;
  return M.jump(_1, _8);

  function _1() {
    fc = _4;
    return M.chain(eff('in body'), _3, _6);
  }

  function _2() {
    e = ex;
    fc = _4;
    return M.chain(eff('in `catch`'), _3, _6);
  }

  function _3() {
    console.log('in `finally`');
    return M.jump(fc);
  }

  function _4() {
    return M.chain(eff('after `finally`'), _5, _6);
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
    return M.jump(_2, _9);
  }

  function _9(a) {
    fc = _7, err = a;
    return M.jump(_3, _6);
  }
}

function g() {
  var e, ex, fc, err;
  return M.jump(_1, _8);

  function _1() {
    fc = _4;
    return M.chain(eff('in body'), _3, _6);
  }

  function _2() {
    e = ex;
    console.log('in `catch`');
    fc = _4;
    return M.jump(_3, _6);
  }

  function _3() {
    console.log('in `finally`');
    return M.jump(fc);
  }

  function _4() {
    return M.chain(eff('after `finally`'), _5, _6);
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
    return M.jump(_2, _9);
  }

  function _9(a) {
    fc = _7, err = a;
    return M.jump(_3, _6);
  }
}