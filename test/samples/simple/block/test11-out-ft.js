function a() {
  var a_v = {
    i: undefined
  };
  return M.j(eff0(), a_1, a_v);
}

function a_1(a_v) {
  a_v.i = 0;
  a_v.i++;
  return M.j(eff1(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  a_v.i++;
  if (t) return a_3(a_v);else {
    a_v.i++;
    return a_5(a_v);
  }
}

function a_3(a_v) {
  return M.j(eff2(a_v.i), a_4, a_v);
}

function a_4(a_v) {
  a_v.i++;
  return M.j(eff4(a_v.i), a_5, a_v);
}

function a_5(a_v) {
  return M.j(eff5(a_v.i), a_6);
}

function a_6() {
  return M.pure();
}