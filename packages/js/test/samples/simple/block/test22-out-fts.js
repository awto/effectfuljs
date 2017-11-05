function a() {
  var i, j;
  i = 0;
  j = 0;
  return M.chain(eff0(i, j), a_1, a_7, i, j);
}

function a_1(i, j) {
  var a, b;
  a = i++;
  b = j++;
  return M.chain(eff1(a, b), a_2, a_7, i, j);
}

function a_2(i, j) {
  return M.chain(eff2(i), a_3, a_7, i, j);
}

function a_3(i, j) {
  i += 1;
  return M.chain(eff3(2, j), a_4, a_7, i, j);
}

function a_4(i, j) {
  var a;
  a = i += 2;
  return M.chain(eff4(a, j), a_5, a_7, j);
}

function a_5(j) {
  return M.chain(eff5(j), a_6, a_7);
}

function a_6() {
  return M.pure();
}

function a_7(e) {
  return M.raise(e);
}