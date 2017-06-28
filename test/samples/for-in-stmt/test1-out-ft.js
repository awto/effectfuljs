function a_1(a, ref_) {
  ref_.loop = M.forInIterator(a);
  return a_2(ref_);
}

function a_2(ref_) {
  if (ref_.loop = ref_.loop()) return a_3(ref_);else return M.pure();
}

function a_3(ref_) {
  ref_.i = ref_.loop.value;
  return M.jM1R(eff(ref_.i), a_2, ref_);
}

function b_1(a, ref_) {
  ref_._loop = M.forInIterator(a);
  return b_2(ref_);
}

function b_2(ref_) {
  if (ref_._loop = ref_._loop()) return b_3(ref_);else return M.pure();
}

function b_3(ref_) {
  ref_._i = ref_._loop.value;
  return M.jM1R(eff(ref_._i), b_2, ref_);
}

function c_1(a, ref_) {
  ref_.loop1 = M.forInIterator(a);
  return c_2(ref_);
}

function c_2(ref_) {
  if (ref_.loop1 = ref_.loop1()) return c_3(ref_);else return M.pure();
}

function c_3(ref_) {
  ref_.i1 = ref_.loop1.value;
  return M.jM1R(eff(ref_.i1), c_2, ref_);
}

function d_1(a, ref_) {
  for (ref_.i2 in a) {
    console.log(ref_.i2);
  }

  return M.pure();
}

function e_1(ref_) {
  if (ref_.loop2 = ref_.loop2()) return e_2(ref_);else return M.pure();
}

function e_2(ref_) {
  ref_.i3 = ref_.loop2.value;
  return M.jM1R(eff(ref_.i3), e_1, ref_);
}

function g_1(ref_) {
  return M.jMB1(eff(2), g_2, ref_);
}

function g_2(a, ref_) {
  ref_.loop3 = M.forInIterator(a);
  return g_3(ref_);
}

function g_3(ref_) {
  if (ref_.loop3 = ref_.loop3()) {
    ref_.i4 = ref_.loop3.value;
    return M.jMB1(eff(ref_.i4), g_4, ref_);
  } else return g_6(ref_);
}

function g_4(a, ref_) {
  if (a) return g_3(ref_);else {
    return M.jMB1(effB(ref_.i4), g_5, ref_);
  }
}

function g_5(a, ref_) {
  if (a) return g_6(ref_);else {
    return M.jM1R(eff('c'), g_3, ref_);
  }
}

function g_6(ref_) {
  return eff('z');
}

function h_1(ref_) {
  ref_.loop4 = M.forInIterator(obj);
  return h_2(ref_);
}

function h_2(ref_) {
  if (ref_.loop4 = ref_.loop4()) {
    ref_.j = ref_.loop4.value;
    console.log('j');
    return M.jM1(effA(ref_.j), h_3, ref_);
  } else return h_12(ref_);
}

function h_3(ref_) {
  return M.jMB1(eff(ref_.j), h_4, ref_);
}

function h_4(a, ref_) {
  ref_.loop5 = M.forInIterator(a);
  return h_5(ref_);
}

function h_5(ref_) {
  if (ref_.loop5 = ref_.loop5()) {
    ref_.i5 = ref_.loop5.value;
    console.log('b');
    return M.jM1(eff('b'), h_6, ref_);
  } else return h_11(ref_);
}

function h_6(ref_) {
  return M.jMB1(eff(ref_.i5 + ref_.j), h_7, ref_);
}

function h_7(a, ref_) {
  if (a) return h_2(ref_);else {
    return M.jMB1(effB(ref_.i5 + ref_.j), h_8, ref_);
  }
}

function h_8(a, ref_) {
  if (a) return h_12(ref_);else {
    return M.jMB1(eff(ref_.i5), h_9, ref_);
  }
}

function h_9(a, ref_) {
  if (a) return h_5(ref_);else {
    return M.jMB1(effB(ref_.i5), h_10, ref_);
  }
}

function h_10(a, ref_) {
  if (a) return h_11(ref_);else {
    return M.jM1R(eff('c'), h_5, ref_);
  }
}

function h_11(ref_) {
  return M.jM1R(effB(ref_.j), h_2, ref_);
}

function h_12(ref_) {
  return eff('z');
}

function a() {
  var ref_ = {
    i: undefined,
    loop: undefined
  };
  return M.jMB1(eff(2), a_1, ref_);
}

function b() {
  var ref_ = {
    _i: undefined,
    _loop: undefined
  };
  return M.jMB1(eff(2), b_1, ref_);
}

function c() {
  var ref_ = {
    i1: undefined,
    loop1: undefined
  };
  return M.jMB1(eff(2), c_1, ref_);
}

function d() {
  var ref_ = {
    i2: undefined
  };
  return M.jMB1(eff(2), d_1, ref_);
}

function e() {
  var ref_ = {
    i3: undefined,
    loop2: undefined
  };
  ref_.loop2 = M.forInIterator(obj);
  return e_1(ref_);
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var ref_ = {
    i4: undefined,
    loop3: undefined
  };
  return M.jM1(eff('a'), g_1, ref_);
}

function h() {
  var ref_ = {
    j: undefined,
    i5: undefined,
    loop4: undefined,
    loop5: undefined
  };
  return M.jM1(eff('a'), h_1, ref_);
}