function a_1(i) {
  return M.jM1(eff2(i), a_2, i);
}

function a_2(i) {
  var a;
  a = i++;
  return M.jMB(eff3(a), a_3);
}

function a_3(i) {
  return eff4(i);
}

function a() {
  var i, a;
  a = i++;
  return M.jMB(eff1(a), a_1);
}