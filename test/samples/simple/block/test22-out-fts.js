function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.j(eff0(i, j), a_1, i, j);
}

function a_1(i, j) {
  var a, b;
  a = i++;
  b = j++;
  return M.j(eff1(a, b), a_2, i, j);
}

function a_2(i, j) {
  return M.j(eff2(i), a_3, i, j);
}

function a_3(i, j) {
  i += 1;
  return M.j(eff3(2, j), a_4, i, j);
}

function a_4(i, j) {
  var a;
  a = i += 2;
  return M.j(eff4(a, j), a_5, j);
}

function a_5(j) {
  return M.j(eff5(j), a_6);
}

function a_6() {
  return M.pure();
}