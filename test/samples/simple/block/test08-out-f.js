function a() {
  var i;
  return M.j(eff0(), _1);

  function _1() {
    i = 0;
    i++;
    return M.j(eff1(i), _2);
  }

  function _2() {
    if (t) return _3();else {
      t;
      return _5();
    }
  }

  function _3() {
    return M.j(eff2(i), _4);
  }

  function _4() {
    i++;
    return M.j(eff4(i), _5);
  }

  function _5() {
    return M.j(eff5(i), _6);
  }

  function _6() {
    i++;
    return M.j(eff6(i), _7);
  }

  function _7() {
    return M.pure();
  }
}