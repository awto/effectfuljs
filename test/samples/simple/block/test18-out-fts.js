function a_1(i) {
  return M.jM(eff1(i), a_2, i);
}

function a_2(i) {
  i += 1;
  return M.jM(eff2(2), a_3, i);
}

function a_3(i) {
  var a;
  a = i += 2;
  return eff3(a);
}

function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.jM(eff0(a), a_1, i);
}