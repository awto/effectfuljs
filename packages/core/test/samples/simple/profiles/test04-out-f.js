function a() {
  console.log('hi');
  return M.chainBH(e1(), _1, _7);

  function _1() {
    return M.chainBH(e2(), _2, _7);
  }

  function _2() {
    return M.chainBH(p1(), _3, _7);
  }

  function _3() {
    console.profile('minimal');
    return M.chainBH(p2(), _4, _7);
  }

  function _4() {
    console.profileEnd();
    return M.chainBH(e1(), _5, _7);
  }

  function _5() {
    return M.chainBH(e(2), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}