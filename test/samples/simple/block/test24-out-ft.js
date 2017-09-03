function a() {
  var a_v = {
    i: undefined
  },
      a;
  a = a_v.i++;
  return M.j(eff1(a), a_1, a_v);
}

function a_1(a_v) {
  var a;
  a = a_v.i++;
  return M.j(eff2(a), a_2);
}

function a_2() {
  return M.pure();
}