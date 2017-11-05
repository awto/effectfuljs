function aS() {
  var aS = M.context();
  return M.chain(eff(1), aS_1, aS_4);
}

exports.a = a;

function a() {
  var b1;
  b1 = 0;
  return M.chain(eff(1), a_1, a_4);
}

function a1() {
  return M.chain(eff(1), a1_1, a1_4);
}

function bS() {
  var bS = M.context();
  return M.chain(eff(1), bS_1, bS_5);
}

function b() {
  return M.chain(eff(1), b_1, b_5);
}

function b1() {
  return M.chain(eff(1), b1_1, b1_5);
}

function c() {
  return M.chain(eff(1), c_1, c_12);
}

function d() {
  return M.chain(eff1('a'), d_1, d_6);
}

function e1() {
  var cc;
  return M.chain(eff(1, cc), e1_1, e1_4);
}

function e2() {
  var cc;
  return M.chain(eff(1, cc), e2_1, e2_8);
}

function aS_1(aS, a) {
  aS._b1 = a;
  return M.chain(eff('a'), aS_2, aS_4);
}

function aS_2(aS) {
  return M.chain(eff('b'), aS_3, aS_4);
}

function aS_3(aS) {
  return M.pure();
}

function aS_4(aS, e) {
  return M.raise(e);
}

function a_1(a) {
  var b1;
  b1 = a;
  return M.chain(eff('a'), a_2, a_4);
}

function a_2() {
  return M.chain(eff('b'), a_3, a_4);
}

function a_3() {
  return M.pure();
}

function a_4(e) {
  return M.raise(e);
}

function a1_1(b) {
  var a;
  a = b;
  return M.chain(eff('a'), a1_2, a1_4);
}

function a1_2() {
  return M.chain(eff('b'), a1_3, a1_4);
}

function a1_3() {
  return M.pure();
}

function a1_4(e) {
  return M.raise(e);
}

function bS_1(bS, a) {
  bS._b1 = a;
  return M.chain(eff(2), bS_2, bS_5);
}

function bS_2(bS, a) {
  bS._b2 = a;
  return M.chain(eff(bS._b1), bS_3, bS_5);
}

function bS_3(bS) {
  return M.chain(eff(bS._b2), bS_4, bS_5);
}

function bS_4(bS) {
  return M.pure();
}

function bS_5(bS, e) {
  return M.raise(e);
}

function b_1(a) {
  var b1;
  b1 = a;
  return M.chain(eff(2), b_2, b_5, b1);
}

function b_2(a, b1) {
  var b2;
  b2 = a;
  return M.chain(eff(b1), b_3, b_5, b2);
}

function b_3(b2) {
  return M.chain(eff(b2), b_4, b_5);
}

function b_4() {
  var b1, b2;
  b1 = b2 = 100;
  return M.pure();
}

function b_5(e) {
  return M.raise(e);
}

function b1_1(c) {
  var a, b;
  b = a = c;
  return M.chain(eff(2), b1_2, b1_5, a, b);
}

function b1_2(e, a, b) {
  var c, d;
  d = c = e;
  b, d;
  return M.chain(eff(a), b1_3, b1_5, c);
}

function b1_3(c) {
  return M.chain(eff(c), b1_4, b1_5);
}

function b1_4() {
  return M.pure();
}

function b1_5(e) {
  return M.raise(e);
}

function c_1(c) {
  var a, b;
  a = c;
  b = 2;
  return M.chain(eff(3), c_2, c_12);
}

function c_2(a) {
  var c;
  c = a;
  return M.chain(eff('a'), c_3, c_12);
}

function c_3() {
  return M.chain(eff('b'), c_4, c_12);
}

function c_4() {
  return M.chain(eff(4), c_5, c_12);
}

function c_5(a) {
  var d, e;
  d = a;
  e = 5;
  return M.chain(eff(6), c_6, c_12);
}

function c_6(a) {
  var f;
  f = a;
  return M.chain(eff(7), c_7, c_12);
}

function c_7(a) {
  var g, j;
  g = a;
  j = 8;
  return M.chain(eff('x'), c_8, c_12);
}

function c_8(a) {
  var x, y;
  x = a;
  y = 'y';
  return M.chain(eff('z'), c_9, c_12);
}

function c_9(a) {
  var z;
  z = a;
  return M.chain(eff(9), c_10, c_12);
}

function c_10() {
  var a, b, c, d, e, f, g, j, x, y, z;
  a = b = c = d = e = f = g = j = x = y = z = 1000;
  return M.chain(eff(10), c_11, c_12);
}

function c_11() {
  return M.pure();
}

function c_12(e) {
  return M.raise(e);
}

function d_1(a) {
  return M.chain(eff(2), d_2, d_6, a);
}

function d_2(b, a) {
  a.some = b;
  return M.chain(eff('b'), d_3, d_6);
}

function d_3(a) {
  return M.chain(eff(3), d_4, d_6, a);
}

function d_4(b, a) {
  a.some += b;
  return M.chain(eff('c'), d_5, d_6);
}

function d_5(a) {
  a.some++;
  some['d']--;
  return M.pure();
}

function d_6(e) {
  return M.raise(e);
}

function e1_1(a) {
  var cc;
  cc = a;
  return M.chain(eff(2, cc), e1_2, e1_4);
}

function e1_2(a) {
  var cc;
  cc = a;
  return M.chain(eff(2, cc), e1_3, e1_4);
}

function e1_3() {
  return M.pure();
}

function e1_4(e) {
  return M.raise(e);
}

function e2_1(a) {
  var cc;
  cc = a;
  return M.chain(eff(2, cc), e2_2, e2_8);
}

function e2_2(a) {
  var cc;
  cc = a;
  return M.chain(eff(3, cc), e2_3, e2_8, cc);
}

function e2_3(cc) {
  var _cc;

  return M.chain(eff(4, _cc), e2_4, e2_8, cc);
}

function e2_4(a, cc) {
  var _cc;

  _cc = a;
  return M.chain(eff(5, _cc), e2_5, e2_8, cc);
}

function e2_5(a, cc) {
  var _cc;

  _cc = a;
  return M.chain(eff(6, _cc), e2_6, e2_8, cc);
}

function e2_6(cc) {
  return M.chain(eff(7, cc), e2_7, e2_8);
}

function e2_7() {
  return M.pure();
}

function e2_8(e) {
  return M.raise(e);
}