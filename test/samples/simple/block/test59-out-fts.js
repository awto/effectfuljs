function a() {
  var i;
  i = 0;
  return M.jB(read1(), a_1);
}

function a_1(i) {
  return M.j(eff(i), a_2, i);
}

function a_2(i) {
  return M.j(write(i), a_3);
}

function a_3() {
  return M.pure();
}