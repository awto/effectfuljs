function a() {
  var i;
  i = 0;
  return M.j(eff0(i), a_1, i);
}

function a_1(i) {
  i++;
  return M.j(eff1(i), a_2, i);
}

function a_2(i) {
  return M.j(eff1(i), a_3, i);
}

function a_3(i) {
  i++;
  return M.j(eff1(i), a_4);
}

function a_4() {
  return M.pure();
}