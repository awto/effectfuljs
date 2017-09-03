function a() {
  console.log('hi');
  return M.j(e1(), a_1);
}

function a_1() {
  return M.j(e2(), a_2);
}

function a_2() {
  return M.j(p1(), a_3);
}

function a_3() {
  console.profile('minimal');
  return M.j(p2(), a_4);
}

function a_4() {
  console.profileEnd();
  return M.j(e1(), a_5);
}

function a_5() {
  return M.j(e(2), a_6);
}

function a_6() {
  return M.pure();
}