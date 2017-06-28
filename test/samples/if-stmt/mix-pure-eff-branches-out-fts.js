function a_1() {
  return eff(1);
}

function b_1() {
  return M.jM(eff(1), b_2);
}

function b_2() {
  return M.jM(eff(3), b_3);
}

function b_3() {
  return eff(4);
}

function c_1() {
  return M.jM(eff(1), c_2);
}

function c_2() {
  return M.jM(eff(3), c_3);
}

function c_3() {
  return eff(4);
}

function d_1() {
  if (true) return d_2();else {
    console.log(3);
    return d_3();
  }
}

function d_2() {
  return M.jM(eff(1), d_3);
}

function d_3() {
  return M.jM(eff(3), d_4);
}

function d_4() {
  return eff(4);
}

function e_1(a) {
  if (a) return M.pure();else {
    return eff('2');
  }
}

function f_1(a) {
  if (a) return f_2();else {
    return eff('2');
  }
}

function f_2() {
  return eff('i');
}

function g_1(a) {
  if (a) return M.pure();else {
    console.log('2');
    return M.pure();
  }
}

function h_1(a) {
  if (a) return M.pure();else {
    console.log('2');
    return eff('2');
  }
}

function i_1(a) {
  if (a) return M.pure();else {
    console.log('2');
    return eff(2);
  }
}

function j_1(a) {
  if (a) return M.pure();else {
    console.log('2');
    return M.jM(eff(2), j_2);
  }
}

function j_2() {
  console.log('3');
  return M.pure();
}

// *- when there is a mix of pure and effectful branches
function a() {
  if (true) return a_1();else {
    return M.pure(3);
  }
}

function b() {
  if (true) return b_1();else {
    console.log(3);
    return b_2();
  }
}

function c() {
  if (true) return c_1();else {
    console.log(3);
    return M.pure(3);
  }
}

function d() {
  return M.jM(eff('a'), d_1);
}

function e() {
  return M.jMB(eff('1'), e_1);
}

function f() {
  return M.jMB(eff('1'), f_1);
}

function g() {
  return M.jMB(eff('1'), g_1);
}

function h() {
  return M.jMB(eff('1'), h_1);
}

function i() {
  return M.jMB(eff('1'), i_1);
}

function j() {
  return M.jMB(eff('1'), j_1);
}