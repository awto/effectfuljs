function a() {
  var a_v = {
    e: undefined,
    error: undefined,
    error1: undefined
  };

  try {
    console.log('1');
    return M.jH(eff(1), a_2, a_1, a_v);
  } catch (error) {
    return a_1(error, a_v);
  }
}

function _a() {
  var a_v = {
    e: undefined,
    error: undefined,
    error1: undefined
  };

  try {
    console.log('1');
    return M.jH(eff(1), _a_2, _a_1, a_v);
  } catch (error) {
    return _a_1(error, a_v);
  }
}

function a_1(error, a_v) {
  a_v.e = a_v.error1;
  console.log('2');
  return a_2(a_v);
}

function a_2(a_v) {
  return M.j(eff(a_v.e), a_3);
}

function a_3() {
  return M.pure();
}

function _a_1(error, a_v) {
  a_v.e = a_v.error1;
  console.log('2');
  a_v.error1 = null;
  return _a_2(a_v);
}

function _a_2(a_v) {
  return M.j(eff(a_v.e), _a_3);
}

function _a_3() {
  return M.pure();
}