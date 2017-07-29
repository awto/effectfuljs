function a() {
  var i;
  i = 0;
  return M.jM(eff(i), _1, i);

  function _1(i) {
    var a;
    a = i++;
    if (a) return _2(i);else {
      return M.jM(eff2(i), _3, i);
    }
  }

  function _2(i) {
    return M.jM(eff1(i), _3, i);
  }

  function _3(i) {
    return eff(i);
  }
}