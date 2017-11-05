function a() {
  var a = M.context();
  a._j = 0;
  return M.chain(eff(a._j), a_1, a_5);
}

function a_1(a) {
  var b;
  b = a._j++;
  return M.chain(eff(b), a_2, a_5);
}

function a_2(a) {
  return M.chain(eff2(a._j), a_3, a_5);
}

function a_3(a) {
  var b;
  b = a._j++;
  return M.chain(eff3(b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}