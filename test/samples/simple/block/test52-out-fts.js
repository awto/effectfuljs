function a_1() {
  a;
  return M.jMB(test(1), a_2);
}

function a_2(a) {
  if (a) return a_3();else {
    return M.jM(eff(5), a_5);
  }
}

function a_3() {
  b;
  return M.jM(eff(3), a_4);
}

function a_4() {
  c;
  return M.jM(eff(4), a_5);
}

function a_5() {
  return eff(6);
}

function a() {
  return M.jM(eff1(1), a_1);
}