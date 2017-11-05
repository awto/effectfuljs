// *- when there is a mix of pure and effectful branches
function a() {
  var a = M.context();

  if (true) {
    return M.chain(eff(1), a_1, a_2);
  } else {
    return M.pure(3);
  }
}

function b() {
  var b = M.context();

  if (true) {
    return M.chain(eff(1), b_1, b_4);
  } else {
    console.log(3);
    return M.jump(b_1, b_4);
  }
}

function c() {
  var c = M.context();

  if (true) {
    return M.chain(eff(1), c_1, c_4);
  } else {
    console.log(3);
    return M.pure(3);
  }
}

function d() {
  var d = M.context();
  return M.chain(eff('a'), d_1, d_5);
}

function e() {
  var e = M.context();
  return M.chain(eff('1'), e_1, e_3);
}

function f() {
  var f = M.context();
  return M.chain(eff('1'), f_1, f_4);
}

function g() {
  var g = M.context();
  return M.chain(eff('1'), g_1, g_2);
}

function h() {
  var h = M.context();
  return M.chain(eff('1'), h_1, h_3);
}

function i() {
  var i = M.context();
  return M.chain(eff('1'), i_1, i_3);
}

function j() {
  var j = M.context();
  return M.chain(eff('1'), j_1, j_3);
}

function a_1(a, r) {
  return M.pure(r);
}

function a_2(a, e) {
  return M.raise(e);
}

function b_1(b) {
  return M.chain(eff(3), b_2, b_4);
}

function b_2(b) {
  return M.chain(eff(4), b_3, b_4);
}

function b_3(b) {
  return M.pure();
}

function b_4(b, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chain(eff(3), c_2, c_4);
}

function c_2(c) {
  return M.chain(eff(4), c_3, c_4);
}

function c_3(c) {
  return M.pure(c._r);
}

function c_4(c, e) {
  return M.raise(e);
}

function d_1(d) {
  if (true) {
    return M.chain(eff(1), d_2, d_5);
  } else {
    console.log(3);
    return M.jump(d_2, d_5);
  }
}

function d_2(d) {
  return M.chain(eff(3), d_3, d_5);
}

function d_3(d) {
  return M.chain(eff(4), d_4, d_5);
}

function d_4(d) {
  return M.pure();
}

function d_5(d, e) {
  return M.raise(e);
}

function e_1(e, a) {
  if (a) {
    return M.pure();
  } else {
    return M.chain(eff('2'), e_2, e_3);
  }
}

function e_2(e) {
  return M.pure();
}

function e_3(e, _e) {
  return M.raise(_e);
}

function f_1(f, a) {
  if (a) {
    return M.chain(eff('i'), f_3, f_4);
  } else {
    return M.chain(eff('2'), f_2, f_4);
  }
}

function f_2(f) {
  return M.pure(f._r);
}

function f_3(f, r) {
  return M.pure(r);
}

function f_4(f, e) {
  return M.raise(e);
}

function g_1(g, a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.pure();
  }
}

function g_2(g, e) {
  return M.raise(e);
}

function h_1(h, a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chain(eff('2'), h_2, h_3);
  }
}

function h_2(h) {
  return M.pure();
}

function h_3(h, e) {
  return M.raise(e);
}

function i_1(i, a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chain(eff(2), i_2, i_3);
  }
}

function i_2(i) {
  return M.pure();
}

function i_3(i, e) {
  return M.raise(e);
}

function j_1(j, a) {
  if (a) {
    return M.pure();
  } else {
    console.log('2');
    return M.chain(eff(2), j_2, j_3);
  }
}

function j_2(j) {
  console.log('3');
  return M.pure();
}

function j_3(j, e) {
  return M.raise(e);
}