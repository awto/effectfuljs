function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.j(eff1(a_v.i), a_1, a_v);
}

function a_1(a_v) {
  a_v.i++;
  return M.j(eff2(a_v.i), a_2);
}

function a_2() {
  return M.pure();
}