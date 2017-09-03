function a() {
  var i;
  i = 0;
  return M.j(eff(i), _1, i);

  function _1(i) {
    var a;
    a = i++;
    if (a) return _2(i);else {
      return M.j(eff2(i), _3, i);
    }
  }

  function _2(i) {
    return M.j(eff1(i), _3, i);
  }

  function _3(i) {
    return M.j(eff(i), _4);
  }

  function _4() {
    return M.pure();
  }
}