function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  b = j++;
  return M.j(eff0(a, b), a_1, i, j);
}

function a_1(i, j) {
  return M.j(eff1(i), a_2, i, j);
}

function a_2(i, j) {
  i += 1;
  return M.j(eff2(2, j), a_3, i, j);
}

function a_3(i, j) {
  var a;
  a = i += 2;
  return M.j(eff3(a, j), a_4, j);
}

function a_4(j) {
  return M.j(eff4(j), a_5);
}

function a_5() {
  return M.pure();
}