function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.jB(read1(), a_1, a_v);
}

function a_1(a, a_v) {
  a_v.i = a;
  return M.j(eff(a_v.i), a_2, a_v);
}

function a_2(a_v) {
  return M.j(write(a_v.i), a_3);
}

function a_3() {
  return M.pure();
}