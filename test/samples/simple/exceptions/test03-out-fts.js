function a_1() {
  try {
    console.log('1');
    return M.jME(eff(1), a_3, a_2);
  } catch (e) {
    return a_2();
  }
}

function a_2() {
  var e, error;
  e = error;
  console.log('2');
  return a_3(e);
}

function a_3(e) {
  return eff(e);
}

function _a_1() {
  try {
    console.log('1');
    return M.jME(eff(1), _a_3, _a_2);
  } catch (e) {
    return _a_2();
  }
}

function _a_2() {
  var e, error;
  e = error;
  console.log('2');
  error = null;
  return _a_3(e);
}

function _a_3(e) {
  return eff(e);
}

function a() {
  return a_1();
}

function _a() {
  return _a_1();
}