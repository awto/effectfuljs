function a() {
  return M.chain(eff1(1), a_1, a_6);
}

function a_1() {
  a;
  return M.chain(test(1), a_2, a_6);
}

function a_2(a) {
  if (a) {
    b;
    return M.chain(eff(3), a_3, a_6);
  } else {
    return M.chain(eff(5), a_4, a_6);
  }
}

function a_3() {
  c;
  return M.chain(eff(4), a_4, a_6);
}

function a_4() {
  return M.chain(eff(6), a_5, a_6);
}

function a_5() {
  return M.pure();
}

function a_6(e) {
  return M.raise(e);
}