function a() {
  return M.j(eff0(), a_1);
}

function a_1() {
  var i;
  i = 0;
  i++;
  return M.j(eff1(i), a_2, i);
}

function a_2(i) {
  if (t) return a_3(i);else {
    return M.j(eff3(i), a_4);
  }
}

function a_3(i) {
  return M.j(eff2(i), a_4);
}

function a_4() {
  return M.pure();
}