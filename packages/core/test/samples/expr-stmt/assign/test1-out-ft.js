import * as M from "@effectful/core";
function aS() {
  var aS = M.context();
  return M.scope(aS_1);
}
exports.a = a;
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function a1() {
  var a1 = M.context();
  return M.scope(a1_1);
}
function bS() {
  var bS = M.context();
  return M.scope(bS_1);
}
function b() {
  var b = M.context();
  return M.scope(b_1);
}
function b1() {
  var b1 = M.context();
  return M.scope(b1_1);
}
function c() {
  var _c = M.context();
  return M.scope(c_1);
}
function d() {
  var d = M.context();
  return M.scope(d_1);
}
function e1() {
  var e1 = M.context();
  return M.scope(e1_1);
}
function e2() {
  var e2 = M.context();
  return M.scope(e2_1);
}
function es6() {
  var es6 = M.context();
  return M.scope(es6_1);
}
function aS_1(aS) {
  return M.chain(eff(1), aS_2);
}
function aS_2(aS, a) {
  var b1;
  b1 = a;
  return M.chain(eff("a"), aS_3);
}
function aS_3(aS) {
  return M.chain(eff("b"), aS_4);
}
function aS_4(aS) {}
function a_1(a) {
  var b1;
  b1 = 0;
  return M.chain(eff(1), a_2);
}
function a_2(a, b) {
  var b1;
  b1 = b;
  return M.chain(eff("a"), a_3);
}
function a_3(a) {
  return M.chain(eff("b"), a_4);
}
function a_4(a) {}
function a1_1(a1) {
  return M.chain(eff(1), a1_2);
}
function a1_2(a1, b) {
  var a;
  a = b;
  return M.chain(eff("a"), a1_3);
}
function a1_3(a1) {
  return M.chain(eff("b"), a1_4);
}
function a1_4(a1) {}
function bS_1(bS) {
  return M.chain(eff(1), bS_2);
}
function bS_2(bS, a) {
  bS._b1 = a;
  return M.chain(eff(2), bS_3);
}
function bS_3(bS, a) {
  var b;
  bS._b2 = a;
  b = bS._b1, bS._b1 = null;
  return M.chain(eff(b), bS_4);
}
function bS_4(bS) {
  var a;
  a = bS._b2, bS._b2 = null;
  return M.chain(eff(a), bS_5);
}
function bS_5(bS) {}
function b_1(b) {
  return M.chain(eff(1), b_2);
}
function b_2(b, a) {
  b._b1 = a;
  return M.chain(eff(2), b_3);
}
function b_3(b, a) {
  var c;
  b._b2 = a;
  c = b._b1, b._b1 = null;
  return M.chain(eff(c), b_4);
}
function b_4(b) {
  var a;
  a = b._b2, b._b2 = null;
  return M.chain(eff(a), b_5);
}
function b_5(b) {
  b._b1 = b._b2 = 100;
}
function b1_1(b1) {
  return M.chain(eff(1), b1_2);
}
function b1_2(b1, a) {
  b1._ = b1._a = a;
  return M.chain(eff(2), b1_3);
}
function b1_3(b1, b) {
  var a, c;
  a = b1._c = b;
  b1._, a;
  c = b1._a, b1._a = null, b1._ = null;
  return M.chain(eff(c), b1_4);
}
function b1_4(b1) {
  var a;
  a = b1._c, b1._c = null;
  return M.chain(eff(a), b1_5);
}
function b1_5(b1) {}
function c_1(_c) {
  return M.chain(eff(1), c_2);
}
function c_2(_c, c) {
  var a, b;
  a = c;
  b = 2;
  return M.chain(eff(3), c_3);
}
function c_3(_c, a) {
  var c;
  c = a;
  return M.chain(eff("a"), c_4);
}
function c_4(_c) {
  return M.chain(eff("b"), c_5);
}
function c_5(_c) {
  return M.chain(eff(4), c_6);
}
function c_6(_c, a) {
  var d, e;
  d = a;
  e = 5;
  return M.chain(eff(6), c_7);
}
function c_7(_c, a) {
  var f;
  f = a;
  return M.chain(eff(7), c_8);
}
function c_8(_c, a) {
  var g, j;
  g = a;
  j = 8;
  return M.chain(eff("x"), c_9);
}
function c_9(_c, a) {
  var x, y;
  x = a;
  y = "y";
  return M.chain(eff("z"), c_10);
}
function c_10(_c, a) {
  var z;
  z = a;
  return M.chain(eff(9), c_11);
}
function c_11(_c) {
  var a, b, c, d, e, f, g, j, x, y, z;
  a = b = c = d = e = f = g = j = x = y = z = 1000;
  return M.chain(eff(10), c_12);
}
function c_12(_c) {}
function d_1(d) {
  return M.chain(eff1("a"), d_2);
}
function d_2(d, a) {
  d._ = a;
  return M.chain(eff(2), d_3);
}
function d_3(d, a) {
  d._.some = a;
  d._ = null;
  return M.chain(eff("b"), d_4);
}
function d_4(d, a) {
  d._1 = a;
  d._2 = d._1.some;
  return M.chain(eff(3), d_5);
}
function d_5(d, a) {
  d._1.some = d._2 + a;
  d._1 = null, d._2 = null;
  return M.chain(eff("c"), d_6);
}
function d_6(d, a) {
  a.some++;
  some["d"]--;
}
function e1_1(e1) {
  var a;
  a = e1._cc, e1._cc = null;
  return M.chain(eff(1, a), e1_2);
}
function e1_2(e1, a) {
  var b;
  e1._cc = a;
  b = e1._cc, e1._cc = null;
  return M.chain(eff(2, b), e1_3);
}
function e1_3(e1, a) {
  var b;
  e1._cc = a;
  b = e1._cc, e1._cc = null;
  return M.chain(eff(2, b), e1_4);
}
function e1_4(e1) {}
function e2_1(e2) {
  var a;
  a = e2._cc, e2._cc = null;
  return M.chain(eff(1, a), e2_2);
}
function e2_2(e2, a) {
  var b;
  e2._cc = a;
  b = e2._cc, e2._cc = null;
  return M.chain(eff(2, b), e2_3);
}
function e2_3(e2, a) {
  e2._cc = a;
  return M.chain(eff(3, e2._cc), e2_4);
}
function e2_4(e2) {
  var a;
  a = e2._cc1, e2._cc1 = null;
  return M.chain(eff(4, a), e2_5);
}
function e2_5(e2, a) {
  var b;
  e2._cc1 = a;
  b = e2._cc1, e2._cc1 = null;
  return M.chain(eff(5, b), e2_6);
}
function e2_6(e2, a) {
  var b;
  e2._cc1 = a;
  b = e2._cc1, e2._cc1 = null;
  return M.chain(eff(6, b), e2_7);
}
function e2_7(e2) {
  var a;
  a = e2._cc, e2._cc = null;
  return M.chain(eff(7, a), e2_8);
}
function e2_8(e2) {}
function es6_1(es6) {
  return M.chain(eff_1(), es6_2);
}
function es6_2(es6, c) {
  var a, b, arr1;
  [, a, b, ...arr1] = c;
  return M.chain(eff(2), es6_3);
}
function es6_3(es6, a) {
  var e, f, m, obj, arr2;
  ({
    m: [e, {
      b: f,
      m,
      ...obj
    }, ...arr2]
  } = a);
  return M.chain(eff_1(), es6_4);
}
function es6_4(es6, a) {
  es6._ = a;
  return M.chain(eff(2), es6_5);
}
function es6_5(es6, b) {
  var e, f, m, a, c;
  a = {
    m: [e, {
      b: f,
      m,
      ...obj
    }]
  } = b;
  c = es6._, es6._ = null;
  return M.chain(c(a), es6_6);
}
function es6_6(es6, c) {
  var a, b;
  [, a, b] = c;
  return M.chain(eff_4(), es6_7);
}
function es6_7(es6, b) {
  var a;
  [a, ...arr1] = b;
}
