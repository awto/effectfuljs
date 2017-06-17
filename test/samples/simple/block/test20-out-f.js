function a() {
  var i;
  i = 0;
  return M.jM(eff0(i), _1);

  function _1() {
    i++;
    return M.jM(eff1(i), _2);
  }

  function _2() {
    return M.jM(eff1(i), _3);
  }

  function _3() {
    i++;
    return eff1(i);
  }
}