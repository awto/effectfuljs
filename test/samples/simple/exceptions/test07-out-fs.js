function a() {
  return M.jM(eff(1), _1);

  function _1() {
    console.log(1);
    return M.jM(eff(2), _2);
  }

  function _2() {
    console.log(2);
    return M.pure();
  }
}