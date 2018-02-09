// *- when branches has effects and it is the last statement
function a() {
  var a = M.context();
  return M.scopeH(a_1, a_3);
}

function b() {
  var b = M.context();
  return M.scopeH(b_1, b_3);
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
  return M.scopeH(e_1, e_3);
}

function f() {
  var f = M.context();
  return M.scopeH(f_1, f_3);
}

function a_1(a) {
  if (true) {
    return M.chainBH(eff(1), a_2, a_3);
  } else {
    return M.chainBH(eff(2), a_2, a_3);
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
    return M.chainBH(eff(1), b_2, b_3);
  } else {
    return M.chainBH(eff(2), b_2, b_3);
  }
}

function b_2(b, r) {
  return M.pure(r);
}

function b_3(b, e) {
  return M.raise(e);
}

function c_1(c) {
  if (true) {
    return M.chainBH(eff(1), c_2, c_5);
  } else {
    return M.chainBH(eff(2), c_2, c_5);
  }
}

function c_2(c) {
  return M.chainBH(eff(3), c_3, c_5);
}

function c_3(c) {
  return M.chainBH(eff(4), c_4, c_5);
}

function c_4(c) {
  return M.pure();
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
    return M.chainBH(eff(2), d_3, d_6);
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
  return M.chainBH(eff(1), e_2, e_3);
}

function e_2(e, a) {
  if (a) {
    return M.pure(1);
  } else {
    return M.pure(2);
  }
}

function e_3(e, _e) {
  return M.raise(_e);
}

function f_1(f) {
  return M.chainBH(eff(1), f_2, f_3);
}

function f_2(f, a) {
  if (a) {
    return M.pure(1);
  } else {
    return M.pure(2);
  }
}

function f_3(f, e) {
  return M.raise(e);
}