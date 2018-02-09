function a() {
  var a = M.generator();
  return a.scopeH(a_1, a_2);
}

function a1() {
  var a1 = M.generator();
  return a1.scopeH(a1_1, a1_3);
}

function a3() {
  var a3 = M.generator();
  return a3.scopeH(a3_1, a3_3);
}

function a2() {
  var a2 = M.generator();
  return a2.scopeH(a2_1, a2_3);
}

function a() {
  var a = M.generator();
  return a.scopeH(_a_1, a_5);
}

function d(i) {
  var d = M.generator();
  d._i = i;
  return d.scopeH(d_1, d_4);
}

function d2(i) {
  var d2 = M.generator();
  d2._i = i;
  return d2.scopeH(d2_1, d2_7);
}

function a4() {
  var a4 = M.generator();
  return a4.scopeH(a4_1, a4_13);
}

function a5() {
  var a5 = M.generator();
  return a5.scopeH(a5_1, a5_5);
}

function a6() {
  var a6 = M.generator();
  return a6.scopeH(a6_1, a6_9);
}

function a1() {
  var a1 = M.generator();
  return a1.scopeH(_a1_1, _a1_3);
}

function a2() {
  var a2 = M.generator();
  return a2.scopeH(_a2_1, a2_6);
}

function a3() {
  var a3 = M.generator();
  return a3.scopeH(_a3_1, a3_5);
}

function a6() {
  var a6 = M.generator();
  return a6.scopeH(_a6_1, _a6_4);
}

function a7() {
  var a7 = M.generator();
  return a7.scopeH(_a7_1, a7_9);
}

function a7_1() {
  var a7_1 = M.generator();
  return a7_1.scopeH(a7_1_1, a7_1_11);
}

function a7_2() {
  var a7_2 = M.generator();
  return a7_2.scopeH(a7_2_1, a7_2_12);
}

function a7_3() {
  var a7_3 = M.generator();
  return a7_3.scopeH(a7_3_1, a7_3_7);
}

function a7_4() {
  var a7_4 = M.generator();
  return a7_4.scopeH(a7_4_1, a7_4_7);
}

function a7_5() {
  var a7_5 = M.generator();
  return a7_5.scopeH(a7_5_1, a7_5_5);
}

function a7_6() {
  var a7_6 = M.generator();
  return a7_6.scopeH(a7_6_1, a7_6_7);
}

function finallyBlock1() {
  var finallyBlock1 = M.generator();
  return finallyBlock1.scopeH(finallyBlock1_1, finallyBlock1_7);
}

function ae() {
  var ae = M.generator();
  return ae.scopeH(ae_1, ae_5);
}

function cfb() {
  var cfb = M.generator();
  return cfb.scopeH(cfb_1, cfb_9);
}

function cfb1() {
  var cfb1 = M.generator();
  return cfb1.scopeH(cfb1_1, cfb1_7);
}

function cfb1() {
  var cfb1 = M.generator();
  return cfb1.scopeH(_cfb1_1, _cfb1_6);
}

function cfb2() {
  var cfb2 = M.generator();
  return cfb2.scopeH(cfb2_1, cfb2_9);
}

function cfb3() {
  var cfb3 = M.generator();
  return cfb3.scopeH(cfb3_1, cfb3_10);
}

function cfb4() {
  var cfb4 = M.generator();
  return cfb4.scopeH(cfb4_1, cfb4_5);
}

function cfb2() {
  var cfb2 = M.generator();
  return cfb2.scopeH(_cfb2_1, _cfb2_7);
}

function cfb6() {
  var cfb6 = M.generator();
  return cfb6.scopeH(cfb6_1, cfb6_8);
}

function fb4() {
  var fb4 = M.generator();
  return fb4.scopeH(fb4_1, fb4_7);
}

function while2() {
  var while2 = M.generator();
  return while2.scopeH(while2_1, while2_4);
}

function for2() {
  var for2 = M.generator();
  return for2.scopeH(for2_1, for2_6);
}

function c1() {
  var a = function _a() {
    var a = M.generator();

    a._b = function _b() {
      var b = M.generator();
      b._c1 = a._c1;
      return b.scopeH(b_1, b_2);
    };

    a._c1 = c1;
    return a.scopeH(a_11, a_21);
  },
      c1 = {};

  c1._i = 0;
}

function c2() {
  var inner = function _inner() {
    var inner = M.generator();

    inner._a = function _a() {
      var a = M.generator();
      a._c2 = inner._c2;
      return a.scopeH(a_12, _a_3);
    };

    inner._c2 = c2;
    return inner.scopeH(inner_1, inner_8);
  },
      c2 = {};

  c2._i = 0;
  return inner;
}

function c1() {
  var c1 = M.generator();
  return c1.scopeH(c1_1, c1_3);
}

function c2() {
  var c2 = M.generator();
  return c2.scopeH(c2_1, c2_3);
}

function forOf() {
  var forOf = M.generator();
  return forOf.scopeH(forOf_1, forOf_5);
}

const objMethods = {
  a() {
    var ctx = M.generator();
    return ctx.scopeH(a_13, a_31);
  },

  b() {
    var ctx = M.generator();
    ctx.__this = this;
    ctx.__args = arguments;
    return ctx.scopeH(_b_1, b_5);
  }

};
const objM = {
  objMethod() {
    var ctx = M.generator();
    return ctx.scopeH(objMethod_1, objMethod_3);
  }

};

function objMethodsClosure() {
  var objMethodsClosure = M.generator();
  return objMethodsClosure.scopeH(objMethodsClosure_1, objMethodsClosure_2);
}

const objMThis = {
  [objMethod(a)]() {
    var ctx = M.generator();
    ctx.__this = this;
    ctx.__args = arguments;
    return ctx.scopeH(f_1, f_5);
  }

};

class SomeClass {
  f(i) {
    var ctx = M.generator();
    ctx.__this = this;
    ctx.__args = arguments;
    ctx._i = i;
    return ctx.scopeH(_f_1, _f_5);
  }

}

class SomeChild extends SomeClass {
  f(i) {
    var ctx = M.generator();
    ctx.__this = this;
    ctx.__args = arguments;
    ctx._i = i;
    return ctx.scopeH(f_11, f_51);
  }

  static f(i) {
    var ctx = M.generator();
    ctx.__this = this;
    ctx._i = i;
    return ctx.scopeH(f_12, f_32);
  }

}

function clasClosure(A) {
  var clasClosure = M.generator();
  clasClosure._B = class B extends clasClosure._A {
    constructor() {
      var _clasClosure = clasClosure;
      _clasClosure._cnt++;
    }

    static f() {
      var ctx = M.generator();
      return ctx.scopeH(f_13, f_33);
    }

  };
  clasClosure._B1 = class _B extends clasClosure._A {
    constructor() {
      var _clasClosure = clasClosure;
      _clasClosure._cnt += 2;
    }

    static f() {
      var ctx = M.generator();
      ctx._clasClosure = clasClosure;
      return ctx.scopeH(f_14, f_34);
    }

  };
  clasClosure._A = A;
  return clasClosure.scopeH(clasClosure_1, clasClosure_7);
}

function c2() {
  var c2 = M.generator();

  c2._closure1_a = function _closure1_a() {
    var closure1_a = M.generator();
    closure1_a._c2 = c2;
    return closure1_a.scopeH(closure1_a_1, closure1_a_3);
  };

  c2._closure1_b = function closure1_b() {
    var closure1_c = function closure1_c() {
      var _c2 = c2;
      _c2._i += 2;
      return _c2._i;
    },
        closure1_d = function closure1_d() {
      return closure1_c();
    },
        _c2 = c2;

    _c2._i++;
    return closure1_c;
  };

  return c2.scopeH(_c2_1, _c2_2);
}

function loopCapt1() {
  var loopCapt1 = M.generator();
  return loopCapt1.scopeH(loopCapt1_1, loopCapt1_2);
}

function loopCapt2() {
  var loopCapt2 = M.generator();
  return loopCapt2.scopeH(loopCapt2_1, loopCapt2_5);
}

function loopCapt3() {
  var loopCapt3 = M.generator();
  return loopCapt3.scopeH(loopCapt3_1, loopCapt3_4);
}

function loopCapt4() {
  var loopCapt4 = M.generator();
  return loopCapt4.scopeH(loopCapt4_1, loopCapt4_2);
}

function forOfCapt1() {
  var forOfCapt1 = M.generator();
  return forOfCapt1.scopeH(forOfCapt1_1, forOfCapt1_2);
}

function forOfCapt2() {
  var forOfCapt2 = M.generator();
  return forOfCapt2.scopeH(forOfCapt2_1, forOfCapt2_5);
}

function forOfCapt3() {
  var forOfCapt3 = M.generator();
  return forOfCapt3.scopeH(forOfCapt3_1, forOfCapt3_2);
}

function forOfCapt4() {
  var forOfCapt4 = M.generator();
  return forOfCapt4.scopeH(forOfCapt4_1, forOfCapt4_5);
}

function forOfCapt5() {
  var forOfCapt5 = M.generator();
  return forOfCapt5.scopeH(forOfCapt5_1, forOfCapt5_5);
}

function forOfCapt6() {
  var forOfCapt6 = M.generator();
  return forOfCapt6.scopeH(forOfCapt6_1, forOfCapt6_5);
}

function forIn() {
  var forIn = M.generator();
  return forIn.scopeH(forIn_1, forIn_3);
}

function while1() {
  var while1 = M.generator();
  return while1.scopeH(while1_1, while1_4);
}

function catchBlock2() {
  var catchBlock2 = M.generator();
  return catchBlock2.scopeH(catchBlock2_1, catchBlock2_8);
}

function closure2() {
  var closure2 = M.generator();
  return closure2.scopeH(closure2_1, closure2_4);
}

function switches() {
  var switches = M.generator();
  return switches.scopeH(switches_1, switches_39);
}

function a_1(a) {
  return a.pure();
}

function a_2(a, e) {
  return a.raise(e);
}

function a1_1(a1) {
  return a1.yldH(void 0, a1_2, a1_3);
}

function a1_2(a1) {
  return a1.pure();
}

function a1_3(a1, e) {
  return a1.raise(e);
}

function a3_1(a3) {
  return a3.yldH(void 0, a3_2, a3_3);
}

function a3_2(a3, r) {
  return a3.pure(r);
}

function a3_3(a3, e) {
  return a3.raise(e);
}

function a2_1(a2) {
  return a2.yldH(1, a2_2, a2_3);
}

function a2_2(a2) {
  return a2.pure();
}

function a2_3(a2, e) {
  return a2.raise(e);
}

function _a_1(a) {
  return a.yldH(1, _a_2, a_6);
}

function _a_2(a) {
  return a.yldH(2, a_4, a_5);
}

function a_3(a) {
  a._e = a._ex;
  return a.yldH(a._e, a_4, a_5);
}

function a_4(a) {
  return a.pure();
}

function a_5(a, e) {
  return a.raise(e);
}

function a_6(a, b) {
  a._ex = b;
  return a.jumpH(void 0, a_3, a_5);
}

function d_1(d) {
  var a;
  d._j = 0;
  a = d._i++;
  return d.yldH(a, d_2, d_4);
}

function d_2(d, a) {
  return d.yldH(a, d_3, d_4);
}

function d_3(d, a) {
  var b;
  b = d._j++;
  return d.pure((a, b));
}

function d_4(d, e) {
  return d.raise(e);
}

function d2_1(d2) {
  var a;
  d2._j = 0;
  a = d2._i++;
  return d2.yldH(a, d2_2, d2_7);
}

function d2_2(d2, a) {
  var b;
  b = d2._j++;
  return d2.yldH((a, b), d2_3, d2_7);
}

function d2_3(d2) {
  return d2.yldStarH(some(d2._i += 2, d2._j) + d2._j, d2_4, d2_7);
}

function d2_4(d2, a) {
  return d2.yldH(a, d2_5, d2_7);
}

function d2_5(d2, a) {
  var b;

  if (a) {
    b = d2._i += 3;
    return d2.yldStarH(b, d2_6, d2_7);
  } else {
    return d2.pure(d2._i);
  }
}

function d2_6(d2, r) {
  return d2.pure(r);
}

function d2_7(d2, e) {
  return d2.raise(e);
}

function a4_1(a4) {
  return a4.yldH(1, a4_2, a4_15);
}

function a4_2(a4) {
  return a4.yldH(2, a4_3, a4_15);
}

function a4_3(a4) {
  a4._fc = a4_9, a4._fe = a4_13;
  return a4.yldH(3, a4_7, a4_13);
}

function a4_4(a4) {
  a4._e = a4._ex;
  return a4.yldH('excep', a4_5, a4_16);
}

function a4_5(a4) {
  return a4.yldH(a4._e, a4_6, a4_16);
}

function a4_6(a4, a) {
  if (a) {
    a4._fc = a4_12, a4._fe = a4_13, a4._r = 10;
    return a4.jumpH(void 0, a4_7, a4_13);
  } else {
    a4._fc = a4_9, a4._fe = a4_13;
    return a4.jumpH(void 0, a4_7, a4_13);
  }
}

function a4_7(a4) {
  return a4.yldH('f', a4_8, a4_13);
}

function a4_8(a4) {
  return a4.yldH('e', a4._fc, a4._fe);
}

function a4_9(a4) {
  var a;
  a4._1 = a1;
  a = a2();
  return a4.yldStarH(a, a4_10, a4_13);
}

function a4_10(a4, b) {
  var a;
  a4._2 = b;
  a = a3();
  return a4.yldStarH(a, a4_11, a4_13);
}

function a4_11(a4, b) {
  var a;
  a = a4._1(a4._2, b);
  return a4.yldH(a, a4_12, a4_13);
}

function a4_12(a4) {
  return a4.pure(a4._r);
}

function a4_13(a4, e) {
  return a4.raise(e);
}

function a4_14(a4) {
  return a4.raise(a4._err1);
}

function a4_15(a4, a) {
  a4._ex = a;
  return a4.jumpH(void 0, a4_4, a4_16);
}

function a4_16(a4, a) {
  a4._fc = a4_14, a4._fe = a4_13, a4._err1 = a;
  return a4.jumpH(void 0, a4_7, a4_13);
}

function a5_1(a5) {
  a5._loop = a5.iterator(a4());
  return a5.jumpH(void 0, a5_2, a5_7);
}

function a5_2(a5) {
  if (!(a5._loop = a5._loop.step()).done) {
    a5._i = a5._loop.value;
    return a5.yldH(a5._i, a5_2, a5_7);
  } else {
    a5._fc = a5_4, a5._fe = a5_5;
    return a5.jumpH(void 0, a5_3, a5_5);
  }
}

function a5_3(a5) {
  if (a5._loop.exit) {
    a5._loop.exit();
  }

  return a5.jumpH(void 0, a5._fc, a5._fe);
}

function a5_4(a5) {
  return a5.pure();
}

function a5_5(a5, e) {
  return a5.raise(e);
}

function a5_6(a5) {
  return a5.raise(a5._err1);
}

function a5_7(a5, a) {
  a5._fc = a5_6, a5._fe = a5_5, a5._err1 = a;
  return a5.jumpH(void 0, a5_3, a5_5);
}

function a6_1(a6) {
  return a6.yldH(1, a6_2, a6_12);
}

function a6_2(a6) {
  return a6.yldH(2, a6_3, a6_13);
}

function a6_3(a6) {
  return a6.yldH(3, a6_4, a6_13);
}

function a6_4(a6, a) {
  if (a) {
    a6._fc1 = a6_8, a6._fe1 = a6_9, a6._r = 10;
    return a6.jumpH(void 0, a6_5, a6_12);
  } else {
    a6._fc1 = a6_7, a6._fe1 = a6_9;
    return a6.yldH(4, a6_5, a6_12);
  }
}

function a6_5(a6) {
  a6._err1 = a6._err2;
  return a6.yldH('f1', a6_6, a6_9);
}

function a6_6(a6) {
  return a6.yldH('f2', a6._fc1, a6._fe1);
}

function a6_7(a6) {
  return a6.yldH(5, a6_8, a6_9);
}

function a6_8(a6) {
  return a6.pure(a6._r);
}

function a6_9(a6, e) {
  return a6.raise(e);
}

function a6_10(a6) {
  return a6.raise(a6._err1);
}

function a6_11(a6) {
  return a6.raise(a6._err2);
}

function a6_12(a6, a) {
  a6._fc1 = a6_10, a6._fe1 = a6_9, a6._err1 = a;
  return a6.jumpH(void 0, a6_6, a6_9);
}

function a6_13(a6, a) {
  a6._fc1 = a6_11, a6._fe1 = a6_9, a6._err2 = a;
  return a6.jumpH(void 0, a6_5, a6_12);
}

function _a1_1(a1) {
  return a1.yldH(1, _a1_2, _a1_3);
}

function _a1_2(a1) {
  return a1.pure(2);
}

function _a1_3(a1, e) {
  return a1.raise(e);
}

function _a2_1(a2) {
  a2._loop = a2.iterator(a4());
  return a2.jumpH(void 0, _a2_2, a2_8);
}

function _a2_2(a2) {
  if (!(a2._loop = a2._loop.step()).done) {
    a2._i = a2._loop.value;
    return a2.yldH(a2._i, _a2_2, a2_8);
  } else {
    a2._fc = a2_4, a2._fe = a2_6;
    return a2.jumpH(void 0, _a2_3, a2_6);
  }
}

function _a2_3(a2) {
  if (a2._loop.exit) {
    a2._loop.exit();
  }

  return a2.jumpH(void 0, a2._fc, a2._fe);
}

function a2_4(a2) {
  return a2.yldH(10, a2_5, a2_6);
}

function a2_5(a2) {
  return a2.pure();
}

function a2_6(a2, e) {
  return a2.raise(e);
}

function a2_7(a2) {
  return a2.raise(a2._err1);
}

function a2_8(a2, a) {
  a2._fc = a2_7, a2._fe = a2_6, a2._err1 = a;
  return a2.jumpH(void 0, _a2_3, a2_6);
}

function _a3_1(a3) {
  a3._loop = a3.iterator(a4());
  return a3.jumpH(void 0, _a3_2, a3_7);
}

function _a3_2(a3) {
  if (!(a3._loop = a3._loop.step()).done) {
    a3._i = a3._loop.value;
    return a3.yldH(a3._i, _a3_2, a3_7);
  } else {
    a3._fc = a3_4, a3._fe = a3_5;
    return a3.jumpH(void 0, _a3_3, a3_5);
  }
}

function _a3_3(a3) {
  if (a3._loop.exit) {
    a3._loop.exit();
  }

  return a3.jumpH(void 0, a3._fc, a3._fe);
}

function a3_4(a3) {
  return a3.pure();
}

function a3_5(a3, e) {
  return a3.raise(e);
}

function a3_6(a3) {
  return a3.raise(a3._err1);
}

function a3_7(a3, a) {
  a3._fc = a3_6, a3._fe = a3_5, a3._err1 = a;
  return a3.jumpH(void 0, _a3_3, a3_5);
}

function _a6_1(a6) {
  a6._i = 0;
  return a6.jumpH(void 0, _a6_2, _a6_4);
}

function _a6_2(a6) {
  var a;
  a = a6._i++;
  return a6.yldH(a, _a6_3, _a6_4);
}

function _a6_3(a6, a) {
  if (a === 'exit') {
    return a6.pure(100);
  } else {
    return a6.jumpRH(void 0, _a6_2, _a6_4);
  }
}

function _a6_4(a6, e) {
  return a6.raise(e);
}

function _a7_1(a7) {
  return a7.yldH(1, _a7_2, a7_9);
}

function _a7_2(a7, a) {
  if (a) {
    return a7.yldH('A', _a7_3, a7_9);
  } else {
    return a7.yldH('c', _a7_5, a7_9);
  }
}

function _a7_3(a7, a) {
  a7._ = a;
  return a7.yldH('b', _a7_4, a7_9);
}

function _a7_4(a7, a) {
  a7._ && a;
  return a7.jumpH(void 0, a7_8, a7_9);
}

function _a7_5(a7, a) {
  a7._1 = a;
  return a7.yldH('d', _a7_6, a7_9);
}

function _a7_6(a7, a) {
  if (a) {
    return a7.yldH('e', a7_7, a7_9);
  } else {
    return a7.yldStarH(a, a7_7, a7_9);
  }
}

function a7_7(a7, a) {
  a7._1 || a;
  return a7.jumpH(void 0, a7_8, a7_9);
}

function a7_8(a7, r) {
  return a7.pure(r);
}

function a7_9(a7, e) {
  return a7.raise(e);
}

function a7_1_1(a7_1) {
  return a7_1.yldH(1, a7_1_2, a7_1_11);
}

function a7_1_2(a7_1, a) {
  if (a) {
    return a7_1.yldH('A', a7_1_3, a7_1_11);
  } else {
    return a7_1.yldH('c', a7_1_5, a7_1_11);
  }
}

function a7_1_3(a7_1, a) {
  a7_1._2 = a;
  return a7_1.yldH('b', a7_1_4, a7_1_11);
}

function a7_1_4(a7_1, a) {
  a7_1._1 = a7_1._2 && a;
  return a7_1.jumpH(void 0, a7_1_8, a7_1_11);
}

function a7_1_5(a7_1, a) {
  a7_1._3 = a;
  return a7_1.yldH('d', a7_1_6, a7_1_11);
}

function a7_1_6(a7_1, a) {
  if (a) {
    return a7_1.yldH('e', a7_1_7, a7_1_11);
  } else {
    return a7_1.yldStarH(a, a7_1_7, a7_1_11);
  }
}

function a7_1_7(a7_1, a) {
  a7_1._1 = a7_1._3 || a;
  return a7_1.jumpH(void 0, a7_1_8, a7_1_11);
}

function a7_1_8(a7_1) {
  return a7_1.yldH(2, a7_1_9, a7_1_11);
}

function a7_1_9(a7_1, a) {
  return a7_1.yldH(a7_1._1 + a, a7_1_10, a7_1_11);
}

function a7_1_10(a7_1, r) {
  return a7_1.pure(r);
}

function a7_1_11(a7_1, e) {
  return a7_1.raise(e);
}

function a7_2_1(a7_2) {
  return a7_2.yldH(1, a7_2_2, a7_2_12);
}

function a7_2_2(a7_2, a) {
  if (a) {
    return a7_2.yldH('A', a7_2_3, a7_2_12);
  } else {
    return a7_2.yldH('c', a7_2_5, a7_2_12);
  }
}

function a7_2_3(a7_2, a) {
  a7_2._1 = a;
  return a7_2.yldH('b', a7_2_4, a7_2_12);
}

function a7_2_4(a7_2, a) {
  a7_2._ = a7_2._1 && a;
  return a7_2.jumpH(void 0, a7_2_8, a7_2_12);
}

function a7_2_5(a7_2, a) {
  a7_2._2 = a;
  return a7_2.yldH('d', a7_2_6, a7_2_12);
}

function a7_2_6(a7_2, a) {
  if (a) {
    return a7_2.yldH('e', a7_2_7, a7_2_12);
  } else {
    return a7_2.yldStarH(a, a7_2_7, a7_2_12);
  }
}

function a7_2_7(a7_2, a) {
  a7_2._ = a7_2._2 || a;
  return a7_2.jumpH(void 0, a7_2_8, a7_2_12);
}

function a7_2_8(a7_2) {
  return a7_2.yldH(2, a7_2_9, a7_2_12);
}

function a7_2_9(a7_2, a) {
  return a7_2.yldH(a7_2._ + a, a7_2_10, a7_2_12);
}

function a7_2_10(a7_2) {
  return a7_2.yldH('ex', a7_2_11, a7_2_12);
}

function a7_2_11(a7_2) {
  return a7_2.pure();
}

function a7_2_12(a7_2, e) {
  return a7_2.raise(e);
}

function a7_3_1(a7_3) {
  return a7_3.yldH(1, a7_3_2, a7_3_7);
}

function a7_3_2(a7_3, a) {
  if (a % 2) {
    return a7_3.yldH('A', a7_3_3, a7_3_7);
  } else {
    return a7_3.yldH('c', a7_3_5, a7_3_7);
  }
}

function a7_3_3(a7_3, a) {
  a7_3._ = a;
  return a7_3.yldH('b', a7_3_4, a7_3_7);
}

function a7_3_4(a7_3, a) {
  a7_3._ && a;
  return a7_3.jumpH(void 0, a7_3_5, a7_3_7);
}

function a7_3_5(a7_3) {
  return a7_3.yldH(2, a7_3_6, a7_3_7);
}

function a7_3_6(a7_3) {
  return a7_3.pure();
}

function a7_3_7(a7_3, e) {
  return a7_3.raise(e);
}

function a7_4_1(a7_4) {
  if (1) {
    return a7_4.yldH(2, a7_4_4, a7_4_7);
  } else {
    return a7_4.yldH(3, a7_4_2, a7_4_7);
  }
}

function a7_4_2(a7_4, a) {
  a7_4._1 = a;
  return a7_4.yldH(4, a7_4_3, a7_4_7);
}

function a7_4_3(a7_4, b) {
  var a;
  a = (a7_4._1, b);
  return a7_4.jumpH(void 0, a7_4_4, a7_4_7);
}

function a7_4_4(a7_4, a) {
  return a7_4.yldH(a, a7_4_5, a7_4_7);
}

function a7_4_5(a7_4, a) {
  return a7_4.yldH(a, a7_4_6, a7_4_7);
}

function a7_4_6(a7_4, r) {
  return a7_4.pure(r);
}

function a7_4_7(a7_4, e) {
  return a7_4.raise(e);
}

function a7_5_1(a7_5) {
  return a7_5.yldH(1, a7_5_2, a7_5_5);
}

function a7_5_2(a7_5, a) {
  if (a) {
    return a7_5.yldH(2, a7_5_3, a7_5_5);
  } else {
    return a7_5.yldH(3, a7_5_3, a7_5_5);
  }
}

function a7_5_3(a7_5, a) {
  return a7_5.yldH(a, a7_5_4, a7_5_5);
}

function a7_5_4(a7_5, r) {
  return a7_5.pure(r);
}

function a7_5_5(a7_5, e) {
  return a7_5.raise(e);
}

function a7_6_1(a7_6) {
  return a7_6.yldH(1, a7_6_2, a7_6_7);
}

function a7_6_2(a7_6, a) {
  var b;

  if (a) {
    return a7_6.yldH('A', a7_6_3, a7_6_7);
  } else {
    b = 1;
    return a7_6.yldStarH(b, a7_6_5, a7_6_7);
  }
}

function a7_6_3(a7_6, a) {
  a7_6._1 = a;
  return a7_6.yldH('b', a7_6_4, a7_6_7);
}

function a7_6_4(a7_6, b) {
  var a;
  a = a7_6._1 && b;
  return a7_6.jumpH(void 0, a7_6_5, a7_6_7);
}

function a7_6_5(a7_6, a) {
  return a7_6.yldH(a, a7_6_6, a7_6_7);
}

function a7_6_6(a7_6, r) {
  return a7_6.pure(r);
}

function a7_6_7(a7_6, e) {
  return a7_6.raise(e);
}

function finallyBlock1_1(finallyBlock1) {
  finallyBlock1._i = 0;
  return finallyBlock1.jumpH(void 0, finallyBlock1_2, finallyBlock1_9);
}

function finallyBlock1_2(finallyBlock1) {
  return finallyBlock1.yldH(finallyBlock1._i++ === 3, finallyBlock1_3, finallyBlock1_9);
}

function finallyBlock1_3(finallyBlock1, a) {
  if (a) {
    finallyBlock1._fc = finallyBlock1_6, finallyBlock1._fe = finallyBlock1_7;
    return finallyBlock1.jumpH(void 0, finallyBlock1_4, finallyBlock1_7);
  } else {
    return finallyBlock1.jumpRH(void 0, finallyBlock1_2, finallyBlock1_9);
  }
}

function finallyBlock1_4(finallyBlock1) {
  return finallyBlock1.yldH('exit', finallyBlock1_5, finallyBlock1_7);
}

function finallyBlock1_5(finallyBlock1) {
  return finallyBlock1.yldH(finallyBlock1._i, finallyBlock1._fc, finallyBlock1._fe);
}

function finallyBlock1_6(finallyBlock1) {
  return finallyBlock1.pure();
}

function finallyBlock1_7(finallyBlock1, e) {
  return finallyBlock1.raise(e);
}

function finallyBlock1_8(finallyBlock1) {
  return finallyBlock1.raise(finallyBlock1._err1);
}

function finallyBlock1_9(finallyBlock1, a) {
  finallyBlock1._fc = finallyBlock1_8, finallyBlock1._fe = finallyBlock1_7, finallyBlock1._err1 = a;
  return finallyBlock1.jumpH(void 0, finallyBlock1_4, finallyBlock1_7);
}

function ae_1(ae) {
  return ae.yldH(1, ae_2, ae_5);
}

function ae_2(ae) {
  return ae.yldH(2, ae_3, ae_5);
}

function ae_3(ae) {
  return ae.yldH(3, ae_4, ae_5);
}

function ae_4(ae, a) {
  if (a) {
    return ae.pure(1);
  } else {
    return ae.pure(2);
  }
}

function ae_5(ae, e) {
  return ae.raise(e);
}

function cfb_1(cfb) {
  cfb._i = 0;
  return cfb.jumpH(void 0, cfb_2, cfb_11);
}

function cfb_2(cfb) {
  return cfb.yldH(cfb._i++ === 3, cfb_3, cfb_11);
}

function cfb_3(cfb, a) {
  if (a) {
    throw new Error(`AAAAAAAAA${cfb._i++}`);
  }

  cfb._fc = cfb_8, cfb._fe = cfb_9;
  return cfb.yldH(`a${cfb._i++}`, cfb_7, cfb_9);
}

function cfb_4(cfb) {
  cfb._e = cfb._ex;
  return cfb.yldH(`e${cfb._i++}`, cfb_5, cfb_12);
}

function cfb_5(cfb) {
  return cfb.yldH(cfb._e, cfb_6, cfb_12);
}

function cfb_6(cfb) {
  cfb._fc = cfb_8, cfb._fe = cfb_9, cfb._r = cfb._i++;
  return cfb.jumpH(void 0, cfb_7, cfb_9);
}

function cfb_7(cfb) {
  return cfb.yldH(`f1${cfb._i++}`, cfb._fc, cfb._fe);
}

function cfb_8(cfb) {
  return cfb.pure(cfb._r);
}

function cfb_9(cfb, e) {
  return cfb.raise(e);
}

function cfb_10(cfb) {
  return cfb.raise(cfb._err1);
}

function cfb_11(cfb, a) {
  cfb._ex = a;
  return cfb.jumpH(void 0, cfb_4, cfb_12);
}

function cfb_12(cfb, a) {
  cfb._fc = cfb_10, cfb._fe = cfb_9, cfb._err1 = a;
  return cfb.jumpH(void 0, cfb_7, cfb_9);
}

function cfb1_1(cfb1) {
  cfb1._i = 0;
  return cfb1.jumpH(void 0, cfb1_2, cfb1_9);
}

function cfb1_2(cfb1) {
  return cfb1.yldH(cfb1._i, cfb1_3, cfb1_9);
}

function cfb1_3(cfb1) {
  throw new Error(`AAAAAAAAA${cfb1._i++}`);
}

function cfb1_4(cfb1) {
  cfb1._e = cfb1._ex;
  cfb1._fc = cfb1_6, cfb1._fe = cfb1_7, cfb1._r = cfb1._i++;
  return cfb1.jumpH(void 0, cfb1_5, cfb1_7);
}

function cfb1_5(cfb1) {
  console.log(`f${cfb1._i}`);
  return cfb1.jumpH(void 0, cfb1._fc, cfb1._fe);
}

function cfb1_6(cfb1) {
  return cfb1.pure(cfb1._r);
}

function cfb1_7(cfb1, e) {
  return cfb1.raise(e);
}

function cfb1_8(cfb1) {
  return cfb1.raise(cfb1._err1);
}

function cfb1_9(cfb1, a) {
  cfb1._ex = a;
  return cfb1.jumpH(void 0, cfb1_4, cfb1_10);
}

function cfb1_10(cfb1, a) {
  cfb1._fc = cfb1_8, cfb1._fe = cfb1_7, cfb1._err1 = a;
  return cfb1.jumpH(void 0, cfb1_5, cfb1_7);
}

function _cfb1_1(cfb1) {
  cfb1._i = 0;
  return cfb1.jumpH(void 0, _cfb1_2, _cfb1_7);
}

function _cfb1_2(cfb1) {
  return cfb1.yldH(cfb1._i, _cfb1_3, _cfb1_7);
}

function _cfb1_3(cfb1) {
  return cfb1.yldH(5, _cfb1_5, _cfb1_6);
}

function _cfb1_4(cfb1) {
  cfb1._e = cfb1._ex;
  return cfb1.pure(cfb1._i++);
}

function _cfb1_5(cfb1) {
  return cfb1.pure(cfb1._r);
}

function _cfb1_6(cfb1, e) {
  return cfb1.raise(e);
}

function _cfb1_7(cfb1, a) {
  cfb1._ex = a;
  return cfb1.jumpH(void 0, _cfb1_4, _cfb1_6);
}

function cfb2_1(cfb2) {
  cfb2._i = 0;
  return cfb2.jumpH(void 0, cfb2_2, cfb2_11);
}

function cfb2_2(cfb2) {
  return cfb2.yldH(`a:${cfb2._i++}`, cfb2_3, cfb2_11);
}

function cfb2_3(cfb2) {
  return cfb2.yldH(`b:${cfb2._i++}`, cfb2_4, cfb2_11);
}

function cfb2_4(cfb2) {
  cfb2._fc = cfb2_8, cfb2._fe = cfb2_9;
  return cfb2.yldH(`c:${cfb2._i++}`, cfb2_5, cfb2_10);
}

function cfb2_5(cfb2) {
  cfb2._ex = cfb2._err1;
  return cfb2.yldH(`f:${cfb2._i++}`, cfb2._fc, cfb2._fe);
}

function cfb2_6(cfb2) {
  cfb2._e = cfb2._ex;
  return cfb2.yldH(cfb2._e, cfb2_7, cfb2_9);
}

function cfb2_7(cfb2) {
  return cfb2.yldH(`e:${cfb2._i++}`, cfb2_8, cfb2_9);
}

function cfb2_8(cfb2) {
  return cfb2.pure();
}

function cfb2_9(cfb2, e) {
  return cfb2.raise(e);
}

function cfb2_10(cfb2, a) {
  cfb2._ex = a;
  return cfb2.jumpH(void 0, cfb2_6, cfb2_9);
}

function cfb2_11(cfb2, a) {
  cfb2._fc = cfb2_6, cfb2._fe = cfb2_9, cfb2._err1 = a;
  return cfb2.jumpH(void 0, cfb2_5, cfb2_10);
}

function cfb3_1(cfb3) {
  cfb3._i = 0;
  return cfb3.jumpH(void 0, cfb3_2, cfb3_12);
}

function cfb3_2(cfb3) {
  return cfb3.yldH(cfb3._i === 3, cfb3_3, cfb3_12);
}

function cfb3_3(cfb3, a) {
  if (a) {
    throw new Error(`AAAAAAAAA${cfb3._i++}`);
  }

  cfb3._fc = cfb3_5, cfb3._fe = cfb3_11;
  return cfb3.yldH(`a${cfb3._i}`, cfb3_4, cfb3_11);
}

function cfb3_4(cfb3) {
  cfb3._ex = cfb3._err1;
  return cfb3.yldH(`f1${cfb3._i++}`, cfb3._fc, cfb3._fe);
}

function cfb3_5(cfb3) {
  return cfb3.yldH(`b${cfb3._i++}`, cfb3_9, cfb3_10);
}

function cfb3_6(cfb3) {
  cfb3._e = cfb3._ex;
  return cfb3.yldH(`e${cfb3._i}`, cfb3_7, cfb3_10);
}

function cfb3_7(cfb3) {
  return cfb3.yldH(cfb3._e, cfb3_8, cfb3_10);
}

function cfb3_8(cfb3) {
  return cfb3.pure(cfb3._i);
}

function cfb3_9(cfb3) {
  cfb3._i++;
  return cfb3.jumpRH(void 0, cfb3_2, cfb3_12);
}

function cfb3_10(cfb3, e) {
  return cfb3.raise(e);
}

function cfb3_11(cfb3, a) {
  cfb3._ex = a;
  return cfb3.jumpH(void 0, cfb3_6, cfb3_10);
}

function cfb3_12(cfb3, a) {
  cfb3._fc = cfb3_6, cfb3._fe = cfb3_10, cfb3._err1 = a;
  return cfb3.jumpH(void 0, cfb3_4, cfb3_11);
}

function cfb4_1(cfb4) {
  return cfb4.yldH(5, cfb4_3, cfb4_4);
}

function cfb4_2(cfb4) {
  cfb4._e = cfb4._ex;
  return cfb4.pure(10);
}

function cfb4_3(cfb4) {
  return cfb4.pure(cfb4._r);
}

function cfb4_4(cfb4, e) {
  return cfb4.raise(e);
}

function cfb4_5(cfb4, a) {
  cfb4._ex = a;
  return cfb4.jumpH(void 0, cfb4_2, cfb4_4);
}

function _cfb2_1(cfb2) {
  cfb2._i = 0;
  return cfb2.jumpH(void 0, _cfb2_2, _cfb2_9);
}

function _cfb2_2(cfb2) {
  cfb2._fc = _cfb2_6, cfb2._fe = _cfb2_7;
  return cfb2.yldH(`c:${cfb2._i++}`, _cfb2_3, _cfb2_8);
}

function _cfb2_3(cfb2) {
  cfb2._ex = cfb2._err1;
  return cfb2.yldH(`f:${cfb2._i++}`, cfb2._fc, cfb2._fe);
}

function _cfb2_4(cfb2) {
  cfb2._e = cfb2._ex;
  return cfb2.yldH(cfb2._e, _cfb2_5, _cfb2_7);
}

function _cfb2_5(cfb2) {
  return cfb2.yldH(`e:${cfb2._i++}`, _cfb2_6, _cfb2_7);
}

function _cfb2_6(cfb2) {
  return cfb2.pure();
}

function _cfb2_7(cfb2, e) {
  return cfb2.raise(e);
}

function _cfb2_8(cfb2, a) {
  cfb2._ex = a;
  return cfb2.jumpH(void 0, _cfb2_4, _cfb2_7);
}

function _cfb2_9(cfb2, a) {
  cfb2._fc = _cfb2_4, cfb2._fe = _cfb2_7, cfb2._err1 = a;
  return cfb2.jumpH(void 0, _cfb2_3, _cfb2_8);
}

function cfb6_1(cfb6) {
  cfb6._fc = cfb6_5, cfb6._fe = cfb6_6;
  return cfb6.yldH(1, cfb6_4, cfb6_6);
}

function cfb6_2(cfb6) {
  cfb6._e = cfb6._ex;
  return cfb6.yldH(2, cfb6_3, cfb6_9);
}

function cfb6_3(cfb6) {
  cfb6._fc = cfb6_5, cfb6._fe = cfb6_6, cfb6._r = 3;
  return cfb6.jumpH(void 0, cfb6_4, cfb6_6);
}

function cfb6_4(cfb6) {
  return cfb6.yldH(4, cfb6._fc, cfb6._fe);
}

function cfb6_5(cfb6) {
  return cfb6.pure(cfb6._r);
}

function cfb6_6(cfb6, e) {
  return cfb6.raise(e);
}

function cfb6_7(cfb6) {
  return cfb6.raise(cfb6._err1);
}

function cfb6_8(cfb6, a) {
  cfb6._ex = a;
  return cfb6.jumpH(void 0, cfb6_2, cfb6_9);
}

function cfb6_9(cfb6, a) {
  cfb6._fc = cfb6_7, cfb6._fe = cfb6_6, cfb6._err1 = a;
  return cfb6.jumpH(void 0, cfb6_4, cfb6_6);
}

function fb4_1(fb4) {
  fb4._i = 0;
  return fb4.jumpH(void 0, fb4_2, fb4_9);
}

function fb4_2(fb4) {
  var a;
  a = fb4._i++;
  return fb4.yldH(a, fb4_3, fb4_9);
}

function fb4_3(fb4, a) {
  if (a === 3) {
    fb4._fc = fb4_6, fb4._fe = fb4_7, fb4._r = fb4._i;
    return fb4.jumpH(void 0, fb4_4, fb4_7);
  } else {
    return fb4.jumpRH(void 0, fb4_2, fb4_9);
  }
}

function fb4_4(fb4) {
  return fb4.yldH('exit', fb4_5, fb4_7);
}

function fb4_5(fb4) {
  return fb4.yldH(fb4._i, fb4._fc, fb4._fe);
}

function fb4_6(fb4) {
  return fb4.pure(fb4._r);
}

function fb4_7(fb4, e) {
  return fb4.raise(e);
}

function fb4_8(fb4) {
  return fb4.raise(fb4._err1);
}

function fb4_9(fb4, a) {
  fb4._fc = fb4_8, fb4._fe = fb4_7, fb4._err1 = a;
  return fb4.jumpH(void 0, fb4_4, fb4_7);
}

function while2_1(while2) {
  while2._i = 0;
  return while2.jumpH(void 0, while2_2, while2_4);
}

function while2_2(while2) {
  var a;
  a = while2._i++;
  return while2.yldH(a, while2_3, while2_4);
}

function while2_3(while2, a) {
  var b;

  if (a < 3) {
    b = while2._i++;
    return while2.yldH(b, while2_2, while2_4);
  } else {
    return while2.pure();
  }
}

function while2_4(while2, e) {
  return while2.raise(e);
}

function for2_1(for2) {
  return for2.yldH(void 0, for2_2, for2_6);
}

function for2_2(for2, a) {
  for2._i = a;
  return for2.jumpH(void 0, for2_3, for2_6);
}

function for2_3(for2) {
  return for2.yldH(for2._i, for2_4, for2_6);
}

function for2_4(for2, a) {
  if (a < 10) {
    return for2.yldH(for2._i, for2_5, for2_6);
  } else {
    return for2.pure();
  }
}

function for2_5(for2) {
  for2._i++;
  return for2.jumpRH(void 0, for2_3, for2_6);
}

function for2_6(for2, e) {
  return for2.raise(e);
}

function c_1(_c) {
  _c._c1._i++;
  return _c.pure();
}

function c_2(_c, e) {
  return _c.raise(e);
}

function b_1(b) {
  return b.pure(function c() {
    var _c = M.generator();

    _c._c1 = b._c1;
    return _c.scopeH(c_1, c_2);
  });
}

function b_2(b, e) {
  return b.raise(e);
}

function a_11(a) {
  return a.pure();
}

function a_21(a, e) {
  return a.raise(e);
}

function a_12(a) {
  a._ = a._c2._i;
  return a.yldH(`a:${a._c2._i}`, a_22, _a_3);
}

function a_22(a, c) {
  var b;
  b = a._c2._i = a._ + c;
  return a.pure(b);
}

function _a_3(a, e) {
  return a.raise(e);
}

function _z_1(_z) {
  _z._d = function z(j) {
    var c2 = _z._c2;
    return c2._i += j;
  };

  return _z.yldStarH(_z._c(), _z_2, z_6);
}

function _z_2(_z, a) {
  return _z.yldStarH(_z._d(a), _z_3, z_6);
}

function _z_3(_z, a) {
  return _z.yldStarH(a, _z_4, z_6);
}

function _z_4(_z, a) {
  return _z.yldH(`b:${a}`, z_5, z_6);
}

function z_1(z1) {
  var a;
  z1._ = z1._c2._i;
  a = z1._f._a;
  return z1.yldStarH(a(), z_2, z_4);
}

function z_2(z1, b) {
  var a;
  z1._1 = b;
  a = z1._f._b;
  return z1.yldStarH(a(), z_3, z_4);
}

function z_3(z1, b) {
  var a;
  a = z1._c2._i = z1._ + (z1._j + z1._1 + b);
  return z1.pure(a);
}

function z_4(z1, e) {
  return z1.raise(e);
}

function z_5(_z) {
  return _z.pure(function z(j) {
    var z1 = M.generator();
    z1._c2 = _z._c2;
    z1._f = _z._f;
    z1._j = j;
    return z1.scopeH(z_1, z_4);
  });
}

function z_6(_z, e) {
  return _z.raise(e);
}

function inner_1(inner) {
  inner._b = () => {
    var j,
        ctx = {},
        c2 = inner._c2;

    ctx._a = function a() {
      var c2 = inner._c2;
      c2._i += 2;
      return c2._i;
    };

    ctx._b = function b() {
      var c2 = inner._c2;
      c2._i += j;
    };

    {
      j = 10;
      c2._i++;
      return function z() {
        var _z = M.generator();

        _z._c = function c() {
          var c2 = _z._c2;
          return c2._i += this.something;
        };

        _z._c2 = inner._c2;
        _z._f = ctx;
        return _z.scopeH(_z_1, z_6);
      };
    }
  };

  inner._k = 1;
  return inner.yldStarH(inner._b(), inner_2, inner_8);
}

function inner_2(inner, a) {
  inner._f = [inner._a, a];
  inner._loop = inner.iterator(inner._f);
  return inner.jumpH(void 0, inner_3, inner_10);
}

function inner_3(inner) {
  if (!(inner._loop = inner._loop.step()).done) {
    inner._j = inner._loop.value;
    return inner.yldStarH(inner._j(), inner_4, inner_10);
  } else {
    inner._fc = inner_7, inner._fe = inner_8;
    return inner.jumpH(void 0, inner_6, inner_8);
  }
}

function inner_4(inner, a) {
  return inner.yldStarH(a, inner_5, inner_10);
}

function inner_5(inner, a) {
  inner._k += a;
  return inner.jumpRH(void 0, inner_3, inner_10);
}

function inner_6(inner) {
  if (inner._loop.exit) {
    inner._loop.exit();
  }

  return inner.jumpH(void 0, inner._fc, inner._fe);
}

function inner_7(inner) {
  return inner.pure(inner._k);
}

function inner_8(inner, e) {
  return inner.raise(e);
}

function inner_9(inner) {
  return inner.raise(inner._err1);
}

function inner_10(inner, a) {
  inner._fc = inner_9, inner._fe = inner_8, inner._err1 = a;
  return inner.jumpH(void 0, inner_6, inner_8);
}

function c1_1(c1) {
  c1._i = 0;
  return c1.yldH(`a:${c1._i}`, c1_2, c1_3);
}

function c1_2(c1, r) {
  return c1.pure(r);
}

function c1_3(c1, e) {
  return c1.raise(e);
}

function c2_1(c2) {
  c2._i = 0;
  return c2.yldH(`a:${c2._i}`, c2_2, c2_3);
}

function c2_2(c2, b) {
  var a;
  a = c2._i += b;
  return c2.pure(a);
}

function c2_3(c2, e) {
  return c2.raise(e);
}

function forOf_1(forOf) {
  forOf._loop = forOf.iterator([1, 2, 3]);
  return forOf.jumpH(void 0, forOf_2, forOf_7);
}

function forOf_2(forOf) {
  if (!(forOf._loop = forOf._loop.step()).done) {
    forOf._i = forOf._loop.value;
    return forOf.yldH(forOf._i, forOf_2, forOf_7);
  } else {
    forOf._fc = forOf_4, forOf._fe = forOf_5;
    return forOf.jumpH(void 0, forOf_3, forOf_5);
  }
}

function forOf_3(forOf) {
  if (forOf._loop.exit) {
    forOf._loop.exit();
  }

  return forOf.jumpH(void 0, forOf._fc, forOf._fe);
}

function forOf_4(forOf) {
  return forOf.pure();
}

function forOf_5(forOf, e) {
  return forOf.raise(e);
}

function forOf_6(forOf) {
  return forOf.raise(forOf._err1);
}

function forOf_7(forOf, a) {
  forOf._fc = forOf_6, forOf._fe = forOf_5, forOf._err1 = a;
  return forOf.jumpH(void 0, forOf_3, forOf_5);
}

function a_13(ctx) {
  return ctx.yldH(10, a_23, a_31);
}

function a_23(ctx) {
  return ctx.pure();
}

function a_31(ctx, e) {
  return ctx.raise(e);
}

function _b_1(ctx) {
  return ctx.yldH(1, _b_2, b_5);
}

function _b_2(ctx) {
  return ctx.yldH(ctx.__this, b_3, b_5);
}

function b_3(ctx) {
  return ctx.yldH(ctx.__args, b_4, b_5);
}

function b_4(ctx) {
  return ctx.pure();
}

function b_5(ctx, e) {
  return ctx.raise(e);
}

function objMethod_1(ctx) {
  return ctx.yldH(1, objMethod_2, objMethod_3);
}

function objMethod_2(ctx) {
  return ctx.pure();
}

function objMethod_3(ctx, e) {
  return ctx.raise(e);
}

function objMethod1_1(ctx) {
  var a;
  ctx._j = 0;
  a = ctx._objMethodsClosure._i++;
  return ctx.yldH(a, objMethod1_2, objMethod1_5);
}

function objMethod1_2(ctx) {
  var a;
  a = ctx._k++;
  return ctx.yldH(a, objMethod1_3, objMethod1_5);
}

function objMethod1_3(ctx) {
  var a;
  a = ctx._objMethodsClosure._m++;
  return ctx.yldH(a, objMethod1_4, objMethod1_5);
}

function objMethod2_1(_ctx) {
  var a;
  a = _ctx._f._j++;
  return _ctx.yldH(a, objMethod2_2, objMethod2_5);
}

function objMethod2_2(_ctx) {
  var a;
  a = _ctx._f._k++;
  return _ctx.yldH(a, objMethod2_3, objMethod2_5);
}

function objMethod2_3(_ctx) {
  var a;
  a = _ctx._m++;
  return _ctx.yldH(a, objMethod2_4, objMethod2_5);
}

function objMethod2_4(_ctx) {
  return _ctx.pure();
}

function objMethod2_5(_ctx, e) {
  return _ctx.raise(e);
}

function objMethod1_4(ctx) {
  return ctx.pure({
    objMethod2(m) {
      var _ctx = M.generator();

      _ctx._f = ctx;
      _ctx._m = m;
      return _ctx.scopeH(objMethod2_1, objMethod2_5);
    }

  });
}

function objMethod1_5(ctx, e) {
  return ctx.raise(e);
}

function objMethodsClosure_1(objMethodsClosure) {
  objMethodsClosure._i = 0;
  objMethodsClosure._k = 0;
  objMethodsClosure._m = 0;
  return objMethodsClosure.pure({
    objMethod1(k) {
      var ctx = M.generator();
      ctx._objMethodsClosure = objMethodsClosure;
      ctx._k = k;
      return ctx.scopeH(objMethod1_1, objMethod1_5);
    }

  });
}

function objMethodsClosure_2(objMethodsClosure, e) {
  return objMethodsClosure.raise(e);
}

function f_1(ctx) {
  return ctx.yldH(ctx.__this, f_2, f_5);
}

function f_2(ctx) {
  return ctx.yldH(ctx.__this, f_3, f_5);
}

function f_3(ctx) {
  var a;
  a = ctx.__args[0];
  return ctx.yldH(a, f_4, f_5);
}

function f_4(ctx) {
  return ctx.pure();
}

function f_5(ctx, e) {
  return ctx.raise(e);
}

function _f_1(ctx) {
  return ctx.yldH(ctx._i, _f_2, _f_5);
}

function _f_2(ctx) {
  return ctx.yldH(ctx.__args, _f_3, _f_5);
}

function _f_3(ctx) {
  return ctx.yldH(ctx.__this, _f_4, _f_5);
}

function _f_4(ctx) {
  return ctx.pure();
}

function _f_5(ctx, e) {
  return ctx.raise(e);
}

function f_11(ctx) {
  return ctx.yldH(ctx._i, f_21, f_51);
}

function f_21(ctx) {
  return ctx.yldH(ctx.__args, f_31, f_51);
}

function f_31(ctx) {
  var a;
  a = Object.getPrototypeOf(SomeChild.prototype)[ctx._i].call(ctx.__this, ctx._i);
  return ctx.yldStarH(a, f_41, f_51);
}

function f_41(ctx) {
  return ctx.pure();
}

function f_51(ctx, e) {
  return ctx.raise(e);
}

function f_12(ctx) {
  var a;
  a = Object.getPrototypeOf(SomeChild.prototype)[ctx._i].call(ctx.__this, ctx._i);
  return ctx.yldStarH(a, f_22, f_32);
}

function f_22(ctx) {
  return ctx.pure();
}

function f_32(ctx, e) {
  return ctx.raise(e);
}

function f_13(ctx) {
  return ctx.yldH(1, f_23, f_33);
}

function f_23(ctx) {
  return ctx.pure();
}

function f_33(ctx, e) {
  return ctx.raise(e);
}

function f_14(ctx) {
  var a;
  a = ctx._clasClosure._cnt += 2;
  return ctx.yldH(a, f_24, f_34);
}

function f_24(ctx) {
  return ctx.pure();
}

function f_34(ctx, e) {
  return ctx.raise(e);
}

function clasClosure_1(clasClosure) {
  var a;
  clasClosure._cnt = 0;
  a = clasClosure._cnt++;
  return clasClosure.yldH(a, clasClosure_2, clasClosure_7);
}

function clasClosure_2(clasClosure) {
  var a;
  a = clasClosure._B.f();
  return clasClosure.yldStarH(a, clasClosure_3, clasClosure_7);
}

function f_15(ctx) {
  var a;
  a = ctx._clasClosure._cnt += 3;
  return ctx.yldH(a, f_25, f_42);
}

function f_25(ctx) {
  var a;
  a = ctx._clasClosure._B1.f();
  return ctx.yldStarH(a, f_35, f_42);
}

function f_35(ctx) {
  return ctx.pure();
}

function f_42(ctx, e) {
  return ctx.raise(e);
}

function clasClosure_3(clasClosure) {
  var a;
  clasClosure._C = class extends clasClosure._A {
    static f() {
      var ctx = M.generator();
      ctx._clasClosure = clasClosure;
      return ctx.scopeH(f_15, f_42);
    }

  };
  a = clasClosure._cnt += 3;
  return clasClosure.yldH(a, clasClosure_4, clasClosure_7);
}

function clasClosure_4(clasClosure) {
  var a;
  a = clasClosure._C.f();
  return clasClosure.yldStarH(a, clasClosure_5, clasClosure_7);
}

function clasClosure_5(clasClosure) {
  var a;
  a = clasClosure._B1.f();
  return clasClosure.yldStarH(a, clasClosure_6, clasClosure_7);
}

function clasClosure_6(clasClosure) {
  return clasClosure.pure();
}

function clasClosure_7(clasClosure, e) {
  return clasClosure.raise(e);
}

function closure1_a_1(closure1_a) {
  closure1_a._ = closure1_a._c2._i;
  return closure1_a.yldH(`a`, closure1_a_2, closure1_a_3);
}

function closure1_a_2(closure1_a, b) {
  var a;
  a = closure1_a._c2._i = closure1_a._ + b;
  return closure1_a.pure(a);
}

function closure1_a_3(closure1_a, e) {
  return closure1_a.raise(e);
}

function _c2_1(c2) {
  c2._i = 0;
  return c2.pure(c2._closure1_b()());
}

function _c2_2(c2, e) {
  return c2.raise(e);
}

function iter_1(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f._j++}`, iter_2, iter_3);
}

function iter_2(_iter) {
  return _iter.pure();
}

function iter_3(_iter, e) {
  return _iter.raise(e);
}

function loopCapt1_1(loopCapt1) {
  for (loopCapt1._i = 0; loopCapt1._i < 3; loopCapt1._i++) {
    (i => {
      var ctx = {};
      ctx._i = i;
      ctx._j = 0;
      funs(function iter() {
        var _iter = M.generator();

        _iter._f = ctx;
        return _iter.scopeH(iter_1, iter_3);
      });
    })(loopCapt1._i);
  }

  return loopCapt1.pure();
}

function loopCapt1_2(loopCapt1, e) {
  return loopCapt1.raise(e);
}

function loopCapt2_1(loopCapt2) {
  loopCapt2._i = 0;
  return loopCapt2.jumpH(void 0, loopCapt2_2, loopCapt2_5);
}

function f_16(ctx) {
  var a;
  a = ctx._i;
  return ctx.yldH(a, f_26, f_36);
}

function _iter_1(_iter) {
  return _iter.yldH(_iter._f._j + _iter._f._i, _iter_2, _iter_3);
}

function _iter_2(_iter) {
  return _iter.pure();
}

function _iter_3(_iter, e) {
  return _iter.raise(e);
}

function f_26(ctx) {
  ctx._j = ctx._i + 1;
  funs(function iter() {
    var _iter = M.generator();

    _iter._f = ctx;
    return _iter.scopeH(_iter_1, _iter_3);
  });
  return ctx.pure();
}

function f_36(ctx, e) {
  return ctx.raise(e);
}

function loopCapt2_2(loopCapt2) {
  var a;

  if (loopCapt2._i < 3) {
    a = (i => {
      var ctx = M.generator();
      ctx._i = i;
      return ctx.scopeH(f_16, f_36);
    })(loopCapt2._i);

    return loopCapt2.yldStarH(a, loopCapt2_3, loopCapt2_5);
  } else {
    return loopCapt2.yldH('f', loopCapt2_4, loopCapt2_5);
  }
}

function loopCapt2_3(loopCapt2) {
  loopCapt2._i++;
  return loopCapt2.jumpRH(void 0, loopCapt2_2, loopCapt2_5);
}

function loopCapt2_4(loopCapt2) {
  return loopCapt2.pure();
}

function loopCapt2_5(loopCapt2, e) {
  return loopCapt2.raise(e);
}

function loopCapt3_1(loopCapt3) {
  loopCapt3._i = 0;
  return loopCapt3.jumpH(void 0, loopCapt3_2, loopCapt3_4);
}

function f_18(ctx) {
  var a;
  a = ctx._i;
  return ctx.yldH(a, f_28, f_52);
}

function f_28(ctx) {
  ctx._j = 0;
  return ctx.jumpH(void 0, f_38, f_52);
}

function f_17(_ctx) {
  var a;
  a = _ctx._j;
  return _ctx.yldH(a, f_27, f_37);
}

function iter_11(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, iter_21, iter_31);
}

function iter_21(_iter) {
  return _iter.pure();
}

function iter_31(_iter, e) {
  return _iter.raise(e);
}

function f_27(_ctx) {
  funs(function iter() {
    var _iter = M.generator();

    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return _iter.scopeH(iter_11, iter_31);
  });
  return _ctx.pure();
}

function f_37(_ctx, e) {
  return _ctx.raise(e);
}

function f_38(ctx) {
  var a;

  if (ctx._j < 3) {
    a = (j => {
      var _ctx = M.generator();

      _ctx._f = ctx;
      _ctx._j = j;
      return _ctx.scopeH(f_17, f_37);
    })(ctx._j);

    return ctx.yldStarH(a, f_43, f_52);
  } else {
    return ctx.pure();
  }
}

function f_43(ctx) {
  ctx._j++;
  return ctx.jumpRH(void 0, f_38, f_52);
}

function f_52(ctx, e) {
  return ctx.raise(e);
}

function loopCapt3_2(loopCapt3) {
  var a;

  if (loopCapt3._i < 3) {
    a = (i => {
      var ctx = M.generator();
      ctx._i = i;
      return ctx.scopeH(f_18, f_52);
    })(loopCapt3._i);

    return loopCapt3.yldStarH(a, loopCapt3_3, loopCapt3_4);
  } else {
    return loopCapt3.pure();
  }
}

function loopCapt3_3(loopCapt3) {
  loopCapt3._i++;
  return loopCapt3.jumpRH(void 0, loopCapt3_2, loopCapt3_4);
}

function loopCapt3_4(loopCapt3, e) {
  return loopCapt3.raise(e);
}

function iter_12(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, iter_22, iter_32);
}

function iter_22(_iter) {
  return _iter.pure();
}

function iter_32(_iter, e) {
  return _iter.raise(e);
}

function loopCapt4_1(loopCapt4) {
  for (loopCapt4._i = 0; loopCapt4._i < 3; loopCapt4._i++) {
    (i => {
      var j,
          ctx = {};
      ctx._i = i;

      for (j = 0; j < 3; j++) {
        (j => {
          var _ctx = {},
              f = ctx;
          _ctx._j = j;
          funs(function iter() {
            var _iter = M.generator();

            _iter._f = f;
            _iter._f1 = _ctx;
            return _iter.scopeH(iter_12, iter_32);
          });
        })(j);
      }
    })(loopCapt4._i);
  }

  return loopCapt4.pure();
}

function loopCapt4_2(loopCapt4, e) {
  return loopCapt4.raise(e);
}

function iter_13(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f._j++}`, iter_23, iter_33);
}

function iter_23(_iter) {
  return _iter.pure();
}

function iter_33(_iter, e) {
  return _iter.raise(e);
}

function forOfCapt1_1(forOfCapt1) {
  for (forOfCapt1._i of a) {
    (i => {
      var ctx = {};
      ctx._i = i;
      ctx._j = 0;
      funs(function iter() {
        var _iter = M.generator();

        _iter._f = ctx;
        return _iter.scopeH(iter_13, iter_33);
      });
    })(forOfCapt1._i);
  }

  return forOfCapt1.pure();
}

function forOfCapt1_2(forOfCapt1, e) {
  return forOfCapt1.raise(e);
}

function forOfCapt2_1(forOfCapt2) {
  forOfCapt2._loop = forOfCapt2.iterator(a);
  return forOfCapt2.jumpH(void 0, forOfCapt2_2, forOfCapt2_7);
}

function f_19(ctx) {
  var a;
  ctx._j = 0;
  a = ctx._i;
  return ctx.yldH(a, f_29, f_39);
}

function iter_14(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f._j++}`, iter_24, iter_34);
}

function iter_24(_iter) {
  return _iter.pure();
}

function iter_34(_iter, e) {
  return _iter.raise(e);
}

function f_29(ctx) {
  funs(function iter() {
    var _iter = M.generator();

    _iter._f = ctx;
    return _iter.scopeH(iter_14, iter_34);
  });
  return ctx.pure();
}

function f_39(ctx, e) {
  return ctx.raise(e);
}

function forOfCapt2_2(forOfCapt2) {
  var a;

  if (!(forOfCapt2._loop = forOfCapt2._loop.step()).done) {
    forOfCapt2._i = forOfCapt2._loop.value;

    a = (i => {
      var ctx = M.generator();
      ctx._i = i;
      return ctx.scopeH(f_19, f_39);
    })(forOfCapt2._i);

    return forOfCapt2.yldStarH(a, forOfCapt2_2, forOfCapt2_7);
  } else {
    forOfCapt2._fc = forOfCapt2_4, forOfCapt2._fe = forOfCapt2_5;
    return forOfCapt2.jumpH(void 0, forOfCapt2_3, forOfCapt2_5);
  }
}

function forOfCapt2_3(forOfCapt2) {
  if (forOfCapt2._loop.exit) {
    forOfCapt2._loop.exit();
  }

  return forOfCapt2.jumpH(void 0, forOfCapt2._fc, forOfCapt2._fe);
}

function forOfCapt2_4(forOfCapt2) {
  return forOfCapt2.pure();
}

function forOfCapt2_5(forOfCapt2, e) {
  return forOfCapt2.raise(e);
}

function forOfCapt2_6(forOfCapt2) {
  return forOfCapt2.raise(forOfCapt2._err1);
}

function forOfCapt2_7(forOfCapt2, a) {
  forOfCapt2._fc = forOfCapt2_6, forOfCapt2._fe = forOfCapt2_5, forOfCapt2._err1 = a;
  return forOfCapt2.jumpH(void 0, forOfCapt2_3, forOfCapt2_5);
}

function iter_15(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, iter_25, iter_35);
}

function iter_25(_iter) {
  return _iter.pure();
}

function iter_35(_iter, e) {
  return _iter.raise(e);
}

function forOfCapt3_1(forOfCapt3) {
  for (forOfCapt3._i of a) {
    (i => {
      var j,
          ctx = {};
      ctx._i = i;

      for (j of b) {
        (j => {
          var _ctx = {},
              f = ctx;
          _ctx._j = j;
          funs(function iter() {
            var _iter = M.generator();

            _iter._f = f;
            _iter._f1 = _ctx;
            return _iter.scopeH(iter_15, iter_35);
          });
        })(j);
      }
    })(forOfCapt3._i);
  }

  return forOfCapt3.pure();
}

function forOfCapt3_2(forOfCapt3, e) {
  return forOfCapt3.raise(e);
}

function forOfCapt4_1(forOfCapt4) {
  forOfCapt4._loop = forOfCapt4.iterator(a);
  return forOfCapt4.jumpH(void 0, forOfCapt4_2, forOfCapt4_7);
}

function f_111(ctx) {
  ctx._loop = ctx.iterator(b);
  return ctx.jumpH(void 0, f_211, f_7);
}

function f_110(_ctx) {
  var a;
  a = _ctx._j;
  return _ctx.yldH(a, f_210, f_310);
}

function iter_16(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, iter_26, iter_36);
}

function iter_26(_iter) {
  return _iter.pure();
}

function iter_36(_iter, e) {
  return _iter.raise(e);
}

function f_210(_ctx) {
  funs(function iter() {
    var _iter = M.generator();

    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return _iter.scopeH(iter_16, iter_36);
  });
  return _ctx.pure();
}

function f_310(_ctx, e) {
  return _ctx.raise(e);
}

function f_211(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.generator();

      _ctx._f = ctx;
      _ctx._j = j;
      return _ctx.scopeH(f_110, f_310);
    })(ctx._j);

    return ctx.yldStarH(a, f_211, f_7);
  } else {
    ctx._fc = f_44, ctx._fe = f_53;
    return ctx.jumpH(void 0, f_311, f_53);
  }
}

function f_311(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return ctx.jumpH(void 0, ctx._fc, ctx._fe);
}

function f_44(ctx) {
  return ctx.pure();
}

function f_53(ctx, e) {
  return ctx.raise(e);
}

function f_6(ctx) {
  return ctx.raise(ctx._err1);
}

function f_7(ctx, a) {
  ctx._fc = f_6, ctx._fe = f_53, ctx._err1 = a;
  return ctx.jumpH(void 0, f_311, f_53);
}

function forOfCapt4_2(forOfCapt4) {
  var a;

  if (!(forOfCapt4._loop = forOfCapt4._loop.step()).done) {
    forOfCapt4._i = forOfCapt4._loop.value;

    a = (i => {
      var ctx = M.generator();
      ctx._i = i;
      return ctx.scopeH(f_111, f_53);
    })(forOfCapt4._i);

    return forOfCapt4.yldStarH(a, forOfCapt4_2, forOfCapt4_7);
  } else {
    forOfCapt4._fc = forOfCapt4_4, forOfCapt4._fe = forOfCapt4_5;
    return forOfCapt4.jumpH(void 0, forOfCapt4_3, forOfCapt4_5);
  }
}

function forOfCapt4_3(forOfCapt4) {
  if (forOfCapt4._loop.exit) {
    forOfCapt4._loop.exit();
  }

  return forOfCapt4.jumpH(void 0, forOfCapt4._fc, forOfCapt4._fe);
}

function forOfCapt4_4(forOfCapt4) {
  return forOfCapt4.pure();
}

function forOfCapt4_5(forOfCapt4, e) {
  return forOfCapt4.raise(e);
}

function forOfCapt4_6(forOfCapt4) {
  return forOfCapt4.raise(forOfCapt4._err1);
}

function forOfCapt4_7(forOfCapt4, a) {
  forOfCapt4._fc = forOfCapt4_6, forOfCapt4._fe = forOfCapt4_5, forOfCapt4._err1 = a;
  return forOfCapt4.jumpH(void 0, forOfCapt4_3, forOfCapt4_5);
}

function forOfCapt5_1(forOfCapt5) {
  forOfCapt5._loop = forOfCapt5.iterator(a);
  return forOfCapt5.jumpH(void 0, forOfCapt5_2, forOfCapt5_7);
}

function f_112(ctx) {
  var a;
  a = ctx._i;
  return ctx.yldH(a, f_212, f_312);
}

function iter_17(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, iter_27, iter_37);
}

function iter_27(_iter) {
  return _iter.pure();
}

function iter_37(_iter, e) {
  return _iter.raise(e);
}

function f_212(ctx) {
  for (ctx._j of b) {
    (j => {
      var _ctx = {},
          f = ctx;
      _ctx._j = j;
      funs(function iter() {
        var _iter = M.generator();

        _iter._f = f;
        _iter._f1 = _ctx;
        return _iter.scopeH(iter_17, iter_37);
      });
    })(ctx._j);
  }

  return ctx.pure();
}

function f_312(ctx, e) {
  return ctx.raise(e);
}

function forOfCapt5_2(forOfCapt5) {
  var a;

  if (!(forOfCapt5._loop = forOfCapt5._loop.step()).done) {
    forOfCapt5._i = forOfCapt5._loop.value;

    a = (i => {
      var ctx = M.generator();
      ctx._i = i;
      return ctx.scopeH(f_112, f_312);
    })(forOfCapt5._i);

    return forOfCapt5.yldStarH(a, forOfCapt5_2, forOfCapt5_7);
  } else {
    forOfCapt5._fc = forOfCapt5_4, forOfCapt5._fe = forOfCapt5_5;
    return forOfCapt5.jumpH(void 0, forOfCapt5_3, forOfCapt5_5);
  }
}

function forOfCapt5_3(forOfCapt5) {
  if (forOfCapt5._loop.exit) {
    forOfCapt5._loop.exit();
  }

  return forOfCapt5.jumpH(void 0, forOfCapt5._fc, forOfCapt5._fe);
}

function forOfCapt5_4(forOfCapt5) {
  return forOfCapt5.pure();
}

function forOfCapt5_5(forOfCapt5, e) {
  return forOfCapt5.raise(e);
}

function forOfCapt5_6(forOfCapt5) {
  return forOfCapt5.raise(forOfCapt5._err1);
}

function forOfCapt5_7(forOfCapt5, a) {
  forOfCapt5._fc = forOfCapt5_6, forOfCapt5._fe = forOfCapt5_5, forOfCapt5._err1 = a;
  return forOfCapt5.jumpH(void 0, forOfCapt5_3, forOfCapt5_5);
}

function forOfCapt6_1(forOfCapt6) {
  forOfCapt6._loop = forOfCapt6.iterator(a);
  return forOfCapt6.jumpH(void 0, forOfCapt6_2, forOfCapt6_7);
}

function f_114(ctx) {
  var a;
  a = ctx._i;
  return ctx.yldH(a, f_214, _f_6);
}

function f_214(ctx) {
  ctx._loop = ctx.iterator(b);
  return ctx.jumpH(void 0, f_314, f_8);
}

function f_113(_ctx) {
  var a;
  a = _ctx._f._i;
  return _ctx.yldH(a, f_213, f_313);
}

function iter_18(_iter) {
  return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, iter_28, iter_38);
}

function iter_28(_iter) {
  return _iter.pure();
}

function iter_38(_iter, e) {
  return _iter.raise(e);
}

function f_213(_ctx) {
  funs(function iter() {
    var _iter = M.generator();

    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return _iter.scopeH(iter_18, iter_38);
  });
  return _ctx.pure();
}

function f_313(_ctx, e) {
  return _ctx.raise(e);
}

function f_314(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.generator();

      _ctx._f = ctx;
      _ctx._j = j;
      return _ctx.scopeH(f_113, f_313);
    })(ctx._j);

    return ctx.yldStarH(a, f_314, f_8);
  } else {
    ctx._fc = f_54, ctx._fe = _f_6;
    return ctx.jumpH(void 0, f_45, _f_6);
  }
}

function f_45(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return ctx.jumpH(void 0, ctx._fc, ctx._fe);
}

function f_54(ctx) {
  return ctx.pure();
}

function _f_6(ctx, e) {
  return ctx.raise(e);
}

function _f_7(ctx) {
  return ctx.raise(ctx._err1);
}

function f_8(ctx, a) {
  ctx._fc = _f_7, ctx._fe = _f_6, ctx._err1 = a;
  return ctx.jumpH(void 0, f_45, _f_6);
}

function forOfCapt6_2(forOfCapt6) {
  var a;

  if (!(forOfCapt6._loop = forOfCapt6._loop.step()).done) {
    forOfCapt6._i = forOfCapt6._loop.value;

    a = (i => {
      var ctx = M.generator();
      ctx._i = i;
      return ctx.scopeH(f_114, _f_6);
    })(forOfCapt6._i);

    return forOfCapt6.yldStarH(a, forOfCapt6_2, forOfCapt6_7);
  } else {
    forOfCapt6._fc = forOfCapt6_4, forOfCapt6._fe = forOfCapt6_5;
    return forOfCapt6.jumpH(void 0, forOfCapt6_3, forOfCapt6_5);
  }
}

function forOfCapt6_3(forOfCapt6) {
  if (forOfCapt6._loop.exit) {
    forOfCapt6._loop.exit();
  }

  return forOfCapt6.jumpH(void 0, forOfCapt6._fc, forOfCapt6._fe);
}

function forOfCapt6_4(forOfCapt6) {
  return forOfCapt6.pure();
}

function forOfCapt6_5(forOfCapt6, e) {
  return forOfCapt6.raise(e);
}

function forOfCapt6_6(forOfCapt6) {
  return forOfCapt6.raise(forOfCapt6._err1);
}

function forOfCapt6_7(forOfCapt6, a) {
  forOfCapt6._fc = forOfCapt6_6, forOfCapt6._fe = forOfCapt6_5, forOfCapt6._err1 = a;
  return forOfCapt6.jumpH(void 0, forOfCapt6_3, forOfCapt6_5);
}

function forIn_1(forIn) {
  forIn._loop = forIn.forInIterator({
    a: 1
  });
  return forIn.jumpH(void 0, forIn_2, forIn_3);
}

function forIn_2(forIn) {
  if (!(forIn._loop = forIn._loop.step()).done) {
    forIn._i = forIn._loop.value;
    return forIn.yldH(forIn._i, forIn_2, forIn_3);
  } else {
    return forIn.pure();
  }
}

function forIn_3(forIn, e) {
  return forIn.raise(e);
}

function while1_1(while1) {
  while1._i = 0;
  return while1.jumpH(void 0, while1_2, while1_4);
}

function while1_2(while1) {
  var a;
  a = while1._i++;
  return while1.yldH(a, while1_3, while1_4);
}

function while1_3(while1, a) {
  var b;

  if (a < 3) {
    b = while1._i++;
    return while1.yldH(b, while1_2, while1_4);
  } else {
    while1._i = 0;
    return while1.pure();
  }
}

function while1_4(while1, e) {
  return while1.raise(e);
}

function catchBlock2_1(catchBlock2) {
  catchBlock2._i = 0;
  return catchBlock2.jumpH(void 0, catchBlock2_2, catchBlock2_9);
}

function catchBlock2_2(catchBlock2) {
  return catchBlock2.yldH(catchBlock2._i === 3, catchBlock2_3, catchBlock2_9);
}

function catchBlock2_3(catchBlock2, a) {
  if (a) {
    throw new Error(`AAAAAAAAA${catchBlock2._i++}`);
  }

  return catchBlock2.yldH(`a${catchBlock2._i}`, catchBlock2_7, catchBlock2_8);
}

function catchBlock2_4(catchBlock2) {
  catchBlock2._e = catchBlock2._ex;
  return catchBlock2.yldH(`e${catchBlock2._i}`, catchBlock2_5, catchBlock2_8);
}

function catchBlock2_5(catchBlock2) {
  return catchBlock2.yldH(catchBlock2._e, catchBlock2_6, catchBlock2_8);
}

function catchBlock2_6(catchBlock2) {
  return catchBlock2.pure(catchBlock2._i);
}

function catchBlock2_7(catchBlock2) {
  catchBlock2._i++;
  return catchBlock2.jumpRH(void 0, catchBlock2_2, catchBlock2_9);
}

function catchBlock2_8(catchBlock2, e) {
  return catchBlock2.raise(e);
}

function catchBlock2_9(catchBlock2, a) {
  catchBlock2._ex = a;
  return catchBlock2.jumpH(void 0, catchBlock2_4, catchBlock2_8);
}

function closure2_1(closure2) {
  closure2._k = 0;
  closure2._j = 1;
  closure2._m = 0;
  return closure2.yldH(closure2._k++ + closure2._j + closure2._m++, closure2_2, closure2_4);
}

function closure2_2(closure2) {
  var a;
  a = closure2._m++;
  return closure2.yldH(a, closure2_3, closure2_4);
}

function sub_1(_sub) {
  var a;
  a = _sub._k++;
  return _sub.yldH(a, sub_2, sub_3);
}

function sub_2(_sub, a) {
  var b;
  b = _sub._closure2._j;
  a, b;
  return _sub.pure();
}

function sub_3(_sub, e) {
  return _sub.raise(e);
}

function closure2_3(closure2) {
  return closure2.pure(function sub(k) {
    var _sub = M.generator();

    _sub._closure2 = closure2;
    _sub._k = k;
    return _sub.scopeH(sub_1, sub_3);
  });
}

function closure2_4(closure2, e) {
  return closure2.raise(e);
}

function switches_1(switches) {
  if (a) {
    return switches.yldH(1, switches_2, switches_39);
  } else {
    return switches.jumpH(void 0, switches_2, switches_39);
  }
}

function switches_2(switches) {
  switch (a) {
    case 1:
      return switches.yldH(2, switches_3, switches_39);

    case 2:
      {
        console.log(3);
      }

    default:
      return switches.jumpH(void 0, switches_4, switches_39);
  }
}

function switches_3(switches) {
  return switches.yldH(3, switches_4, switches_39);
}

function switches_4(switches) {
  console.log(4);

  f1: for (switches._i = 0;; switches._i++) {
    switch (switches._i) {
      case 3:
        {
          break f1;
        }
    }
  }

  switches._i1 = 0;
  return switches.jumpH(void 0, switches_5, switches_39);
}

function switches_5(switches) {
  switch (switches._i1) {
    case 3:
      l1: for (switches._i2 of gen()) {
        switch (switches._i2) {
          case 3:
            {
              break l1;
            }
        }
      }

      switches._loop = switches.iterator(gen());
      return switches.jumpH(void 0, switches_7, switches_48);

    default:
      return switches.yldH(`f2-${switches._i1}`, switches_6, switches_39);
  }
}

function switches_6(switches) {
  switches._i1++;
  return switches.jumpRH(void 0, switches_5, switches_39);
}

function switches_7(switches) {
  if (!(switches._loop = switches._loop.step()).done) {
    switches._i3 = switches._loop.value;

    switch (switches._i3) {
      case 3:
        return switches.yldH(`l2-${switches._i3}`, switches_8, switches_48);

      default:
        return switches.jumpRH(void 0, switches_7, switches_48);
    }
  } else {
    switches._fc = switches_10, switches._fe = switches_39;
    return switches.jumpH(void 0, switches_9, switches_39);
  }
}

function switches_8(switches) {
  switches._fc = switches_10, switches._fe = switches_39;
  return switches.jumpH(void 0, switches_9, switches_39);
}

function switches_9(switches) {
  if (switches._loop.exit) {
    switches._loop.exit();
  }

  return switches.jumpH(void 0, switches._fc, switches._fe);
}

function switches_10(switches) {
  switches._loop1 = switches.iterator(gen());
  return switches.jumpH(void 0, switches_11, switches_49);
}

function switches_11(switches) {
  if (!(switches._loop1 = switches._loop1.step()).done) {
    switches._i4 = switches._loop1.value;

    switch (switches._i4) {
      case 3:
        switches._fc1 = switches_13, switches._fe1 = switches_39;
        return switches.jumpH(void 0, switches_12, switches_39);

      default:
        return switches.yldH(`l3-${switches._i4}`, switches_11, switches_49);
    }
  } else {
    switches._fc1 = switches_13, switches._fe1 = switches_39;
    return switches.jumpH(void 0, switches_12, switches_39);
  }
}

function switches_12(switches) {
  if (switches._loop1.exit) {
    switches._loop1.exit();
  }

  return switches.jumpH(void 0, switches._fc1, switches._fe1);
}

function switches_13(switches) {
  switches._loop2 = switches.iterator(gen());
  return switches.jumpH(void 0, switches_14, switches_50);
}

function switches_14(switches) {
  if (!(switches._loop2 = switches._loop2.step()).done) {
    switches._i5 = switches._loop2.value;

    switch (switches._i5) {
      case 3:
        switches._fc2 = switches_16, switches._fe2 = switches_39;
        return switches.jumpH(void 0, switches_15, switches_39);

      default:
        return switches.yldH(`l4-${switches._i5}`, switches_14, switches_50);
    }
  } else {
    switches._fc2 = switches_16, switches._fe2 = switches_39;
    return switches.jumpH(void 0, switches_15, switches_39);
  }
}

function switches_15(switches) {
  if (switches._loop2.exit) {
    switches._loop2.exit();
  }

  return switches.jumpH(void 0, switches._fc2, switches._fe2);
}

function switches_16(switches) {
  switches._loop3 = switches.iterator(gen());
  return switches.jumpH(void 0, switches_17, switches_51);
}

function switches_17(switches) {
  if (!(switches._loop3 = switches._loop3.step()).done) {
    switches._i6 = switches._loop3.value;
    return switches.yldH(`l5-${switches._i6}`, switches_18, switches_51);
  } else {
    switches._fc3 = switches_20, switches._fe3 = switches_39;
    return switches.jumpH(void 0, switches_19, switches_39);
  }
}

function switches_18(switches) {
  switch (switches._i6) {
    case 3:
      switches._fc3 = switches_20, switches._fe3 = switches_39;
      return switches.jumpH(void 0, switches_19, switches_39);

    default:
      return switches.jumpRH(void 0, switches_17, switches_51);
  }
}

function switches_19(switches) {
  if (switches._loop3.exit) {
    switches._loop3.exit();
  }

  return switches.jumpH(void 0, switches._fc3, switches._fe3);
}

function switches_20(switches) {
  switches._loop4 = switches.iterator(gen());
  return switches.jumpH(void 0, switches_21, switches_52);
}

function switches_21(switches) {
  if (!(switches._loop4 = switches._loop4.step()).done) {
    switches._i7 = switches._loop4.value;

    switch (switches._i7) {
      case 3:
        return switches.yldH(`l6-1-${switches._i7}`, switches_22, switches_52);

      default:
        return switches.yldH(`l6-2-${switches._i7}`, switches_21, switches_52);
    }
  } else {
    switches._fc4 = switches_24, switches._fe4 = switches_39;
    return switches.jumpH(void 0, switches_23, switches_39);
  }
}

function switches_22(switches) {
  switches._fc4 = switches_24, switches._fe4 = switches_39;
  return switches.jumpH(void 0, switches_23, switches_39);
}

function switches_23(switches) {
  if (switches._loop4.exit) {
    switches._loop4.exit();
  }

  return switches.jumpH(void 0, switches._fc4, switches._fe4);
}

function switches_24(switches) {
  switches._loop5 = switches.iterator(gen());
  return switches.jumpH(void 0, switches_25, switches_53);
}

function switches_25(switches) {
  if (!(switches._loop5 = switches._loop5.step()).done) {
    switches._i8 = switches._loop5.value;

    switch (switches._i8) {
      case 0:
        return switches.jumpRH(void 0, switches_25, switches_53);

      case 1:
      case 2:
        return switches.yldH(`l7-1-${switches._i8}`, switches_25, switches_53);

      case 3:
        return switches.jumpRH(void 0, switches_25, switches_53);

      case 4:
        return switches.yldH(`l7-2-${switches._i8}`, switches_25, switches_53);

      case 5:
        return switches.yldH(`l7-3-${switches._i8}`, switches_27, switches_53);

      case 6:
        return switches.jumpRH(void 0, switches_25, switches_53);

      case 7:
        return switches.yldH(`l7-4-${switches._i8}`, switches_26, switches_53);

      default:
        return switches.yldH(`l7-5-${switches._i8}`, switches_27, switches_53);
    }
  } else {
    switches._fc5 = switches_29, switches._fe5 = switches_39;
    return switches.jumpH(void 0, switches_28, switches_39);
  }
}

function switches_26(switches) {
  switches._fc5 = switches_29, switches._fe5 = switches_39;
  return switches.jumpH(void 0, switches_28, switches_39);
}

function switches_27(switches) {
  return switches.yldH(`l7-6-${switches._i8}`, switches_25, switches_53);
}

function switches_28(switches) {
  if (switches._loop5.exit) {
    switches._loop5.exit();
  }

  return switches.jumpH(void 0, switches._fc5, switches._fe5);
}

function switches_29(switches) {
  switches._loop6 = switches.iterator(gen());
  return switches.jumpH(void 0, switches_30, switches_54);
}

function switches_30(switches) {
  if (!(switches._loop6 = switches._loop6.step()).done) {
    switches._i9 = switches._loop6.value;
    switches._loop7 = switches.iterator(gen());
    return switches.jumpRH(void 0, switches_31, switches_55);
  } else {
    switches._fc7 = switches_38, switches._fe7 = switches_39;
    return switches.jumpH(void 0, switches_37, switches_39);
  }
}

function switches_31(switches) {
  if (!(switches._loop7 = switches._loop7.step()).done) {
    switches._j = switches._loop7.value;

    switch (switches._i9) {
      case 0:
      case 1:
      case 2:
        return switches.yldH(`s1:${switches._i9},${switches._j}`, switches_32, switches_55);

      case 3:
        switch (switches._j) {
          case 2:
          case 3:
            return switches.yldH(`s2:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 5:
            return switches.yldH(`s3:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 7:
            return switches.yldH(`s4:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 8:
            return switches.yldH(`s5:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 9:
            return switches.yldH(`s6:${switches._i9},${switches._j}`, switches_33, switches_55);

          default:
            return switches.jumpRH(void 0, switches_31, switches_55);
        }

      case 4:
        switch (switches._j) {
          case 2:
          case 3:
            return switches.yldH(`s7:${switches._i9},${switches._j}`, switches_35, switches_55);

          case 5:
            return switches.yldH(`s8:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 6:
            switches._fc6 = switches_30, switches._fe6 = switches_54;
            return switches.jumpH(void 0, switches_36, switches_54);

          case 7:
            return switches.yldH(`s9:${switches._i9},${switches._j}`, switches_35, switches_55);

          case 8:
            return switches.yldH(`s10:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 9:
            return switches.yldH(`s11:${switches._i9},${switches._j}`, switches_34, switches_55);

          default:
            return switches.yldH(`s12:${switches._i9},${switches._j}`, switches_35, switches_55);
        }

      case 5:
        switch (switches._j) {
          case 2:
          case 3:
            switches._fc6 = switches_37, switches._fe6 = switches_39, switches._fc7 = switches_38, switches._fe7 = switches_39;
            return switches.jumpH(void 0, switches_36, switches_54);

          default:
            return switches.jumpRH(void 0, switches_31, switches_55);
        }

      default:
        return switches.jumpRH(void 0, switches_31, switches_55);
    }
  } else {
    switches._fc6 = switches_30, switches._fe6 = switches_54;
    return switches.jumpH(void 0, switches_36, switches_54);
  }
}

function switches_32(switches) {
  if (switches._j > 3) {
    switches._fc6 = switches_30, switches._fe6 = switches_54;
    return switches.jumpH(void 0, switches_36, switches_54);
  } else {
    return switches.jumpRH(void 0, switches_31, switches_55);
  }
}

function switches_33(switches) {
  switches._fc6 = switches_30, switches._fe6 = switches_54;
  return switches.jumpH(void 0, switches_36, switches_54);
}

function switches_34(switches) {
  switches._fc6 = switches_37, switches._fe6 = switches_39, switches._fc7 = switches_38, switches._fe7 = switches_39;
  return switches.jumpH(void 0, switches_36, switches_54);
}

function switches_35(switches) {
  return switches.yldH(`s13:${switches._i9},${switches._j}`, switches_31, switches_55);
}

function switches_36(switches) {
  if (switches._loop7.exit) {
    switches._loop7.exit();
  }

  switches._err7 = switches._err8;
  return switches.jumpH(void 0, switches._fc6, switches._fe6);
}

function switches_37(switches) {
  if (switches._loop6.exit) {
    switches._loop6.exit();
  }

  return switches.jumpH(void 0, switches._fc7, switches._fe7);
}

function switches_38(switches) {
  return switches.pure();
}

function switches_39(switches, e) {
  return switches.raise(e);
}

function switches_40(switches) {
  return switches.raise(switches._err1);
}

function switches_41(switches) {
  return switches.raise(switches._err2);
}

function switches_42(switches) {
  return switches.raise(switches._err3);
}

function switches_43(switches) {
  return switches.raise(switches._err4);
}

function switches_44(switches) {
  return switches.raise(switches._err5);
}

function switches_45(switches) {
  return switches.raise(switches._err6);
}

function switches_46(switches) {
  return switches.raise(switches._err7);
}

function switches_47(switches) {
  return switches.raise(switches._err8);
}

function switches_48(switches, a) {
  switches._fc = switches_40, switches._fe = switches_39, switches._err1 = a;
  return switches.jumpH(void 0, switches_9, switches_39);
}

function switches_49(switches, a) {
  switches._fc1 = switches_41, switches._fe1 = switches_39, switches._err2 = a;
  return switches.jumpH(void 0, switches_12, switches_39);
}

function switches_50(switches, a) {
  switches._fc2 = switches_42, switches._fe2 = switches_39, switches._err3 = a;
  return switches.jumpH(void 0, switches_15, switches_39);
}

function switches_51(switches, a) {
  switches._fc3 = switches_43, switches._fe3 = switches_39, switches._err4 = a;
  return switches.jumpH(void 0, switches_19, switches_39);
}

function switches_52(switches, a) {
  switches._fc4 = switches_44, switches._fe4 = switches_39, switches._err5 = a;
  return switches.jumpH(void 0, switches_23, switches_39);
}

function switches_53(switches, a) {
  switches._fc5 = switches_45, switches._fe5 = switches_39, switches._err6 = a;
  return switches.jumpH(void 0, switches_28, switches_39);
}

function switches_54(switches, a) {
  switches._fc7 = switches_46, switches._fe7 = switches_39, switches._err7 = a;
  return switches.jumpH(void 0, switches_37, switches_39);
}

function switches_55(switches, a) {
  switches._fc6 = switches_37, switches._fe6 = switches_39, switches._fc7 = switches_47, switches._fe7 = switches_39, switches._err8 = a;
  return switches.jumpH(void 0, switches_36, switches_54);
}