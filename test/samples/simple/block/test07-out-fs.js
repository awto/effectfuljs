function a() {
  return M.j(eff0(), _1);

  function _1() {
    var i;
    i = 0;
    i++;
    return M.j(eff1(i), _2, i);
  }

  function _2(i) {
    if (t) return _3(i);else {
      return M.j(eff3(), _5, i);
    }
  }

  function _3(i) {
    return M.j(eff2(i), _4, i);
  }

  function _4(i) {
    i++;
    return M.j(eff4(i), _5, i);
  }

  function _5(i) {
    return M.j(eff5(i), _6, i);
  }

  function _6(i) {
    i++;
    return M.j(eff6(i), _7);
  }

  function _7() {
    return M.pure();
  }
}