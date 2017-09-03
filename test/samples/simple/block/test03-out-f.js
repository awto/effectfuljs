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
      return M.j(eff3(i), _4);
    }
  }

  function _3() {
    return M.j(eff2(i), _4);
  }

  function _4() {
    return M.pure();
  }
}