function a() {
  return M.j(eff('in body'), a_1, a_2);
}

function b() {
  var b_v = {
    e: undefined
  };

  try {
    return M.jH(eff('in body'), b_2, b_1, b_v, b_3);
  } catch (ex) {
    return b_1(ex, b_v, undefined);
  }
}

function c() {
  return M.j(eff('in body'), c_1, c_2);
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
  return M.j(eff('before'), e_1, e_v);
}

function f() {
  var f_v = {
    e: undefined
  };

  try {
    return M.jH(eff('in body'), f_2, f_1, f_v, f_3);
  } catch (ex) {
    return f_1(ex, f_v, undefined);
  }
}

function g() {
  var g_v = {
    e: undefined
  };

  try {
    return M.jH(eff('in body'), g_2, g_1, g_3);
  } catch (e) {
    return g_1(e, undefined);
  }
}

function a_1(cb) {
  return M.j(eff('in `finally`'), cb);
}

function a_2() {
  return M.j(eff('after `finally`'), a_3);
}

function a_3() {
  return M.pure();
}

function b_1(ex, b_v, cb) {
  b_v.e = ex;
  return M.j(eff('in `catch`', b_v.e), b_2, b_v, b_3);
}

function b_2(b_v, cb) {
  return M.j(eff('in `finally`'), cb);
}

function b_3() {
  return M.j(eff('after `finally`'), b_4);
}

function b_4() {
  return M.pure();
}

function c_1(cb) {
  console.log('in `finally`');
  return cb();
}

function c_2() {
  return M.j(eff('after `finally`'), c_3);
}

function c_3() {
  return M.pure();
}

function d_1(cb) {
  return M.j(eff('in `finally`'), cb);
}

function d_2() {
  return M.j(eff('after `finally`'), d_3);
}

function d_3() {
  return M.pure();
}

function e_1(e_v) {
  try {
    console.log('in body');
    return M.jH(eff('in body'), e_4, e_2, e_v, e_6);
  } catch (ex) {
    return e_2(ex, e_v, undefined);
  }
}

function e_2(ex, e_v, cb) {
  e_v.e = ex;
  console.log('catch', e_v.e);
  return M.j(eff('catch', e_v.e), e_3, e_v);
}

function e_3(e_v) {
  console.log('catch', e_v.e);
  return e_4(e_v, e_6);
}

function e_4(e_v, cb) {
  console.log('in finally');
  return M.j(eff('in `finally`'), e_5, cb);
}

function e_5(cb) {
  console.log('in finally 2');
  return cb();
}

function e_6() {
  console.log('after `finally`');
  return M.j(eff('after `finally`'), e_7);
}

function e_7() {
  return M.pure();
}

function f_1(ex, f_v, cb) {
  f_v.e = ex;
  return M.j(eff('in `catch`'), f_2, f_v, f_3);
}

function f_2(f_v, cb) {
  console.log('in `finally`');
  return cb();
}

function f_3() {
  return M.j(eff('after `finally`'), f_4);
}

function f_4() {
  return M.pure();
}

function g_1(e, cb) {
  console.log('in `catch`');
  return g_2(g_3);
}

function g_2(cb) {
  console.log('in `finally`');
  return cb();
}

function g_3() {
  return M.j(eff('after `finally`'), g_4);
}

function g_4() {
  return M.pure();
}