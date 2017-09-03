function a() {
  return M.j(eff1(1), a_1);
}

function a_1() {
  a;
  if (test) return a_2();else {
    return M.j(eff(5), a_4);
  }
}

function a_2() {
  b;
  return M.j(eff(3), a_3);
}

function a_3() {
  c;
  return M.j(eff(4), a_4);
}

function a_4() {
  return M.j(eff(6), a_5);
}

function a_5() {
  return M.pure();
}