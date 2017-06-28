function a_1() {
  var i;
  i = 0;
  i++;
  return M.jM1(eff1(i), a_2, i);
}

function a_2(i) {
  if (t) return a_3(i);else {
    return eff3(i);
  }
}

function a_3(i) {
  return eff2(i);
}

function a() {
  return M.jM(eff0(), a_1);
}