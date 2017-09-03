function a() {
  var a_v = {
    e: undefined
  };

  try {
    return M.jH(eff(1), a_2, a_1, a_v);
  } catch (e) {
    return a_1(e, a_v);
  }
}

function a_1(e, a_v) {
  console.log(a_v.e);
  return a_2(a_v);
}

function a_2(a_v) {
  return M.pure();
}