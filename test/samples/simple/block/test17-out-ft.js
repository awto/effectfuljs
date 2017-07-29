function a_1(a_v) {
  a_v.i++;
  return eff2(a_v.i);
}

function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM(eff1(a_v.i), a_1, a_v);
}