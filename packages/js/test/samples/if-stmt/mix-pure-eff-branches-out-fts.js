// *- when there is a mix of pure and effectful branches
function a() {
  if (true) {
    return M.chain(eff(1), a_1, a_2);
  } else {
    return M.pure(3);
  }
}

function b() {
  if (true) {
    return M.chain(eff(1), b_1, b_4);
  } else {
    console.log(3);
    return M.jump(b_1, b_4);
  }
}

function c() {
  if (true) {
    return M.chain(eff(1), c_1, c_4);
  } else {
    console.log(3);
    return M.pure(3);
  }
}

function d() {
  return M.chain(eff('a'), d_1, d_5);
}

function e() {
  return M.chain(eff('1'), e_1, e_3);
}

function f() {
  return M.chain(eff('1'), f_1, f_4);
}

function g() {
  return M.chain(eff('1'), g_1, g_2);
}

function h() {
  return M.chain(eff('1'), h_1, h_3);
}

function i() {
  return M.chain(eff('1'), i_1, i_3);
}

function j() {
  return M.chain(eff('1'), j_1, j_3);
}

function a_1(r) {
  return M.pure(r);
}

function a_2(e) {
  return M.raise(e);
}

function b_1() {
  return M.chain(eff(3), b_2, b_4);
}

function b_2() {
  return M.chain(eff(4), b_3, b_4);
}

function b_3() {
  return M.pure();
}

function b_4(e) {
  return M.raise(e);
}

function c_1() {
  return M.chain(eff(3), c_2, c_4);
}

function c_2() {
  return M.chain(eff(4), c_3, c_4);
}

function c_3() {
  var r;
  return M.pure(r);
}

function c_4(e) {
  return M.raise(e);
}

function d_1() {
  if (true) {
    return M.chain(eff(1), d_2, d_5);
  } else {
    console.log(3);
    return M.jump(d_2, d_5);
  }
}

function d_2() {
  return M.chain(eff(3), d_3, d_5);
}

function d_3() {
  return M.chain(eff(4), d_4, d_5);
}

function d_4() {
  return M.pure();
}

function d_5(e) {
  return M.raise(e);
}

function e_1(a) {
  if (a) {
    return M.pure();
  } else {
    return M.chain(eff('2'), e_2, e_3);
  }
}

function e_2() {
  return M.pure();
}

function e_3(e) {
  return M.raise(e);
}

function f_1(a) {
  if (a) {
    return M.chain(eff('i'), f_3, f_4);
  } else {
    return M.chain(eff('2'), f_2, f_4);
  }
}

function f_2() {
  var r;
  return M.pure(r);
}

function f_3(r) {
  return M.pure(r);
}

function f_4(e) {
  return M.raise(e);
}

function g_1(a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.pure();
  }
}

function g_2(e) {
  return M.raise(e);
}

function h_1(a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chain(eff('2'), h_2, h_3);
  }
}

function h_2() {
  return M.pure();
}

function h_3(e) {
  return M.raise(e);
}

function i_1(a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chain(eff(2), i_2, i_3);
  }
}

function i_2() {
  return M.pure();
}

function i_3(e) {
  return M.raise(e);
}

function j_1(a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chain(eff(2), j_2, j_3);
  }
}

function j_2() {
  console.log('3');
  return M.pure();
}

function j_3(e) {
  return M.raise(e);
}