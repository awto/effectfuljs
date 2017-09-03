function a() {
  var i;
  i = 0;
  return M.j(eff1(i), a_1, i);
}

function a_1(i) {
  i++;
  return M.j(eff2(i), a_2);
}

function a_2() {
  return M.pure();
}