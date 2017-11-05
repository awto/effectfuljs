function a() {
  var i, a;
  a = i++;
  return M.chain(eff1(a), a_1, a_2);
}

function a_1() {
  return M.pure();
}

function a_2(e) {
  return M.raise(e);
}