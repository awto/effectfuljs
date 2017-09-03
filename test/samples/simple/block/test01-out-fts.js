function a() {
  var j;
  j = 0;
  return M.j(eff(j), a_1, j);
}

function a_1(j) {
  var a;
  a = j++;
  return M.j(eff(a), a_2, j);
}

function a_2(j) {
  return M.j(eff2(j), a_3, j);
}

function a_3(j) {
  var a;
  a = j++;
  return M.j(eff3(a), a_4);
}

function a_4() {
  return M.pure();
}