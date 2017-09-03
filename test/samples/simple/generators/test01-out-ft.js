function d(i) {
  var d_v = {
    i,
    j: undefined
  };
  return M.scope(d_1, d_v);
}

function a4() {
  var a4_v = {
    e: undefined
  };
  return M.scope(a4_1, a4_v);
}

function a5() {
  var a5_v = {
    i: undefined
  };
  return M.scope(a5_1, a5_v);
}

function cfb1() {
  var cfb1_v = {
    i: undefined,
    e: undefined
  };
  return M.scope(cfb1_1, cfb1_v);
}

function d_1(d_v) {
  var a;
  d_v.j = 0;
  a = d_v.i++;
  return M.j(M.yld(a), d_2, d_v);
}

function d_2(d_v) {
  var a;
  a = d_v.j++;
  return M.j(M.yld(a), d_3, d_v);
}

function d_3(d_v) {
  var a, b;
  b = d_v.i += 2;
  a = some(b, d_v.j);
  return M.jB(M.yldStar(a + d_v.j), d_4, d_v);
}

function d_4(a, d_v) {
  return M.jB(M.yld(a), d_5, d_v);
}

function d_5(a, d_v) {
  if (a) return d_6(d_v);else {
    if (d_v.j) return d_8(d_v);else {
      return M.j(M.yld(2), d_9);
    }
  }
}

function d_6(d_v) {
  var a;
  a = d_v.i += 3;
  return M.jB(M.yldStar(a), d_7);
}

function d_7(a) {
  return M.pure(a);
}

function d_8(d_v) {
  return M.pure(d_v.i);
}

function d_9() {
  return M.pure();
}

function a4_1(a4_v) {
  return M.j(M.yld(1), a4_2, a4_v);
}

function a4_2(a4_v) {
  try {
    return M.jH(M.yld(2), a4_3, a4_4, a4_v, undefined);
  } catch (ex) {
    return a4_4(ex, a4_v, undefined);
  }
}

function a4_3(a4_v, cb) {
  try {
    return M.jH(M.yld(3), a4_6, a4_4, a4_v, a4_8);
  } catch (ex) {
    return a4_4(ex, a4_v, cb);
  }
}

function a4_4(ex, a4_v, cb) {
  a4_v.e = ex;
  return M.j(M.yld('excep'), a4_5, a4_v);
}

function a4_5(a4_v) {
  return M.j(M.yld(a4_v.e), a4_6, a4_v, a4_8);
}

function a4_6(a4_v, cb) {
  return M.j(M.yld('f'), a4_7, cb);
}

function a4_7(cb) {
  return M.j(M.yld('e'), cb);
}

function a4_8() {
  var a;
  a = a2();
  return M.jB(M.yldStar(a), a4_9);
}

function a4_9(a) {
  return M.j(M.yld(a), a4_10);
}

function a4_10() {
  return M.pure();
}

function a5_1(a5_v) {
  var loop;
  loop = M.iterator(a4());
  return a5_2(a5_v, loop);
}

function a5_2(a5_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return a5_3(a5_v, loop);else {
    return M.pure();
  }
}

function a5_3(a5_v, loop) {
  a5_v.i = loop.value;
  return M.jR(M.yld(a5_v.i), a5_2, a5_v, loop);
}

function cfb1_1(cfb1_v) {
  cfb1_v.i = 0;
  return cfb1_3(cfb1_v, undefined);
}

function cfb1_2(_ex, cfb1_v, ex, cb) {
  return cfb1_6(cfb1_v, _ex, cfb1_8);
}

function cfb1_3(cfb1_v, ex) {
  try {
    return M.jBH(M.yld(cfb1_v.i === 3), cfb1_4, cfb1_2, cfb1_v, ex, undefined);
  } catch (_ex) {
    return cfb1_2(_ex, cfb1_v, ex, undefined);
  }
}

function cfb1_4(a, cfb1_v, ex, cb) {
  try {
    if (a) {
      throw new Error(`AAAAAAAAA${cfb1_v.i++}`);
    }

    return M.jH(M.yld(`a${cfb1_v.i}`), cfb1_6, cfb1_2, cfb1_v, ex, cfb1_7);
  } catch (_ex) {
    return cfb1_2(_ex, cfb1_v, ex, cb);
  }
}

function cfb1_5(_ex, cfb1_v, ex) {
  return cfb1_8(cfb1_v, _ex);
}

function cfb1_6(cfb1_v, ex, cb) {
  var a;

  try {
    a = cfb1_v.i++;
    return M.jH(M.yld(`f1${a}`), cb, cfb1_5, cfb1_v, ex);
  } catch (_ex) {
    return cfb1_5(_ex, cfb1_v, ex);
  }
}

function cfb1_7(cfb1_v, ex) {
  var a;

  try {
    a = cfb1_v.i++;
    return M.jH(M.yld(`b${a}`), cfb1_11, cfb1_5, cfb1_v, ex);
  } catch (_ex) {
    return cfb1_5(_ex, cfb1_v, ex);
  }
}

function cfb1_8(cfb1_v, ex) {
  cfb1_v.e = ex;
  return M.j(M.yld(`e${cfb1_v.i}`), cfb1_9, cfb1_v);
}

function cfb1_9(cfb1_v) {
  return M.j(M.yld(cfb1_v.e), cfb1_10, cfb1_v);
}

function cfb1_10(cfb1_v) {
  return M.pure(cfb1_v.i);
}

function cfb1_11(cfb1_v, ex) {
  cfb1_v.i++;
  return M.jR(cfb1_3, cfb1_v, ex);
}

function cfb1_12() {
  return M.pure();
}