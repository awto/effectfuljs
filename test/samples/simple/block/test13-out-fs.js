function a() {
  var i;
  i = 0;
  if (t) return _1(i);else {
    i++;
    return _2(i);
  }

  function _1(i) {
    return M.jM1(eff1(i), _2, i);
  }

  function _2(i) {
    return M.jM1(eff2(i), _3, i);
  }

  function _3(i) {
    return eff3(i);
  }
}