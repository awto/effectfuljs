function a(i) {
  var a = M.context();
  a._i = i;
  a._k = 0;
  return M.chain(eff(a._i), a_1, a_8);
}

function a_1(a) {
  var b, c;
  b = a._i++;
  c = a._j = 1;
  return M.chain(eff(b, c), a_2, a_8);
}

function a_2(a) {
  var b, c;
  b = a._j++;
  c = a._k++;
  return M.chain(eff(b, c), a_3, a_8);
}

function a_3(a) {
  return M.chain(eff(a._i), a_4, a_8);
}

function a_4(a) {
  var b;
  b = a._j = 3;
  return M.chain(eff(b), a_5, a_8);
}

function a_5(a) {
  return M.chain(eff(a._j), a_6, a_8);
}

function a_6(a) {
  return M.chain(eff(a._i), a_7, a_8);
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}