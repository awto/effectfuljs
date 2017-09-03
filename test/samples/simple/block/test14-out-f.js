function a() {
  var i;
  i = 0;
  return M.j(eff(i), _1);

  function _1() {
    var a;
    a = i++;
    if (a) return _2();else {
      return M.j(eff2(i), _3);
    }
  }

  function _2() {
    return M.j(eff1(i), _3);
  }

  function _3() {
    return M.j(eff(i), _4);
  }

  function _4() {
    return M.pure();
  }
}