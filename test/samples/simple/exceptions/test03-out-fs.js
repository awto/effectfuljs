function a() {
  var error;

  try {
    console.log('1');
    return M.jH(eff(1), _2, _1, undefined);
  } catch (error) {
    return _1(error, undefined);
  }

  function _1(error, e) {
    e = error;
    console.log('2');
    return _2(e);
  }

  function _2(e) {
    return M.j(eff(e), _3);
  }

  function _3() {
    return M.pure();
  }
}

function _a() {
  var error;

  try {
    console.log('1');
    return M.jH(eff(1), _2, _1, undefined);
  } catch (error) {
    return _1(error, undefined);
  }

  function _1(error, e) {
    e = error;
    console.log('2');
    error = null;
    return _2(e);
  }

  function _2(e) {
    return M.j(eff(e), _3);
  }

  function _3() {
    return M.pure();
  }
}