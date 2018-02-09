import * as M from '@effectful/core';

// *- when there is a mix of pure and effectful branches
function a() {
  var a = M.context();
  return M.scopeH(a_1, a_3);
}

function b() {
  var b = M.context();
  return M.scopeH(b_1, b_5);
}

function c() {
  var c = M.context();
  return M.scopeH(c_1, c_5);
}

function d() {
  var d = M.context();
  return M.scopeH(d_1, d_6);
}

function e() {
  var e = M.context();
  return M.scopeH(e_1, e_4);
}

function f() {
  var f = M.context();
  return M.scopeH(f_1, f_5);
}

function g() {
  var g = M.context();
  return M.scopeH(g_1, g_3);
}

function h() {
  var h = M.context();
  return M.scopeH(h_1, h_4);
}

function i() {
  var i = M.context();
  return M.scopeH(i_1, i_4);
}

function j() {
  var j = M.context();
  return M.scopeH(j_1, j_4);
}

function a_1(a) {
  if (true) {
    return M.chainBH(eff(1), a_2, a_3);
  } else {
    return M.pure(3);
  }
}

function a_2(a, r) {
  return M.pure(r);
}

function a_3(a, e) {
  return M.raise(e);
}

function b_1(b) {
  if (true) {
    return M.chainBH(eff(1), b_2, b_5);
  } else {
    console.log(3);
    return M.jumpH(b_2, b_5);
  }
}

function b_2(b) {
  return M.chainBH(eff(3), b_3, b_5);
}

function b_3(b) {
  return M.chainBH(eff(4), b_4, b_5);
}

function b_4(b) {
  return M.pure();
}

function b_5(b, e) {
  return M.raise(e);
}

function c_1(c) {
  if (true) {
    return M.chainBH(eff(1), c_2, c_5);
  } else {
    console.log(3);
    return M.pure(3);
  }
}

function c_2(c) {
  return M.chainBH(eff(3), c_3, c_5);
}

function c_3(c) {
  return M.chainBH(eff(4), c_4, c_5);
}

function c_4(c) {
  return M.pure(c._r);
}

function c_5(c, e) {
  return M.raise(e);
}

function d_1(d) {
  return M.chainBH(eff('a'), d_2, d_6);
}

function d_2(d) {
  if (true) {
    return M.chainBH(eff(1), d_3, d_6);
  } else {
    console.log(3);
    return M.jumpH(d_3, d_6);
  }
}

function d_3(d) {
  return M.chainBH(eff(3), d_4, d_6);
}

function d_4(d) {
  return M.chainBH(eff(4), d_5, d_6);
}

function d_5(d) {
  return M.pure();
}

function d_6(d, e) {
  return M.raise(e);
}

function e_1(e) {
  return M.chainBH(eff('1'), e_2, e_4);
}

function e_2(e, a) {
  if (a) {
    return M.pure();
  } else {
    return M.chainBH(eff('2'), e_3, e_4);
  }
}

function e_3(e) {
  return M.pure();
}

function e_4(e, _e) {
  return M.raise(_e);
}

function f_1(f) {
  return M.chainBH(eff('1'), f_2, f_5);
}

function f_2(f, a) {
  if (a) {
    return M.chainBH(eff('i'), f_4, f_5);
  } else {
    return M.chainBH(eff('2'), f_3, f_5);
  }
}

function f_3(f) {
  return M.pure(f._r);
}

function f_4(f, r) {
  return M.pure(r);
}

function f_5(f, e) {
  return M.raise(e);
}

function g_1(g) {
  return M.chainBH(eff('1'), g_2, g_3);
}

function g_2(g, a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.pure();
  }
}

function g_3(g, e) {
  return M.raise(e);
}

function h_1(h) {
  return M.chainBH(eff('1'), h_2, h_4);
}

function h_2(h, a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chainBH(eff('2'), h_3, h_4);
  }
}

function h_3(h) {
  return M.pure();
}

function h_4(h, e) {
  return M.raise(e);
}

function i_1(i) {
  return M.chainBH(eff('1'), i_2, i_4);
}

function i_2(i, a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chainBH(eff(2), i_3, i_4);
  }
}

function i_3(i) {
  return M.pure();
}

function i_4(i, e) {
  return M.raise(e);
}

function j_1(j) {
  return M.chainBH(eff('1'), j_2, j_4);
}

function j_2(j, a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chainBH(eff(2), j_3, j_4);
  }
}

function j_3(j) {
  console.log('3');
  return M.pure();
}

function j_4(j, e) {
  return M.raise(e);
}