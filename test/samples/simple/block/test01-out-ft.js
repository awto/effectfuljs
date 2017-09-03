function a() {
  var a_v = {
    j: undefined
  };
  a_v.j = 0;
  return M.j(eff(a_v.j), a_1, a_v);
}

function a_1(a_v) {
  var a;
  a = a_v.j++;
  return M.j(eff(a), a_2, a_v);
}

function a_2(a_v) {
  return M.j(eff2(a_v.j), a_3, a_v);
}

function a_3(a_v) {
  var a;
  a = a_v.j++;
  return M.j(eff3(a), a_4);
}

function a_4() {
  return M.pure();
}