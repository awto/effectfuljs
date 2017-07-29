function a_1(i) {
  return M.jM(eff1(i), a_2, i);
}

function a_2(i) {
  return M.jM(eff2(i), a_3, i);
}

function a_3(i) {
  return eff3(i);
}

function a() {
  var i;
  i = 0;
  if (t) return a_1(i);else {
    i++;
    return a_2(i);
  }
}