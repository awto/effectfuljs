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
  var c = M.context();
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
  a._b1 = 0;
  return M.chain(eff(1), a_2);
}

function a_2(a, b) {
  a._b1 = b;
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
  bS._b2 = a;
  return M.chain(eff(bS._b1), bS_4);
}

function bS_4(bS) {
  return M.chain(eff(bS._b2), bS_5);
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
  b._b2 = a;
  return M.chain(eff(b._b1), b_4);
}

function b_4(b) {
  return M.chain(eff(b._b2), b_5);
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
  var a;
  a = b1._c = b;
  b1._, a;
  return M.chain(eff(b1._a), b1_4);
}

function b1_4(b1) {
  return M.chain(eff(b1._c), b1_5);
}

function b1_5(b1) {}

function c_1(c) {
  return M.chain(eff(1), c_2);
}

function c_2(c, a) {
  c._a = a;
  c._b = 2;
  return M.chain(eff(3), c_3);
}

function c_3(c, a) {
  c._c = a;
  return M.chain(eff("a"), c_4);
}

function c_4(c) {
  return M.chain(eff("b"), c_5);
}

function c_5(c) {
  return M.chain(eff(4), c_6);
}

function c_6(c, a) {
  c._d = a;
  c._e = 5;
  return M.chain(eff(6), c_7);
}

function c_7(c, a) {
  c._f = a;
  return M.chain(eff(7), c_8);
}

function c_8(c, a) {
  c._g = a;
  c._j = 8;
  return M.chain(eff("x"), c_9);
}

function c_9(c, a) {
  c._x = a;
  c._y = "y";
  return M.chain(eff("z"), c_10);
}

function c_10(c, a) {
  c._z = a;
  return M.chain(eff(9), c_11);
}

function c_11(c) {
  c._a = c._b = c._c = c._d = c._e = c._f = c._g = c._j = c._x = c._y = c._z = 1000;
  return M.chain(eff(10), c_12);
}

function c_12(c) {}

function d_1(d) {
  return M.chain(eff1("a"), d_2);
}

function d_2(d, a) {
  d._ = a;
  return M.chain(eff(2), d_3);
}

function d_3(d, a) {
  d._.some = a;
  return M.chain(eff("b"), d_4);
}

function d_4(d, a) {
  d._1 = a;
  return M.chain(eff(3), d_5);
}

function d_5(d, a) {
  d._1.some += a;
  return M.chain(eff("c"), d_6);
}

function d_6(d, a) {
  a.some++;
  some["d"]--;
}

function e1_1(e1) {
  return M.chain(eff(1, e1._cc), e1_2);
}

function e1_2(e1, a) {
  e1._cc = a;
  return M.chain(eff(2, e1._cc), e1_3);
}

function e1_3(e1, a) {
  e1._cc = a;
  return M.chain(eff(2, e1._cc), e1_4);
}

function e1_4(e1) {}

function e2_1(e2) {
  return M.chain(eff(1, e2._cc), e2_2);
}

function e2_2(e2, a) {
  e2._cc = a;
  return M.chain(eff(2, e2._cc), e2_3);
}

function e2_3(e2, a) {
  e2._cc = a;
  return M.chain(eff(3, e2._cc), e2_4);
}

function e2_4(e2) {
  return M.chain(eff(4, e2._cc1), e2_5);
}

function e2_5(e2, a) {
  e2._cc1 = a;
  return M.chain(eff(5, e2._cc1), e2_6);
}

function e2_6(e2, a) {
  e2._cc1 = a;
  return M.chain(eff(6, e2._cc1), e2_7);
}

function e2_7(e2) {
  return M.chain(eff(7, e2._cc), e2_8);
}

function e2_8(e2) {}