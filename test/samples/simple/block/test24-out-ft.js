function a_1(a_v) {
  return eff2(a_v.i++);
}

function a() {
  var a_v;
  a_v = {
    i: undefined
  };
  return M.jM1(eff1(a_v.i++), a_1, a_v);
}