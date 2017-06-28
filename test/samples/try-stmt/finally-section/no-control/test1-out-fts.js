function a_1(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function a_2() {
  return eff('after `finally`');
}

function b_1() {
  try {
    return M.jME(eff('in body'), b_2, b_3);
  } catch (e) {
    return b_3(e);
  }
}

function b_2() {
  return b_4(b_5);
}

function b_3(ex) {
  var e;
  e = ex;
  return M.jM1(eff('in `catch`', e), b_4, b_5);
}

function b_4(cb) {
  return M.jM(eff('in `finally`'), cb);
}

function b_5() {
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

function e_1() {
  try {
    console.log('in body');
    return M.jME(eff('in body'), e_2, e_3);
  } catch (e) {
    return e_3(e);
  }
}

function e_2() {
  return e_5(e_7);
}

function e_3(ex) {
  var e;
  e = ex;
  console.log('catch', e);
  return M.jM1(eff('catch', e), e_4, e);
}

function e_4(e) {
  console.log('catch', e);
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

function f_1() {
  try {
    return M.jME(eff('in body'), f_2, f_3);
  } catch (e) {
    return f_3(e);
  }
}

function f_2() {
  return f_4(f_5);
}

function f_3(ex) {
  var e;
  e = ex;
  return M.jM1(eff('in `catch`'), f_4, f_5);
}

function f_4(cb) {
  console.log('in `finally`');
  return cb();
}

function f_5() {
  return eff('after `finally`');
}

function g_1() {
  try {
    return M.jME(eff('in body'), g_2, g_3);
  } catch (e) {
    return g_3(e);
  }
}

function g_2() {
  return g_4(g_5);
}

function g_3(ex) {
  var e;
  e = ex;
  console.log('in `catch`');
  return g_4(g_5);
}

function g_4(cb) {
  console.log('in `finally`');
  return cb();
}

function g_5() {
  return eff('after `finally`');
}

function a() {
  return M.jM1(eff('in body'), a_1, a_2);
}

function b() {
  return b_1();
}

function c() {
  return M.jM1(eff('in body'), c_1, c_2);
}

function d() {
  console.log('in body');
  return d_1(d_2);
}

function e() {
  console.log('before');
  return M.jM(eff('before'), e_1);
}

function f() {
  return f_1();
}

function g() {
  return g_1();
}