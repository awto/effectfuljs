function a() {
  return _1();

  function _1() {
    try {
      return M.jME(eff(1), _3, M.pure, _2);
    } catch (e) {
      return _2();
    }
  }

  function _2() {
    console.log(e);
    return _3(M.pure);
  }

  function _3(cb) {
    console.log('fin');
    return M.pure();
  }
}