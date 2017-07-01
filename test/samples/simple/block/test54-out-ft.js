function a_1(a_v) {
  a_v.i++;
  return eff(2);
}

function a() {
  var a_v;
  a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jM1(eff(1), a_1, a_v);
}