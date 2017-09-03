function a() {
  return M.j(eff0(), a_1);
}

function a_1() {
  var i;
  i = 0;
  i++;
  return M.j(eff1(i), a_2, i);
}

function a_2(i) {
  if (t) return a_3(i);else {
    t;
    return a_5(i);
  }
}

function a_3(i) {
  return M.j(eff2(i), a_4, i);
}

function a_4(i) {
  i++;
  return M.j(eff4(i), a_5, i);
}

function a_5(i) {
  return M.j(eff5(i), a_6, i);
}

function a_6(i) {
  i++;
  return M.j(eff6(i), a_7);
}

function a_7() {
  return M.pure();
}