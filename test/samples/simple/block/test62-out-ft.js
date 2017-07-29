function a_1(a_v) {
  var a, b;
  a = a_v.i++;
  b = a_v.j = 1;
  return M.jM(eff(a, b), a_2, a_v);
}

function a_2(a_v) {
  var a, b;
  a = a_v.j++;
  b = a_v.k++;
  return M.jM(eff(a, b), a_3, a_v);
}

function a_3(a_v) {
  return M.jM(eff(a_v.i), a_4, a_v);
}

function a_4(a_v) {
  var a;
  a = a_v.j = 3;
  return M.jM(eff(a), a_5, a_v);
}

function a_5(a_v) {
  return M.jM(eff(a_v.j), a_6, a_v);
}

function a_6(a_v) {
  return eff(a_v.i);
}

function a(i) {
  var a_v = {
    i,
    j: undefined,
    k: undefined
  };
  a_v.k = 0;
  return M.jM(eff(a_v.i), a_1, a_v);
}