function a() {
  var a = M.context();
  return M.chain(eff(1), a_1, a_6);
}

function a_1(a, b) {
  a._ = b;
  return M.chain(eff(2), a_2, a_6);
}

function a_2(a, b) {
  a._1 = b;
  return M.chain(eff(3), a_3, a_6);
}

function a_3(a, b) {
  return M.chain(a._1(b), a_4, a_6);
}

function a_4(a, b) {
  return M.chain(a._(b), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}