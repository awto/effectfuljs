// *- when branches has effects and it is the last statement
function a() {
  var a = M.context();

  if (true) {
    return M.chain(eff(1), a_1, a_2);
  } else {
    return M.chain(eff(2), a_1, a_2);
  }
}

function b() {
  var b = M.context();

  if (true) {
    return M.chain(eff(1), b_1, b_2);
  } else {
    return M.chain(eff(2), b_1, b_2);
  }
}

function c() {
  var c = M.context();

  if (true) {
    return M.chain(eff(1), c_1, c_4);
  } else {
    return M.chain(eff(2), c_1, c_4);
  }
}

function d() {
  var d = M.context();
  return M.chain(eff('a'), d_1, d_5);
}

function e() {
  var e = M.context();
  return M.chain(eff(1), e_1, e_2);
}

function f() {
  var f = M.context();
  return M.chain(eff(1), f_1, f_2);
}

function a_1(a, r) {
  return M.pure(r);
}

function a_2(a, e) {
  return M.raise(e);
}

function b_1(b, r) {
  return M.pure(r);
}

function b_2(b, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chain(eff(3), c_2, c_4);
}

function c_2(c) {
  return M.chain(eff(4), c_3, c_4);
}

function c_3(c) {
  return M.pure();
}

function c_4(c, e) {
  return M.raise(e);
}

function d_1(d) {
  if (true) {
    return M.chain(eff(1), d_2, d_5);
  } else {
    return M.chain(eff(2), d_2, d_5);
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
    return M.pure(1);
  } else {
    return M.pure(2);
  }
}

function e_2(e, _e) {
  return M.raise(_e);
}

function f_1(f, a) {
  if (a) {
    return M.pure(1);
  } else {
    return M.pure(2);
  }
}

function f_2(f, e) {
  return M.raise(e);
}