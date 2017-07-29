function a_1(a_v) {
  return M.jMB(eff2(), a_2, a_v);
}

function a_2(a, a_v) {
  a_v.i = a;
  return a_3(a_v);
}

function a_3(a_v) {
  if (a_v.i < 10) return a_4(a_v);else {
    return eff7(a_v.i);
  }
}

function a_4(a_v) {
  return M.jM(eff3(a_v.i, a_v.j), a_5, a_v);
}

function a_5(a_v) {
  var a;
  a = a_v.j++;
  return M.jM(eff4(a), a_6, a_v);
}

function a_6(a_v) {
  a_v.i++;
  return M.jR(a_3, a_v);
}

function a() {
  var a_v = {
    j: undefined,
    i: undefined
  };
  return M.jM(eff1(), a_1, a_v);
}