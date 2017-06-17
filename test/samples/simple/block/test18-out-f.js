function a() {
  var i;
  i = 0;
  return M.jM(eff0(i++), _1);

  function _1() {
    return M.jM(eff1(i), _2);
  }

  function _2() {
    i += 1;
    return M.jM(eff2(2), _3);
  }

  function _3() {
    return eff3(i += 2);
  }
}