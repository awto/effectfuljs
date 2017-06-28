function a_1(i) {
  return M.jM1(eff1(i), a_2, i);
}

function a_2(i) {
  i += 1;
  return M.jM1(eff2(2), a_3, i);
}

function a_3(i) {
  return eff3(i += 2);
}

function a() {
  var i;
  i = 0;
  return M.jM1(eff0(i++), a_1, i);
}