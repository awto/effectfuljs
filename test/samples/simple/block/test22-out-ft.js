function a() {
  var a_v = {
    i: undefined,
    j: undefined
  };
  a_v.i = 0;
  a_v.j = 0;
  return M.j(eff0(a_v.i, a_v.j), a_1, a_v);
}

function a_1(a_v) {
  var a, b;
  a = a_v.i++;
  b = a_v.j++;
  return M.j(eff1(a, b), a_2, a_v);
}

function a_2(a_v) {
  return M.j(eff2(a_v.i), a_3, a_v);
}

function a_3(a_v) {
  a_v.i += 1;
  return M.j(eff3(2, a_v.j), a_4, a_v);
}

function a_4(a_v) {
  var a;
  a = a_v.i += 2;
  return M.j(eff4(a, a_v.j), a_5, a_v);
}

function a_5(a_v) {
  return M.j(eff5(a_v.j), a_6);
}

function a_6() {
  return M.pure();
}