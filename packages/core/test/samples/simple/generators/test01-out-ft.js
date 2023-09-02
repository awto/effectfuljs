import * as M from "@effectful/core";
function d(i) {
  var d = M.context();
  d._i = i;
  return M.scope(d_1);
}
function a4() {
  var a4 = M.context();
  return M.scope(a4_1);
}
function a5() {
  var a5 = M.context();
  return M.scope(a5_1);
}
function cfb1() {
  var cfb1 = M.context();
  return M.scope(cfb1_1);
}
function c() {
  var c = M.context();
  return M.scope(c_1);
}
const v = v => {
  var ctx = M.context();
  ctx._v = v;
  return M.scope(f_1);
};
const obj = {
  a1: function () {
    var ctx = M.context();
    return M.scope(_f_1);
  },
  a2: function (a) {
    var ctx = M.context();
    ctx._a = a;
    return M.scope(f_11);
  },
  a3(a, b) {
    var ctx = M.context();
    ctx._a = a;
    ctx._b = b;
    return M.scope(a3_1);
  }
};
class A {
  static a(b) {
    var ctx = M.context();
    ctx._b = b;
    return M.scope(a_1);
  }
  b(a) {
    var ctx = M.context();
    ctx._a = a;
    return M.scope(b_1);
  }
}
function d_1(d) {
  var a;
  d._j = 0;
  a = d._i++;
  return M.yldStar(M.yld(a), d_2);
}
function d_2(d, a) {
  var b;
  b = d._j++;
  return M.yldStar(M.yld((a, b)), d_3);
}
function d_3(d) {
  return M.yldStar(M.yldStar(some(d._i += 2, d._j) + d._j), d_4);
}
function d_4(d, a) {
  return M.yldStar(M.yld(a), d_5);
}
function d_5(d, a) {
  var b;
  if (a) {
    b = d._i += 3;
    d._i = null, d._j = null;
    return M.yldStar(M.yldStar(b), d_6);
  } else {
    if (d._j) {
      return M.pure(d._i);
    } else {
      d._i = null, d._j = null;
      return M.yldStar(M.yld(2), d_7);
    }
  }
}
function d_6(d, a) {
  return M.pure(a);
}
function d_7(d) {
  return M.pure();
}
function d_8(d, r) {
  return M.pure(r);
}
function a4_1(a4) {
  return M.yldStar(M.yld(1), a4_2, a4_14);
}
function a4_2(a4) {
  return M.yldStar(M.yld(2), a4_3, a4_14);
}
function a4_3(a4) {
  a4._fc = a4_8, a4._fe = a4_12;
  return M.yldStar(M.yld(3), a4_6);
}
function a4_4(a4) {
  a4._e = a4._ex;
  a4._ex = null;
  return M.yldStar(M.yld("excep"), a4_5, a4_15);
}
function a4_5(a4) {
  var a;
  a4._fc = a4_8, a4._fe = a4_12, a = a4._e, a4._e = null;
  return M.yldStar(M.yld(a), a4_6);
}
function a4_6(a4) {
  return M.yldStar(M.yld("f"), a4_7);
}
function a4_7(a4) {
  var a, b;
  a = a4._fc, b = a4._fe, a4._fc = null, a4._fe = null;
  return M.yldStar(M.yld("e"), a, b);
}
function a4_8(a4) {
  var a;
  a = a2();
  return M.yldStar(M.yldStar(a), a4_9);
}
function a4_9(a4, a) {
  return M.yldStar(M.yld(a), a4_10);
}
function a4_10(a4) {
  return M.pure();
}
function a4_11(a4, r) {
  return M.pure(r);
}
function a4_12(a4, e) {
  return M.raise(e);
}
function a4_13(a4) {
  return M.raise(a4._err1);
}
function a4_14(a4, a) {
  a4._ex = a;
  return M.jump(void 0, a4_4, a4_15);
}
function a4_15(a4, a) {
  a4._fc = a4_13, a4._fe = a4_12, a4._err1 = a;
  return M.jump(void 0, a4_6);
}
function a5_1(a5) {
  a5._loop = M.iterator(a4());
  return M.jump(void 0, a5_2, a5_8);
}
function a5_2(a5) {
  if (!(a5._loop = a5._loop.step()).done) {
    a5._i = a5._loop.value;
    return M.yldStar(M.yld(a5._i), a5_2, a5_8);
  } else {
    a5._fc = a5_4, a5._fe = a5_6, a5._i = null;
    return M.jump(void 0, a5_3);
  }
}
function a5_3(a5) {
  var a, b;
  if (a5._loop.exit) {
    a5._loop.exit();
  }
  a = a5._fc, b = a5._fe, a5._loop = null, a5._fc = null, a5._fe = null;
  return M.jump(void 0, a, b);
}
function a5_4(a5) {
  return M.pure();
}
function a5_5(a5, r) {
  return M.pure(r);
}
function a5_6(a5, e) {
  return M.raise(e);
}
function a5_7(a5) {
  return M.raise(a5._err1);
}
function a5_8(a5, a) {
  a5._fc = a5_7, a5._fe = a5_6, a5._err1 = a;
  return M.jump(void 0, a5_3);
}
function cfb1_1(cfb1) {
  cfb1._i = 0;
  return M.jump(void 0, cfb1_2, cfb1_13);
}
function cfb1_2(cfb1) {
  return M.yldStar(M.yld(cfb1._i === 3), cfb1_3, cfb1_13);
}
function cfb1_3(cfb1, a) {
  if (a) {
    throw new Error(`AAAAAAAAA${cfb1._i++}`);
  }
  cfb1._fc = cfb1_5, cfb1._fe = cfb1_12;
  return M.yldStar(M.yld(`a${cfb1._i}`), cfb1_4, cfb1_14);
}
function cfb1_4(cfb1) {
  var a, b;
  cfb1._ex = cfb1._err1, a = cfb1._fc, b = cfb1._fe, cfb1._fc = null, cfb1._fe = null;
  return M.yldStar(M.yld(`f1${cfb1._i++}`), a, b);
}
function cfb1_5(cfb1) {
  return M.yldStar(M.yld(`b${cfb1._i++}`), cfb1_9);
}
function cfb1_6(cfb1) {
  cfb1._e = cfb1._ex;
  cfb1._ex = null;
  return M.yldStar(M.yld(`e${cfb1._i}`), cfb1_7);
}
function cfb1_7(cfb1) {
  var a;
  a = cfb1._e, cfb1._e = null;
  return M.yldStar(M.yld(a), cfb1_8);
}
function cfb1_8(cfb1) {
  return M.pure(cfb1._i);
}
function cfb1_9(cfb1) {
  cfb1._i++;
  return M.jump(void 0, cfb1_2, cfb1_13);
}
function cfb1_10(cfb1, r) {
  return M.pure(r);
}
function cfb1_11(cfb1, e) {
  return M.raise(e);
}
function cfb1_12(cfb1, a) {
  cfb1._ex = a;
  return M.jump(void 0, cfb1_6);
}
function cfb1_13(cfb1, a) {
  cfb1._fc = cfb1_6, cfb1._fe = cfb1_11, cfb1._err1 = a;
  return M.jump(void 0, cfb1_4, cfb1_14);
}
function cfb1_14(cfb1, a) {
  cfb1._ex = a;
  return M.jump(void 0, cfb1_6);
}
function c_1(c) {
  return M.yldStar(M.yld(1), c_2);
}
function c_2(c) {
  return M.pure();
}
function c_3(c, r) {
  return M.pure(r);
}
function f_1(ctx) {
  var a;
  a = ctx._v, ctx._v = null;
  return M.chain(a, f_2);
}
function f_2(ctx, a) {
  return M.pure(a);
}
function f_3(ctx, r) {
  return M.pure(r);
}
function _f_1(ctx) {
  return M.yldStar(M.yld(1), _f_2);
}
function _f_2(ctx) {
  return M.pure();
}
function _f_3(ctx, r) {
  return M.pure(r);
}
function f_11(ctx) {
  var a;
  a = ctx._a, ctx._a = null;
  return M.chain(a, f_21);
}
function f_21(ctx) {
  return M.pure();
}
function f_31(ctx, r) {
  return M.pure(r);
}
function a3_1(ctx) {
  var a;
  a = ctx._a, ctx._a = null;
  return M.chain(a, a3_2);
}
function a3_2(ctx) {
  return M.pure();
}
function a3_3(ctx, r) {
  return M.pure(r);
}
function a_1(ctx) {
  var a;
  a = ctx._b, ctx._b = null;
  return M.chain(a, a_2);
}
function a_2(ctx) {
  return M.pure();
}
function a_3(ctx, r) {
  return M.pure(r);
}
function b_1(ctx) {
  var a;
  a = ctx._a, ctx._a = null;
  return M.chain(a, b_2);
}
function b_2(ctx) {
  return M.pure();
}
function b_3(ctx, r) {
  return M.pure(r);
}