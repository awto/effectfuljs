function a() {
  var e, error;
  return _1();

  function _1() {
    try {
      console.log('1');
      return M.jME(eff(1), _3, _2);
    } catch (e) {
      return _2();
    }
  }

  function _2() {
    e = _error;
    console.log('2');
    return _3();
  }

  function _3() {
    return eff(e);
  }
}

function _a() {
  var e, error;
  return _1();

  function _1() {
    try {
      console.log('1');
      return M.jME(eff(1), _3, _2);
    } catch (e) {
      return _2();
    }
  }

  function _2() {
    e = error1;
    console.log('2');
    error1 = null;
    return _3();
  }

  function _3() {
    return eff(e);
  }
}