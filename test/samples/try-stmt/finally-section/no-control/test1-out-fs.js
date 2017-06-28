function a() {
  return M.jM1(eff('in body'), _1, _2);

  function _1(cb) {
    return M.jM(eff('in `finally`'), cb);
  }

  function _2() {
    return eff('after `finally`');
  }
}

function b() {
  return _1();

  function _1() {
    try {
      return M.jME(eff('in body'), _2, _3);
    } catch (e) {
      return _3(e);
    }
  }

  function _2() {
    return _4(_5);
  }

  function _3(ex) {
    var e;
    e = ex;
    return M.jM1(eff('in `catch`', e), _4, _5);
  }

  function _4(cb) {
    return M.jM(eff('in `finally`'), cb);
  }

  function _5() {
    return eff('after `finally`');
  }
}

function c() {
  return M.jM1(eff('in body'), _1, _2);

  function _1(cb) {
    console.log('in `finally`');
    return cb();
  }

  function _2() {
    return eff('after `finally`');
  }
}

function d() {
  console.log('in body');
  return _1(_2);

  function _1(cb) {
    return M.jM(eff('in `finally`'), cb);
  }

  function _2() {
    return eff('after `finally`');
  }
}

function e() {
  console.log('before');
  return M.jM(eff('before'), _1);

  function _1() {
    try {
      console.log('in body');
      return M.jME(eff('in body'), _2, _3);
    } catch (e) {
      return _3(e);
    }
  }

  function _2() {
    return _5(_7);
  }

  function _3(ex) {
    var e;
    e = ex;
    console.log('catch', e);
    return M.jM1(eff('catch', e), _4, e);
  }

  function _4(e) {
    console.log('catch', e);
    return _5(_7);
  }

  function _5(cb) {
    console.log('in finally');
    return M.jM1(eff('in `finally`'), _6, cb);
  }

  function _6(cb) {
    console.log('in finally 2');
    return cb();
  }

  function _7() {
    console.log('after `finally`');
    return eff('after `finally`');
  }
}

function f() {
  return _1();

  function _1() {
    try {
      return M.jME(eff('in body'), _2, _3);
    } catch (e) {
      return _3(e);
    }
  }

  function _2() {
    return _4(_5);
  }

  function _3(ex) {
    var e;
    e = ex;
    return M.jM1(eff('in `catch`'), _4, _5);
  }

  function _4(cb) {
    console.log('in `finally`');
    return cb();
  }

  function _5() {
    return eff('after `finally`');
  }
}

function g() {
  return _1();

  function _1() {
    try {
      return M.jME(eff('in body'), _2, _3);
    } catch (e) {
      return _3(e);
    }
  }

  function _2() {
    return _4(_5);
  }

  function _3(ex) {
    var e;
    e = ex;
    console.log('in `catch`');
    return _4(_5);
  }

  function _4(cb) {
    console.log('in `finally`');
    return cb();
  }

  function _5() {
    return eff('after `finally`');
  }
}