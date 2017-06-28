function a_1(i, j) {
  return M.jM2(eff1(i++, j++), a_2, i, j);
}

function a_2(i, j) {
  return M.jM2(eff2(i), a_3, i, j);
}

function a_3(i, j) {
  i += 1;
  return M.jM2(eff3(2, j), a_4, i, j);
}

function a_4(i, j) {
  return M.jM1(eff4(i += 2, j), a_5, j);
}

function a_5(j) {
  return eff5(j);
}

function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM2(eff0(i, j), a_1, i, j);
}