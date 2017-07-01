function a_1(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function a_2() {
  return eff('after `finally`');
}

function b_1(ex, b_v) {
  b_v.e = ex;
  return M.jM1(eff('in `catch`', b_v.e), b_2, b_3);
}

function b_2(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function b_3() {
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
    return M.jME(eff('in body'), e_2, e_3);
  } catch (e) {
    return e_3(e, e_v);
  }
}

function e_2() {
  return e_5(e_7);
}

function e_3(ex, e_v) {
  e_v.e = ex;
  console.log('catch', e_v.e);
  return M.jM1(eff('catch', e_v.e), e_4, e_v);
}

function e_4(e_v) {
  console.log('catch', e_v.e);
  return e_5(e_7);
}

function e_5(cb) {
  console.log('in finally');
  return M.jM1(eff('in `finally`'), e_6, cb);
}

function e_6(cb) {
  console.log('in finally 2');
  return cb();
}

function e_7() {
  console.log('after `finally`');
  return eff('after `finally`');
}

function f_1(ex, f_v) {
  f_v.e = ex;
  return M.jM1(eff('in `catch`'), f_2, f_3);
}

function f_2(cb) {
  console.log('in `finally`');
  return cb();
}

function f_3() {
  return eff('after `finally`');
}

function g_1(ex, g_v) {
  g_v.e = ex;
  console.log('in `catch`');
  return g_2(g_3);
}

function g_2(cb) {
  console.log('in `finally`');
  return cb();
}

function g_3() {
  return eff('after `finally`');
}

function a() {
  return M.jM1(eff('in body'), a_1, a_2);
}

function b() {
  var b_v;
  b_v = {
    e: undefined
  };
  return M.jM1(eff('in body'), b_2, b_3);
}

function c() {
  return M.jM1(eff('in body'), c_1, c_2);
}

function d() {
  console.log('in body');
  return d_1(d_2);
}

function e() {
  var e_v;
  e_v = {
    e: undefined
  };
  console.log('before');
  return M.jM1(eff('before'), e_1, e_v);
}

function f() {
  var f_v;
  f_v = {
    e: undefined
  };
  return M.jM1(eff('in body'), f_2, f_3);
}

function g() {
  var g_v;
  g_v = {
    e: undefined
  };
  return M.jM1(eff('in body'), g_2, g_3);
}