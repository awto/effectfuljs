function a() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(eff(2), _2);
  }

  function _2() {
    return M.jM(eff(3), _3);
  }

  function _3() {
    return eff(4);
  }
}

function b() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(eff(2), _2);
  }

  function _2() {
    return M.jM(eff(3), _3);
  }

  function _3() {
    return M.jM(eff(4), _4);
  }

  function _4() {
    return M.jM(eff(5), _5);
  }

  function _5() {
    return M.jM(eff(6), _6);
  }

  function _6() {
    console.log('7');
    return M.pure();
  }
}

function c() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(eff(2), _2);
  }

  function _2() {
    return M.jM(eff(3), _3);
  }

  function _3() {
    return M.jM(eff(4), _4);
  }

  function _4() {
    return M.jM(eff(5), _5);
  }

  function _5() {
    return M.jM(eff(6), _6);
  }

  function _6() {
    console.log('7');
    return M.pure();
  }
}