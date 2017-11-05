function a() {
  var i, j, a;
  i = 0;
  j = 0;
  a = i++;
  return M.chain(eff4(i, j), a_1, a_7, i, j, a);
}

function a_1(b, i, j, a) {
  var c;
  c = j++;
  return M.chain(eff3(b, c), a_2, a_7, i, a);
}

function a_2(b, i, a) {
  return M.chain(eff5(i), a_3, a_7, i, a, b);
}

function a_3(c, i, a, b) {
  return M.chain(eff2(a, b, c), a_4, a_7, i);
}

function a_4(a, i) {
  var b;
  b = i++;
  return M.chain(eff1(a, b), a_5, a_7, i);
}

function a_5(a, i) {
  return M.chain(eff0(a, i), a_6, a_7);
}

function a_6() {
  return M.pure();
}

function a_7(e) {
  return M.raise(e);
}