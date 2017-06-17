function a() {
  var j;
  j = 0;
  return M.jM(eff(j), _1);

  function _1() {
    return M.jM(eff(j++), _2);
  }

  function _2() {
    return M.jM(eff2(j), _3);
  }

  function _3() {
    return eff3(j++);
  }
}