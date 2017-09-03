function a() {
  var j, i;
  return M.j(eff1(), _1);

  function _1() {
    return M.jB(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return _3();
  }

  function _3() {
    if (i < 10) return _4();else {
      return M.j(eff7(i), _7);
    }
  }

  function _4() {
    return M.j(eff3(i, j), _5);
  }

  function _5() {
    var a;
    a = j++;
    return M.j(eff4(a), _6);
  }

  function _6() {
    i++;
    return M.jR(_3);
  }

  function _7() {
    return M.pure();
  }
}