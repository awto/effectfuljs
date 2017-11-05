function a() {
  var a = M.context();
  return M.chain(eff(1), a_1, a_2);
}

function a_1(a, b) {
  console.log(b, 2);
  return M.pure();
}

function a_2(a, e) {
  return M.raise(e);
}