function a() {
  var a_v = {
    i: undefined
  };
  a_v.i = 0;
  return M.j(eff(1), a_1, a_v);
}

function a_1(a_v) {
  a_v.i++;
  return M.j(eff(2), a_2);
}

function a_2() {
  return M.pure();
}