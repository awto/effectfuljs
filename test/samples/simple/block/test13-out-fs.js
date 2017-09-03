function a() {
  var i;
  i = 0;
  if (t) return _1(i);else {
    i++;
    return _2(i);
  }

  function _1(i) {
    return M.j(eff1(i), _2, i);
  }

  function _2(i) {
    return M.j(eff2(i), _3, i);
  }

  function _3(i) {
    return M.j(eff3(i), _4);
  }

  function _4() {
    return M.pure();
  }
}