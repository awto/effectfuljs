function a_1(ref_) {
  if (ref_.loop = ref_.loop()) return a_2(ref_);else {
    return eff(2);
  }
}

function a_2(ref_) {
  ref_.i = ref_.loop.value;
  return M.jM1R(eff(1), a_1, ref_);
}

function b_1(a, ref_) {
  ref_._loop = M.iterator(a);
  return b_2(ref_);
}

function b_2(ref_) {
  if (ref_._loop = ref_._loop()) return b_3(ref_);else {
    return eff(ref_._i);
  }
}

function b_3(ref_) {
  ref_._i = ref_._loop.value;
  return M.jM1R(eff(ref_._i), b_2, ref_);
}

function c_1(ref_) {
  if (ref_.loop1 = ref_.loop1()) return c_2(ref_);else {
    return eff(ref_.i1, ref_.j);
  }
}

function c_2(ref_) {
  ref_.i1 = ref_.loop1.value;
  ref_.loop2 = M.iterator(other);
  return c_3(ref_);
}

function c_3(ref_) {
  if (ref_.loop2 = ref_.loop2()) return c_4(ref_);else return c_1(ref_);
}

function c_4(ref_) {
  ref_.j = ref_.loop2.value;
  return M.jM1R(eff(ref_.i1, ref_.j), c_3, ref_);
}

function d_1(ref_) {
  if (ref_.loop3 = ref_.loop3()) return d_2(ref_);else {
    return eff(2);
  }
}

function d_2(ref_) {
  ref_.i2 = ref_.loop3.value;
  return M.jM1R(eff(1), d_1, ref_);
}

function a() {
  var ref_ = {
    i: undefined,
    loop: undefined
  };
  ref_.loop = M.iterator(some);
  return a_1(ref_);
}

function b() {
  var ref_ = {
    _i: undefined,
    _loop: undefined
  };
  return M.jMB1(eff('d'), b_1, ref_);
}

function c() {
  var ref_ = {
    i1: undefined,
    j: undefined,
    loop1: undefined,
    loop2: undefined
  };
  ref_.loop1 = M.iterator(some);
  return c_1(ref_);
}

function d() {
  var ref_ = {
    i2: undefined,
    loop3: undefined
  };
  ref_.loop3 = M.iterator(some);
  return d_1(ref_);
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}