function a_1(i) {
  i++;
  return M.jM(eff1(i), a_2, i);
}

function a_2(i) {
  return M.jM(eff1(i), a_3, i);
}

function a_3(i) {
  i++;
  return eff1(i);
}

function a() {
  var i;
  i = 0;
  return M.jM(eff0(i), a_1, i);
}