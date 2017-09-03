function a() {
  return M.j(eff(1), _1);

  function _1() {
    return M.j(eff(2), _2);
  }

  function _2() {
    return M.j(eff(3), _3);
  }

  function _3() {
    return M.j(eff(4), _4);
  }

  function _4() {
    return M.pure();
  }
}

function b() {
  return M.j(eff(1), _1);

  function _1() {
    return M.j(eff(2), _2);
  }

  function _2() {
    return M.j(eff(3), _3);
  }

  function _3() {
    return M.j(eff(4), _4);
  }

  function _4() {
    return M.j(eff(5), _5);
  }

  function _5() {
    return M.j(eff(6), _6);
  }

  function _6() {
    console.log('7');
    return M.pure();
  }
}

function c() {
  return M.j(eff(1), _1);

  function _1() {
    return M.j(eff(2), _2);
  }

  function _2() {
    return M.j(eff(3), _3);
  }

  function _3() {
    return M.j(eff(4), _4);
  }

  function _4() {
    return M.j(eff(5), _5);
  }

  function _5() {
    return M.j(eff(6), _6);
  }

  function _6() {
    console.log('7');
    return M.pure();
  }
}