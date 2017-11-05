function a() {
  var e;
  return M.jump(_1, _7);

  function _1() {
    return M.chain(eff(1), _3, _5, _4, _5);
  }

  function _2(ex) {
    e = ex;
    console.log(e);
    return M.jump(_3, _5, _4, _5);
  }

  function _3(fc, fe, err) {
    var fr;
    console.log('fin');
    return M.jump(fc, fe, fr, err);
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
    return M.jump(_2, _8, a);
  }

  function _8(a) {
    return M.jump(_3, _5, _6, _5, a);
  }
}