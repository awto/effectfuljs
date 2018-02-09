function a() {
  var i;
  return M.chainBH(init(), _1, _6);

  function _1(a) {
    i = a;
    return M.jumpH(_2, _6);
  }

  function _2() {
    return M.chainBH(check(), _3, _6);
  }

  function _3(a) {
    if (a === true) {
      return M.chainBH(b1(), _4, _6);
    } else {
      return M.pure();
    }
  }

  function _4() {
    if (v) {
      return M.chainBH(e(), _5, _6);
    } else {
      return M.jumpRH(_5, _6);
    }
  }

  function _5() {
    return M.chainBH(upd(), _2, _6);
  }

  function _6(e) {
    return M.raise(e);
  }
}