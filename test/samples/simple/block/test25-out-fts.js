function a_1(i) {
  return M.jM1(eff1(i++), a_2, i);
}

function a_2(i) {
  return eff2(i++);
}

function a_3(i) {
  return eff2(i++);
}

function a() {
  var i;
  if (ee) return a_1(i);else {
    return M.jM1(eff1(i++), a_3, i);
  }
}