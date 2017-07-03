function a_1() {
  return M.jM(M.yld(2), a_2);
}

function a_2() {
  return M.jM(M.yldStar(some()), a_3);
}

function a_3() {
  return M.yldStar(some);
}

function a() {
  return M.jM(M.yld(1), a_1);
}