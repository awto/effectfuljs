function a_1(a, ref_) {
  ref_.b1 = a;
  return M.jM1(eff('a'), a_2, ref_);
}

function a_2(ref_) {
  return eff('b');
}

function a1_1(a, ref_) {
  ref_._a = a;
  return M.jM1(eff('a'), a1_2, ref_);
}

function a1_2(ref_) {
  return eff('b');
}

function b_1(a, ref_) {
  ref_._b1 = a;
  return M.jMB1(eff(2), b_2, ref_);
}

function b_2(a, ref_) {
  ref_.b2 = a;
  return M.jM1(eff(ref_._b1), b_3, ref_);
}

function b_3(ref_) {
  return eff(ref_.b2);
}

function b1_1(a, ref_) {
  ref_.a2 = a;
  return M.jMB1(eff(2), b1_2, ref_);
}

function b1_2(a, ref_) {
  ref_.c = a;
  return M.jM1(eff(ref_.a2), b1_3, ref_);
}

function b1_3(ref_) {
  return eff(ref_.c);
}

function c_1(a, ref_) {
  ref_.a3 = a;
  ref_._b = 2;
  return M.jMB1(eff(3), c_2, ref_);
}

function c_2(a, ref_) {
  ref_.c1 = a;
  return M.jM1(eff('a'), c_3, ref_);
}

function c_3(ref_) {
  return M.jM1(eff('b'), c_4, ref_);
}

function c_4(ref_) {
  return M.jMB1(eff(4), c_5, ref_);
}

function c_5(a, ref_) {
  ref_.d = a;
  ref_.e = 5;
  return M.jMB1(eff(6), c_6, ref_);
}

function c_6(a, ref_) {
  ref_.f = a;
  return M.jMB1(eff(7), c_7, ref_);
}

function c_7(a, ref_) {
  ref_.g = a;
  ref_.j = 8;
  return M.jMB1(eff('x'), c_8, ref_);
}

function c_8(a, ref_) {
  ref_.x = a;
  ref_.y = 'y';
  return M.jMB1(eff('z'), c_9, ref_);
}

function c_9(a, ref_) {
  ref_.z = a;
  return M.jM1(eff(9), c_10, ref_);
}

function c_10(ref_) {
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
  var ref_ = {
    b1: undefined
  };
  return M.jMB1(eff(1), a_1, ref_);
}

function a1() {
  var ref_ = {
    _a: undefined
  };
  return M.jMB1(eff(1), a1_1, ref_);
}

function b() {
  var ref_ = {
    _b1: undefined,
    b2: undefined
  };
  return M.jMB1(eff(1), b_1, ref_);
}

function b11() {
  var ref_ = {
    a2: undefined,
    c: undefined
  };
  return M.jMB1(eff(1), b1_1, ref_);
}

function _c() {
  var ref_ = {
    a3: undefined,
    _b: undefined,
    c1: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
    g: undefined,
    j: undefined,
    x: undefined,
    y: undefined,
    z: undefined
  };
  return M.jMB1(eff(1), c_1, ref_);
}

function _d() {
  return M.jMB(eff1('a'), d_1);
}