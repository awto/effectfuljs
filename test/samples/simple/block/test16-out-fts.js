function a_1(i) {
  return M.jM1(eff(i), a_2, i);
}

function a_2(i) {
  {
    i++;
  }
  return eff2(i);
}

function a() {
  var i;
  i = 0;
  i++;
  return M.jM1(eff1(i), a_1, i);
}