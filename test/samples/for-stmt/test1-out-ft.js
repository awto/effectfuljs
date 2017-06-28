function _1(ref_) {
  if (ref_.j < ref_.len) {
    ref_._i = ref_.ref[ref_.j];
    return M.jMB1(eff(ref_._i), _2, ref_);
  } else return M.pure();
}

function _2(a, ref_) {
  if (a) return _3(ref_);else return _3(ref_);
}

function _3(ref_) {
  ref_.j++;
  return M.jNR(_1, ref_);
}

function a_1(ref_) {
  ref_.i1 = 0;
  return a_2(ref_);
}

function a_2(ref_) {
  if (ref_.i1 < 3) return a_3(ref_);else {
    return eff('a');
  }
}

function a_3(ref_) {
  if (ref_.i1 === 2) {
    console.log(ref_.i1);
  }

  return M.jM1(eff(ref_.i1), a_4, ref_);
}

function a_4(ref_) {
  ref_.i1++;
  return M.jNR(a_2, ref_);
}

function a1_1(ref_) {
  ref_.i2 = 0;
  ref_._j = 10;
  return a1_2(ref_);
}

function a1_2(ref_) {
  if (ref_.i2 < 3) return a1_3(ref_);else {
    return effRes(ref_.i2, ref_._j);
  }
}

function a1_3(ref_) {
  if (ref_.i2 === 2) {
    console.log(ref_.i2, ref_._j);
  }

  return M.jM1(eff(ref_.i2, ref_._j), a1_4, ref_);
}

function a1_4(ref_) {
  ref_.i2++, ref_._j += 2;
  return M.jNR(a1_2, ref_);
}

function b_1() {
  if (i === 2) {
    console.log(i);
  }

  return M.jMR(eff(i), b_1);
}

function b_2() {
  return eff('a');
}

function c_1() {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) return c_2();else {
    return M.jMR(eff(i), c_1);
  }
}

function c_2() {
  return M.pure(10);
}

function c_3() {
  return eff('a');
}

function d_1(ref_) {
  if (ref_.i3 < 10) return d_2(ref_);else {
    return eff(ref_.result);
  }
}

function d_2(ref_) {
  return M.jMB1(eff(ref_.result, ref_.i3), d_3, ref_);
}

function d_3(a, ref_) {
  ref_.result = a;
  ref_.i3++;
  return M.jNR(d_1, ref_);
}

function e_1(ref_) {
  if (ref_.i4 < 10) return e_2(ref_);else {
    return eff();
  }
}

function e_2(ref_) {
  return M.jMB1(eff(ref_.i4), e_3, ref_);
}

function e_3(a, ref_) {
  ref_._result = a;
  ref_.i4++;
  return M.jNR(e_1, ref_);
}

function f_1(ref_) {
  if (ref_.i5 < 10) return f_2(ref_);else {
    return eff(ref_.result1);
  }
}

function f_2(ref_) {
  return M.jMB1(eff(ref_.i5), f_3, ref_);
}

function f_3(a, ref_) {
  ref_.result1 = a;
  ref_.i5++;
  return M.jNR(f_1, ref_);
}

(function () {
  var ref_ = {
    _i: undefined,
    j: undefined,
    len: undefined,
    ref: undefined
  };
  ref_.ref = [1, 2, 3];
  ref_.j = 0, ref_.len = ref_.ref.length;
  return _1(ref_);
});

(function () {
  console.log('bi');

  for (var i = 0; i < 3; i++) {
    console.log('bi:', i);
  }

  console.log('ai');
});

(function () {
  console.log('bi');

  lab: for (var i = 0; i < 3; i++) {
    console.log('bj:' + i);

    for (var j = 0; j < 40; j += 10) {
      if (j === 10) continue lab;
      if (j === 30) break lab;
      console.log(i + j);
    }

    console.log('aj:' + i);
  }

  console.log('ai');
});

function a() {
  var ref_ = {
    i1: undefined
  };
  return M.jM1(eff('b'), a_1, ref_);
}

;

function a1() {
  var ref_ = {
    i2: undefined,
    _j: undefined
  };
  return M.jM1(eff('b'), a1_1, ref_);
}

function b() {
  return M.jM(eff('b'), b_1);
}

function c() {
  return M.jM(eff('b'), c_1);
}

function d() {
  var ref_ = {
    result: undefined,
    i3: undefined
  };
  ref_.result = 0;
  ref_.i3 = 0;
  return d_1(ref_);
}

function e() {
  var ref_ = {
    _result: undefined,
    i4: undefined
  };
  ref_._result = 0;
  ref_.i4 = 0;
  return e_1(ref_);
}

function f() {
  var ref_ = {
    result1: undefined,
    i5: undefined
  };
  ref_.result1 = 0;
  ref_.i5 = 0;
  return f_1(ref_);
}