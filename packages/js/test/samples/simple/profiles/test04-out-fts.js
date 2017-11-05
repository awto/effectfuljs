function a() {
  console.log('hi');
  return M.chain(e1(), a_1, a_7);
}

function a_1() {
  return M.chain(e2(), a_2, a_7);
}

function a_2() {
  return M.chain(p1(), a_3, a_7);
}

function a_3() {
  console.profile('minimal');
  return M.chain(p2(), a_4, a_7);
}

function a_4() {
  console.profileEnd();
  return M.chain(e1(), a_5, a_7);
}

function a_5() {
  return M.chain(e(2), a_6, a_7);
}

function a_6() {
  return M.pure();
}

function a_7(e) {
  return M.raise(e);
}