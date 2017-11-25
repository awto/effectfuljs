function a() {
  var fc, fe, err;
  return M.jumpH(_1, _8);

  function _1() {
    return M.chainBH(eff('in body'), _2, _8);
  }

  function _2(a) {
    if (a) {
      fc = _5, fe = _6;
      return M.jumpH(_3, _6);
    } else {
      fc = _4, fe = _6;
      return M.jumpH(_3, _6);
    }
  }

  function _3() {
    return M.chainBH(eff('in `finally`'), fc, fe);
  }

  function _4() {
    return M.chainBH(eff('after `finally`'), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _6, err = a;
    return M.jumpH(_3, _6);
  }
}