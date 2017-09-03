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
      return M.j(eff3(i), _4);
    }
  }

  function _3(i) {
    return M.j(eff2(i), _4);
  }

  function _4() {
    return M.pure();
  }
}