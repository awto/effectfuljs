function d(i) {
  return M.scope(d_1, d_8, i);
}

function a4() {
  var a4 = M.generator();
  return M.scope(a4_1, a4_11);
}

function a5() {
  var a5 = M.generator();
  return M.scope(a5_1, a5_5);
}

function cfb1() {
  var cfb1 = M.generator();
  return M.scope(cfb1_1, cfb1_10);
}

function c() {
  return M.scope(c_1, c_3);
}

const v = v => {
  var ctx = M.async();
  ctx._v = v;
  return M.scope(f_1, f_31);
};

const obj = {
  a1: function () {
    return M.scope(_f_1, _f_3);
  },
  a2: function (a) {
    var ctx = M.async();
    ctx._a = a;
    return M.scope(f_11, f_3);
  },

  a3(a, b) {
    var ctx = M.async();
    ctx._a = a;
    ctx._b = b;
    return M.scope(a3_1, a3_3);
  }

};

class A {
  static a(b) {
    var ctx = M.async();
    ctx._b = b;
    return M.scope(a_1, a_3);
  }

  b(a) {
    var ctx = M.async();
    ctx._a = a;
    return M.scope(b_1, b_3);
  }

}

function d_1(i) {
  var j, a;
  j = 0;
  a = i++;
  return M.yldStar(M.yld(a), d_2, d_8, i, j);
}

function d_2(a, i, j) {
  var b;
  b = j++;
  return M.yldStar(M.yld((a, b)), d_3, d_8, i, j);
}

function d_3(i, j) {
  return M.yldStar(M.yldStar(some(i += 2, j) + j), d_4, d_8, i, j);
}

function d_4(a, i, j) {
  return M.yldStar(M.yld(a), d_5, d_8, i, j);
}

function d_5(a, i, j) {
  var b;

  if (a) {
    b = i += 3;
    return M.yldStar(M.yldStar(b), d_7, d_8);
  } else {
    if (j) {
      return M.pure(i);
    } else {
      return M.yldStar(M.yld(2), d_6, d_8);
    }
  }
}

function d_6() {
  var r;
  return M.pure(r);
}

function d_7(r) {
  return M.pure(r);
}

function d_8(e) {
  return M.raise(e);
}

function a4_1(a4) {
  return M.yldStar(M.yld(1), a4_2, a4_13);
}

function a4_2(a4) {
  return M.yldStar(M.yld(2), a4_3, a4_13);
}

function a4_3(a4) {
  return M.yldStar(M.yld(3), a4_6, a4_11, a4_8, a4_11);
}

function a4_4(a4, ex) {
  a4._e = ex;
  return M.yldStar(M.yld('excep'), a4_5, a4_14);
}

function a4_5(a4) {
  return M.yldStar(M.yld(a4._e), a4_6, a4_11, a4_8, a4_11);
}

function a4_6(a4, fc, fe, err) {
  return M.yldStar(M.yld('f'), a4_7, a4_11, fc, fe, err);
}

function a4_7(a4, fc, fe, err) {
  var fr;
  return M.yldStar(M.yld('e'), fc, fe, fr);
}

function a4_8(a4) {
  var a;
  a = a2();
  return M.yldStar(M.yldStar(a), a4_9, a4_11);
}

function a4_9(a4, a) {
  return M.yldStar(M.yld(a), a4_10, a4_11);
}

function a4_10(a4) {
  return M.pure();
}

function a4_11(a4, e) {
  return M.raise(e);
}

function a4_12(a4, err) {
  return M.raise(err);
}

function a4_13(a4, a) {
  return M.jump(a4_4, a4_14, a);
}

function a4_14(a4, a) {
  return M.jump(a4_6, a4_11, a4_12, a4_11, a);
}

function a5_1(a5) {
  var loop;
  loop = M.iterator(a4());
  return M.jump(a5_2, a5_5, loop);
}

function a5_2(a5, loop) {
  if (!(loop = loop.step()).done) {
    a5._i = loop.value;
    return M.jump(a5_3, a5_6, loop);
  } else {
    return M.pure();
  }
}

function a5_3(a5, loop) {
  return M.repeat(M.yld(a5._i), a5_2, a5_5, loop);
}

function a5_4(a5, ex) {
  e = ex;

  if (loop.exit) {
    loop.exit();
  }

  throw e;
}

function a5_5(a5, e) {
  return M.raise(e);
}

function a5_6(a5, a) {
  return M.jump(a5_4, a5_5, a);
}

function cfb1_1(cfb1) {
  var i;
  i = 0;
  return M.jump(cfb1_2, cfb1_12, i);
}

function cfb1_2(cfb1, i) {
  return M.yldStar(M.yld(i === 3), cfb1_3, cfb1_12, i);
}

function cfb1_3(cfb1, a, i) {
  if (a) {
    throw new Error(`AAAAAAAAA${i++}`);
  }

  return M.yldStar(M.yld(`a${i}`), cfb1_4, cfb1_11, i, cfb1_5, cfb1_11);
}

function cfb1_4(cfb1, i, fc, fe) {
  var fr;
  return M.yldStar(M.yld(`f1${i++}`), fc, fe, fr, i, err);
}

function cfb1_5(cfb1, i) {
  return M.yldStar(M.yld(`b${i++}`), cfb1_9, cfb1_10, i);
}

function cfb1_6(cfb1, i, ex) {
  cfb1._e = ex;
  return M.yldStar(M.yld(`e${i}`), cfb1_7, cfb1_10, i);
}

function cfb1_7(cfb1, i) {
  return M.yldStar(M.yld(cfb1._e), cfb1_8, cfb1_10, i);
}

function cfb1_8(cfb1, i) {
  return M.pure(i);
}

function cfb1_9(cfb1, i) {
  i++;
  return M.repeat(cfb1_2, cfb1_12, i);
}

function cfb1_10(cfb1, e) {
  return M.raise(e);
}

function cfb1_11(cfb1, a) {
  return M.jump(cfb1_6, cfb1_10, void 0, a);
}

function cfb1_12(cfb1, a) {
  return M.jump(cfb1_4, cfb1_11, void 0, cfb1_6, cfb1_10);
}

function c_1() {
  return M.yldStar(M.yld(1), c_2, c_3);
}

function c_2() {
  return M.pure();
}

function c_3(e) {
  return M.raise(e);
}

function f_1(ctx) {
  return M.chain(M.chain(ctx._v), f_21, f_31);
}

function f_21(ctx, r) {
  return M.pure(r);
}

function f_31(ctx, e) {
  return M.raise(e);
}

function _f_1() {
  return M.yldStar(M.yld(1), _f_2, _f_3);
}

function _f_2() {
  return M.pure();
}

function _f_3(e) {
  return M.raise(e);
}

function f_11(ctx) {
  return M.chain(M.chain(ctx._a), f_2, f_3);
}

function f_2(ctx) {
  return M.pure();
}

function f_3(ctx, e) {
  return M.raise(e);
}

function a3_1(ctx) {
  return M.chain(M.chain(ctx._a), a3_2, a3_3);
}

function a3_2(ctx) {
  return M.pure();
}

function a3_3(ctx, e) {
  return M.raise(e);
}

function a_1(ctx) {
  return M.chain(M.chain(ctx._b), a_2, a_3);
}

function a_2(ctx) {
  return M.pure();
}

function a_3(ctx, e) {
  return M.raise(e);
}

function b_1(ctx) {
  return M.chain(M.chain(ctx._a), b_2, b_3);
}

function b_2(ctx) {
  return M.pure();
}

function b_3(ctx, e) {
  return M.raise(e);
}