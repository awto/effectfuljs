function a() {
  var i, a;
  a = i++;
  return M.j(eff1(a), a_1, i);
}

function a_1(i) {
  var a;
  a = i++;
  return M.j(eff2(a), a_2);
}

function a_2() {
  return M.pure();
}