function a() {
  var fc, err;
  return M.jump(_1, _7);

  function _1() {
    fc = _4;
    return M.chain(eff(1), _2, _5);
  }

  function _2() {
    console.log(1);
    return M.chain(eff(2), _3, _5);
  }

  function _3() {
    console.log(2);
    return M.jump(fc);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6() {
    return M.raise(err);
  }

  function _7(a) {
    fc = _6, err = a;
    return M.jump(_2, _5);
  }
}