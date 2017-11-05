function a(i) {
  var k;
  k = 0;
  return M.chain(eff(i), a_1, a_8, i, k);
}

function a_1(i, k) {
  var j, a, b;
  a = i++;
  b = j = 1;
  return M.chain(eff(a, b), a_2, a_8, i, j, k);
}

function a_2(i, j, k) {
  var a, b;
  a = j++;
  b = k++;
  return M.chain(eff(a, b), a_3, a_8, i);
}

function a_3(i) {
  return M.chain(eff(i), a_4, a_8, i);
}

function a_4(i) {
  var j, a;
  a = j = 3;
  return M.chain(eff(a), a_5, a_8, i, j);
}

function a_5(i, j) {
  return M.chain(eff(j), a_6, a_8, i);
}

function a_6(i) {
  return M.chain(eff(i), a_7, a_8);
}

function a_7() {
  return M.pure();
}

function a_8(e) {
  return M.raise(e);
}