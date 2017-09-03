function a() {
  var i;
  i = 0;
  return M.j(eff(i), a_1, i);
}

function a_1(i) {
  var a;
  a = i++;
  if (a) return a_2(i);else {
    return M.j(eff2(i), a_3, i);
  }
}

function a_2(i) {
  return M.j(eff1(i), a_3, i);
}

function a_3(i) {
  return M.j(eff(i), a_4);
}

function a_4() {
  return M.pure();
}