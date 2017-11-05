function a() {
  var a = M.context(),
      b;
  b = a._i++;
  return M.chain(eff1(b), a_1, a_5);
}

function a_1(a, b) {
  a._i = b;
  return M.chain(eff2(a._i), a_2, a_5);
}

function a_2(a) {
  var b;
  b = a._i++;
  return M.chain(eff3(b), a_3, a_5);
}

function a_3(a, b) {
  a._i = b;
  return M.chain(eff4(a._i), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}