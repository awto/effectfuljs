function a() {
  var i;
  i = 0;
  return M.chain(read1(), a_1, a_4);
}

function a_1(a) {
  var i;
  i = a;
  return M.chain(eff(i), a_2, a_4, i);
}

function a_2(i) {
  return M.chain(write(i), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}