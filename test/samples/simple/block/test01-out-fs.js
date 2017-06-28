function a() {
  var j;
  j = 0;
  return M.jM1(eff(j), _1, j);

  function _1(j) {
    return M.jM1(eff(j++), _2, j);
  }

  function _2(j) {
    return M.jM1(eff2(j), _3, j);
  }

  function _3(j) {
    return eff3(j++);
  }
}