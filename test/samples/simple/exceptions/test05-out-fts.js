function a_1() {
  try {
    return M.jME(eff(1), a_2, a_3);
  } catch (e) {
    return a_3(e);
  }
}

function a_2() {
  return a_4();
}

function a_3(ex) {
  var e;
  e = ex;
  console.log(e);
  return a_4();
}

function a_4() {
  console.log('fin');
  return M.pure();
}

function a() {
  return a_1();
}