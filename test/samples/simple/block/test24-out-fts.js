function a_1(i) {
  var a;
  a = i++;
  return eff2(a);
}

function a() {
  var i, a;
  a = i++;
  return M.jM(eff1(a), a_1, i);
}