function a() {
  return M.j(eff(1), _1, _3);

  function _1(cb) {
    console.log(1);
    return M.j(eff(2), _2, cb);
  }

  function _2(cb) {
    console.log(2);
    return cb();
  }

  function _3() {
    return M.pure();
  }
}