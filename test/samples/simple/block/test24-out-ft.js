function a_1(a_v) {
  var a;
  a = a_v.i++;
  return eff2(a);
}

function a() {
  var a_v = {
    i: undefined
  },
      a;
  a = a_v.i++;
  return M.jM(eff1(a), a_1, a_v);
}