function a() {
  return M.j(eff(1), a_1);
}

function b() {
  return M.j(eff(1), b_1);
}

function c() {
  return M.j(eff(1), c_1);
}

function a_1() {
  return M.j(eff(2), a_2);
}

function a_2() {
  return M.j(eff(3), a_3);
}

function a_3() {
  return M.j(eff(4), a_4);
}

function a_4() {
  return M.pure();
}

function b_1() {
  return M.j(eff(2), b_2);
}

function b_2() {
  return M.j(eff(3), b_3);
}

function b_3() {
  return M.j(eff(4), b_4);
}

function b_4() {
  return M.j(eff(5), b_5);
}

function b_5() {
  return M.j(eff(6), b_6);
}

function b_6() {
  console.log('7');
  return M.pure();
}

function c_1() {
  return M.j(eff(2), c_2);
}

function c_2() {
  return M.j(eff(3), c_3);
}

function c_3() {
  return M.j(eff(4), c_4);
}

function c_4() {
  return M.j(eff(5), c_5);
}

function c_5() {
  return M.j(eff(6), c_6);
}

function c_6() {
  console.log('7');
  return M.pure();
}