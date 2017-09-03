function aS() {
  var aS_v = {
    b1: undefined
  };
  return M.jB(eff(1), aS_1, aS_v);
}

exports.a = a;

function a() {
  var b1;
  b1 = 0;
  return M.jB(eff(1), a_1);
}

function a1() {
  return M.jB(eff(1), a1_1);
}

function bS() {
  var bS_v = {
    b1: undefined,
    b2: undefined
  };
  return M.jB(eff(1), bS_1, bS_v);
}

function b() {
  return M.jB(eff(1), b_1);
}

function b1() {
  return M.jB(eff(1), b1_1);
}

function c() {
  return M.jB(eff(1), c_1);
}

function d() {
  return M.jB(eff1('a'), d_1);
}

function e1() {
  var cc;
  return M.jB(eff(1, cc), e1_1);
}

function e2() {
  var cc;
  return M.jB(eff(1, cc), e2_1);
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

function a_1(b1) {
  return M.j(eff('a'), a_2);
}

function a_2() {
  return M.j(eff('b'), a_3);
}

function a_3() {
  return M.pure();
}

function a1_1(a) {
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

function b_1(b1) {
  return M.jB(eff(2), b_2, b1);
}

function b_2(b2, b1) {
  return M.j(eff(b1), b_3, b2);
}

function b_3(b2) {
  return M.j(eff(b2), b_4);
}

function b_4() {
  var b1, b2;
  b1 = b2 = 100;
  return M.pure();
}

function b1_1(a) {
  return M.jB(eff(2), b1_2, a);
}

function b1_2(c, a) {
  return M.j(eff(a), b1_3, c);
}

function b1_3(c) {
  return M.j(eff(c), b1_4);
}

function b1_4() {
  return M.pure();
}

function c_1(a) {
  var b;
  b = 2;
  return M.jB(eff(3), c_2);
}

function c_2(c) {
  return M.j(eff('a'), c_3);
}

function c_3() {
  return M.j(eff('b'), c_4);
}

function c_4() {
  return M.jB(eff(4), c_5);
}

function c_5(d) {
  var e;
  e = 5;
  return M.jB(eff(6), c_6);
}

function c_6(f) {
  return M.jB(eff(7), c_7);
}

function c_7(g) {
  var j;
  j = 8;
  return M.jB(eff('x'), c_8);
}

function c_8(x) {
  var y;
  y = 'y';
  return M.jB(eff('z'), c_9);
}

function c_9(z) {
  return M.j(eff(9), c_10);
}

function c_10() {
  var a, b, c, d, e, f, g, j, x, y, z;
  a = b = c = d = e = f = g = j = x = y = z = 1000;
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

function e1_1(cc) {
  return M.jB(eff(2, cc), e1_2);
}

function e1_2(cc) {
  return M.j(eff(2, cc), e1_3);
}

function e1_3() {
  return M.pure();
}

function e2_1(cc) {
  return M.jB(eff(2, cc), e2_2);
}

function e2_2(cc) {
  return M.j(eff(3, cc), e2_3, cc);
}

function e2_3(cc) {
  var _cc;

  return M.jB(eff(4, _cc), e2_4, cc);
}

function e2_4(_cc, cc) {
  return M.jB(eff(5, _cc), e2_5, cc);
}

function e2_5(_cc, cc) {
  return M.j(eff(6, _cc), e2_6, cc);
}

function e2_6(cc) {
  return M.j(eff(7, cc), e2_7);
}

function e2_7() {
  return M.pure();
}