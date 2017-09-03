function a(i) {
  var k;
  k = 0;
  return M.j(eff(i), a_1, i, k);
}

function a_1(i, k) {
  var j, a, b;
  a = i++;
  b = j = 1;
  return M.j(eff(a, b), a_2, i, j, k);
}

function a_2(i, j, k) {
  var a, b;
  a = j++;
  b = k++;
  return M.j(eff(a, b), a_3, i);
}

function a_3(i) {
  return M.j(eff(i), a_4, i);
}

function a_4(i) {
  var j, a;
  a = j = 3;
  return M.j(eff(a), a_5, i, j);
}

function a_5(i, j) {
  return M.j(eff(j), a_6, i);
}

function a_6(i) {
  return M.j(eff(i), a_7);
}

function a_7() {
  return M.pure();
}