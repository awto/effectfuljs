function a() {
  return M.chain(eff(1), _1, _5);

  function _1() {
    return M.chain(eff(2), _2, _5);
  }

  function _2() {
    return M.chain(eff(3), _3, _5);
  }

  function _3() {
    return M.chain(eff(4), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function b() {
  return M.chain(eff(1), _1, _7);

  function _1() {
    return M.chain(eff(2), _2, _7);
  }

  function _2() {
    return M.chain(eff(3), _3, _7);
  }

  function _3() {
    return M.chain(eff(4), _4, _7);
  }

  function _4() {
    return M.chain(eff(5), _5, _7);
  }

  function _5() {
    return M.chain(eff(6), _6, _7);
  }

  function _6() {
    console.log('7');
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}

function c() {
  return M.chain(eff(1), _1, _7);

  function _1() {
    return M.chain(eff(2), _2, _7);
  }

  function _2() {
    return M.chain(eff(3), _3, _7);
  }

  function _3() {
    return M.chain(eff(4), _4, _7);
  }

  function _4() {
    return M.chain(eff(5), _5, _7);
  }

  function _5() {
    return M.chain(eff(6), _6, _7);
  }

  function _6() {
    console.log('7');
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}