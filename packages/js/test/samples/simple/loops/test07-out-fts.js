function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.chain(eff(i, j, k), a_1, a_4, i, j);
}

function a_1(i, j) {
  return M.chain(eff1(i), a_2, a_4, j);
}

function a_2(j) {
  var k;
  k = 10;
  return M.chain(eff2(), a_3, a_4, j, k);
}

function a_3(j, k) {
  return M.repeat(eff4(k, j), a_3, a_4, j, k);
}

function a_4(e) {
  return M.raise(e);
}