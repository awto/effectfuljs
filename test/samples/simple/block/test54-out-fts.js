function a_1(i) {
  i++;
  return eff(2);
}

function a() {
  var i;
  i = 0;
  return M.jM(eff(1), a_1, i);
}