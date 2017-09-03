function a() {
  return M.j(eff1(), a_1);
}

function a_1() {
  if (a) return a_2();else {
    return M.j(eff6(), a_3);
  }
}

function a_2() {
  return M.pure(5);
}

function a_3() {
  return M.pure();
}