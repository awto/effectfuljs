function a() {
  var i;
  i = 0;
  if (t) return a_1(i);else {
    i++;
    return a_2(i);
  }
}

function a_1(i) {
  return M.j(eff1(i), a_2, i);
}

function a_2(i) {
  return M.j(eff2(i), a_3, i);
}

function a_3(i) {
  return M.j(eff3(i), a_4);
}

function a_4() {
  return M.pure();
}