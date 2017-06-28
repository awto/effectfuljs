function a_1(i) {
  return M.jM1(eff2(i++), a_2, i);
}

function a_2(i) {
  if (i) return a_3(i);else {
    return M.jM1(eff3(i++), a_4, i);
  }
}

function a_3(i) {
  i++;
  return a_4(i);
}

function a_4(i) {
  return eff4(i++);
}

function a() {
  var i;
  i = 0;
  return M.jM1(eff1(i), a_1, i);
}