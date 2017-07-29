function a_1(i) {
  if (t) return a_2(i);else {
    return eff3(i);
  }
}

function a_2(i) {
  return eff2(i);
}

function a() {
  var i;
  i = 0;
  i++;
  return M.jM(eff1(i), a_1, i);
}