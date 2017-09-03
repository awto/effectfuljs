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
  return M.j(eff('a'), d_1);
}

function e() {
  return M.jB(eff('1'), e_1);
}

function f() {
  return M.jB(eff('1'), f_1);
}

function g() {
  return M.jB(eff('1'), g_1);
}

function h() {
  return M.jB(eff('1'), h_1);
}

function i() {
  return M.jB(eff('1'), i_1);
}

function j() {
  return M.jB(eff('1'), j_1);
}

function a_1() {
  return M.jB(eff(1), a_2);
}

function a_2(a) {
  return M.pure(a);
}

function a_3() {
  return M.pure();
}

function b_1() {
  return M.j(eff(1), b_2);
}

function b_2() {
  return M.j(eff(3), b_3);
}

function b_3() {
  return M.j(eff(4), b_4);
}

function b_4() {
  return M.pure();
}

function c_1() {
  return M.j(eff(1), c_2);
}

function c_2() {
  return M.j(eff(3), c_3);
}

function c_3() {
  return M.j(eff(4), c_4);
}

function c_4() {
  return M.pure();
}

function d_1() {
  if (true) return d_2();else {
    console.log(3);
    return d_3();
  }
}

function d_2() {
  return M.j(eff(1), d_3);
}

function d_3() {
  return M.j(eff(3), d_4);
}

function d_4() {
  return M.j(eff(4), d_5);
}

function d_5() {
  return M.pure();
}

function e_1(a) {
  if (a) return e_2();else {
    return M.j(eff('2'), e_3);
  }
}

function e_2() {
  return M.pure();
}

function e_3() {
  return M.pure();
}

function f_1(a) {
  if (a) return f_2();else {
    return M.j(eff('2'), f_4);
  }
}

function f_2() {
  return M.jB(eff('i'), f_3);
}

function f_3(a) {
  return M.pure(a);
}

function f_4() {
  return M.pure();
}

function g_1(a) {
  if (a) return g_2();else {
    console.log('2');
    return M.pure();
  }
}

function g_2() {
  return M.pure();
}

function h_1(a) {
  if (a) return h_2();else {
    console.log('2');
    return M.j(eff('2'), h_3);
  }
}

function h_2() {
  return M.pure();
}

function h_3() {
  return M.pure();
}

function i_1(a) {
  if (a) return i_2();else {
    console.log('2');
    return M.j(eff(2), i_3);
  }
}

function i_2() {
  return M.pure();
}

function i_3() {
  return M.pure();
}

function j_1(a) {
  if (a) return j_2();else {
    console.log('2');
    return M.j(eff(2), j_3);
  }
}

function j_2() {
  return M.pure();
}

function j_3() {
  console.log('3');
  return M.pure();
}