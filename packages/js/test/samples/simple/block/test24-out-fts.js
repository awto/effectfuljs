function a() {
  var i, a;
  a = i++;
  return M.chain(eff1(a), a_1, a_3, i);
}

function a_1(i) {
  var a;
  a = i++;
  return M.chain(eff2(a), a_2, a_3);
}

function a_2() {
  return M.pure();
}

function a_3(e) {
  return M.raise(e);
}