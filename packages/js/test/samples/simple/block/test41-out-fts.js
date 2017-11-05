function a() {
  return M.chain(eff1(), a_1, a_9);
}

function a_1() {
  if (a1) {
    return M.chain(eff2(), a_2, a_9);
  } else {
    return M.jump(a_2, a_9);
  }
}

function a_2() {
  return M.chain(eff3(), a_3, a_9);
}

function a_3() {
  if (a2) {
    return M.chain(eff4(), a_4, a_9);
  } else {
    return M.jump(a_4, a_9);
  }
}

function a_4() {
  return M.chain(eff5(), a_5, a_9);
}

function a_5() {
  if (a3) {
    return M.chain(eff6(), a_6, a_9);
  } else {
    return M.jump(a_6, a_9);
  }
}

function a_6() {
  return M.chain(eff7(), a_7, a_9);
}

function a_7() {
  if (a4) {
    return M.chain(eff8(), a_8, a_9);
  } else {
    return M.pure();
  }
}

function a_8() {
  return M.pure();
}

function a_9(e) {
  return M.raise(e);
}