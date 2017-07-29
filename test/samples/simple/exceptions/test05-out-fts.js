function a_1() {
  try {
    return M.jME(eff(1), a_3, M.pure, a_2);
  } catch (e) {
    return a_2();
  }
}

function a_2() {
  var e;
  console.log(e);
  return a_3(M.pure);
}

function a_3(cb) {
  console.log('fin');
  return M.pure();
}

function a() {
  return a_1();
}