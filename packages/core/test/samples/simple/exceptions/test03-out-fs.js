function a() {
  var error, _error;

  return M.jumpH(_1, _6);

  function _1() {
    console.log('1');
    return M.chainBH(eff(1), _3, _5);
  }

  function _2(ex) {
    var e;
    _error = ex;
    e = _error;
    console.log('2');
    return M.jumpH(_3, _5, e);
  }

  function _3(e) {
    return M.chainBH(eff(e), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    return M.jumpH(_2, _5, a);
  }
}

function a() {
  var error;
  return M.jumpH(_1, _6);

  function _1() {
    console.log('1');
    return M.chainBH(eff(1), _3, _5);
  }

  function _2(ex) {
    var e, error;
    error = ex;
    e = error;
    console.log('2');
    error = null;
    return M.jumpH(_3, _5, e);
  }

  function _3(e) {
    return M.chainBH(eff(e), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    return M.jumpH(_2, _5, a);
  }
}