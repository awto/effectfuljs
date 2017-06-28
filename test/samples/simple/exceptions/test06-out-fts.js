function a_1() {
  try {
    return M.jME(eff(1), M.pure, a_2);
  } catch (e) {
    return a_2(e);
  }
}

function a_2(ex) {
  var e;
  e = ex;
  console.log(e, 1);
  return M.jM1(eff(2), a_3, e);
}

function a_3(e) {
  console.log(e, 2);
  return M.pure();
}

function a() {
  return a_1();
}