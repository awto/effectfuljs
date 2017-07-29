function a_1(a_v) {
  return M.jMB(eff2(), a_2, a_v);
}

function a_2(a, a_v) {
  a_v.i = a;
  return M.jMB(eff3(), a_3, a_v);
}

function a_3(a, a_v) {
  a_v.j = a;
  return a_4(a_v);
}

function a_4(a_v) {
  if (a_v.i < 10 && a_v.j > -10) return a_5(a_v);else {
    return eff5(a_v.i, a_v.j);
  }
}

function a_5(a_v) {
  return M.jMB(eff3(a_v.i), a_6, a_v);
}

function a_6(a, a_v) {
  var b;
  a_v.k1 = a;
  b = a_v.k1++;
  return M.jM(eff4(b), a_7, a_v);
}

function a_7(a_v) {
  a_v.i++, a_v.j--;
  return M.jR(a_4, a_v);
}

// *- should inject forPar
function a() {
  var a_v = {
    k: undefined,
    i: undefined,
    j: undefined,
    k1: undefined
  };
  return M.jM(eff1(), a_1, a_v);
}