function aS() {
  var aS_v = {
    b1: undefined
  };
  return M.jB(eff(1), aS_1, aS_v);
}

exports.a = a;

function a() {
  var a_v = {
    b1: undefined
  };
  a_v.b1 = 0;
  return M.jB(eff(1), a_1, a_v);
}

function a1() {
  var a1_v = {
    a: undefined
  };
  return M.jB(eff(1), a1_1, a1_v);
}

function bS() {
  var bS_v = {
    b1: undefined,
    b2: undefined
  };
  return M.jB(eff(1), bS_1, bS_v);
}

function b() {
  var b_v = {
    b1: undefined,
    b2: undefined
  };
  return M.jB(eff(1), b_1, b_v);
}

function b1() {
  var b1_v = {
    a: undefined,
    c: undefined
  };
  return M.jB(eff(1), b1_1, b1_v);
}

function c() {
  var c_v = {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
    g: undefined,
    j: undefined,
    x: undefined,
    y: undefined,
    z: undefined
  };
  return M.jB(eff(1), c_1, c_v);
}

function d() {
  return M.jB(eff1('a'), d_1);
}

function e1() {
  var e1_v = {
    cc: undefined
  };
  return M.jB(eff(1, e1_v.cc), e1_1, e1_v);
}

function e2() {
  var e2_v = {
    cc: undefined,
    cc1: undefined
  };
  return M.jB(eff(1, e2_v.cc), e2_1, e2_v);
}

function aS_1(a, aS_v) {
  aS_v.b1 = a;
  return M.j(eff('a'), aS_2);
}

function aS_2() {
  return M.j(eff('b'), aS_3);
}

function aS_3() {
  return M.pure();
}

function a_1(a, a_v) {
  a_v.b1 = a;
  return M.j(eff('a'), a_2);
}

function a_2() {
  return M.j(eff('b'), a_3);
}

function a_3() {
  return M.pure();
}

function a1_1(a, a1_v) {
  a1_v.a = a;
  return M.j(eff('a'), a1_2);
}

function a1_2() {
  return M.j(eff('b'), a1_3);
}

function a1_3() {
  return M.pure();
}

function bS_1(a, bS_v) {
  bS_v.b1 = a;
  return M.jB(eff(2), bS_2, bS_v);
}

function bS_2(a, bS_v) {
  bS_v.b2 = a;
  return M.j(eff(bS_v.b1), bS_3, bS_v);
}

function bS_3(bS_v) {
  return M.j(eff(bS_v.b2), bS_4);
}

function bS_4() {
  return M.pure();
}

function b_1(a, b_v) {
  b_v.b1 = a;
  return M.jB(eff(2), b_2, b_v);
}

function b_2(a, b_v) {
  b_v.b2 = a;
  return M.j(eff(b_v.b1), b_3, b_v);
}

function b_3(b_v) {
  return M.j(eff(b_v.b2), b_4, b_v);
}

function b_4(b_v) {
  b_v.b1 = b_v.b2 = 100;
  return M.pure();
}

function b1_1(a, b1_v) {
  b1_v.a = a;
  return M.jB(eff(2), b1_2, b1_v);
}

function b1_2(a, b1_v) {
  b1_v.c = a;
  return M.j(eff(b1_v.a), b1_3, b1_v);
}

function b1_3(b1_v) {
  return M.j(eff(b1_v.c), b1_4);
}

function b1_4() {
  return M.pure();
}

function c_1(a, c_v) {
  c_v.a = a;
  c_v.b = 2;
  return M.jB(eff(3), c_2, c_v);
}

function c_2(a, c_v) {
  c_v.c = a;
  return M.j(eff('a'), c_3, c_v);
}

function c_3(c_v) {
  return M.j(eff('b'), c_4, c_v);
}

function c_4(c_v) {
  return M.jB(eff(4), c_5, c_v);
}

function c_5(a, c_v) {
  c_v.d = a;
  c_v.e = 5;
  return M.jB(eff(6), c_6, c_v);
}

function c_6(a, c_v) {
  c_v.f = a;
  return M.jB(eff(7), c_7, c_v);
}

function c_7(a, c_v) {
  c_v.g = a;
  c_v.j = 8;
  return M.jB(eff('x'), c_8, c_v);
}

function c_8(a, c_v) {
  c_v.x = a;
  c_v.y = 'y';
  return M.jB(eff('z'), c_9, c_v);
}

function c_9(a, c_v) {
  c_v.z = a;
  return M.j(eff(9), c_10, c_v);
}

function c_10(c_v) {
  c_v.a = c_v.b = c_v.c = c_v.d = c_v.e = c_v.f = c_v.g = c_v.j = c_v.x = c_v.y = c_v.z = 1000;
  return M.j(eff(10), c_11);
}

function c_11() {
  return M.pure();
}

function d_1(a) {
  return M.jB(eff(2), d_2, a);
}

function d_2(b, a) {
  a.some = b;
  return M.jB(eff('b'), d_3);
}

function d_3(a) {
  return M.jB(eff(3), d_4, a);
}

function d_4(b, a) {
  a.some += b;
  return M.jB(eff('c'), d_5);
}

function d_5(a) {
  a.some++;
  some['d']--;
  return M.pure();
}

function e1_1(a, e1_v) {
  e1_v.cc = a;
  return M.jB(eff(2, e1_v.cc), e1_2, e1_v);
}

function e1_2(a, e1_v) {
  e1_v.cc = a;
  return M.j(eff(2, e1_v.cc), e1_3);
}

function e1_3() {
  return M.pure();
}

function e2_1(a, e2_v) {
  e2_v.cc = a;
  return M.jB(eff(2, e2_v.cc), e2_2, e2_v);
}

function e2_2(a, e2_v) {
  e2_v.cc = a;
  return M.j(eff(3, e2_v.cc), e2_3, e2_v);
}

function e2_3(e2_v) {
  return M.jB(eff(4, e2_v.cc1), e2_4, e2_v);
}

function e2_4(a, e2_v) {
  e2_v.cc1 = a;
  return M.jB(eff(5, e2_v.cc1), e2_5, e2_v);
}

function e2_5(a, e2_v) {
  e2_v.cc1 = a;
  return M.j(eff(6, e2_v.cc1), e2_6, e2_v);
}

function e2_6(e2_v) {
  return M.j(eff(7, e2_v.cc), e2_7);
}

function e2_7() {
  return M.pure();
}