function a() {
  var i, j, a;
  i = 0;
  j = 0;
  a = i++;
  return M.jB(eff4(i, j), a_1, i, j, a);
}

function a_1(b, i, j, a) {
  var c;
  c = j++;
  return M.jB(eff3(b, c), a_2, i, a);
}

function a_2(b, i, a) {
  return M.jB(eff5(i), a_3, i, a, b);
}

function a_3(c, i, a, b) {
  return M.jB(eff2(a, b, c), a_4, i);
}

function a_4(a, i) {
  var b;
  b = i++;
  return M.jB(eff1(a, b), a_5, i);
}

function a_5(a, i) {
  return M.j(eff0(a, i), a_6);
}

function a_6() {
  return M.pure();
}