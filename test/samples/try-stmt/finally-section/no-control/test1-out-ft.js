function a_1(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function a_2() {
  return eff('after `finally`');
}

function b_1(ref_) {
  try {
    return M.jM1E(eff('in body'), b_2, ref_, b_3);
  } catch (e) {
    return b_3(e, ref_);
  }
}

function b_2(ref_) {
  return b_4(ref_, b_5);
}

function b_3(ex, ref_) {
  ref_.e = ex;
  return M.jM2(eff('in `catch`', ref_.e), b_4, ref_, b_5);
}

function b_4(ref_, cb) {
  return M.jM1(eff('in `finally`'), cb, ref_);
}

function b_5(ref_) {
  return eff('after `finally`');
}

function c_1(cb) {
  console.log('in `finally`');
  return cb();
}

function c_2() {
  return eff('after `finally`');
}

function d_1(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function d_2() {
  return eff('after `finally`');
}

function e_1(ref_) {
  try {
    console.log('in body');
    return M.jM1E(eff('in body'), e_2, ref_, e_3);
  } catch (e) {
    return e_3(e, ref_);
  }
}

function e_2(ref_) {
  return e_5(ref_, e_7);
}

function e_3(ex, ref_) {
  ref_.e3 = ex;
  console.log('catch', ref_.e3);
  return M.jM1(eff('catch', ref_.e3), e_4, ref_);
}

function e_4(ref_) {
  console.log('catch', ref_.e3);
  return e_5(ref_, e_7);
}

function e_5(ref_, cb) {
  console.log('in finally');
  return M.jM2(eff('in `finally`'), e_6, ref_, cb);
}

function e_6(ref_, cb) {
  console.log('in finally 2');
  return cb(ref_);
}

function e_7(ref_) {
  console.log('after `finally`');
  return eff('after `finally`');
}

function f_1(ref_) {
  try {
    return M.jM1E(eff('in body'), f_2, ref_, f_3);
  } catch (e) {
    return f_3(e, ref_);
  }
}

function f_2(ref_) {
  return f_4(ref_, f_5);
}

function f_3(ex, ref_) {
  ref_.e4 = ex;
  return M.jM2(eff('in `catch`'), f_4, ref_, f_5);
}

function f_4(ref_, cb) {
  console.log('in `finally`');
  return cb(ref_);
}

function f_5(ref_) {
  return eff('after `finally`');
}

function g_1(ref_) {
  try {
    return M.jM1E(eff('in body'), g_2, ref_, g_3);
  } catch (e) {
    return g_3(e, ref_);
  }
}

function g_2(ref_) {
  return g_4(ref_, g_5);
}

function g_3(ex, ref_) {
  ref_.e5 = ex;
  console.log('in `catch`');
  return g_4(ref_, g_5);
}

function g_4(ref_, cb) {
  console.log('in `finally`');
  return cb(ref_);
}

function g_5(ref_) {
  return eff('after `finally`');
}

function a() {
  return M.jM1(eff('in body'), a_1, a_2);
}

function b() {
  var ref_ = {
    e: undefined
  };
  return b_1(ref_);
}

function c() {
  return M.jM1(eff('in body'), c_1, c_2);
}

function d() {
  console.log('in body');
  return d_1(d_2);
}

function _e() {
  var ref_ = {
    e3: undefined
  };
  console.log('before');
  return M.jM1(eff('before'), e_1, ref_);
}

function f() {
  var ref_ = {
    e4: undefined
  };
  return f_1(ref_);
}

function g() {
  var ref_ = {
    e5: undefined
  };
  return g_1(ref_);
}