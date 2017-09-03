function a() {
  var i, a;
  a = i++;
  return M.jB(eff1(a), a_1);
}

function a_1(i) {
  return M.j(eff2(i), a_2, i);
}

function a_2(i) {
  var a;
  a = i++;
  return M.jB(eff3(a), a_3);
}

function a_3(i) {
  return M.j(eff4(i), a_4);
}

function a_4() {
  return M.pure();
}