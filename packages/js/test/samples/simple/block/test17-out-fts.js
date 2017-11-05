function a() {
  var i;
  i = 0;
  return M.chain(eff1(i), a_1, a_3, i);
}

function a_1(i) {
  i++;
  return M.chain(eff2(i), a_2, a_3);
}

function a_2() {
  return M.pure();
}

function a_3(e) {
  return M.raise(e);
}