function a_1() {
  var i;
  i = 0;
  i++;
  return M.jM(eff1(i), a_2, i);
}

function a_2(i) {
  if (t) return a_3(i);else {
    t + i;
    return a_5(i);
  }
}

function a_3(i) {
  return M.jM(eff2(i), a_4, i);
}

function a_4(i) {
  i++;
  return M.jM(eff4(i), a_5, i);
}

function a_5(i) {
  return M.jM(eff5(i), a_6, i);
}

function a_6(i) {
  i++;
  return eff6(i);
}

function a() {
  return M.jM(eff0(), a_1);
}