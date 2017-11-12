function a() {
  return M.jump(_1, _7);

  function _1() {
    return M.chain(eff('in body'), _2, _5, _3);
  }

  function _2(fc, err) {
    return M.chain(eff('in `finally`'), fc, err);
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

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(_2, _5, _6, a);
  }
}

function b() {
  var e;
  return M.jump(_1, _8);

  function _1() {
    return M.chain(eff('in body'), _3, _6, _4);
  }

  function _2(ex) {
    e = ex;
    return M.chain(eff('in `catch`', e), _3, _6, _4);
  }

  function _3(fc, err) {
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

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jump(_2, _9, a);
  }

  function _9(a) {
    return M.jump(_3, _6, _7, a);
  }
}

function c() {
  return M.jump(_1, _7);

  function _1() {
    return M.chain(eff('in body'), _2, _5, _3);
  }

  function _2(fc, err) {
    console.log('in `finally`');
    return M.jump(fc, err);
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

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(_2, _5, _6, a);
  }
}

function d() {
  return M.jump(_1, _7);

  function _1() {
    console.log('in body');
    return M.jump(_2, _5, _3);
  }

  function _2(fc, err) {
    return M.chain(eff('in `finally`'), fc, err);
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

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(_2, _5, _6, a);
  }
}

function e() {
  var e;
  console.log('before');
  return M.chain(eff('before'), _1, _10);

  function _1() {
    console.log('in body');
    return M.chain(eff('in body'), _4, _8, _6);
  }

  function _2(ex) {
    e = ex;
    console.log('catch', e);
    return M.chain(eff('catch', e), _3, _11);
  }

  function _3() {
    console.log('catch', e);
    return M.jump(_4, _8, _6);
  }

  function _4(fc, err) {
    console.log('in finally');
    return M.chain(eff('in `finally`'), _5, _8, fc, err);
  }

  function _5(fc, err) {
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

  function _9(err) {
    return M.raise(err);
  }

  function _10(a) {
    return M.jump(_2, _11, a);
  }

  function _11(a) {
    return M.jump(_4, _8, _9, a);
  }
}

function f() {
  var e;
  return M.jump(_1, _8);

  function _1() {
    return M.chain(eff('in body'), _3, _6, _4);
  }

  function _2(ex) {
    e = ex;
    return M.chain(eff('in `catch`'), _3, _6, _4);
  }

  function _3(fc, err) {
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

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jump(_2, _9, a);
  }

  function _9(a) {
    return M.jump(_3, _6, _7, a);
  }
}

function g() {
  var e;
  return M.jump(_1, _8);

  function _1() {
    return M.chain(eff('in body'), _3, _6, _4);
  }

  function _2(ex) {
    e = ex;
    console.log('in `catch`');
    return M.jump(_3, _6, _4);
  }

  function _3(fc, err) {
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

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jump(_2, _9, a);
  }

  function _9(a) {
    return M.jump(_3, _6, _7, a);
  }
}