function a() {
  var i;
  i = 0;
  return M.j(eff1(i), _1, i);

  function _1(i) {
    var a;
    a = i++;
    return M.j(eff2(a), _2, i);
  }

  function _2(i) {
    var a;
    if (i) return _3(i);else {
      a = i++;
      return M.j(eff3(a), _4, i);
    }
  }

  function _3(i) {
    i++;
    return _4(i);
  }

  function _4(i) {
    var a;
    a = i++;
    return M.j(eff4(a), _5);
  }

  function _5() {
    return M.pure();
  }
}