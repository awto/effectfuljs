function a() {
  var e, ex, fc, fe, err;
  return M.jump(_1, _7);

  function _1() {
    fc = _4, fe = _5;
    return M.chain(eff(1), _3, _5);
  }

  function _2() {
    e = ex;
    console.log(e);
    fc = _4, fe = _5;
    return M.jump(_3, _5);
  }

  function _3() {
    console.log('fin');
    return M.jump(fc, fe, fr);
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
    ex = a;
    return M.jump(_2, _8);
  }

  function _8(a) {
    fc = _6, fe = _5, err = a;
    return M.jump(_3, _5);
  }
}