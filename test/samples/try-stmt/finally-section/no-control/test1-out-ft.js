function a_1(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function a_2() {
  return eff('after `finally`');
}

function b_1(b_v) {
  try {
    return M.jME(eff('in body'), b_3, b_4, b_2);
  } catch (e) {
    return b_2(b_v);
  }
}

function b_2(b_v) {
  b_v.e = ex;
  return M.jM(eff('in `catch`', b_v.e), b_3, b_4);
}

function b_3(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function b_4() {
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

function e_1(e_v) {
  try {
    console.log('in body');
    return M.jME(eff('in body'), e_4, e_6, e_2);
  } catch (e) {
    return e_2(e_v);
  }
}

function e_2(e_v) {
  e_v.e = _ex;
  console.log('catch', e_v.e);
  return M.jM(eff('catch', e_v.e), e_3, e_v);
}

function e_3(e_v) {
  console.log('catch', e_v.e);
  return e_4(e_6);
}

function e_4(cb) {
  console.log('in finally');
  return M.jM(eff('in `finally`'), e_5, cb);
}

function e_5(cb) {
  console.log('in finally 2');
  return cb();
}

function e_6() {
  console.log('after `finally`');
  return eff('after `finally`');
}

function f_1(f_v) {
  try {
    return M.jME(eff('in body'), f_3, f_4, f_2);
  } catch (e) {
    return f_2(f_v);
  }
}

function f_2(f_v) {
  f_v.e = ex1;
  return M.jM(eff('in `catch`'), f_3, f_4);
}

function f_3(cb) {
  console.log('in `finally`');
  return cb();
}

function f_4() {
  return eff('after `finally`');
}

function g_1() {
  try {
    return M.jME(eff('in body'), g_3, g_4, g_2);
  } catch (e) {
    return g_2();
  }
}

function g_2() {
  console.log('in `catch`');
  return g_3(g_4);
}

function g_3(cb) {
  console.log('in `finally`');
  return cb();
}

function g_4() {
  return eff('after `finally`');
}

function a() {
  return M.jM(eff('in body'), a_1, a_2);
}

function b() {
  var b_v = {
    e: undefined
  };
  return b_1(b_v);
}

function c() {
  return M.jM(eff('in body'), c_1, c_2);
}

function d() {
  console.log('in body');
  return d_1(d_2);
}

function e() {
  var e_v = {
    e: undefined
  };
  console.log('before');
  return M.jM(eff('before'), e_1, e_v);
}

function f() {
  var f_v = {
    e: undefined
  };
  return f_1(f_v);
}

function g() {
  var g_v = {
    e: undefined
  };
  return g_1();
}