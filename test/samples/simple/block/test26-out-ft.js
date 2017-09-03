function a() {
  var a_v = {
    i: undefined
  },
      a;
  a = a_v.i++;
  return M.jB(eff1(a), a_1, a_v);
}

function a_1(a, a_v) {
  a_v.i = a;
  return M.j(eff2(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  var a;
  a = a_v.i++;
  return M.jB(eff3(a), a_3, a_v);
}

function a_3(a, a_v) {
  a_v.i = a;
  return M.j(eff4(a_v.i), a_4);
}

function a_4() {
  return M.pure();
}