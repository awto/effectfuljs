function a() {
  var ctx = M.generator();
  return ctx.scopeBH(a_1);
}

function a1() {
  var ctx = M.generator();
  return ctx.scopeBH(a1_1);
}

function a3() {
  var ctx = M.generator();
  return ctx.scopeBH(a3_1);
}

function a2() {
  var ctx = M.generator();
  return ctx.scopeBH(a2_1);
}

function _a() {
  var ctx = M.generator();
  return ctx.scopeBH(_a_1);
}

function d(i) {
  var ctx = M.generator();
  return ctx._i = i, ctx.scopeBH(d_1);
}

function d2(i) {
  var ctx = M.generator();
  return ctx._i = i, ctx.scopeBH(d2_1);
}

function a4() {
  var ctx = M.generator();
  return ctx.scopeBH(a4_1);
}

function a5() {
  var ctx = M.generator();
  return ctx.scopeBH(a5_1);
}

function a6() {
  var ctx = M.generator();
  return ctx.scopeBH(a6_1);
}

function _a1() {
  var ctx = M.generator();
  return ctx.scopeBH(_a1_1);
}

function _a2() {
  var ctx = M.generator();
  return ctx.scopeBH(_a2_1);
}

function _a3() {
  var ctx = M.generator();
  return ctx.scopeBH(_a3_1);
}

function _a6() {
  var ctx = M.generator();
  return ctx.scopeBH(_a6_1);
}

function a7() {
  var ctx = M.generator();
  return ctx.scopeBH(_a7_1);
}

function a7_1() {
  var ctx = M.generator();
  return ctx.scopeBH(a7_1_1);
}

function a7_2() {
  var ctx = M.generator();
  return ctx.scopeBH(a7_2_1);
}

function a7_3() {
  var ctx = M.generator();
  return ctx.scopeBH(a7_3_1);
}

function a7_4() {
  var ctx = M.generator();
  return ctx.scopeBH(a7_4_1);
}

function a7_5() {
  var ctx = M.generator();
  return ctx.scopeBH(a7_5_1);
}

function a7_6() {
  var ctx = M.generator();
  return ctx.scopeBH(a7_6_1);
}

function finallyBlock1() {
  var ctx = M.generator();
  return ctx.scopeBH(finallyBlock1_1);
}

function ae() {
  var ctx = M.generator();
  return ctx.scopeBH(ae_1);
}

function cfb() {
  var ctx = M.generator();
  return ctx.scopeBH(cfb_1);
}

function cfb1() {
  var ctx = M.generator();
  return ctx.scopeBH(cfb1_1);
}

function _cfb1() {
  var ctx = M.generator();
  return ctx.scopeBH(_cfb1_1);
}

function cfb2() {
  var ctx = M.generator();
  return ctx.scopeBH(cfb2_1);
}

function cfb3() {
  var ctx = M.generator();
  return ctx.scopeBH(cfb3_1);
}

function cfb4() {
  var ctx = M.generator();
  return ctx.scopeBH(cfb4_1);
}

function _cfb2() {
  var ctx = M.generator();
  return ctx.scopeBH(_cfb2_1);
}

function cfb6() {
  var ctx = M.generator();
  return ctx.scopeBH(cfb6_1);
}

function fb4() {
  var ctx = M.generator();
  return ctx.scopeBH(fb4_1);
}

function while2() {
  var ctx = M.generator();
  return ctx.scopeBH(while2_1);
}

function for2() {
  var ctx = M.generator();
  return ctx.scopeBH(for2_1);
}

function c1() {
  var a = function a() {
    var b = function b() {
      var b,
          c = function c() {
        var c,
            _c1_v = c1_v,
            ctx = M.generator();
        return ctx._c1_v = _c1_v, ctx.scopeBH(c_1);
      },
          _c1_v = c1_v,
          ctx = M.generator();

      return ctx._c = c, ctx.scopeBH(b_1);
    },
        ctx = M.generator();

    return ctx.scopeBH(a_11);
  },
      c1_v = {
    i: undefined
  };

  c1_v.i = 0;
}

function c2() {
  var inner = function inner() {
    var a = function a() {
      var a,
          _c2_v = c2_v,
          ctx = M.generator();
      return ctx._c2_v = _c2_v, ctx.scopeBH(a_12);
    },
        c = () => {
      var a = function a() {
        var _c2_v = c2_v;
        _c2_v.i += 2;
        return _c2_v.i;
      },
          j,
          b = function b() {
        var _c2_v = c2_v;
        _c2_v.i += j;
      },
          _v = {
        a: a,
        b: b
      },
          z = function z() {
        var z,
            c = function c() {
          var _this = this,
              _c2_v = c2_v;

          return _c2_v.i += _this.something;
        },
            _z = function z(j) {
          var _c2_v = c2_v;
          return _c2_v.i += j;
        },
            z1 = function z(j) {
          var z,
              _c2_v = c2_v,
              __v = _v,
              ctx = M.generator();
          return ctx._j = j, ctx._c2_v = _c2_v, ctx.__v = __v, ctx.scopeBH(z_1);
        },
            ctx = M.generator();

        return ctx._c = c, ctx._z1 = _z, ctx._z2 = z1, ctx.scopeBH(_z_1);
      },
          _c2_v = c2_v;

      {
        j = 10;
        _c2_v.i++;
        return z;
      }
    },
        ctx = M.generator();

    return ctx._a = a, ctx._ = c, ctx.scopeBH(inner_1);
  },
      c2_v = {
    i: undefined
  };

  c2_v.i = 0;
  return inner;
}

function _c1() {
  var ctx = M.generator();
  return ctx.scopeBH(c1_1);
}

function _c2() {
  var ctx = M.generator();
  return ctx.scopeBH(c2_1);
}

function forOf() {
  var ctx = M.generator();
  return ctx.scopeBH(forOf_1);
}

const objMethods = {
  a() {
    var ctx = M.generator();
    return ctx.scopeBH(a_13);
  },

  b() {
    var _this = this,
        _args = arguments,
        ctx = M.generator();

    return ctx.__this = _this, ctx.__args = _args, ctx.scopeBH(_b_1);
  }

};
const objM = {
  objMethod() {
    var ctx = M.generator();
    return ctx.scopeBH(objMethod_1);
  }

};

function objMethodsClosure() {
  var objMethodsClosure_v = {
    i: undefined,
    m: undefined
  },
      a = function objMethod1(k) {
    var objMethod1_v = {
      k,
      j: undefined
    },
        a = function objMethod2(m) {
      var _objMethod1_v = objMethod1_v,
          ctx = M.generator();
      return ctx._m = m, ctx._objMethod1_v = _objMethod1_v, ctx.scopeBH(objMethod2_1);
    },
        _objMethodsClosure_v = objMethodsClosure_v,
        ctx = M.generator();

    return ctx._objMethod1_v = objMethod1_v, ctx._ = a, ctx._objMethodsClosure_v = _objMethodsClosure_v, ctx.scopeBH(objMethod1_1);
  },
      ctx = M.generator();

  return ctx._objMethodsClosure_v = objMethodsClosure_v, ctx._ = a, ctx.scopeBH(objMethodsClosure_1);
}

const objMThis = {
  [objMethod(_a)]() {
    var _this = this,
        _args = arguments,
        ctx = M.generator();

    return ctx.__this = _this, ctx.__args = _args, ctx.scopeBH(_1);
  }

};

class SomeClass {
  f(i) {
    var _this = this,
        _args = arguments,
        ctx = M.generator();

    return ctx._i = i, ctx.__this = _this, ctx.__args = _args, ctx.scopeBH(f_1);
  }

}

class SomeChild extends SomeClass {
  f(i) {
    var _this = this,
        _args = arguments,
        ctx = M.generator();

    return ctx._i = i, ctx.__this = _this, ctx.__args = _args, ctx.scopeBH(_f_1);
  }

  static f(i) {
    var _this = this,
        ctx = M.generator();

    return ctx._i = i, ctx.__this = _this, ctx.scopeBH(f_11);
  }

}

function clasClosure(A) {
  var B = class B extends A {
    constructor() {
      var _clasClosure_v = clasClosure_v,
          ctx = M.generator();
      return ctx._clasClosure_v = _clasClosure_v, ctx.scopeBH(_5);
    }

    static f() {
      var ctx = M.generator();
      return ctx.scopeBH(f_12);
    }

  },
      _B = class _B extends A {
    constructor() {
      var _clasClosure_v = clasClosure_v,
          ctx = M.generator();
      return ctx._clasClosure_v = _clasClosure_v, ctx.scopeBH(_6);
    }

    static f() {
      var _clasClosure_v = clasClosure_v,
          ctx = M.generator();
      return ctx._clasClosure_v = _clasClosure_v, ctx.scopeBH(f_13);
    }

  },
      clasClosure_v = {
    cnt: undefined,
    B: _B
  },
      a = class extends A {
    static f() {
      var _clasClosure_v = clasClosure_v,
          ctx = M.generator();
      return ctx._clasClosure_v = _clasClosure_v, ctx.scopeBH(f_14);
    }

  },
      ctx = M.generator();

  return ctx._B = B, ctx._clasClosure_v = clasClosure_v, ctx._ = a, ctx.scopeBH(clasClosure_1);
}

function c21() {
  var closure1_a = function closure1_a() {
    var closure1_a,
        _c2_v = c2_v,
        ctx = M.generator();
    return ctx._c2_v = _c2_v, ctx.scopeBH(closure1_a_1);
  },
      closure1_b = function closure1_b() {
    var closure1_c = function closure1_c() {
      var _c2_v = c2_v;
      _c2_v.i += 2;
      return _c2_v.i;
    },
        closure1_d = function closure1_d() {
      return closure1_c();
    },
        _c2_v = c2_v;

    _c2_v.i++;
    return closure1_c;
  },
      c2_v = {
    i: undefined
  },
      ctx = M.generator();

  return ctx._closure1_b = closure1_b, ctx._c2_v = c2_v, ctx.scopeBH(_c2_1);
}

function loopCapt1() {
  var a = i => {
    var _v = {
      i,
      j: undefined
    },
        iter = function iter() {
      var iter,
          __v = _v,
          ctx = M.generator();
      return ctx.__v = __v, ctx.scopeBH(iter_1);
    };

    _v.j = 0;
    funs(iter);
    return;
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(loopCapt1_1);
}

function loopCapt2() {
  var a = i => {
    var _v = {
      i,
      j: undefined
    },
        iter = function iter() {
      var iter,
          __v = _v,
          ctx = M.generator();
      return ctx.__v = __v, ctx.scopeBH(_iter_1);
    },
        ctx = M.generator();

    return ctx.__v = _v, ctx._iter = iter, ctx.scopeBH(_7);
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(loopCapt2_1);
}

function loopCapt3() {
  var a = i => {
    var __v = {
      i
    },
        a = j => {
      var _v = {
        j
      },
          iter = function iter() {
        var iter,
            _v1 = __v,
            _v2 = _v,
            ctx = M.generator();
        return ctx.__v = _v1, ctx.__v1 = _v2, ctx.scopeBH(iter_11);
      },
          ctx = M.generator();

      return ctx.__v = _v, ctx._iter = iter, ctx.scopeBH(_9);
    },
        ctx = M.generator();

    return ctx.__v = __v, ctx._ = a, ctx.scopeBH(_11);
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(loopCapt3_1);
}

function loopCapt4() {
  var a = i => {
    var j,
        __v = {
      i
    },
        a = j => {
      var _v = {
        j
      },
          iter = function iter() {
        var iter,
            _v1 = __v,
            _v2 = _v,
            ctx = M.generator();
        return ctx.__v = _v1, ctx.__v1 = _v2, ctx.scopeBH(iter_12);
      };

      funs(iter);
      return;
    };

    for (j = 0; j < 3; j++) {
      a(j);
    }

    return;
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(loopCapt4_1);
}

function forOfCapt1() {
  var a = i => {
    var _v = {
      i,
      j: undefined
    },
        iter = function iter() {
      var iter,
          __v = _v,
          ctx = M.generator();
      return ctx.__v = __v, ctx.scopeBH(iter_13);
    };

    _v.j = 0;
    funs(iter);
    return;
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(forOfCapt1_1);
}

function forOfCapt2() {
  var a = i => {
    var _v = {
      i,
      j: undefined
    },
        iter = function iter() {
      var iter,
          __v = _v,
          ctx = M.generator();
      return ctx.__v = __v, ctx.scopeBH(iter_14);
    },
        ctx = M.generator();

    return ctx.__v = _v, ctx._iter = iter, ctx.scopeBH(_16);
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(forOfCapt2_1);
}

function forOfCapt3() {
  var a = i => {
    var __v = {
      i
    },
        a = j => {
      var _v = {
        j
      },
          iter = function iter() {
        var iter,
            _v1 = __v,
            _v2 = _v,
            ctx = M.generator();
        return ctx.__v = _v1, ctx.__v1 = _v2, ctx.scopeBH(iter_15);
      };

      funs(iter);
      return;
    },
        ctx = M.generator();

    return ctx._ = a, ctx.scopeBH(_18);
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(forOfCapt3_1);
}

function forOfCapt4() {
  var a = i => {
    var __v = {
      i
    },
        a = j => {
      var _v = {
        j
      },
          iter = function iter() {
        var iter,
            _v1 = __v,
            _v2 = _v,
            ctx = M.generator();
        return ctx.__v = _v1, ctx.__v1 = _v2, ctx.scopeBH(iter_16);
      },
          ctx = M.generator();

      return ctx.__v = _v, ctx._iter = iter, ctx.scopeBH(_21);
    },
        ctx = M.generator();

    return ctx._ = a, ctx.scopeBH(_23);
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(forOfCapt4_1);
}

function forOfCapt5() {
  var a = i => {
    var __v = {
      i
    },
        a = j => {
      var _v = {
        j
      },
          iter = function iter() {
        var iter,
            _v1 = __v,
            _v2 = _v,
            ctx = M.generator();
        return ctx.__v = _v1, ctx.__v1 = _v2, ctx.scopeBH(iter_17);
      };

      funs(iter);
      return;
    },
        ctx = M.generator();

    return ctx.__v = __v, ctx._ = a, ctx.scopeBH(_26);
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(forOfCapt5_1);
}

function forOfCapt6() {
  var a = i => {
    var __v = {
      i
    },
        a = j => {
      var _v = {
        j
      },
          iter = function iter() {
        var iter,
            _v1 = __v,
            _v2 = _v,
            ctx = M.generator();
        return ctx.__v = _v1, ctx.__v1 = _v2, ctx.scopeBH(iter_18);
      },
          _v1 = __v,
          ctx = M.generator();

      return ctx._iter = iter, ctx.__v1 = _v1, ctx.scopeBH(_30);
    },
        ctx = M.generator();

    return ctx.__v = __v, ctx._ = a, ctx.scopeBH(_32);
  },
      ctx = M.generator();

  return ctx._ = a, ctx.scopeBH(forOfCapt6_1);
}

function forIn() {
  var ctx = M.generator();
  return ctx.scopeBH(forIn_1);
}

function while1() {
  var ctx = M.generator();
  return ctx.scopeBH(while1_1);
}

function catchBlock2() {
  var ctx = M.generator();
  return ctx.scopeBH(catchBlock2_1);
}

function closure2() {
  var closure2_v = {
    j: undefined
  },
      sub = function sub(k) {
    var sub,
        _closure2_v = closure2_v,
        ctx = M.generator();
    return ctx._k = k, ctx._closure2_v = _closure2_v, ctx.scopeBH(sub_1);
  },
      ctx = M.generator();

  return ctx._closure2_v = closure2_v, ctx._sub = sub, ctx.scopeBH(closure2_1);
}

function a_1(ctx) {
  return ctx.pure(ctx);
}

function a1_1(ctx) {
  return ctx.yldBH(undefined, a1_2);
}

function a1_2(ctx) {
  return ctx.pure(ctx);
}

function a3_1(ctx) {
  return ctx.yldBH(undefined, ctx.pure);
}

function a2_1(ctx) {
  return ctx.yldBH(1, a2_2);
}

function a2_2(ctx) {
  return ctx.pure(ctx);
}

function _a_1(ctx) {
  return ctx.yldBH(1, a_2);
}

function a_2(ctx) {
  try {
    return ctx.yldBH(2, a_4, a_3);
  } catch (ex) {
    return a_3(ctx, ex);
  }
}

function a_3(ctx, ex) {
  var e;
  e = ex;
  return ctx.yldBH(e, a_4);
}

function a_4(ctx) {
  return ctx.pure(ctx);
}

function d_1(ctx) {
  var i = ctx._i,
      j,
      a;
  j = 0;
  a = i++;
  return ctx._i = undefined, ctx._j = j, ctx.yldBH(a, d_2);
}

function d_2(ctx, a) {
  return ctx.yldBH(a, d_3);
}

function d_3(ctx) {
  var j = ctx._j;
  return ctx.pure(ctx, j++);
}

function d2_1(ctx) {
  var i = ctx._i,
      j,
      a;
  j = 0;
  a = i++;
  return ctx._i = i, ctx._j = j, ctx.yldBH(a, d2_2);
}

function d2_2(ctx) {
  var j = ctx._j,
      a;
  a = j++;
  return ctx._j = j, ctx.yldBH(a, d2_3);
}

function d2_3(ctx) {
  var i = ctx._i,
      j = ctx._j,
      a,
      b;
  b = i += 2;
  a = some(b, j);
  return ctx._j = undefined, ctx._i = i, ctx.yldStarBH(a + j, d2_4);
}

function d2_4(ctx, a) {
  return ctx.yldBH(a, d2_5);
}

function d2_5(ctx, a) {
  var i = ctx._i;
  if (a) return d2_6(ctx);else {
    return ctx.pure(ctx, i);
  }
}

function d2_6(ctx) {
  var i = ctx._i,
      a;
  a = i += 3;
  return ctx._i = undefined, ctx.yldStarBH(a, d2_7);
}

function d2_7(ctx, a) {
  return ctx.pure(ctx, a);
}

function d2_8(ctx) {
  return ctx.yldBH(2, d2_9);
}

function d2_9(ctx) {
  return ctx.pure(ctx);
}

function a4_1(ctx) {
  return ctx.yldBH(1, a4_2);
}

function a4_2(ctx) {
  try {
    return ctx.yldBH(2, a4_3, a4_4);
  } catch (ex) {
    return a4_4(ctx, ex);
  }
}

function a4_3(ctx) {
  try {
    return ctx._cb = a4_10, ctx.yldBH(3, a4_8, a4_4);
  } catch (ex) {
    return a4_4(ctx, ex);
  }
}

function a4_4(ctx, ex) {
  var e;
  e = ex;
  return ctx._e = e, ctx.yldBH('excep', a4_5);
}

function a4_5(ctx) {
  var e = ctx._e;
  return ctx._e = undefined, ctx.yldBH(e, a4_6);
}

function a4_6(ctx, a) {
  if (a) return a4_7(ctx);else return ctx._cb = a4_10, a4_8(ctx);
}

function a4_7(ctx) {
  return ctx._r = 10, ctx._cb = a4_14, a4_8(ctx);
}

function a4_8(ctx) {
  return ctx.yldBH('f', a4_9);
}

function a4_9(ctx) {
  var cb = ctx._cb;
  return ctx._cb = undefined, ctx.yldBH('e', cb);
}

function a4_10(ctx) {
  var a;
  a = _a2();
  return ctx.yldStarBH(a, a4_11);
}

function a4_11(ctx, b) {
  var a;
  a = _a3();
  return ctx._12 = b, ctx.yldStarBH(a, a4_12);
}

function a4_12(ctx, c) {
  var a,
      b = ctx._12;
  a = _a1(b, c);
  return ctx._12 = undefined, ctx.yldBH(a, a4_13);
}

function a4_13(ctx) {
  return ctx.pure(ctx);
}

function a4_14(ctx) {
  var r = ctx._r;
  return ctx.pure(ctx, r);
}

function a5_1(ctx) {
  var loop;
  loop = ctx.iterator(a4());
  return ctx._loop = loop, a5_2(ctx);
}

function a5_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, a5_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function a5_3(ctx) {
  var i,
      loop = ctx._loop;
  i = loop.value;
  return ctx.yldBH(i, a5_2);
}

function a6_1(ctx) {
  return ctx.yldBH(1, a6_2);
}

function a6_2(ctx) {
  return ctx.yldBH(2, a6_3);
}

function a6_3(ctx) {
  return ctx.yldBH(3, a6_4);
}

function a6_4(ctx, a) {
  if (a) return a6_5(ctx);else {
    return ctx._cb = a6_7, ctx._cb1 = a6_8, ctx.yldBH(4, a6_6);
  }
}

function a6_5(ctx) {
  return ctx._cb = a6_7, ctx._r = 10, ctx._cb1 = a6_10, a6_6(ctx);
}

function a6_6(ctx) {
  var cb = ctx._cb;
  return ctx._cb = undefined, ctx.yldBH('f1', cb);
}

function a6_7(ctx) {
  var cb = ctx._cb1;
  return ctx._cb1 = undefined, ctx.yldBH('f2', cb);
}

function a6_8(ctx) {
  return ctx.yldBH(5, a6_9);
}

function a6_9(ctx) {
  return ctx.pure(ctx);
}

function a6_10(ctx) {
  var r = ctx._r;
  return ctx.pure(ctx, r);
}

function _a1_1(ctx) {
  return ctx.yldBH(1, _a1_2);
}

function _a1_2(ctx) {
  return ctx.pure(ctx, 2);
}

function _a2_1(ctx) {
  var loop;
  loop = ctx.iterator(a4());
  return ctx._loop = loop, _a2_2(ctx);
}

function _a2_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, a2_3(ctx);else {
    return ctx._loop = undefined, ctx.yldBH(10, a2_4);
  }
}

function a2_3(ctx) {
  var i,
      loop = ctx._loop;
  i = loop.value;
  return ctx.yldBH(i, _a2_2);
}

function a2_4(ctx) {
  return ctx.pure(ctx);
}

function _a3_1(ctx) {
  var loop;
  loop = ctx.iterator(a4());
  return ctx._loop = loop, a3_2(ctx);
}

function a3_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, a3_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function a3_3(ctx) {
  var i,
      loop = ctx._loop;
  i = loop.value;
  return ctx.yldBH(i, a3_2);
}

function _a6_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, _a6_2(ctx);
}

function _a6_2(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(a, _a6_3);
}

function _a6_3(ctx, a) {
  if (a === 'exit') return _a6_4(ctx);else return _a6_2(ctx);
}

function _a6_4(ctx) {
  return ctx.pure(ctx, 100);
}

function _a6_5(ctx) {
  return ctx.pure(ctx);
}

function _a7_1(ctx) {
  return ctx.yldBH(1, _a7_2);
}

function _a7_2(ctx, a) {
  return a ? ctx.yldBH('A', _a7_3) : ctx.yldBH('c', _a7_4);
}

function _a7_3(ctx, a) {
  return a ? ctx.yldBH('b', ctx.pure) : ctx.pure(ctx, a);
}

function _a7_4(ctx, a) {
  return a ? ctx.pure(ctx, a) : ctx.yldBH('d', _a7_5);
}

function _a7_5(ctx, a) {
  return a ? ctx.yldBH('e', ctx.pure) : ctx.pure(ctx, a);
}

function a7_1_1(ctx) {
  return ctx.yldBH(1, a7_1_2);
}

function a7_1_2(ctx, a) {
  return a ? ctx.yldBH('A', a7_1_3) : ctx.yldBH('c', a7_1_4);
}

function a7_1_3(ctx, a) {
  return a ? ctx.yldBH('b', a7_1_6) : a7_1_6(ctx, a);
}

function a7_1_4(ctx, a) {
  return a ? a7_1_6(ctx, a) : ctx.yldBH('d', a7_1_5);
}

function a7_1_5(ctx, a) {
  return a ? ctx.yldBH('e', a7_1_6) : a7_1_6(ctx, a);
}

function a7_1_6(ctx, a) {
  return ctx._2 = a, ctx.yldBH(2, a7_1_7);
}

function a7_1_7(ctx, b) {
  var a = ctx._2;
  return ctx.yldBH(a + b, ctx.pure);
}

function a7_2_1(ctx) {
  return ctx.yldBH(1, a7_2_2);
}

function a7_2_2(ctx, a) {
  return a ? ctx.yldBH('A', a7_2_3) : ctx.yldBH('c', a7_2_4);
}

function a7_2_3(ctx, a) {
  return a ? ctx.yldBH('b', a7_2_6) : a7_2_6(ctx, a);
}

function a7_2_4(ctx, a) {
  return a ? a7_2_6(ctx, a) : ctx.yldBH('d', a7_2_5);
}

function a7_2_5(ctx, a) {
  return a ? ctx.yldBH('e', a7_2_6) : a7_2_6(ctx, a);
}

function a7_2_6(ctx, a) {
  return ctx._1 = a, ctx.yldBH(2, a7_2_7);
}

function a7_2_7(ctx, b) {
  var a = ctx._1;
  return ctx._1 = undefined, ctx.yldBH(a + b, a7_2_8);
}

function a7_2_8(ctx) {
  return ctx.yldBH('ex', a7_2_9);
}

function a7_2_9(ctx) {
  return ctx.pure(ctx);
}

function a7_3_1(ctx) {
  return ctx.yldBH(1, a7_3_2);
}

function a7_3_2(ctx, a) {
  return a % 2 ? ctx.yldBH('A', a7_3_3) : ctx.yldBH('c', a7_3_4);
}

function a7_3_3(ctx, a) {
  return a ? ctx.yldBH('b', a7_3_4) : a7_3_4(ctx, a);
}

function a7_3_4(ctx) {
  return ctx.yldBH(2, a7_3_5);
}

function a7_3_5(ctx) {
  return ctx.pure(ctx);
}

function a7_4_1(ctx) {
  return 1 ? ctx.yldBH(2, a7_4_3) : ctx.yldBH(3, a7_4_2);
}

function a7_4_2(ctx) {
  return ctx.yldBH(4, a7_4_3);
}

function a7_4_3(ctx, a) {
  return ctx.yldBH(a, a7_4_4);
}

function a7_4_4(ctx, a) {
  return ctx.yldBH(a, ctx.pure);
}

function a7_5_1(ctx) {
  return ctx.yldBH(1, a7_5_2);
}

function a7_5_2(ctx, a) {
  return a ? ctx.yldBH(2, a7_5_3) : ctx.yldBH(3, a7_5_3);
}

function a7_5_3(ctx, a) {
  return ctx.yldBH(a, ctx.pure);
}

function a7_6_1(ctx) {
  return ctx.yldBH(1, a7_6_2);
}

function a7_6_2(ctx, a) {
  return a ? ctx.yldBH('A', a7_6_3) : a7_6_4(ctx, 1);
}

function a7_6_3(ctx, a) {
  return a ? ctx.yldBH('b', a7_6_4) : a7_6_4(ctx, a);
}

function a7_6_4(ctx, a) {
  return ctx.yldBH(a, ctx.pure);
}

function finallyBlock1_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, finallyBlock1_2(ctx);
}

function finallyBlock1_2(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(a === 3, finallyBlock1_3);
}

function finallyBlock1_3(ctx, a) {
  if (a) return finallyBlock1_4(ctx);else return finallyBlock1_2(ctx);
}

function finallyBlock1_4(ctx) {
  return ctx._cb = finallyBlock1_7, finallyBlock1_5(ctx);
}

function finallyBlock1_5(ctx) {
  return ctx.yldBH('exit', finallyBlock1_6);
}

function finallyBlock1_6(ctx) {
  var i = ctx._i,
      cb = ctx._cb;
  return ctx._i = undefined, ctx._cb = undefined, ctx.yldBH(i, cb);
}

function finallyBlock1_7(ctx) {
  return ctx.pure(ctx);
}

function ae_1(ctx) {
  return ctx.yldBH(1, ae_2);
}

function ae_2(ctx) {
  return ctx.yldBH(2, ae_3);
}

function ae_3(ctx) {
  return ctx.yldBH(3, ae_4);
}

function ae_4(ctx, a) {
  if (a) return ae_5(ctx);else {
    return ctx.pure(ctx, 2);
  }
}

function ae_5(ctx) {
  return ctx.pure(ctx, 1);
}

function ae_6(ctx) {
  return ctx.yldBH(4, ae_7);
}

function ae_7(ctx) {
  return ctx.pure(ctx);
}

function cfb_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, cfb_2(ctx);
}

function cfb_2(ctx) {
  var i = ctx._i,
      a;

  try {
    a = i++;
    return ctx._i = i, ctx.yldBH(a === 3, cfb_3, cfb_4);
  } catch (ex) {
    return ctx._i = i, cfb_4(ctx, ex);
  }
}

function cfb_3(ctx, a) {
  var i = ctx._i,
      b;

  try {
    if (a) {
      throw new Error(`AAAAAAAAA${i++}`);
    }

    b = i++;
    return ctx._i = i, ctx._cb = cfb_8, ctx.yldBH(`a${b}`, cfb_7, cfb_4);
  } catch (ex) {
    return ctx._i = i, cfb_4(ctx, ex);
  }
}

function cfb_4(ctx, ex) {
  var i = ctx._i,
      e,
      a;
  e = ex;
  a = i++;
  return ctx._i = i, ctx._e = e, ctx.yldBH(`e${a}`, cfb_5);
}

function cfb_5(ctx) {
  var e = ctx._e;
  return ctx._e = undefined, ctx.yldBH(e, cfb_6);
}

function cfb_6(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx._r = a, ctx._cb = cfb_9, cfb_7(ctx);
}

function cfb_7(ctx) {
  var i = ctx._i,
      a,
      cb = ctx._cb;
  a = i++;
  return ctx._i = undefined, ctx._cb = undefined, ctx.yldBH(`f1${a}`, cb);
}

function cfb_8(ctx) {
  return ctx.pure(ctx);
}

function cfb_9(ctx) {
  var r = ctx._r;
  return ctx.pure(ctx, r);
}

function cfb1_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, cfb1_2(ctx);
}

function cfb1_2(ctx) {
  var i = ctx._i;

  try {
    return ctx.yldBH(i, cfb1_3, cfb1_4);
  } catch (ex) {
    return cfb1_4(ctx, ex);
  }
}

function cfb1_3(ctx) {
  var i = ctx._i;

  try {
    throw new Error(`AAAAAAAAA${i++}`);
    return ctx._i = i, ctx._cb = cfb1_6, cfb1_5(ctx);
  } catch (ex) {
    return ctx._i = i, cfb1_4(ctx, ex);
  }
}

function cfb1_4(ctx, ex) {
  var i = ctx._i,
      e,
      a;
  e = ex;
  a = i++;
  return ctx._i = i, ctx._r = a, ctx._cb = cfb1_7, cfb1_5(ctx);
}

function cfb1_5(ctx) {
  var i = ctx._i,
      cb = ctx._cb;
  console.log(`f${i}`);
  return ctx._i = undefined, ctx._cb = undefined, cb(ctx);
}

function cfb1_6(ctx) {
  return ctx.pure(ctx);
}

function cfb1_7(ctx) {
  var r = ctx._r;
  return ctx.pure(ctx, r);
}

function _cfb1_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, _cfb1_2(ctx);
}

function _cfb1_2(ctx) {
  var i = ctx._i;

  try {
    return ctx.yldBH(i, _cfb1_3, _cfb1_4);
  } catch (ex) {
    return _cfb1_4(ctx, ex);
  }
}

function _cfb1_3(ctx) {
  try {
    return ctx.yldBH(5, _cfb1_5, _cfb1_4);
  } catch (ex) {
    return _cfb1_4(ctx, ex);
  }
}

function _cfb1_4(ctx, ex) {
  var i = ctx._i,
      e,
      a;
  e = ex;
  a = i++;
  return ctx.pure(ctx, a);
}

function _cfb1_5(ctx) {
  return ctx.pure(ctx);
}

function cfb2_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, cfb2_3(ctx);
}

function cfb2_2(ctx, ex) {
  return ctx._ex = ex, ctx._cb = cfb2_8, cfb2_7(ctx);
}

function cfb2_3(ctx) {
  var i = ctx._i,
      a;

  try {
    a = i++;
    return ctx._i = i, ctx.yldBH(`a:${a}`, cfb2_4, cfb2_2);
  } catch (ex) {
    return ctx._i = i, cfb2_2(ctx, ex);
  }
}

function cfb2_4(ctx) {
  var i = ctx._i,
      a;

  try {
    a = i++;
    return ctx._i = i, ctx.yldBH(`b:${a}`, cfb2_5, cfb2_2);
  } catch (ex) {
    return ctx._i = i, cfb2_2(ctx, ex);
  }
}

function cfb2_5(ctx) {
  var i = ctx._i,
      a;

  try {
    a = i++;
    return ctx._i = i, ctx._cb = cfb2_10, ctx.yldBH(`c:${a}`, cfb2_7, cfb2_2);
  } catch (ex) {
    return ctx._i = i, cfb2_2(ctx, ex);
  }
}

function cfb2_6(ctx, ex) {
  return ctx._ex = ex, cfb2_8(ctx);
}

function cfb2_7(ctx) {
  var i = ctx._i,
      a,
      cb = ctx._cb;

  try {
    a = i++;
    return ctx._cb = undefined, ctx._i = i, ctx.yldBH(`f:${a}`, cb, cfb2_6);
  } catch (ex) {
    return ctx._cb = undefined, ctx._i = i, cfb2_6(ctx, ex);
  }
}

function cfb2_8(ctx) {
  var e,
      ex = ctx._ex;
  e = ex;
  return ctx._ex = undefined, ctx.yldBH(e, cfb2_9);
}

function cfb2_9(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(`e:${a}`, cfb2_10);
}

function cfb2_10(ctx) {
  return ctx.pure(ctx);
}

function cfb3_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, cfb3_3(ctx);
}

function cfb3_2(ctx, ex) {
  return ctx._ex = ex, ctx._cb = cfb3_8, cfb3_6(ctx);
}

function cfb3_3(ctx) {
  var i = ctx._i;

  try {
    return ctx.yldBH(i === 3, cfb3_4, cfb3_2);
  } catch (ex) {
    return cfb3_2(ctx, ex);
  }
}

function cfb3_4(ctx, a) {
  var i = ctx._i;

  try {
    if (a) {
      throw new Error(`AAAAAAAAA${i++}`);
    }

    return ctx._i = i, ctx._cb = cfb3_7, ctx.yldBH(`a${i}`, cfb3_6, cfb3_2);
  } catch (ex) {
    return ctx._i = i, cfb3_2(ctx, ex);
  }
}

function cfb3_5(ctx, ex) {
  return ctx._ex = ex, cfb3_8(ctx);
}

function cfb3_6(ctx) {
  var i = ctx._i,
      a,
      cb = ctx._cb;

  try {
    a = i++;
    return ctx._cb = undefined, ctx._i = i, ctx.yldBH(`f1${a}`, cb, cfb3_5);
  } catch (ex) {
    return ctx._cb = undefined, ctx._i = i, cfb3_5(ctx, ex);
  }
}

function cfb3_7(ctx) {
  var i = ctx._i,
      a;

  try {
    a = i++;
    return ctx._i = i, ctx.yldBH(`b${a}`, cfb3_11, cfb3_5);
  } catch (ex) {
    return ctx._i = i, cfb3_5(ctx, ex);
  }
}

function cfb3_8(ctx) {
  var i = ctx._i,
      e,
      ex = ctx._ex;
  e = ex;
  return ctx._ex = undefined, ctx._e = e, ctx.yldBH(`e${i}`, cfb3_9);
}

function cfb3_9(ctx) {
  var e = ctx._e;
  return ctx._e = undefined, ctx.yldBH(e, cfb3_10);
}

function cfb3_10(ctx) {
  var i = ctx._i;
  return ctx.pure(ctx, i);
}

function cfb3_11(ctx) {
  var i = ctx._i;
  i++;
  return ctx._i = i, cfb3_3(ctx);
}

function cfb3_12(ctx) {
  return ctx.pure(ctx);
}

function cfb4_1(ctx) {
  try {
    return ctx.yldBH(5, cfb4_3, cfb4_2);
  } catch (ex) {
    return cfb4_2(ctx, ex);
  }
}

function cfb4_2(ctx, ex) {
  var e;
  e = ex;
  return ctx.pure(ctx, 10);
}

function cfb4_3(ctx) {
  return ctx.pure(ctx);
}

function _cfb2_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, _cfb2_3(ctx);
}

function _cfb2_2(ctx, ex) {
  return ctx._ex = ex, ctx._cb = _cfb2_6, _cfb2_5(ctx);
}

function _cfb2_3(ctx) {
  var i = ctx._i,
      a;

  try {
    a = i++;
    return ctx._i = i, ctx._cb = _cfb2_8, ctx.yldBH(`c:${a}`, _cfb2_5, _cfb2_2);
  } catch (ex) {
    return ctx._i = i, _cfb2_2(ctx, ex);
  }
}

function _cfb2_4(ctx, ex) {
  return ctx._ex = ex, _cfb2_6(ctx);
}

function _cfb2_5(ctx) {
  var i = ctx._i,
      a,
      cb = ctx._cb;

  try {
    a = i++;
    return ctx._cb = undefined, ctx._i = i, ctx.yldBH(`f:${a}`, cb, _cfb2_4);
  } catch (ex) {
    return ctx._cb = undefined, ctx._i = i, _cfb2_4(ctx, ex);
  }
}

function _cfb2_6(ctx) {
  var e,
      ex = ctx._ex;
  e = ex;
  return ctx._ex = undefined, ctx.yldBH(e, _cfb2_7);
}

function _cfb2_7(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(`e:${a}`, _cfb2_8);
}

function _cfb2_8(ctx) {
  return ctx.pure(ctx);
}

function cfb6_1(ctx) {
  try {
    return ctx._cb = cfb6_5, ctx.yldBH(1, cfb6_4, cfb6_2);
  } catch (ex) {
    return cfb6_2(ctx, ex);
  }
}

function cfb6_2(ctx, ex) {
  var e;
  e = ex;
  return ctx.yldBH(2, cfb6_3);
}

function cfb6_3(ctx) {
  return ctx._r = 3, ctx._cb = cfb6_6, cfb6_4(ctx);
}

function cfb6_4(ctx) {
  var cb = ctx._cb;
  return ctx._cb = undefined, ctx.yldBH(4, cb);
}

function cfb6_5(ctx) {
  return ctx.pure(ctx);
}

function cfb6_6(ctx) {
  var r = ctx._r;
  return ctx.pure(ctx, r);
}

function fb4_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, fb4_2(ctx);
}

function fb4_2(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(a, fb4_3);
}

function fb4_3(ctx, a) {
  if (a === 3) return fb4_4(ctx);else return fb4_2(ctx);
}

function fb4_4(ctx) {
  var i = ctx._i;
  return ctx._r = i, ctx._cb = fb4_8, fb4_5(ctx);
}

function fb4_5(ctx) {
  return ctx.yldBH('exit', fb4_6);
}

function fb4_6(ctx) {
  var i = ctx._i,
      cb = ctx._cb;
  return ctx._i = undefined, ctx._cb = undefined, ctx.yldBH(i, cb);
}

function fb4_7(ctx) {
  return ctx.pure(ctx);
}

function fb4_8(ctx) {
  var r = ctx._r;
  return ctx.pure(ctx, r);
}

function while2_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, while2_2(ctx);
}

function while2_2(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(a, while2_3);
}

function while2_3(ctx, a) {
  if (a < 3) return while2_4(ctx);else {
    return ctx.pure(ctx);
  }
}

function while2_4(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(a, while2_2);
}

function for2_1(ctx) {
  return ctx.yldBH(undefined, for2_2);
}

function for2_2(ctx, i) {
  return ctx._i = i, for2_3(ctx);
}

function for2_3(ctx) {
  var i = ctx._i;
  return ctx.yldBH(i, for2_4);
}

function for2_4(ctx, a) {
  if (a < 10) return for2_5(ctx);else {
    return ctx.pure(ctx);
  }
}

function for2_5(ctx) {
  var i = ctx._i;
  return ctx.yldBH(i, for2_6);
}

function for2_6(ctx) {
  var i = ctx._i;
  i++;
  return ctx._i = i, for2_3(ctx);
}

function c_1(ctx) {
  var _c1_v = ctx._c1_v;
  _c1_v.i++;
  return ctx.pure(ctx);
}

function b_1(ctx) {
  var c = ctx._c;
  return ctx.pure(ctx, c);
}

function b_2(ctx) {
  var _c1_v = ctx._c1_v;
  return ctx._c1_v = undefined, ctx.yldBH(_c1_v.i, b_3);
}

function b_3(ctx) {
  return ctx.jBH(_c1(), b_4);
}

function b_4(ctx, a) {
  return ctx.yldBH(a, b_5);
}

function b_5(ctx) {
  return ctx.pure(ctx);
}

function a_11(ctx) {
  return ctx.pure(ctx);
}

function a_12(ctx) {
  var _c2_v = ctx._c2_v;
  return ctx.yldBH(`a:${_c2_v.i}`, _a_2);
}

function _a_2(ctx, a) {
  var _c2_v = ctx._c2_v;
  return ctx.pure(ctx, _c2_v.i += a);
}

function z_1(ctx) {
  var __v = ctx.__v;
  return ctx.jBH(__v.a(), z_2);
}

function z_2(ctx, a) {
  var __v = ctx.__v;
  return ctx.__v = undefined, ctx._2 = a, ctx.jBH(__v.b(), z_3);
}

function z_3(ctx, b) {
  var j = ctx._j,
      _c2_v = ctx._c2_v,
      a = ctx._2;
  return ctx.pure(ctx, _c2_v.i += j + a + b);
}

function _z_1(ctx) {
  var d,
      c = ctx._c,
      _z = ctx._z1;
  d = _z;
  return ctx._c = undefined, ctx._z1 = undefined, ctx._d = d, ctx.jBH(c(), _z_2);
}

function _z_2(ctx, a) {
  var d = ctx._d;
  return ctx._d = undefined, ctx.jBH(d(a), _z_3);
}

function _z_3(ctx, a) {
  return ctx.yldStarBH(a, z_4);
}

function z_4(ctx, a) {
  return ctx.yldBH(`b:${a}`, z_5);
}

function z_5(ctx) {
  var z1 = ctx._z2;
  return ctx.pure(ctx, z1);
}

function inner_1(ctx) {
  var b,
      k,
      c = ctx._;
  b = c;
  k = 1;
  return ctx._ = undefined, ctx._k = k, ctx.jBH(b(), inner_2);
}

function inner_2(ctx, b) {
  var a = ctx._a,
      f,
      loop;
  f = [a, b];
  loop = ctx.iterator(f);
  return ctx._a = undefined, ctx._loop = loop, inner_3(ctx);
}

function inner_3(ctx) {
  var k = ctx._k,
      loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, inner_4(ctx);else {
    return ctx.pure(ctx, k);
  }
}

function inner_4(ctx) {
  var j,
      loop = ctx._loop;
  j = loop.value;
  return ctx.jBH(j(), inner_5);
}

function inner_5(ctx, a) {
  return ctx.yldStarBH(a, inner_6);
}

function inner_6(ctx, a) {
  var k = ctx._k;
  k += a;
  return ctx._k = k, inner_3(ctx);
}

function c1_1(ctx) {
  var i;
  i = 0;
  return ctx.yldBH(`a:${i}`, ctx.pure);
}

function c2_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, ctx.yldBH(`a:${i}`, c2_2);
}

function c2_2(ctx, a) {
  var i = ctx._i;
  return ctx.pure(ctx, i += a);
}

function forOf_1(ctx) {
  var loop;
  loop = ctx.iterator([1, 2, 3]);
  return ctx._loop = loop, forOf_2(ctx);
}

function forOf_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, forOf_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function forOf_3(ctx) {
  var i,
      loop = ctx._loop;
  i = loop.value;
  return ctx.yldBH(i, forOf_2);
}

function a_13(ctx) {
  return ctx.yldBH(10, a_21);
}

function a_21(ctx) {
  return ctx.pure(ctx);
}

function _b_1(ctx) {
  return ctx.yldBH(1, _b_2);
}

function _b_2(ctx) {
  var _this = ctx.__this;
  return ctx.__this = undefined, ctx.yldBH(_this, _b_3);
}

function _b_3(ctx) {
  var _args = ctx.__args;
  return ctx.__args = undefined, ctx.yldBH(_args, _b_4);
}

function _b_4(ctx) {
  return ctx.pure(ctx);
}

function objMethod_1(ctx) {
  return ctx.yldBH(1, objMethod_2);
}

function objMethod_2(ctx) {
  return ctx.pure(ctx);
}

function objMethod2_1(ctx) {
  var _objMethod1_v = ctx._objMethod1_v,
      a;
  a = _objMethod1_v.j++;
  return ctx.yldBH(a, objMethod2_2);
}

function objMethod2_2(ctx) {
  var _objMethod1_v = ctx._objMethod1_v,
      a;
  a = _objMethod1_v.k++;
  return ctx._objMethod1_v = undefined, ctx.yldBH(a, objMethod2_3);
}

function objMethod2_3(ctx) {
  var m = ctx._m,
      a;
  a = m++;
  return ctx._m = undefined, ctx.yldBH(a, objMethod2_4);
}

function objMethod2_4(ctx) {
  return ctx.pure(ctx);
}

function objMethod1_1(ctx) {
  var objMethod1_v = ctx._objMethod1_v,
      _objMethodsClosure_v = ctx._objMethodsClosure_v,
      a;
  objMethod1_v.j = 0;
  a = _objMethodsClosure_v.i++;
  return ctx.yldBH(a, objMethod1_2);
}

function objMethod1_2(ctx) {
  var objMethod1_v = ctx._objMethod1_v,
      a;
  a = objMethod1_v.k++;
  return ctx._objMethod1_v = undefined, ctx.yldBH(a, objMethod1_3);
}

function objMethod1_3(ctx) {
  var _objMethodsClosure_v = ctx._objMethodsClosure_v,
      a;
  a = _objMethodsClosure_v.m++;
  return ctx._objMethodsClosure_v = undefined, ctx.yldBH(a, objMethod1_4);
}

function objMethod1_4(ctx) {
  var a = ctx._;
  return ctx.pure(ctx, {
    objMethod2: a
  });
}

function objMethodsClosure_1(ctx) {
  var k,
      objMethodsClosure_v = ctx._objMethodsClosure_v,
      a = ctx._;
  objMethodsClosure_v.i = 0;
  k = 0;
  objMethodsClosure_v.m = 0;
  return ctx.pure(ctx, {
    objMethod1: a
  });
}

function _1(ctx) {
  var _this = ctx.__this;
  return ctx.yldBH(_this, _2);
}

function _2(ctx) {
  var _this = ctx.__this;
  return ctx.__this = undefined, ctx.yldBH(_this, _3);
}

function _3(ctx) {
  var _args = ctx.__args;
  return ctx.__args = undefined, ctx.yldBH(_args[0], _4);
}

function _4(ctx) {
  return ctx.pure(ctx);
}

function f_1(ctx) {
  var i = ctx._i;
  return ctx._i = undefined, ctx.yldBH(i, f_2);
}

function f_2(ctx) {
  var _args = ctx.__args;
  return ctx.__args = undefined, ctx.yldBH(_args, f_3);
}

function f_3(ctx) {
  var _this = ctx.__this;
  return ctx.__this = undefined, ctx.yldBH(_this, f_4);
}

function f_4(ctx) {
  return ctx.pure(ctx);
}

function _f_1(ctx) {
  var i = ctx._i;
  return ctx.yldBH(i, _f_2);
}

function _f_2(ctx) {
  var _args = ctx.__args;
  return ctx.__args = undefined, ctx.yldBH(_args, _f_3);
}

function _f_3(ctx) {
  var i = ctx._i,
      _this = ctx.__this,
      a,
      b;
  b = Object.getPrototypeOf(_this);
  a = b[i].call(_this, i);
  return ctx._i = undefined, ctx.__this = undefined, ctx.yldStarBH(a, _f_4);
}

function _f_4(ctx) {
  return ctx.pure(ctx);
}

function f_11(ctx) {
  var i = ctx._i,
      _this = ctx.__this,
      a,
      b;
  b = Object.getPrototypeOf(_this);
  a = b[i].call(_this, i);
  return ctx._i = undefined, ctx.__this = undefined, ctx.yldStarBH(a, f_21);
}

function f_21(ctx) {
  return ctx.pure(ctx);
}

function _5(ctx) {
  var _clasClosure_v = ctx._clasClosure_v;
  _clasClosure_v.cnt++;
  return ctx.pure(ctx);
}

function f_12(ctx) {
  return ctx.yldBH(1, f_22);
}

function f_22(ctx) {
  return ctx.pure(ctx);
}

function _6(ctx) {
  var _clasClosure_v = ctx._clasClosure_v;
  _clasClosure_v.cnt += 2;
  return ctx.pure(ctx);
}

function f_13(ctx) {
  var _clasClosure_v = ctx._clasClosure_v,
      a;
  a = _clasClosure_v.cnt += 2;
  return ctx._clasClosure_v = undefined, ctx.yldBH(a, f_23);
}

function f_23(ctx) {
  return ctx.pure(ctx);
}

function f_14(ctx) {
  var _clasClosure_v = ctx._clasClosure_v,
      a;
  a = _clasClosure_v.cnt += 3;
  return ctx.yldBH(a, f_24);
}

function f_24(ctx) {
  var _clasClosure_v = ctx._clasClosure_v,
      a;
  a = _clasClosure_v.B.f();
  return ctx._clasClosure_v = undefined, ctx.yldStarBH(a, f_31);
}

function f_31(ctx) {
  return ctx.pure(ctx);
}

function clasClosure_1(ctx) {
  var clasClosure_v = ctx._clasClosure_v,
      a;
  clasClosure_v.cnt = 0;
  a = clasClosure_v.cnt++;
  return ctx.yldBH(a, clasClosure_2);
}

function clasClosure_2(ctx) {
  var B = ctx._B,
      a;
  a = B.f();
  return ctx.yldStarBH(a, clasClosure_3);
}

function clasClosure_3(ctx) {
  var C,
      clasClosure_v = ctx._clasClosure_v,
      a = ctx._,
      b;
  C = a;
  b = clasClosure_v.cnt += 3;
  return ctx._clasClosure_v = undefined, ctx._ = undefined, ctx._C = C, ctx.yldBH(b, clasClosure_4);
}

function clasClosure_4(ctx) {
  var C = ctx._C,
      a;
  a = C.f();
  return ctx._C = undefined, ctx.yldStarBH(a, clasClosure_5);
}

function clasClosure_5(ctx) {
  var B = ctx._B,
      a;
  a = B.f();
  return ctx._B = undefined, ctx.yldStarBH(a, clasClosure_6);
}

function clasClosure_6(ctx) {
  return ctx.pure(ctx);
}

function closure1_a_1(ctx) {
  return ctx.yldBH(`a`, closure1_a_2);
}

function closure1_a_2(ctx, a) {
  var _c2_v = ctx._c2_v;
  return ctx.pure(ctx, _c2_v.i += a);
}

function _c2_1(ctx) {
  var closure1_b = ctx._closure1_b,
      c2_v = ctx._c2_v;
  c2_v.i = 0;
  return ctx.pure(ctx, closure1_b()());
}

function iter_1(ctx) {
  var __v = ctx.__v,
      a;
  a = __v.j++;
  return ctx.__v = undefined, ctx.yldBH(`${__v.i} ${a}`, iter_2);
}

function iter_2(ctx) {
  return ctx.pure(ctx);
}

function loopCapt1_1(ctx) {
  var i,
      a = ctx._;

  for (i = 0; i < 3; i++) {
    a(i);
  }

  return ctx.pure(ctx);
}

function _iter_1(ctx) {
  var __v = ctx.__v;
  return ctx.__v = undefined, ctx.yldBH(__v.j + __v.i, _iter_2);
}

function _iter_2(ctx) {
  return ctx.pure(ctx);
}

function _7(ctx) {
  var _v = ctx.__v;
  return ctx.yldBH(_v.i, _8);
}

function _8(ctx) {
  var _v = ctx.__v,
      iter = ctx._iter;
  _v.j = _v.i + 1;
  funs(iter);
  return ctx.pure(ctx);
}

function loopCapt2_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, loopCapt2_2(ctx);
}

function loopCapt2_2(ctx) {
  var i = ctx._i;
  if (i < 3) return loopCapt2_3(ctx);else {
    return ctx._i = undefined, ctx.yldBH('f', loopCapt2_5);
  }
}

function loopCapt2_3(ctx) {
  var i = ctx._i,
      a = ctx._;
  return ctx.jBH(a(i), loopCapt2_4);
}

function loopCapt2_4(ctx) {
  var i = ctx._i;
  i++;
  return ctx._i = i, loopCapt2_2(ctx);
}

function loopCapt2_5(ctx) {
  return ctx.pure(ctx);
}

function iter_11(ctx) {
  var _v1 = ctx.__v,
      _v2 = ctx.__v1,
      a;
  a = _v2.j++;
  return ctx.__v = undefined, ctx.__v1 = undefined, ctx.yldBH(`${_v1.i} ${a}`, iter_21);
}

function iter_21(ctx) {
  return ctx.pure(ctx);
}

function _9(ctx) {
  var _v = ctx.__v;
  return ctx.__v = undefined, ctx.yldBH(_v.j, _10);
}

function _10(ctx) {
  var iter = ctx._iter;
  funs(iter);
  return ctx.pure(ctx);
}

function _11(ctx) {
  var __v = ctx.__v;
  return ctx.__v = undefined, ctx.yldBH(__v.i, _12);
}

function _12(ctx) {
  var j;
  j = 0;
  return ctx._j = j, _13(ctx);
}

function _13(ctx) {
  var j = ctx._j;
  if (j < 3) return _14(ctx);else {
    return ctx.pure(ctx);
  }
}

function _14(ctx) {
  var j = ctx._j,
      a = ctx._;
  return ctx.jBH(a(j), _15);
}

function _15(ctx) {
  var j = ctx._j;
  j++;
  return ctx._j = j, _13(ctx);
}

function loopCapt3_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, loopCapt3_2(ctx);
}

function loopCapt3_2(ctx) {
  var i = ctx._i;
  if (i < 3) return loopCapt3_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function loopCapt3_3(ctx) {
  var i = ctx._i,
      a = ctx._;
  return ctx.jBH(a(i), loopCapt3_4);
}

function loopCapt3_4(ctx) {
  var i = ctx._i;
  i++;
  return ctx._i = i, loopCapt3_2(ctx);
}

function iter_12(ctx) {
  var _v1 = ctx.__v,
      _v2 = ctx.__v1,
      a;
  a = _v2.j++;
  return ctx.__v = undefined, ctx.__v1 = undefined, ctx.yldBH(`${_v1.i} ${a}`, iter_22);
}

function iter_22(ctx) {
  return ctx.pure(ctx);
}

function loopCapt4_1(ctx) {
  var i,
      a = ctx._;

  for (i = 0; i < 3; i++) {
    a(i);
  }

  return ctx.pure(ctx);
}

function iter_13(ctx) {
  var __v = ctx.__v,
      a;
  a = __v.j++;
  return ctx.__v = undefined, ctx.yldBH(`${__v.i} ${a}`, iter_23);
}

function iter_23(ctx) {
  return ctx.pure(ctx);
}

function forOfCapt1_1(ctx) {
  var loop;
  loop = ctx.iterator(_a);
  return ctx._loop = loop, forOfCapt1_2(ctx);
}

function forOfCapt1_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, forOfCapt1_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function forOfCapt1_3(ctx) {
  var i,
      loop = ctx._loop,
      a = ctx._;
  i = loop.value;
  a(i);
  return forOfCapt1_2(ctx);
}

function iter_14(ctx) {
  var __v = ctx.__v,
      a;
  a = __v.j++;
  return ctx.__v = undefined, ctx.yldBH(`${__v.i} ${a}`, iter_24);
}

function iter_24(ctx) {
  return ctx.pure(ctx);
}

function _16(ctx) {
  var _v = ctx.__v;
  _v.j = 0;
  return ctx.__v = undefined, ctx.yldBH(_v.i, _17);
}

function _17(ctx) {
  var iter = ctx._iter;
  funs(iter);
  return ctx.pure(ctx);
}

function forOfCapt2_1(ctx) {
  var loop;
  loop = ctx.iterator(_a);
  return ctx._loop = loop, forOfCapt2_2(ctx);
}

function forOfCapt2_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, forOfCapt2_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function forOfCapt2_3(ctx) {
  var i,
      loop = ctx._loop,
      a = ctx._;
  i = loop.value;
  return ctx.jBH(a(i), forOfCapt2_2);
}

function iter_15(ctx) {
  var _v1 = ctx.__v,
      _v2 = ctx.__v1,
      a;
  a = _v2.j++;
  return ctx.__v = undefined, ctx.__v1 = undefined, ctx.yldBH(`${_v1.i} ${a}`, iter_25);
}

function iter_25(ctx) {
  return ctx.pure(ctx);
}

function _18(ctx) {
  var loop;
  loop = ctx.iterator(b);
  return ctx._loop = loop, _19(ctx);
}

function _19(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, _20(ctx);else {
    return ctx.pure(ctx);
  }
}

function _20(ctx) {
  var j,
      loop = ctx._loop,
      a = ctx._;
  j = loop.value;
  a(j);
  return _19(ctx);
}

function forOfCapt3_1(ctx) {
  var loop;
  loop = ctx.iterator(_a);
  return ctx._loop = loop, forOfCapt3_2(ctx);
}

function forOfCapt3_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, forOfCapt3_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function forOfCapt3_3(ctx) {
  var i,
      loop = ctx._loop,
      a = ctx._;
  i = loop.value;
  return ctx.jBH(a(i), forOfCapt3_2);
}

function iter_16(ctx) {
  var _v1 = ctx.__v,
      _v2 = ctx.__v1,
      a;
  a = _v2.j++;
  return ctx.__v = undefined, ctx.__v1 = undefined, ctx.yldBH(`${_v1.i} ${a}`, iter_26);
}

function iter_26(ctx) {
  return ctx.pure(ctx);
}

function _21(ctx) {
  var _v = ctx.__v;
  return ctx.__v = undefined, ctx.yldBH(_v.j, _22);
}

function _22(ctx) {
  var iter = ctx._iter;
  funs(iter);
  return ctx.pure(ctx);
}

function _23(ctx) {
  var loop;
  loop = ctx.iterator(b);
  return ctx._loop = loop, _24(ctx);
}

function _24(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, _25(ctx);else {
    return ctx.pure(ctx);
  }
}

function _25(ctx) {
  var j,
      loop = ctx._loop,
      a = ctx._;
  j = loop.value;
  return ctx.jBH(a(j), _24);
}

function forOfCapt4_1(ctx) {
  var loop;
  loop = ctx.iterator(_a);
  return ctx._loop = loop, forOfCapt4_2(ctx);
}

function forOfCapt4_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, forOfCapt4_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function forOfCapt4_3(ctx) {
  var i,
      loop = ctx._loop,
      a = ctx._;
  i = loop.value;
  return ctx.jBH(a(i), forOfCapt4_2);
}

function iter_17(ctx) {
  var _v1 = ctx.__v,
      _v2 = ctx.__v1,
      a;
  a = _v2.j++;
  return ctx.__v = undefined, ctx.__v1 = undefined, ctx.yldBH(`${_v1.i} ${a}`, iter_27);
}

function iter_27(ctx) {
  return ctx.pure(ctx);
}

function _26(ctx) {
  var __v = ctx.__v;
  return ctx.__v = undefined, ctx.yldBH(__v.i, _27);
}

function _27(ctx) {
  var loop;
  loop = ctx.iterator(b);
  return ctx._loop = loop, _28(ctx);
}

function _28(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, _29(ctx);else {
    return ctx.pure(ctx);
  }
}

function _29(ctx) {
  var j,
      loop = ctx._loop,
      a = ctx._;
  j = loop.value;
  a(j);
  return _28(ctx);
}

function forOfCapt5_1(ctx) {
  var loop;
  loop = ctx.iterator(_a);
  return ctx._loop = loop, forOfCapt5_2(ctx);
}

function forOfCapt5_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, forOfCapt5_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function forOfCapt5_3(ctx) {
  var i,
      loop = ctx._loop,
      a = ctx._;
  i = loop.value;
  return ctx.jBH(a(i), forOfCapt5_2);
}

function iter_18(ctx) {
  var _v1 = ctx.__v,
      _v2 = ctx.__v1,
      a;
  a = _v2.j++;
  return ctx.__v = undefined, ctx.__v1 = undefined, ctx.yldBH(`${_v1.i} ${a}`, iter_28);
}

function iter_28(ctx) {
  return ctx.pure(ctx);
}

function _30(ctx) {
  var _v1 = ctx.__v1;
  return ctx.__v1 = undefined, ctx.yldBH(_v1.i, _31);
}

function _31(ctx) {
  var iter = ctx._iter;
  funs(iter);
  return ctx.pure(ctx);
}

function _32(ctx) {
  var __v = ctx.__v;
  return ctx.__v = undefined, ctx.yldBH(__v.i, _33);
}

function _33(ctx) {
  var loop;
  loop = ctx.iterator(b);
  return ctx._loop = loop, _34(ctx);
}

function _34(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, _35(ctx);else {
    return ctx.pure(ctx);
  }
}

function _35(ctx) {
  var j,
      loop = ctx._loop,
      a = ctx._;
  j = loop.value;
  return ctx.jBH(a(j), _34);
}

function forOfCapt6_1(ctx) {
  var loop;
  loop = ctx.iterator(_a);
  return ctx._loop = loop, forOfCapt6_2(ctx);
}

function forOfCapt6_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, forOfCapt6_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function forOfCapt6_3(ctx) {
  var i,
      loop = ctx._loop,
      a = ctx._;
  i = loop.value;
  return ctx.jBH(a(i), forOfCapt6_2);
}

function forIn_1(ctx) {
  var loop;
  loop = ctx.forInIterator({
    a: 1
  });
  return ctx._loop = loop, forIn_2(ctx);
}

function forIn_2(ctx) {
  var loop = ctx._loop,
      a,
      b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return ctx._loop = loop, forIn_3(ctx);else {
    return ctx.pure(ctx);
  }
}

function forIn_3(ctx) {
  var i,
      loop = ctx._loop;
  i = loop.value;
  return ctx.yldBH(i, forIn_2);
}

function while1_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, while1_2(ctx);
}

function while1_2(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(a, while1_3);
}

function while1_3(ctx, a) {
  var i = ctx._i;
  if (a < 3) return ctx._i = i, while1_4(ctx);else {
    i = 0;
    return ctx.pure(ctx);
  }
}

function while1_4(ctx) {
  var i = ctx._i,
      a;
  a = i++;
  return ctx._i = i, ctx.yldBH(a, while1_2);
}

function catchBlock2_1(ctx) {
  var i;
  i = 0;
  return ctx._i = i, catchBlock2_2(ctx);
}

function catchBlock2_2(ctx) {
  var i = ctx._i;

  try {
    return ctx.yldBH(i === 3, catchBlock2_3, catchBlock2_4);
  } catch (ex) {
    return catchBlock2_4(ctx, ex);
  }
}

function catchBlock2_3(ctx, a) {
  var i = ctx._i;

  try {
    if (a) {
      throw new Error(`AAAAAAAAA${i++}`);
    }

    return ctx._i = i, ctx.yldBH(`a${i}`, catchBlock2_7, catchBlock2_4);
  } catch (ex) {
    return ctx._i = i, catchBlock2_4(ctx, ex);
  }
}

function catchBlock2_4(ctx, ex) {
  var i = ctx._i,
      e;
  e = ex;
  return ctx._e = e, ctx.yldBH(`e${i}`, catchBlock2_5);
}

function catchBlock2_5(ctx) {
  var e = ctx._e;
  return ctx._e = undefined, ctx.yldBH(e, catchBlock2_6);
}

function catchBlock2_6(ctx) {
  var i = ctx._i;
  return ctx.pure(ctx, i);
}

function catchBlock2_7(ctx) {
  var i = ctx._i;
  i++;
  return ctx._i = i, catchBlock2_2(ctx);
}

function catchBlock2_8(ctx) {
  return ctx.pure(ctx);
}

function sub_1(ctx) {
  var k = ctx._k,
      a;
  a = k++;
  return ctx._k = undefined, ctx.yldBH(a, sub_2);
}

function sub_2(ctx) {
  var _closure2_v = ctx._closure2_v;
  _closure2_v.j;
  return ctx.pure(ctx);
}

function closure2_1(ctx) {
  var k,
      m,
      closure2_v = ctx._closure2_v,
      a,
      b;
  k = 0;
  closure2_v.j = 1;
  m = 0;
  a = k++;
  b = m++;
  return ctx._closure2_v = undefined, ctx._m = m, ctx.yldBH(a + closure2_v.j + b, closure2_2);
}

function closure2_2(ctx) {
  var m = ctx._m,
      a;
  a = m++;
  return ctx._m = undefined, ctx.yldBH(a, closure2_3);
}

function closure2_3(ctx) {
  var sub = ctx._sub;
  return ctx.pure(ctx, sub);
}