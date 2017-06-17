// *- when there is a mix of pure and effectful branches
function a() {
  if (true) return _1();else {
    return M.pure(3);
  }

  function _1() {
    return eff(1);
  }
}

function b() {
  if (true) return _1();else {
    console.log(3);
    return _2();
  }

  function _1() {
    return M.jM(eff(1), _2);
  }

  function _2() {
    return M.jM(eff(3), _3);
  }

  function _3() {
    return eff(4);
  }
}

function c() {
  if (true) return _1();else {
    console.log(3);
    return M.pure(3);
  }

  function _1() {
    return M.jM(eff(1), _2);
  }

  function _2() {
    return M.jM(eff(3), _3);
  }

  function _3() {
    return eff(4);
  }
}

function d() {
  return M.jM(eff('a'), _1);

  function _1() {
    if (true) return _2();else {
      console.log(3);
      return _3();
    }
  }

  function _2() {
    return M.jM(eff(1), _3);
  }

  function _3() {
    return M.jM(eff(3), _4);
  }

  function _4() {
    return eff(4);
  }
}

function e() {
  return M.jMB(eff('1'), _1);

  function _1(a) {
    if (a) return M.pure();else {
      return eff('2');
    }
  }
}

function f() {
  return M.jMB(eff('1'), _1);

  function _1(a) {
    if (a) return _2();else {
      return eff('2');
    }
  }

  function _2() {
    return eff('i');
  }
}

function g() {
  return M.jMB(eff('1'), _1);

  function _1(a) {
    if (a) return M.pure();else {
      console.log('2');
      return M.pure();
    }
  }
}

function h() {
  return M.jMB(eff('1'), _1);

  function _1(a) {
    if (a) return M.pure();else {
      console.log('2');
      return eff('2');
    }
  }
}

function i() {
  return M.jMB(eff('1'), _1);

  function _1(a) {
    if (a) return M.pure();else {
      console.log('2');
      return eff(2);
    }
  }
}

function j() {
  return M.jMB(eff('1'), _1);

  function _1(a) {
    if (a) return M.pure();else {
      console.log('2');
      return M.jM(eff(2), _2);
    }
  }

  function _2() {
    console.log('3');
    return M.pure();
  }
}