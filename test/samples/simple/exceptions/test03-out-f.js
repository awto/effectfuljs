function a() {
  var e, error;

  try {
    console.log('1');
    return M.jH(eff(1), _2, _1);
  } catch (error) {
    return _1(error);
  }

  function _1(error) {
    e = error;
    console.log('2');
    return _2();
  }

  function _2() {
    return M.j(eff(e), _3);
  }

  function _3() {
    return M.pure();
  }
}

function _a() {
  var e, error;

  try {
    console.log('1');
    return M.jH(eff(1), _2, _1);
  } catch (error) {
    return _1(error);
  }

  function _1(error) {
    e = error;
    console.log('2');
    error = null;
    return _2();
  }

  function _2() {
    return M.j(eff(e), _3);
  }

  function _3() {
    return M.pure();
  }
}