function a() {
  return M.jM(eff('in body'), _1, _2);

  function _1(cb) {
    return M.jM(eff('in `finally`'), cb);
  }

  function _2() {
    return eff('after `finally`');
  }
}

function b() {
  var e;
  return _1();

  function _1() {
    try {
      return M.jME(eff('in body'), _3, _4, _2);
    } catch (e) {
      return _2();
    }
  }

  function _2() {
    e = ex;
    return M.jM(eff('in `catch`', e), _3, _4);
  }

  function _3(cb) {
    return M.jM(eff('in `finally`'), cb);
  }

  function _4() {
    return eff('after `finally`');
  }
}

function c() {
  return M.jM(eff('in body'), _1, _2);

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
  var e;
  console.log('before');
  return M.jM(eff('before'), _1);

  function _1() {
    try {
      console.log('in body');
      return M.jME(eff('in body'), _4, _6, _2);
    } catch (e) {
      return _2();
    }
  }

  function _2() {
    e = _ex;
    console.log('catch', e);
    return M.jM(eff('catch', e), _3);
  }

  function _3() {
    console.log('catch', e);
    return _4(_6);
  }

  function _4(cb) {
    console.log('in finally');
    return M.jM(eff('in `finally`'), _5, cb);
  }

  function _5(cb) {
    console.log('in finally 2');
    return cb();
  }

  function _6() {
    console.log('after `finally`');
    return eff('after `finally`');
  }
}

function f() {
  var e;
  return _1();

  function _1() {
    try {
      return M.jME(eff('in body'), _3, _4, _2);
    } catch (e) {
      return _2();
    }
  }

  function _2() {
    e = ex1;
    return M.jM(eff('in `catch`'), _3, _4);
  }

  function _3(cb) {
    console.log('in `finally`');
    return cb();
  }

  function _4() {
    return eff('after `finally`');
  }
}

function g() {
  return _1();

  function _1() {
    try {
      return M.jME(eff('in body'), _3, _4, _2);
    } catch (e) {
      return _2();
    }
  }

  function _2() {
    console.log('in `catch`');
    return _3(_4);
  }

  function _3(cb) {
    console.log('in `finally`');
    return cb();
  }

  function _4() {
    return eff('after `finally`');
  }
}