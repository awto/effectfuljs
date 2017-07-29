function a() {
  return M.jM(eff(1), _1, M.pure);

  function _1(cb) {
    console.log(1);
    return M.jM(eff(2), _2, cb);
  }

  function _2(cb) {
    console.log(2);
    return M.pure();
  }
}