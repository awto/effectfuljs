function a() {
  return M.j(eff1(1), a_1);
}

function a_1() {
  a;
  return M.jB(test(1), a_2);
}

function a_2(a) {
  if (a) return a_3();else {
    return M.j(eff(5), a_5);
  }
}

function a_3() {
  b;
  return M.j(eff(3), a_4);
}

function a_4() {
  c;
  return M.j(eff(4), a_5);
}

function a_5() {
  return M.j(eff(6), a_6);
}

function a_6() {
  return M.pure();
}