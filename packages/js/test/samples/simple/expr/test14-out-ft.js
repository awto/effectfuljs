function a() {
  var a = M.context();
  return M.chain(eff(1), a_1, a_5);
}

function a_1(a, b) {
  a._ = b;
  return M.chain(eff(2), a_2, a_5);
}

function a_2(a, b) {
  a._1 = b;
  return M.chain(eff(3), a_3, a_5);
}

function a_3(a, b) {
  return M.chain(a._(a._1, b, 4), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}