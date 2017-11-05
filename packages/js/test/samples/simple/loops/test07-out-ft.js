function a() {
  var a = M.context();
  a._i = 0;
  a._j = 0;
  a._k = 0;
  return M.chain(eff(a._i, a._j, a._k), a_1, a_4);
}

function a_1(a) {
  return M.chain(eff1(a._i), a_2, a_4);
}

function a_2(a) {
  a._k = 10;
  return M.chain(eff2(), a_3, a_4);
}

function a_3(a) {
  return M.repeat(eff4(a._k, a._j), a_3, a_4);
}

function a_4(a, e) {
  return M.raise(e);
}