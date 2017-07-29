function a() {
  return M.jM(eff(1), _1, M.pure);

  function _1(cb) {
    console.log('fin');
    return M.pure();
  }
}