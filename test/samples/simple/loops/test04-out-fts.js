function a() {
  return M.j(eff1(), a_1);
}

function a_1() {
  return M.jB(eff2(), a_2);
}

function a_2(i) {
  return a_3(i);
}

function a_3(i) {
  if (i < 10) return a_4(i);else {
    return M.j(eff7(i), a_7);
  }
}

function a_4(i) {
  var j;
  return M.j(eff3(i, j), a_5, j, i);
}

function a_5(j, i) {
  var a;
  a = j++;
  return M.j(eff4(a), a_6, i);
}

function a_6(i) {
  i++;
  return M.jR(a_3, i);
}

function a_7() {
  return M.pure();
}