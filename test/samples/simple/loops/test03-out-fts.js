function a_1(k) {
  return M.jMB1(eff2(), a_2, k);
}

function a_2(i, k) {
  return a_3(k, i, undefined);
}

function a_3(k, i, j) {
  if (i < 10) return a_4(k, i);else {
    return eff6(i, j, k);
  }
}

function a_4(k, i) {
  k++;
  return M.jMB2(eff3(i), a_5, k, i);
}

function a_5(j, k, i) {
  return M.jMB3(eff4(i), a_6, k, i, j);
}

function a_6(l, k, i, j) {
  l++;
  return M.jM3(eff5(j++, k, l), a_7, k, i, j);
}

function a_7(k, i, j) {
  i++;
  return M.jR3(a_3, k, i, j);
}

function a() {
  var k;
  k = 0;
  return M.jM1(eff1(), a_1, k);
}