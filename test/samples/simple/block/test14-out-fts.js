function a_1(i) {
  var a;
  a = i++;
  if (a) return a_2(i);else {
    return M.jM(eff2(i), a_3, i);
  }
}

function a_2(i) {
  return M.jM(eff1(i), a_3, i);
}

function a_3(i) {
  return eff(i);
}

function a() {
  var i;
  i = 0;
  return M.jM(eff(i), a_1, i);
}