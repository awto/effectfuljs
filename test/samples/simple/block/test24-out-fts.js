function a_1(i) {
  return eff2(i++);
}

function a() {
  var i;
  return M.jM1(eff1(i++), a_1, i);
}