function a_1(i) {
  i++;
  return eff2(i);
}

function a() {
  var i;
  i = 0;
  return M.jM(eff1(i), a_1, i);
}