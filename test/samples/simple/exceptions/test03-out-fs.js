function a() {
  var error;
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
    var e;
    e = _error;
    console.log('2');
    return _3(e);
  }

  function _3(e) {
    return eff(e);
  }
}

function _a() {
  var error;
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
    var e, error;
    e = error;
    console.log('2');
    error = null;
    return _3(e);
  }

  function _3(e) {
    return eff(e);
  }
}