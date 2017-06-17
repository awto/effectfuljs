function a() {
  var error;
  return _1();

  function _1() {
    try {
      console.log('1');
      return M.jM1E(eff(1), _3, undefined, _2);
    } catch (e) {
      return _2();
    }
  }

  function _2(ex) {
    var e, error;
    error = ex;
    e = error;
    console.log('2');
    return _3(e);
  }

  function _3(e) {
    return eff(e);
  }
}