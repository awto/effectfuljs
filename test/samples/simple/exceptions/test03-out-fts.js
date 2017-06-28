function a_1() {
  try {
    console.log('1');
    return M.jME(eff(1), a_3, a_2);
  } catch (e) {
    return a_2(e);
  }
}

function a_2(ex) {
  var e, error;
  error = ex;
  e = error;
  console.log('2');
  return a_3(e);
}

function a_3(e) {
  return eff(e);
}

function a() {
  return a_1();
}