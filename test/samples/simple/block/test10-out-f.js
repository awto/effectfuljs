function a() {
  var i;
  return M.jM(eff0(), _1);

  function _1() {
    i = 0;
    i++;
    return M.jM(eff1(i), _2);
  }

  function _2() {
    i++;
    if (t) return _3();else {
      t;
      return _5();
    }
  }

  function _3() {
    return M.jM(eff2(i), _4);
  }

  function _4() {
    i++;
    return M.jM(eff4(i), _5);
  }

  function _5() {
    return eff5(i);
  }
}