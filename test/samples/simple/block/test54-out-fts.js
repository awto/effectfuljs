function a() {
  var i;
  i = 0;
  return M.j(eff(1), a_1, i);
}

function a_1(i) {
  i++;
  return M.j(eff(2), a_2);
}

function a_2() {
  return M.pure();
}