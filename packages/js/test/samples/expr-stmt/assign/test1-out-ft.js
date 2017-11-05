function aS() {
  var aS = M.context();
  return M.chain(eff(1), aS_1, aS_4);
}

exports.a = a;

function a() {
  var a = M.context();
  a._b1 = 0;
  return M.chain(eff(1), a_1, a_4);
}

function a1() {
  var a1 = M.context();
  return M.chain(eff(1), a1_1, a1_4);
}

function bS() {
  var bS = M.context();
  return M.chain(eff(1), bS_1, bS_5);
}

function b() {
  var b = M.context();
  return M.chain(eff(1), b_1, b_5);
}

function b1() {
  var b1 = M.context();
  return M.chain(eff(1), b1_1, b1_5);
}

function c() {
  var c = M.context();
  return M.chain(eff(1), c_1, c_12);
}

function d() {
  var d = M.context();
  return M.chain(eff1('a'), d_1, d_6);
}

function e1() {
  var e1 = M.context();
  return M.chain(eff(1, e1._cc), e1_1, e1_4);
}

function e2() {
  var e2 = M.context();
  return M.chain(eff(1, e2._cc), e2_1, e2_8);
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

function a_1(a, b) {
  a._b1 = b;
  return M.chain(eff('a'), a_2, a_4);
}

function a_2(a) {
  return M.chain(eff('b'), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}

function a1_1(a1, a) {
  a1._a = a;
  return M.chain(eff('a'), a1_2, a1_4);
}

function a1_2(a1) {
  return M.chain(eff('b'), a1_3, a1_4);
}

function a1_3(a1) {
  return M.pure();
}

function a1_4(a1, e) {
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

function b_1(b, a) {
  b._b1 = a;
  return M.chain(eff(2), b_2, b_5);
}

function b_2(b, a) {
  b._b2 = a;
  return M.chain(eff(b._b1), b_3, b_5);
}

function b_3(b) {
  return M.chain(eff(b._b2), b_4, b_5);
}

function b_4(b) {
  b._b1 = b._b2 = 100;
  return M.pure();
}

function b_5(b, e) {
  return M.raise(e);
}

function b1_1(b1, a) {
  b1._ = b1._a = a;
  return M.chain(eff(2), b1_2, b1_5);
}

function b1_2(b1, b) {
  var a;
  a = b1._c = b;
  b1._, a;
  return M.chain(eff(b1._a), b1_3, b1_5);
}

function b1_3(b1) {
  return M.chain(eff(b1._c), b1_4, b1_5);
}

function b1_4(b1) {
  return M.pure();
}

function b1_5(b1, e) {
  return M.raise(e);
}

function c_1(c, a) {
  c._a = a;
  c._b = 2;
  return M.chain(eff(3), c_2, c_12);
}

function c_2(c, a) {
  c._c = a;
  return M.chain(eff('a'), c_3, c_12);
}

function c_3(c) {
  return M.chain(eff('b'), c_4, c_12);
}

function c_4(c) {
  return M.chain(eff(4), c_5, c_12);
}

function c_5(c, a) {
  c._d = a;
  c._e = 5;
  return M.chain(eff(6), c_6, c_12);
}

function c_6(c, a) {
  c._f = a;
  return M.chain(eff(7), c_7, c_12);
}

function c_7(c, a) {
  c._g = a;
  c._j = 8;
  return M.chain(eff('x'), c_8, c_12);
}

function c_8(c, a) {
  c._x = a;
  c._y = 'y';
  return M.chain(eff('z'), c_9, c_12);
}

function c_9(c, a) {
  c._z = a;
  return M.chain(eff(9), c_10, c_12);
}

function c_10(c) {
  c._a = c._b = c._c = c._d = c._e = c._f = c._g = c._j = c._x = c._y = c._z = 1000;
  return M.chain(eff(10), c_11, c_12);
}

function c_11(c) {
  return M.pure();
}

function c_12(c, e) {
  return M.raise(e);
}

function d_1(d, a) {
  d._ = a;
  return M.chain(eff(2), d_2, d_6);
}

function d_2(d, a) {
  d._.some = a;
  return M.chain(eff('b'), d_3, d_6);
}

function d_3(d, a) {
  d._1 = a;
  return M.chain(eff(3), d_4, d_6);
}

function d_4(d, a) {
  d._1.some += a;
  return M.chain(eff('c'), d_5, d_6);
}

function d_5(d, a) {
  a.some++;
  some['d']--;
  return M.pure();
}

function d_6(d, e) {
  return M.raise(e);
}

function e1_1(e1, a) {
  e1._cc = a;
  return M.chain(eff(2, e1._cc), e1_2, e1_4);
}

function e1_2(e1, a) {
  e1._cc = a;
  return M.chain(eff(2, e1._cc), e1_3, e1_4);
}

function e1_3(e1) {
  return M.pure();
}

function e1_4(e1, e) {
  return M.raise(e);
}

function e2_1(e2, a) {
  e2._cc = a;
  return M.chain(eff(2, e2._cc), e2_2, e2_8);
}

function e2_2(e2, a) {
  e2._cc = a;
  return M.chain(eff(3, e2._cc), e2_3, e2_8);
}

function e2_3(e2) {
  return M.chain(eff(4, e2._cc1), e2_4, e2_8);
}

function e2_4(e2, a) {
  e2._cc1 = a;
  return M.chain(eff(5, e2._cc1), e2_5, e2_8);
}

function e2_5(e2, a) {
  e2._cc1 = a;
  return M.chain(eff(6, e2._cc1), e2_6, e2_8);
}

function e2_6(e2) {
  return M.chain(eff(7, e2._cc), e2_7, e2_8);
}

function e2_7(e2) {
  return M.pure();
}

function e2_8(e2, e) {
  return M.raise(e);
}