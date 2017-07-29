function a_1(a_v) {
  try {
    return M.jME(eff(1), a_3, M.pure, a_2);
  } catch (e) {
    return a_2(a_v);
  }
}

function a_2(a_v) {
  console.log(a_v.e);
  return a_3(M.pure);
}

function a_3(cb) {
  console.log('fin');
  return M.pure();
}

function a() {
  var a_v = {
    e: undefined
  };
  return a_1(a_v);
}