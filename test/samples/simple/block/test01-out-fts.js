function a_1(j) {
  return M.jM1(eff(j++), a_2, j);
}

function a_2(j) {
  return M.jM1(eff2(j), a_3, j);
}

function a_3(j) {
  return eff3(j++);
}

function a() {
  var j;
  j = 0;
  return M.jM1(eff(j), a_1, j);
}