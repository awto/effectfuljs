function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.j(eff(i, j, k), a_1, i, j);
}

function a_1(i, j) {
  return M.j(eff1(i), a_2, j);
}

function a_2(j) {
  var k;
  k = 10;
  return M.j(eff2(), a_3, j, k);
}

function a_3(j, k) {
  return M.jR(eff4(k, j), a_3, j, k);
}

function a_4() {
  var i, j, k;
  i = 20, j = 30, k = 40;
  return M.jR(eff5(), a_4);
}

function a_5() {
  return M.pure();
}