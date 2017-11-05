function a() {
  var i, j, a, b;
  i = 0;
  j = 0;
  a = i++;
  b = j++;
  return M.chain(eff0(a, b), a_1, a_6, i, j);
}

function a_1(i, j) {
  return M.chain(eff1(i), a_2, a_6, i, j);
}

function a_2(i, j) {
  i += 1;
  return M.chain(eff2(2, j), a_3, a_6, i, j);
}

function a_3(i, j) {
  var a;
  a = i += 2;
  return M.chain(eff3(a, j), a_4, a_6, j);
}

function a_4(j) {
  return M.chain(eff4(j), a_5, a_6);
}

function a_5() {
  return M.pure();
}

function a_6(e) {
  return M.raise(e);
}