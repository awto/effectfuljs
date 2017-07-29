function a_1(i, j) {
  var a, b;
  a = i++;
  b = j++;
  return M.jM(eff1(a, b), a_2, i, j);
}

function a_2(i, j) {
  return M.jM(eff2(i), a_3, i, j);
}

function a_3(i, j) {
  i += 1;
  return M.jM(eff3(2, j), a_4, i, j);
}

function a_4(i, j) {
  var a;
  a = i += 2;
  return M.jM(eff4(a, j), a_5, j);
}

function a_5(j) {
  return eff5(j);
}

function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff0(i, j), a_1, i, j);
}