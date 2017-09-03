function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.j(eff5(a), _1);

  function _1() {
    if (ee) return _2();else return _3();
  }

  function _2() {
    var a;
    a = i++;
    return M.j(eff7(a), _3);
  }

  function _3() {
    return M.j(eff8(i), _4);
  }

  function _4() {
    return M.pure();
  }
}