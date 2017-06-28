function a_1(i, k) {
  var j;
  return M.jM3(eff(i++, j = 1), a_2, i, j, k);
}

function a_2(i, j, k) {
  return M.jM1(eff(j++, k++), a_3, i);
}

function a_3(i) {
  return M.jM1(eff(i), a_4, i);
}

function a_4(i) {
  var j;
  return M.jM2(eff(j = 3), a_5, i, j);
}

function a_5(i, j) {
  return M.jM1(eff(j), a_6, i);
}

function a_6(i) {
  return eff(i);
}

function a(i) {
  var k;
  k = 0;
  return M.jM2(eff(i), a_1, i, k);
}