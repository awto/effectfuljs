function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  a_v.i++;
  return M.j(eff1(a_v.i), a_1, a_v);
}

function a_1(a_v) {
  if (t) return a_2(a_v);else {
    return M.j(eff3(a_v.i), a_3);
  }
}

function a_2(a_v) {
  return M.j(eff2(a_v.i), a_3);
}

function a_3() {
  return M.pure();
}