function a() {
  var j;
  j = 0;
  return M.chain(eff(j), a_1, a_5, j);
}

function a_1(j) {
  var a;
  a = j++;
  return M.chain(eff(a), a_2, a_5, j);
}

function a_2(j) {
  return M.chain(eff2(j), a_3, a_5, j);
}

function a_3(j) {
  var a;
  a = j++;
  return M.chain(eff3(a), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}