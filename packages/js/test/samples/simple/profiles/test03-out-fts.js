function a() {
  return M.chain(p1(), a_1, a_5);
}

function a_1() {
  return M.chain(p2(), a_2, a_5);
}

function a_2() {
  return M.chain(e1(), a_3, a_5);
}

function a_3() {
  return M.chain(e(2), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}