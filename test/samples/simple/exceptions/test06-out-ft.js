function a_1(ex, a_v) {
  a_v.e = ex;
  console.log(a_v.e, 1);
  return M.jM1(eff(2), a_2, a_v);
}

function a_2(a_v) {
  console.log(a_v.e, 2);
  return M.pure();
}

function a() {
  var a_v;
  a_v = {
    e: undefined
  };
  return eff(1);
}