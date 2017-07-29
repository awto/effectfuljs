function a_1(j) {
  var a;
  a = j++;
  return M.jM(eff(a), a_2, j);
}

function a_2(j) {
  return M.jM(eff2(j), a_3, j);
}

function a_3(j) {
  var a;
  a = j++;
  return eff3(a);
}

function a() {
  var j;
  j = 0;
  return M.jM(eff(j), a_1, j);
}