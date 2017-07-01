function a() {
  var j, i;
  return M.jM(eff1(), _1);

  function _1() {
    return M.jMB(eff2(), _2);
  }

  function _2(a) {
    i = a;
    return _3();
  }

  function _3() {
    if (i < 10) return _4();else {
      return eff7(i);
    }
  }

  function _4() {
    return M.jM(eff3(i, j), _5);
  }

  function _5() {
    return M.jM(eff4(j++), _6);
  }

  function _6() {
    i++;
    return M.jR(_3);
  }
}