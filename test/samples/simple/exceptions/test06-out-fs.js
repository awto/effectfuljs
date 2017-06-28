function a() {
  return _1();

  function _1() {
    try {
      return M.jME(eff(1), M.pure, _2);
    } catch (e) {
      return _2(e);
    }
  }

  function _2(ex) {
    var e;
    e = ex;
    console.log(e, 1);
    return M.jM1(eff(2), _3, e);
  }

  function _3(e) {
    console.log(e, 2);
    return M.pure();
  }
}