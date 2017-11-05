function a() {
  var a = M.context();
  return M.chain(eff(1), a_1, a_3);
}

function a_1(a, b) {
  a._ = b;
  return M.chain(eff(2), a_2, a_3);
}

function a_2(a, b) {
  console.log(a._ + b, 2);
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}