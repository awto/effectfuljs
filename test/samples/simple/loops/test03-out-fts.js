function a() {
  var k;
  k = 0;
  return M.j(eff1(), a_1, k);
}

function a_1(k) {
  return M.jB(eff2(), a_2, k);
}

function a_2(i, k) {
  return a_3(k, i, undefined);
}

function a_3(k, i, j) {
  if (i < 10) return a_4(k, i);else {
    return M.j(eff6(i, j, k), a_8);
  }
}

function a_4(k, i) {
  k++;
  return M.jB(eff3(i), a_5, k, i);
}

function a_5(j, k, i) {
  return M.jB(eff4(i), a_6, k, i, j);
}

function a_6(l, k, i, j) {
  var a;
  l++;
  a = j++;
  return M.j(eff5(a, k, l), a_7, k, i, j);
}

function a_7(k, i, j) {
  i++;
  return M.jR(a_3, k, i, j);
}

function a_8() {
  return M.pure();
}