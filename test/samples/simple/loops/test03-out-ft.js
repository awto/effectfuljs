function a_1(a_v) {
  return M.jMB(eff2(), a_2, a_v);
}

function a_2(a, a_v) {
  a_v.i = a;
  return a_3(a_v);
}

function a_3(a_v) {
  if (a_v.i < 10) return a_4(a_v);else {
    return eff6(a_v.i, a_v.j, a_v.k);
  }
}

function a_4(a_v) {
  a_v.k++;
  return M.jMB(eff3(a_v.i), a_5, a_v);
}

function a_5(a, a_v) {
  a_v.j = a;
  return M.jMB(eff4(a_v.i), a_6, a_v);
}

function a_6(a, a_v) {
  var b;
  a_v.l = a;
  a_v.l++;
  b = a_v.j++;
  return M.jM(eff5(b, a_v.k, a_v.l), a_7, a_v);
}

function a_7(a_v) {
  a_v.i++;
  return M.jR(a_3, a_v);
}

function a() {
  var a_v = {
    k: undefined,
    i: undefined,
    j: undefined,
    l: undefined
  };
  a_v.k = 0;
  return M.jM(eff1(), a_1, a_v);
}