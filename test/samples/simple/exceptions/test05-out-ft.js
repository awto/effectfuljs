function a_1(ex, a_v) {
  a_v.e = ex;
  console.log(a_v.e);
  return a_2();
}

function a_2() {
  console.log('fin');
  return M.pure();
}

function a() {
  var a_v;
  a_v = {
    e: undefined
  };
  return M.jM(eff(1), a_2);
}