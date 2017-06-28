function a_1() {
  return M.jM(e2(), a_2);
}

function a_2() {
  return M.jM(p1(), a_3);
}

function a_3() {
  console.profile('minimal');
  return M.jM(p2(), a_4);
}

function a_4() {
  console.profileEnd();
  return M.jM(e1(), a_5);
}

function a_5() {
  return e(2);
}

function a() {
  console.log('hi');
  return M.jM(e1(), a_1);
}