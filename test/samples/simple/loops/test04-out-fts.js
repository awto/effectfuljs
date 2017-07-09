function a_1() {
  return M.jMB(eff2(), a_2);
}

function a_2(i) {
  return a_3(i);
}

function a_3(i) {
  if (i < 10) return a_4(i);else {
    return eff7(i);
  }
}

function a_4(i) {
  var j;
  return M.jM2(eff3(i, j), a_5, j, i);
}

function a_5(j, i) {
  return M.jM1(eff4(j++), a_6, i);
}

function a_6(i) {
  i++;
  return M.jR1(a_3, i);
}

function a() {
  return M.jM(eff1(), a_1);
}