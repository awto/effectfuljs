function a() {
  var i;
  i = 0;
  i++;
  return M.j(eff1(i), a_1, i);
}

function a_1(i) {
  if (t) return a_2(i);else {
    return M.j(eff3(i), a_3);
  }
}

function a_2(i) {
  return M.j(eff2(i), a_3);
}

function a_3() {
  return M.pure();
}