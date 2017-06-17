function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff0(i, j), _1);

  function _1() {
    return M.jM(eff1(i++, j++), _2);
  }

  function _2() {
    return M.jM(eff2(i), _3);
  }

  function _3() {
    i += 1;
    return M.jM(eff3(2, j), _4);
  }

  function _4() {
    return M.jM(eff4(i += 2, j), _5);
  }

  function _5() {
    return eff5(j);
  }
}