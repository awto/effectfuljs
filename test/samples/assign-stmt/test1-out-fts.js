function a_1(b1) {
  return M.jM(eff('a'), a_2);
}

function a_2() {
  return eff('b');
}

function a1_1(a) {
  return M.jM(eff('a'), a1_2);
}

function a1_2() {
  return eff('b');
}

function b_1(b1) {
  return M.jMB1(eff(2), b_2, b1);
}

function b_2(b2, b1) {
  return M.jM1(eff(b1), b_3, b2);
}

function b_3(b2) {
  return eff(b2);
}

function b1_1(a) {
  return M.jMB1(eff(2), b1_2, a);
}

function b1_2(c, a) {
  return M.jM1(eff(a), b1_3, c);
}

function b1_3(c) {
  return eff(c);
}

function c_1(a) {
  var b;
  b = 2;
  return M.jMB(eff(3), c_2);
}

function c_2(c) {
  return M.jM(eff('a'), c_3);
}

function c_3() {
  return M.jM(eff('b'), c_4);
}

function c_4() {
  return M.jMB(eff(4), c_5);
}

function c_5(d) {
  var e;
  e = 5;
  return M.jMB(eff(6), c_6);
}

function c_6(f) {
  return M.jMB(eff(7), c_7);
}

function c_7(g) {
  var j;
  j = 8;
  return M.jMB(eff('x'), c_8);
}

function c_8(x) {
  var y;
  y = 'y';
  return M.jMB(eff('z'), c_9);
}

function c_9(z) {
  return M.jM(eff(9), c_10);
}

function c_10() {
  return eff(10);
}

function d_1(a) {
  return M.jMB1(eff(2), d_2, a);
}

function d_2(b, a) {
  a.some = b;
  return M.jMB(eff('b'), d_3);
}

function d_3(a) {
  return M.jMB1(eff(3), d_4, a);
}

function d_4(b, a) {
  a.some += b;
  return M.jMB(eff('c'), d_5);
}

function d_5(a) {
  a.some++;
  some['d']--;
  return M.pure();
}

function a() {
  return M.jMB(eff(1), a_1);
}

function a1() {
  return M.jMB(eff(1), a1_1);
}

function b() {
  return M.jMB(eff(1), b_1);
}

function b1() {
  return M.jMB(eff(1), b1_1);
}

function c() {
  return M.jMB(eff(1), c_1);
}

function d() {
  return M.jMB(eff1('a'), d_1);
}