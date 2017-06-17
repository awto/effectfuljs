function a() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(this.eff(2), _2);
  }

  function _2() {
    return eff3(this);
  }
}