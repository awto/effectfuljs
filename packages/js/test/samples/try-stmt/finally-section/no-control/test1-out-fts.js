function a() {
  return M.jump(a_1, a_7);
}

function b() {
  var b = M.context();
  return M.jump(b_1, b_8);
}

function c() {
  return M.jump(c_1, c_7);
}

function d() {
  return M.jump(d_1, d_7);
}

function e() {
  var e = M.context();
  console.log('before');
  return M.chain(eff('before'), e_1, e_10);
}

function f() {
  var f = M.context();
  return M.jump(f_1, f_8);
}

function g() {
  var g = M.context();
  return M.jump(g_1, g_8);
}

function a_1() {
  return M.chain(eff('in body'), a_2, a_5, a_3, a_5);
}

function a_2(fc, fe, err) {
  var fr;
  return M.chain(eff('in `finally`'), fc, fe, fr, err);
}

function a_3() {
  return M.chain(eff('after `finally`'), a_4, a_5);
}

function a_4() {
  return M.pure();
}

function a_5(e) {
  return M.raise(e);
}

function a_6(err) {
  return M.raise(err);
}

function a_7(a) {
  return M.jump(a_2, a_5, a_6, a_5, a);
}

function b_1(b) {
  return M.chain(eff('in body'), b_3, b_6, b_4, b_6);
}

function b_2(b, ex) {
  b._e = ex;
  return M.chain(eff('in `catch`', b._e), b_3, b_6, b_4, b_6);
}

function b_3(b, fc, fe, err) {
  var fr;
  return M.chain(eff('in `finally`'), fc, fe, fr);
}

function b_4(b) {
  return M.chain(eff('after `finally`'), b_5, b_6);
}

function b_5(b) {
  return M.pure();
}

function b_6(b, e) {
  return M.raise(e);
}

function b_7(b, err) {
  return M.raise(err);
}

function b_8(b, a) {
  return M.jump(b_2, b_9, a);
}

function b_9(b, a) {
  return M.jump(b_3, b_6, b_7, b_6, a);
}

function c_1() {
  return M.chain(eff('in body'), c_2, c_5, c_3, c_5);
}

function c_2(fc, fe, err) {
  var fr;
  console.log('in `finally`');
  return M.jump(fc, fe, fr, err);
}

function c_3() {
  return M.chain(eff('after `finally`'), c_4, c_5);
}

function c_4() {
  return M.pure();
}

function c_5(e) {
  return M.raise(e);
}

function c_6(err) {
  return M.raise(err);
}

function c_7(a) {
  return M.jump(c_2, c_5, c_6, c_5, a);
}

function d_1() {
  console.log('in body');
  return M.jump(d_2, d_5, d_3, d_5);
}

function d_2(fc, fe, err) {
  var fr;
  return M.chain(eff('in `finally`'), fc, fe, fr, err);
}

function d_3() {
  return M.chain(eff('after `finally`'), d_4, d_5);
}

function d_4() {
  return M.pure();
}

function d_5(e) {
  return M.raise(e);
}

function d_6(err) {
  return M.raise(err);
}

function d_7(a) {
  return M.jump(d_2, d_5, d_6, d_5, a);
}

function e_1(e) {
  console.log('in body');
  return M.chain(eff('in body'), e_4, e_8, e_6, e_8);
}

function e_2(e, ex) {
  e._e = ex;
  console.log('catch', e._e);
  return M.chain(eff('catch', e._e), e_3, e_11);
}

function e_3(e) {
  console.log('catch', e._e);
  return M.jump(e_4, e_8, e_6, e_8);
}

function e_4(e, fc, fe, err) {
  console.log('in finally');
  return M.chain(eff('in `finally`'), e_5, e_8, fc, fe, err);
}

function e_5(e, fc, fe, err) {
  var fr;
  console.log('in finally 2');
  return M.jump(fc, fe, fr);
}

function e_6(e) {
  console.log('after `finally`');
  return M.chain(eff('after `finally`'), e_7, e_8);
}

function e_7(e) {
  return M.pure();
}

function e_8(e, _e) {
  return M.raise(_e);
}

function e_9(e, err) {
  return M.raise(err);
}

function e_10(e, a) {
  return M.jump(e_2, e_11, a);
}

function e_11(e, a) {
  return M.jump(e_4, e_8, e_9, e_8, a);
}

function f_1(f) {
  return M.chain(eff('in body'), f_3, f_6, f_4, f_6);
}

function f_2(f, ex) {
  f._e = ex;
  return M.chain(eff('in `catch`'), f_3, f_6, f_4, f_6);
}

function f_3(f, fc, fe, err) {
  var fr;
  console.log('in `finally`');
  return M.jump(fc, fe, fr);
}

function f_4(f) {
  return M.chain(eff('after `finally`'), f_5, f_6);
}

function f_5(f) {
  return M.pure();
}

function f_6(f, e) {
  return M.raise(e);
}

function f_7(f, err) {
  return M.raise(err);
}

function f_8(f, a) {
  return M.jump(f_2, f_9, a);
}

function f_9(f, a) {
  return M.jump(f_3, f_6, f_7, f_6, a);
}

function g_1(g) {
  return M.chain(eff('in body'), g_3, g_6, g_4, g_6);
}

function g_2(g, ex) {
  g._e = ex;
  console.log('in `catch`');
  return M.jump(g_3, g_6, g_4, g_6);
}

function g_3(g, fc, fe, err) {
  var fr;
  console.log('in `finally`');
  return M.jump(fc, fe, fr);
}

function g_4(g) {
  return M.chain(eff('after `finally`'), g_5, g_6);
}

function g_5(g) {
  return M.pure();
}

function g_6(g, e) {
  return M.raise(e);
}

function g_7(g, err) {
  return M.raise(err);
}

function g_8(g, a) {
  return M.jump(g_2, g_9, a);
}

function g_9(g, a) {
  return M.jump(g_3, g_6, g_7, g_6, a);
}