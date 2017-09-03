function a() {
  return M.j(eff(1), _1, _2);

  function _1(cb) {
    console.log('fin');
    return cb();
  }

  function _2() {
    return M.pure();
  }
}