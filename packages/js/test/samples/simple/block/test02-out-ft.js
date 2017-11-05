function a() {
  var a = M.context(),
      b;
  b = a._i++;
  return M.chain(eff1(b), a_1, a_2);
}

function a_1(a) {
  return M.pure();
}

function a_2(a, e) {
  return M.raise(e);
}