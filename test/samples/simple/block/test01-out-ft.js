function a_1(a_v) {
  var a;
  a = a_v.j++;
  return M.jM(eff(a), a_2, a_v);
}

function a_2(a_v) {
  return M.jM(eff2(a_v.j), a_3, a_v);
}

function a_3(a_v) {
  var a;
  a = a_v.j++;
  return eff3(a);
}

function a() {
  var a_v = {
    j: undefined
  };
  a_v.j = 0;
  return M.jM(eff(a_v.j), a_1, a_v);
}