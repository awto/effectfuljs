function a() {
  return M.chain(eff(1), a_1, a_5);
}

function a_1(a) {
  pat = a;
  return M.chain(check(1), a_2, a_5);
}

function a_2(a) {
  if (pat === a) {
    return M.chain(effB(1), a_4, a_5);
  } else {
    return M.chain(check(2), a_3, a_5);
  }
}

function a_3(a) {
  if (pat === a) {
    return M.chain(effB(2), a_4, a_5);
  } else {
    return M.chain(effB(3), a_4, a_5);
  }
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}