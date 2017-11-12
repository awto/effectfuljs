function aS() {
  var aS = M.context();
  return M.scope(aS_1, aS_5);
}

exports.a = a;

function a() {
  var a = M.context();
  return M.scope(a_1, a_5);
}

function a1() {
  var a1 = M.context();
  return M.scope(a1_1, a1_5);
}

function bS() {
  var bS = M.context();
  return M.scope(bS_1, bS_6);
}

function b() {
  var b = M.context();
  return M.scope(b_1, b_6);
}

function b1() {
  var b1 = M.context();
  return M.scope(b1_1, b1_6);
}

function c() {
  var c = M.context();
  return M.scope(c_1, c_13);
}

function d() {
  var d = M.context();
  return M.scope(d_1, d_7);
}

function e1() {
  var e1 = M.context();
  return M.scope(e1_1, e1_5);
}

function e2() {
  var e2 = M.context();
  return M.scope(e2_1, e2_9);
}

function aS_1(aS) {
  return M.chain(eff(1), aS_2, aS_5);
}

function aS_2(aS, a) {
  aS._b1 = a;
  return M.chain(eff('a'), aS_3, aS_5);
}

function aS_3(aS) {
  return M.chain(eff('b'), aS_4, aS_5);
}

function aS_4(aS) {
  return M.pure();
}

function aS_5(aS, e) {
  return M.raise(e);
}

function a_1(a) {
  a._b1 = 0;
  return M.chain(eff(1), a_2, a_5);
}

function a_2(a, b) {
  a._b1 = b;
  return M.chain(eff('a'), a_3, a_5);
}

function a_3(a) {
  return M.chain(eff('b'), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}

function a1_1(a1) {
  return M.chain(eff(1), a1_2, a1_5);
}

function a1_2(a1, a) {
  a1._a = a;
  return M.chain(eff('a'), a1_3, a1_5);
}

function a1_3(a1) {
  return M.chain(eff('b'), a1_4, a1_5);
}

function a1_4(a1) {
  return M.pure();
}

function a1_5(a1, e) {
  return M.raise(e);
}

function bS_1(bS) {
  return M.chain(eff(1), bS_2, bS_6);
}

function bS_2(bS, a) {
  bS._b1 = a;
  return M.chain(eff(2), bS_3, bS_6);
}

function bS_3(bS, a) {
  bS._b2 = a;
  return M.chain(eff(bS._b1), bS_4, bS_6);
}

function bS_4(bS) {
  return M.chain(eff(bS._b2), bS_5, bS_6);
}

function bS_5(bS) {
  return M.pure();
}

function bS_6(bS, e) {
  return M.raise(e);
}

function b_1(b) {
  return M.chain(eff(1), b_2, b_6);
}

function b_2(b, a) {
  b._b1 = a;
  return M.chain(eff(2), b_3, b_6);
}

function b_3(b, a) {
  b._b2 = a;
  return M.chain(eff(b._b1), b_4, b_6);
}

function b_4(b) {
  return M.chain(eff(b._b2), b_5, b_6);
}

function b_5(b) {
  b._b1 = b._b2 = 100;
  return M.pure();
}

function b_6(b, e) {
  return M.raise(e);
}

function b1_1(b1) {
  return M.chain(eff(1), b1_2, b1_6);
}

function b1_2(b1, a) {
  b1._ = b1._a = a;
  return M.chain(eff(2), b1_3, b1_6);
}

function b1_3(b1, b) {
  var a;
  a = b1._c = b;
  b1._, a;
  return M.chain(eff(b1._a), b1_4, b1_6);
}

function b1_4(b1) {
  return M.chain(eff(b1._c), b1_5, b1_6);
}

function b1_5(b1) {
  return M.pure();
}

function b1_6(b1, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chain(eff(1), c_2, c_13);
}

function c_2(c, a) {
  c._a = a;
  c._b = 2;
  return M.chain(eff(3), c_3, c_13);
}

function c_3(c, a) {
  c._c = a;
  return M.chain(eff('a'), c_4, c_13);
}

function c_4(c) {
  return M.chain(eff('b'), c_5, c_13);
}

function c_5(c) {
  return M.chain(eff(4), c_6, c_13);
}

function c_6(c, a) {
  c._d = a;
  c._e = 5;
  return M.chain(eff(6), c_7, c_13);
}

function c_7(c, a) {
  c._f = a;
  return M.chain(eff(7), c_8, c_13);
}

function c_8(c, a) {
  c._g = a;
  c._j = 8;
  return M.chain(eff('x'), c_9, c_13);
}

function c_9(c, a) {
  c._x = a;
  c._y = 'y';
  return M.chain(eff('z'), c_10, c_13);
}

function c_10(c, a) {
  c._z = a;
  return M.chain(eff(9), c_11, c_13);
}

function c_11(c) {
  c._a = c._b = c._c = c._d = c._e = c._f = c._g = c._j = c._x = c._y = c._z = 1000;
  return M.chain(eff(10), c_12, c_13);
}

function c_12(c) {
  return M.pure();
}

function c_13(c, e) {
  return M.raise(e);
}

function d_1(d) {
  return M.chain(eff1('a'), d_2, d_7);
}

function d_2(d, a) {
  d._ = a;
  return M.chain(eff(2), d_3, d_7);
}

function d_3(d, a) {
  d._.some = a;
  return M.chain(eff('b'), d_4, d_7);
}

function d_4(d, a) {
  d._1 = a;
  return M.chain(eff(3), d_5, d_7);
}

function d_5(d, a) {
  d._1.some += a;
  return M.chain(eff('c'), d_6, d_7);
}

function d_6(d, a) {
  a.some++;
  some['d']--;
  return M.pure();
}

function d_7(d, e) {
  return M.raise(e);
}

function e1_1(e1) {
  return M.chain(eff(1, e1._cc), e1_2, e1_5);
}

function e1_2(e1, a) {
  e1._cc = a;
  return M.chain(eff(2, e1._cc), e1_3, e1_5);
}

function e1_3(e1, a) {
  e1._cc = a;
  return M.chain(eff(2, e1._cc), e1_4, e1_5);
}

function e1_4(e1) {
  return M.pure();
}

function e1_5(e1, e) {
  return M.raise(e);
}

function e2_1(e2) {
  return M.chain(eff(1, e2._cc), e2_2, e2_9);
}

function e2_2(e2, a) {
  e2._cc = a;
  return M.chain(eff(2, e2._cc), e2_3, e2_9);
}

function e2_3(e2, a) {
  e2._cc = a;
  return M.chain(eff(3, e2._cc), e2_4, e2_9);
}

function e2_4(e2) {
  return M.chain(eff(4, e2._cc1), e2_5, e2_9);
}

function e2_5(e2, a) {
  e2._cc1 = a;
  return M.chain(eff(5, e2._cc1), e2_6, e2_9);
}

function e2_6(e2, a) {
  e2._cc1 = a;
  return M.chain(eff(6, e2._cc1), e2_7, e2_9);
}

function e2_7(e2) {
  return M.chain(eff(7, e2._cc), e2_8, e2_9);
}

function e2_8(e2) {
  return M.pure();
}

function e2_9(e2, e) {
  return M.raise(e);
}