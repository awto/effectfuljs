function a() {
  eff(1);
  eff(2);
  return eff(3);
}

function b() {
  var b = M.context();
  eff(1);
  return M.chain(eff(2), b_1, b_3);
}

function b_1(b) {
  eff(3);
  return M.chain(eff(4), b_2, b_3);
}

function b_2(b) {
  return M.pure(5);
}

function b_3(b, e) {
  return M.raise(e);
}