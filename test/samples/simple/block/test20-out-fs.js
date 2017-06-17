function a() {
  i = 0;
  return M.jM1(eff0(i), _1, i);

  function _1(i) {
    i++;
    return M.jM1(eff1(i), _2, i);
  }

  function _2(i) {
    return M.jM1(eff1(i), _3, i);
  }

  function _3(i) {
    i++;
    return eff1(i);
  }
}