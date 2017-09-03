function a() {
  var i, a;
  i = 0;
  a = i++;
  return M.j(eff0(a), a_1, i);
}

function a_1(i) {
  return M.j(eff1(i), a_2, i);
}

function a_2(i) {
  i += 1;
  return M.j(eff2(2), a_3, i);
}

function a_3(i) {
  var a;
  a = i += 2;
  return M.j(eff3(a), a_4);
}

function a_4() {
  return M.pure();
}