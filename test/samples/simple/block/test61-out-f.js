function a() {
  var i;
  i = 0;
  return M.j(eff1(i), _1);

  function _1() {
    var a;
    a = i++;
    return M.j(eff2(a), _2);
  }

  function _2() {
    var a;
    if (i) return _3();else {
      a = i++;
      return M.j(eff3(a), _4);
    }
  }

  function _3() {
    i++;
    return _4();
  }

  function _4() {
    var a;
    a = i++;
    return M.j(eff4(a), _5);
  }

  function _5() {
    return M.pure();
  }
}