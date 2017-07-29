function a_1(a_v) {
  try {
    return M.jME(eff(1), M.pure, a_2);
  } catch (e) {
    return a_2(a_v);
  }
}

function a_2(a_v) {
  a_v.e = ex;
  console.log(a_v.e, 1);
  return M.jM(eff(2), a_3, a_v);
}

function a_3(a_v) {
  console.log(a_v.e, 2);
  return M.pure();
}

function a() {
  var a_v = {
    e: undefined
  };
  return a_1(a_v);
}