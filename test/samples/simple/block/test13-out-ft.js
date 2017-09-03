function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  if (t) return a_1(a_v);else {
    a_v.i++;
    return a_2(a_v);
  }
}

function a_1(a_v) {
  return M.j(eff1(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  return M.j(eff2(a_v.i), a_3, a_v);
}

function a_3(a_v) {
  return M.j(eff3(a_v.i), a_4);
}

function a_4() {
  return M.pure();
}