function a_1(i, j) {
  return M.jM2(eff1(i), a_2, i, j);
}

function a_2(i, j) {
  i += 1;
  return M.jM2(eff2(2, j), a_3, i, j);
}

function a_3(i, j) {
  return M.jM1(eff3(i += 2, j), a_4, j);
}

function a_4(j) {
  return eff4(j);
}

function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM2(eff0(i++, j++), a_1, i, j);
}