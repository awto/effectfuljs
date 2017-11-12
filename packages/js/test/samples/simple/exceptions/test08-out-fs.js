function a() {
  return M.jump(_1, _6);

  function _1() {
    return M.chain(eff(1), _2, _4, _3);
  }

  function _2(fc, err) {
    console.log('fin');
    return M.jump(fc, err);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jump(_2, _4, _5, a);
  }
}