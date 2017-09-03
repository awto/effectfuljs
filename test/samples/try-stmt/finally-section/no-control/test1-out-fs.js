function a() {
  return M.j(eff('in body'), _1, _2);

  function _1(cb) {
    return M.j(eff('in `finally`'), cb);
  }

  function _2() {
    return M.j(eff('after `finally`'), _3);
  }

  function _3() {
    return M.pure();
  }
}

function b() {
  var e;

  try {
    return M.jH(eff('in body'), _2, _1, _3);
  } catch (ex) {
    return _1(ex, undefined);
  }

  function _1(ex, cb) {
    e = ex;
    return M.j(eff('in `catch`', e), _2, _3);
  }

  function _2(cb) {
    return M.j(eff('in `finally`'), cb);
  }

  function _3() {
    return M.j(eff('after `finally`'), _4);
  }

  function _4() {
    return M.pure();
  }
}

function c() {
  return M.j(eff('in body'), _1, _2);

  function _1(cb) {
    console.log('in `finally`');
    return cb();
  }

  function _2() {
    return M.j(eff('after `finally`'), _3);
  }

  function _3() {
    return M.pure();
  }
}

function d() {
  console.log('in body');
  return _1(_2);

  function _1(cb) {
    return M.j(eff('in `finally`'), cb);
  }

  function _2() {
    return M.j(eff('after `finally`'), _3);
  }

  function _3() {
    return M.pure();
  }
}

function e() {
  var e;
  console.log('before');
  return M.j(eff('before'), _1);

  function _1() {
    try {
      console.log('in body');
      return M.jH(eff('in body'), _4, _2, _6);
    } catch (ex) {
      return _2(ex, undefined);
    }
  }

  function _2(ex, cb) {
    e = ex;
    console.log('catch', e);
    return M.j(eff('catch', e), _3);
  }

  function _3() {
    console.log('catch', e);
    return _4(_6);
  }

  function _4(cb) {
    console.log('in finally');
    return M.j(eff('in `finally`'), _5, cb);
  }

  function _5(cb) {
    console.log('in finally 2');
    return cb();
  }

  function _6() {
    console.log('after `finally`');
    return M.j(eff('after `finally`'), _7);
  }

  function _7() {
    return M.pure();
  }
}

function f() {
  var e;

  try {
    return M.jH(eff('in body'), _2, _1, _3);
  } catch (ex) {
    return _1(ex, undefined);
  }

  function _1(ex, cb) {
    e = ex;
    return M.j(eff('in `catch`'), _2, _3);
  }

  function _2(cb) {
    console.log('in `finally`');
    return cb();
  }

  function _3() {
    return M.j(eff('after `finally`'), _4);
  }

  function _4() {
    return M.pure();
  }
}

function g() {
  try {
    return M.jH(eff('in body'), _2, _1, _3);
  } catch (e) {
    return _1(e, undefined);
  }

  function _1(e, cb) {
    console.log('in `catch`');
    return _2(_3);
  }

  function _2(cb) {
    console.log('in `finally`');
    return cb();
  }

  function _3() {
    return M.j(eff('after `finally`'), _4);
  }

  function _4() {
    return M.pure();
  }
}