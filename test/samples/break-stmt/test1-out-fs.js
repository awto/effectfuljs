(function () {
  return M.j(eff(1), _1);

  function _1() {
    return M.jB(eff(2), _2);
  }

  function _2(a) {
    if (a) return _3();else {
      return M.j(eff(3), _3);
    }
  }

  function _3() {
    return M.j(eff(4), _4);
  }

  function _4() {
    return M.j(eff(5), _5);
  }

  function _5() {
    return M.pure();
  }
});

(function () {
  return M.j(eff(1), _1);

  function _1() {
    return M.jB(eff(2), _2);
  }

  function _2(a) {
    if (a) return _3();else {
      return M.j(eff(3), _4);
    }
  }

  function _3() {
    return M.j(eff('a'), _4);
  }

  function _4() {
    return M.j(eff(4), _5);
  }

  function _5() {
    return M.j(eff(5), _6);
  }

  function _6() {
    return M.pure();
  }
});

(function () {
  return M.j(eff(1), _1);

  function _1() {
    return M.jB(eff(2), _2);
  }

  function _2(a) {
    if (a) return _3();else {
      return M.j(eff(4), _6);
    }
  }

  function _3() {
    return M.j(eff('a'), _4);
  }

  function _4() {
    return M.jB(eff('b'), _5);
  }

  function _5(a) {
    return M.pure(a);
  }

  function _6() {
    return M.j(eff(5), _7);
  }

  function _7() {
    return M.pure();
  }
});