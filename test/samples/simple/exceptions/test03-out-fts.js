function a() {
  var a_v = {
    error: undefined,
    error1: undefined
  };

  try {
    console.log('1');
    return M.jH(eff(1), a_2, a_1, undefined, a_v);
  } catch (error) {
    return a_1(error, undefined, a_v);
  }
}

function _a() {
  var a_v = {
    error: undefined
  };

  try {
    console.log('1');
    return M.jH(eff(1), _a_2, _a_1, undefined);
  } catch (error) {
    return _a_1(error, undefined);
  }
}

function a_1(error, e, a_v) {
  e = a_v.error1;
  console.log('2');
  return a_2(e, a_v);
}

function a_2(e, a_v) {
  return M.j(eff(e), a_3);
}

function a_3() {
  return M.pure();
}

function _a_1(error, e) {
  e = error;
  console.log('2');
  error = null;
  return _a_2(e);
}

function _a_2(e) {
  return M.j(eff(e), _a_3);
}

function _a_3() {
  return M.pure();
}