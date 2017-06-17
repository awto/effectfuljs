function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff0(i++, j++), _1);

  function _1() {
    return M.jM(eff1(i), _2);
  }

  function _2() {
    i += 1;
    return M.jM(eff2(2, j), _3);
  }

  function _3() {
    return M.jM(eff3(i += 2, j), _4);
  }

  function _4() {
    return eff4(j);
  }
}