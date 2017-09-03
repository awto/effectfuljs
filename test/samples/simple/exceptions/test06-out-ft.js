function a() {
  var a_v = {
    e: undefined
  };

  try {
    return M.jH(eff(1), a_3, a_1, a_v);
  } catch (ex) {
    return a_1(ex, a_v);
  }
}

function a_1(ex, a_v) {
  a_v.e = ex;
  console.log(a_v.e, 1);
  return M.j(eff(2), a_2, a_v);
}

function a_2(a_v) {
  console.log(a_v.e, 2);
  return a_3(a_v);
}

function a_3(a_v) {
  return M.pure();
}