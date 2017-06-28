function a() {
  var i;
  i = 0;
  return M.jM1(eff1(i), _1, i);

  function _1(i) {
    return M.jM1(eff2(i++), _2, i);
  }

  function _2(i) {
    if (i) return _3(i);else {
      return M.jM1(eff3(i++), _4, i);
    }
  }

  function _3(i) {
    i++;
    return _4(i);
  }

  function _4(i) {
    return eff4(i++);
  }
}