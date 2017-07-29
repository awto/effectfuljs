function a_1(i, j) {
  return M.jM(eff1(i), a_2, i, j);
}

function a_2(i, j) {
  i += 1;
  return M.jM(eff2(2, j), a_3, i, j);
}

function a_3(i, j) {
  var a;
  a = i += 2;
  return M.jM(eff3(a, j), a_4, j);
}

function a_4(j) {
  return eff4(j);
}

function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  b = j++;
  return M.jM(eff0(a, b), a_1, i, j);
}