function a_1(ex, a_v) {
  a_v.e = ex;
  console.log(a_v.e);
  return M.pure();
}

function a() {
  var a_v;
  a_v = {
    e: undefined
  };
  return eff(1);
}