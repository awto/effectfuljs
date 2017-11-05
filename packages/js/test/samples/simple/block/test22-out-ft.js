function a() {
  var a = M.context();
  a._i = 0;
  a._j = 0;
  return M.chain(eff0(a._i, a._j), a_1, a_7);
}

function a_1(a) {
  var b, c;
  b = a._i++;
  c = a._j++;
  return M.chain(eff1(b, c), a_2, a_7);
}

function a_2(a) {
  return M.chain(eff2(a._i), a_3, a_7);
}

function a_3(a) {
  a._i += 1;
  return M.chain(eff3(2, a._j), a_4, a_7);
}

function a_4(a) {
  var b;
  b = a._i += 2;
  return M.chain(eff4(b, a._j), a_5, a_7);
}

function a_5(a) {
  return M.chain(eff5(a._j), a_6, a_7);
}

function a_6(a) {
  return M.pure();
}

function a_7(a, e) {
  return M.raise(e);
}