import * as M from "@effectful/core";

// *- when branches has effects and it is the last statement
function a() {
  var a = M.context();
  return M.scope(a_1);
}

function b() {
  var b = M.context();
  return M.scope(b_1);
}

function c() {
  var c = M.context();
  return M.scope(c_1);
}

function d() {
  var d = M.context();
  return M.scope(d_1);
}

function e() {
  var e = M.context();
  return M.scope(e_1);
}

function f() {
  var f = M.context();
  return M.scope(f_1);
}

function a_1(a) {
  if (true) {
    return M.chain(eff(1), a_2);
  } else {
    return M.chain(eff(2), a_3);
  }
}

function a_2(a, b) {
  return b;
}

function a_3(a, b) {
  return b;
}

function b_1(b) {
  if (true) {
    return M.chain(eff(1), b_2);
  } else {
    return M.chain(eff(2), b_3);
  }
}

function b_2(b, a) {
  return a;
}

function b_3(b, a) {
  return a;
}

function c_1(c) {
  if (true) {
    return M.chain(eff(1), c_2);
  } else {
    return M.chain(eff(2), c_2);
  }
}

function c_2(c) {
  return M.chain(eff(3), c_3);
}

function c_3(c) {
  return M.chain(eff(4), c_4);
}

function c_4(c) {}

function d_1(d) {
  return M.chain(eff("a"), d_2);
}

function d_2(d) {
  if (true) {
    return M.chain(eff(1), d_3);
  } else {
    return M.chain(eff(2), d_3);
  }
}

function d_3(d) {
  return M.chain(eff(3), d_4);
}

function d_4(d) {
  return M.chain(eff(4), d_5);
}

function d_5(d) {}

function e_1(e) {
  return M.chain(eff(1), e_2);
}

function e_2(e, a) {
  if (a) {
    return 1;
  } else {
    return 2;
  }
}

function f_1(f) {
  return M.chain(eff(1), f_2);
}

function f_2(f, a) {
  if (a) {
    return 1;
  } else {
    return 2;
  }
}