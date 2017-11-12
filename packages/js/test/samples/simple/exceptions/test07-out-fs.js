function a() {
  return M.jump(_1, _7);

  function _1() {
    return M.chain(eff(1), _2, _5, _4);
  }

  function _2(fc, err) {
    console.log(1);
    return M.chain(eff(2), _3, _5, fc, err);
  }

  function _3(fc, err) {
    console.log(2);
    return M.jump(fc, err);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(_2, _5, _6, a);
  }
}