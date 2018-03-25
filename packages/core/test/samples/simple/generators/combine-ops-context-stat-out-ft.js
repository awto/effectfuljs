import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return a.scope(a_1);
}

function a1() {
  var a1 = M.context();
  return a1.scope(a1_1);
}

function a3() {
  var a3 = M.context();
  return a3.scope(a3_1);
}

function a2() {
  var a2 = M.context();
  return a2.scope(a2_1);
}

function a() {
  var a = M.context();
  return a.scope(_a_1);
}

function d(i) {
  var d = M.context();
  d._i = i;
  return d.scope(d_1);
}

function d2(i) {
  var d2 = M.context();
  d2._i = i;
  return d2.scope(d2_1);
}

function a4() {
  var a4 = M.context();
  return a4.scope(a4_1);
}

function a5() {
  var a5 = M.context();
  return a5.scope(a5_1);
}

function a6() {
  var a6 = M.context();
  return a6.scope(a6_1);
}

function a1() {
  var a1 = M.context();
  return a1.scope(_a1_1);
}

function a2() {
  var a2 = M.context();
  return a2.scope(_a2_1);
}

function a3() {
  var a3 = M.context();
  return a3.scope(_a3_1);
}

function a6() {
  var a6 = M.context();
  return a6.scope(_a6_1);
}

function a7() {
  var a7 = M.context();
  return a7.scope(_a7_1);
}

function a7_1() {
  var a7_1 = M.context();
  return a7_1.scope(a7_1_1);
}

function a7_2() {
  var a7_2 = M.context();
  return a7_2.scope(a7_2_1);
}

function a7_3() {
  var a7_3 = M.context();
  return a7_3.scope(a7_3_1);
}

function a7_4() {
  var a7_4 = M.context();
  return a7_4.scope(a7_4_1);
}

function a7_5() {
  var a7_5 = M.context();
  return a7_5.scope(a7_5_1);
}

function a7_6() {
  var a7_6 = M.context();
  return a7_6.scope(a7_6_1);
}

function finallyBlock1() {
  var finallyBlock1 = M.context();
  return finallyBlock1.scope(finallyBlock1_1);
}

function ae() {
  var ae = M.context();
  return ae.scope(ae_1);
}

function cfb() {
  var cfb = M.context();
  return cfb.scope(cfb_1);
}

function cfb1() {
  var cfb1 = M.context();
  return cfb1.scope(cfb1_1);
}

function cfb1() {
  var cfb1 = M.context();
  return cfb1.scope(_cfb1_1);
}

function cfb2() {
  var cfb2 = M.context();
  return cfb2.scope(cfb2_1);
}

function cfb3() {
  var cfb3 = M.context();
  return cfb3.scope(cfb3_1);
}

function cfb4() {
  var cfb4 = M.context();
  return cfb4.scope(cfb4_1, cfb4_4);
}

function cfb2() {
  var cfb2 = M.context();
  return cfb2.scope(_cfb2_1);
}

function cfb6() {
  var cfb6 = M.context();
  return cfb6.scope(cfb6_1, cfb6_8);
}

function fb4() {
  var fb4 = M.context();
  return fb4.scope(fb4_1);
}

function while2() {
  var while2 = M.context();
  return while2.scope(while2_1);
}

function for2() {
  var for2 = M.context();
  return for2.scope(for2_1);
}

function c1() {
  var a = function _a() {
    var a = M.context();

    a._b = function _b() {
      var b = M.context();
      b._c1 = a._c1;
      return b.scope(b_1);
    };

    a._c1 = c1;
    return a.scope(a_11);
  },
      c1 = {};

  c1._i = 0;
}

function c2() {
  var inner = function _inner() {
    var inner = M.context();

    inner._a = function _a() {
      var a = M.context();
      a._c2 = inner._c2;
      return a.scope(a_12);
    };

    inner._c2 = c2;
    return inner.scope(inner_1);
  },
      c2 = {};

  c2._i = 0;
  return inner;
}

function c1() {
  var c1 = M.context();
  return c1.scope(c1_1);
}

function c2() {
  var c2 = M.context();
  return c2.scope(c2_1);
}

function forOf() {
  var forOf = M.context();
  return forOf.scope(forOf_1);
}

const objMethods = {
  a() {
    var ctx = M.context();
    return ctx.scope(a_13);
  },

  b() {
    var ctx = M.context();
    ctx.__this = this;
    ctx.__args = arguments;
    return ctx.scope(_b_1);
  }

};
const objM = {
  objMethod() {
    var ctx = M.context();
    return ctx.scope(objMethod_1);
  }

};

function objMethodsClosure() {
  var objMethodsClosure = M.context();
  return objMethodsClosure.scope(objMethodsClosure_1);
}

const objMThis = {
  [objMethod(a)]() {
    var ctx = M.context();
    ctx.__this = this;
    ctx.__args = arguments;
    return ctx.scope(f_1);
  }

};

class SomeClass {
  f(i) {
    var ctx = M.context();
    ctx.__this = this;
    ctx.__args = arguments;
    ctx._i = i;
    return ctx.scope(_f_1);
  }

}

class SomeChild extends SomeClass {
  f(i) {
    var ctx = M.context();
    ctx.__this = this;
    ctx.__args = arguments;
    ctx._i = i;
    return ctx.scope(f_11);
  }

  static f(i) {
    var ctx = M.context();
    ctx.__this = this;
    ctx._i = i;
    return ctx.scope(f_12);
  }

}

function clasClosure(A) {
  var clasClosure = M.context();
  clasClosure._B = class B extends clasClosure._A {
    constructor() {
      var _clasClosure = clasClosure;
      _clasClosure._cnt++;
    }

    static f() {
      var ctx = M.context();
      return ctx.scope(f_13);
    }

  };
  clasClosure._B1 = class _B extends clasClosure._A {
    constructor() {
      var _clasClosure = clasClosure;
      _clasClosure._cnt += 2;
    }

    static f() {
      var ctx = M.context();
      ctx._clasClosure = clasClosure;
      return ctx.scope(f_14);
    }

  };
  clasClosure._A = A;
  return clasClosure.scope(clasClosure_1);
}

function c2() {
  var c2 = M.context();

  c2._closure1_a = function _closure1_a() {
    var closure1_a = M.context();
    closure1_a._c2 = c2;
    return closure1_a.scope(closure1_a_1);
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

  return c2.scope(_c2_1);
}

function loopCapt1() {
  var loopCapt1 = M.context();
  return loopCapt1.scope(loopCapt1_1);
}

function loopCapt2() {
  var loopCapt2 = M.context();
  return loopCapt2.scope(loopCapt2_1);
}

function loopCapt3() {
  var loopCapt3 = M.context();
  return loopCapt3.scope(loopCapt3_1);
}

function loopCapt4() {
  var loopCapt4 = M.context();
  return loopCapt4.scope(loopCapt4_1);
}

function forOfCapt1() {
  var forOfCapt1 = M.context();
  return forOfCapt1.scope(forOfCapt1_1);
}

function forOfCapt2() {
  var forOfCapt2 = M.context();
  return forOfCapt2.scope(forOfCapt2_1);
}

function forOfCapt3() {
  var forOfCapt3 = M.context();
  return forOfCapt3.scope(forOfCapt3_1);
}

function forOfCapt4() {
  var forOfCapt4 = M.context();
  return forOfCapt4.scope(forOfCapt4_1);
}

function forOfCapt5() {
  var forOfCapt5 = M.context();
  return forOfCapt5.scope(forOfCapt5_1);
}

function forOfCapt6() {
  var forOfCapt6 = M.context();
  return forOfCapt6.scope(forOfCapt6_1);
}

function forIn() {
  var forIn = M.context();
  return forIn.scope(forIn_1);
}

function while1() {
  var while1 = M.context();
  return while1.scope(while1_1);
}

function catchBlock2() {
  var catchBlock2 = M.context();
  return catchBlock2.scope(catchBlock2_1);
}

function closure2() {
  var closure2 = M.context();
  return closure2.scope(closure2_1);
}

function switches() {
  var switches = M.context();
  return switches.scope(switches_1);
}

function a_1(a) {
  return a.pure();
}

function a1_1(a1) {
  return a1.yld(void 0, a1_2);
}

function a1_2(a1) {
  return a1.pure();
}

function a3_1(a3) {
  return;
}

function a2_1(a2) {
  return a2.yld(1, a2_2);
}

function a2_2(a2) {
  return a2.pure();
}

function _a_1(a) {
  return a.yld(1, a_2, a_5);
}

function a_2(a) {
  return a.yld(2, a_4);
}

function a_3(a) {
  a._e = a._ex;
  return a.yld(a._e, a_4);
}

function a_4(a) {
  return a.pure();
}

function a_5(a, b) {
  a._ex = b;
  return a.jump(void 0, a_3);
}

function d_1(d) {
  var a;
  d._j = 0;
  a = d._i++;
  return d.yld(a, d_2);
}

function d_2(d, a) {
  return d.yld(a, d_3);
}

function d_3(d, a) {
  var b;
  b = d._j++;
  return d.pure((a, b));
}

function d2_1(d2) {
  var a;
  d2._j = 0;
  a = d2._i++;
  return d2.yld(a, d2_2);
}

function d2_2(d2, a) {
  var b;
  b = d2._j++;
  return d2.yld((a, b), d2_3);
}

function d2_3(d2) {
  return d2.yldStar(some(d2._i += 2, d2._j) + d2._j, d2_4);
}

function d2_4(d2, a) {
  return d2.yld(a, d2_5);
}

function d2_5(d2, a) {
  var b;

  if (a) {
    b = d2._i += 3;
    return b;
  } else {
    return d2.pure(d2._i);
  }
}

function a4_1(a4) {
  return a4.yld(1, a4_2, a4_15);
}

function a4_2(a4) {
  return a4.yld(2, a4_3, a4_15);
}

function a4_3(a4) {
  a4._fc = a4_9, a4._fe = a4_13;
  return a4.yld(3, a4_7);
}

function a4_4(a4) {
  a4._e = a4._ex;
  return a4.yld("excep", a4_5, a4_16);
}

function a4_5(a4) {
  return a4.yld(a4._e, a4_6, a4_16);
}

function a4_6(a4, a) {
  if (a) {
    a4._fc = a4_12, a4._fe = a4_13, a4._r = 10;
    return a4.jump(void 0, a4_7);
  } else {
    a4._fc = a4_9, a4._fe = a4_13;
    return a4.jump(void 0, a4_7);
  }
}

function a4_7(a4) {
  return a4.yld("f", a4_8);
}

function a4_8(a4) {
  return a4.yld("e", a4._fc, a4._fe);
}

function a4_9(a4) {
  var a;
  a4._1 = a1;
  a = a2();
  return a4.yldStar(a, a4_10);
}

function a4_10(a4, b) {
  var a;
  a4._2 = b;
  a = a3();
  return a4.yldStar(a, a4_11);
}

function a4_11(a4, b) {
  var a;
  a = a4._1(a4._2, b);
  return a4.yld(a, a4_12, a4_13);
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
  return a4.jump(void 0, a4_4, a4_16);
}

function a4_16(a4, a) {
  a4._fc = a4_14, a4._fe = a4_13, a4._err1 = a;
  return a4.jump(void 0, a4_7);
}

function a5_1(a5) {
  a5._loop = a5.iterator(a4());
  return a5.jump(void 0, a5_2, a5_7);
}

function a5_2(a5) {
  if (!(a5._loop = a5._loop.step()).done) {
    a5._i = a5._loop.value;
    return a5.yld(a5._i, a5_2, a5_7);
  } else {
    a5._fc = a5_4, a5._fe = a5_5;
    return a5.jump(void 0, a5_3);
  }
}

function a5_3(a5) {
  if (a5._loop.exit) {
    a5._loop.exit();
  }

  return a5.jump(void 0, a5._fc, a5._fe);
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
  return a5.jump(void 0, a5_3);
}

function a6_1(a6) {
  return a6.yld(1, a6_2, a6_12);
}

function a6_2(a6) {
  return a6.yld(2, a6_3, a6_13);
}

function a6_3(a6) {
  return a6.yld(3, a6_4, a6_13);
}

function a6_4(a6, a) {
  if (a) {
    a6._fc1 = a6_8, a6._fe1 = a6_9, a6._r = 10;
    return a6.jump(void 0, a6_5, a6_12);
  } else {
    a6._fc1 = a6_7, a6._fe1 = a6_9;
    return a6.yld(4, a6_5, a6_12);
  }
}

function a6_5(a6) {
  a6._err1 = a6._err2;
  return a6.yld("f1", a6_6);
}

function a6_6(a6) {
  return a6.yld("f2", a6._fc1, a6._fe1);
}

function a6_7(a6) {
  return a6.yld(5, a6_8, a6_9);
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
  return a6.jump(void 0, a6_6);
}

function a6_13(a6, a) {
  a6._fc1 = a6_11, a6._fe1 = a6_9, a6._err2 = a;
  return a6.jump(void 0, a6_5, a6_12);
}

function _a1_1(a1) {
  return a1.yld(1, _a1_2);
}

function _a1_2(a1) {
  return a1.pure(2);
}

function _a2_1(a2) {
  a2._loop = a2.iterator(a4());
  return a2.jump(void 0, _a2_2, a2_8);
}

function _a2_2(a2) {
  if (!(a2._loop = a2._loop.step()).done) {
    a2._i = a2._loop.value;
    return a2.yld(a2._i, _a2_2, a2_8);
  } else {
    a2._fc = a2_4, a2._fe = a2_6;
    return a2.jump(void 0, a2_3);
  }
}

function a2_3(a2) {
  if (a2._loop.exit) {
    a2._loop.exit();
  }

  return a2.jump(void 0, a2._fc, a2._fe);
}

function a2_4(a2) {
  return a2.yld(10, a2_5, a2_6);
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
  return a2.jump(void 0, a2_3);
}

function _a3_1(a3) {
  a3._loop = a3.iterator(a4());
  return a3.jump(void 0, a3_2, a3_7);
}

function a3_2(a3) {
  if (!(a3._loop = a3._loop.step()).done) {
    a3._i = a3._loop.value;
    return a3.yld(a3._i, a3_2, a3_7);
  } else {
    a3._fc = a3_4, a3._fe = a3_5;
    return a3.jump(void 0, a3_3);
  }
}

function a3_3(a3) {
  if (a3._loop.exit) {
    a3._loop.exit();
  }

  return a3.jump(void 0, a3._fc, a3._fe);
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
  return a3.jump(void 0, a3_3);
}

function _a6_1(a6) {
  a6._i = 0;
  return a6.jump(void 0, _a6_2);
}

function _a6_2(a6) {
  var a;
  a = a6._i++;
  return a6.yld(a, _a6_3);
}

function _a6_3(a6, a) {
  if (a === "exit") {
    return a6.pure(100);
  } else {
    return a6.jump(void 0, _a6_2);
  }
}

function _a7_1(a7) {
  return a7.yld(1, _a7_2);
}

function _a7_2(a7, a) {
  if (a) {
    return a7.yld("A", _a7_3);
  } else {
    return a7.yld("c", _a7_5);
  }
}

function _a7_3(a7, a) {
  a7._ = a;
  return a7.yld("b", _a7_4);
}

function _a7_4(a7, a) {
  a7._ && a;
}

function _a7_5(a7, a) {
  a7._1 = a;
  return a7.yld("d", _a7_6);
}

function _a7_6(a7, a) {
  if (a) {
    return a7.yld("e", a7_7);
  } else {
    return a7.yldStar(a, a7_7);
  }
}

function a7_7(a7, a) {
  a7._1 || a;
}

function a7_1_1(a7_1) {
  return a7_1.yld(1, a7_1_2);
}

function a7_1_2(a7_1, a) {
  if (a) {
    return a7_1.yld("A", a7_1_3);
  } else {
    return a7_1.yld("c", a7_1_5);
  }
}

function a7_1_3(a7_1, a) {
  a7_1._2 = a;
  return a7_1.yld("b", a7_1_4);
}

function a7_1_4(a7_1, a) {
  a7_1._1 = a7_1._2 && a;
  return a7_1.jump(void 0, a7_1_8);
}

function a7_1_5(a7_1, a) {
  a7_1._3 = a;
  return a7_1.yld("d", a7_1_6);
}

function a7_1_6(a7_1, a) {
  if (a) {
    return a7_1.yld("e", a7_1_7);
  } else {
    return a7_1.yldStar(a, a7_1_7);
  }
}

function a7_1_7(a7_1, a) {
  a7_1._1 = a7_1._3 || a;
  return a7_1.jump(void 0, a7_1_8);
}

function a7_1_8(a7_1) {
  return a7_1.yld(2, a7_1_9);
}

function a7_1_9(a7_1, a) {
  return a7_1._1 + a;
}

function a7_2_1(a7_2) {
  return a7_2.yld(1, a7_2_2);
}

function a7_2_2(a7_2, a) {
  if (a) {
    return a7_2.yld("A", a7_2_3);
  } else {
    return a7_2.yld("c", a7_2_5);
  }
}

function a7_2_3(a7_2, a) {
  a7_2._1 = a;
  return a7_2.yld("b", a7_2_4);
}

function a7_2_4(a7_2, a) {
  a7_2._ = a7_2._1 && a;
  return a7_2.jump(void 0, a7_2_8);
}

function a7_2_5(a7_2, a) {
  a7_2._2 = a;
  return a7_2.yld("d", a7_2_6);
}

function a7_2_6(a7_2, a) {
  if (a) {
    return a7_2.yld("e", a7_2_7);
  } else {
    return a7_2.yldStar(a, a7_2_7);
  }
}

function a7_2_7(a7_2, a) {
  a7_2._ = a7_2._2 || a;
  return a7_2.jump(void 0, a7_2_8);
}

function a7_2_8(a7_2) {
  return a7_2.yld(2, a7_2_9);
}

function a7_2_9(a7_2, a) {
  return a7_2.yld(a7_2._ + a, a7_2_10);
}

function a7_2_10(a7_2) {
  return a7_2.yld("ex", a7_2_11);
}

function a7_2_11(a7_2) {
  return a7_2.pure();
}

function a7_3_1(a7_3) {
  return a7_3.yld(1, a7_3_2);
}

function a7_3_2(a7_3, a) {
  if (a % 2) {
    return a7_3.yld("A", a7_3_3);
  } else {
    return a7_3.yld("c", a7_3_5);
  }
}

function a7_3_3(a7_3, a) {
  a7_3._ = a;
  return a7_3.yld("b", a7_3_4);
}

function a7_3_4(a7_3, a) {
  a7_3._ && a;
  return a7_3.jump(void 0, a7_3_5);
}

function a7_3_5(a7_3) {
  return a7_3.yld(2, a7_3_6);
}

function a7_3_6(a7_3) {
  return a7_3.pure();
}

function a7_4_1(a7_4) {
  if (1) {
    return a7_4.yld(2, a7_4_4);
  } else {
    return a7_4.yld(3, a7_4_2);
  }
}

function a7_4_2(a7_4, a) {
  a7_4._1 = a;
  return a7_4.yld(4, a7_4_3);
}

function a7_4_3(a7_4, b) {
  var a;
  a = (a7_4._1, b);
  return a7_4.jump(void 0, a7_4_4);
}

function a7_4_4(a7_4, a) {
  return a7_4.yld(a, a7_4_5);
}

function a7_4_5(a7_4, a) {
  return a;
}

function a7_5_1(a7_5) {
  return a7_5.yld(1, a7_5_2);
}

function a7_5_2(a7_5, a) {
  if (a) {
    return a7_5.yld(2, a7_5_3);
  } else {
    return a7_5.yld(3, a7_5_3);
  }
}

function a7_5_3(a7_5, a) {
  return a;
}

function a7_6_1(a7_6) {
  return a7_6.yld(1, a7_6_2);
}

function a7_6_2(a7_6, a) {
  var b;

  if (a) {
    return a7_6.yld("A", a7_6_3);
  } else {
    b = 1;
    return a7_6.yldStar(b, a7_6_5);
  }
}

function a7_6_3(a7_6, a) {
  a7_6._1 = a;
  return a7_6.yld("b", a7_6_4);
}

function a7_6_4(a7_6, b) {
  var a;
  a = a7_6._1 && b;
  return a7_6.jump(void 0, a7_6_5);
}

function a7_6_5(a7_6, a) {
  return a;
}

function finallyBlock1_1(finallyBlock1) {
  finallyBlock1._i = 0;
  return finallyBlock1.jump(void 0, finallyBlock1_2, finallyBlock1_9);
}

function finallyBlock1_2(finallyBlock1) {
  return finallyBlock1.yld(finallyBlock1._i++ === 3, finallyBlock1_3, finallyBlock1_9);
}

function finallyBlock1_3(finallyBlock1, a) {
  if (a) {
    finallyBlock1._fc = finallyBlock1_6, finallyBlock1._fe = finallyBlock1_7;
    return finallyBlock1.jump(void 0, finallyBlock1_4);
  } else {
    return finallyBlock1.jump(void 0, finallyBlock1_2, finallyBlock1_9);
  }
}

function finallyBlock1_4(finallyBlock1) {
  return finallyBlock1.yld("exit", finallyBlock1_5);
}

function finallyBlock1_5(finallyBlock1) {
  return finallyBlock1.yld(finallyBlock1._i, finallyBlock1._fc, finallyBlock1._fe);
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
  return finallyBlock1.jump(void 0, finallyBlock1_4);
}

function ae_1(ae) {
  return ae.yld(1, ae_2);
}

function ae_2(ae) {
  return ae.yld(2, ae_3);
}

function ae_3(ae) {
  return ae.yld(3, ae_4);
}

function ae_4(ae, a) {
  if (a) {
    return ae.pure(1);
  } else {
    return ae.pure(2);
  }
}

function cfb_1(cfb) {
  cfb._i = 0;
  return cfb.jump(void 0, cfb_2, cfb_11);
}

function cfb_2(cfb) {
  return cfb.yld(cfb._i++ === 3, cfb_3, cfb_11);
}

function cfb_3(cfb, a) {
  if (a) {
    throw new Error(`AAAAAAAAA${cfb._i++}`);
  }

  cfb._fc = cfb_8, cfb._fe = cfb_9;
  return cfb.yld(`a${cfb._i++}`, cfb_7);
}

function cfb_4(cfb) {
  cfb._e = cfb._ex;
  return cfb.yld(`e${cfb._i++}`, cfb_5, cfb_12);
}

function cfb_5(cfb) {
  return cfb.yld(cfb._e, cfb_6, cfb_12);
}

function cfb_6(cfb) {
  cfb._fc = cfb_8, cfb._fe = cfb_9, cfb._r = cfb._i++;
  return cfb.jump(void 0, cfb_7);
}

function cfb_7(cfb) {
  return cfb.yld(`f1${cfb._i++}`, cfb._fc, cfb._fe);
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
  return cfb.jump(void 0, cfb_4, cfb_12);
}

function cfb_12(cfb, a) {
  cfb._fc = cfb_10, cfb._fe = cfb_9, cfb._err1 = a;
  return cfb.jump(void 0, cfb_7);
}

function cfb1_1(cfb1) {
  cfb1._i = 0;
  return cfb1.jump(void 0, cfb1_2, cfb1_9);
}

function cfb1_2(cfb1) {
  return cfb1.yld(cfb1._i, cfb1_3, cfb1_9);
}

function cfb1_3(cfb1) {
  throw new Error(`AAAAAAAAA${cfb1._i++}`);
}

function cfb1_4(cfb1) {
  cfb1._e = cfb1._ex;
  cfb1._fc = cfb1_6, cfb1._fe = cfb1_7, cfb1._r = cfb1._i++;
  return cfb1.jump(void 0, cfb1_5);
}

function cfb1_5(cfb1) {
  console.log(`f${cfb1._i}`);
  return cfb1.jump(void 0, cfb1._fc, cfb1._fe);
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
  return cfb1.jump(void 0, cfb1_4, cfb1_10);
}

function cfb1_10(cfb1, a) {
  cfb1._fc = cfb1_8, cfb1._fe = cfb1_7, cfb1._err1 = a;
  return cfb1.jump(void 0, cfb1_5);
}

function _cfb1_1(cfb1) {
  cfb1._i = 0;
  return cfb1.jump(void 0, _cfb1_2, _cfb1_6);
}

function _cfb1_2(cfb1) {
  return cfb1.yld(cfb1._i, _cfb1_3, _cfb1_6);
}

function _cfb1_3(cfb1) {
  return cfb1.yld(5, _cfb1_5);
}

function _cfb1_4(cfb1) {
  cfb1._e = cfb1._ex;
  return cfb1.pure(cfb1._i++);
}

function _cfb1_5(cfb1) {
  return cfb1.pure(cfb1._r);
}

function _cfb1_6(cfb1, a) {
  cfb1._ex = a;
  return cfb1.jump(void 0, _cfb1_4);
}

function cfb2_1(cfb2) {
  cfb2._i = 0;
  return cfb2.jump(void 0, cfb2_2, cfb2_11);
}

function cfb2_2(cfb2) {
  return cfb2.yld(`a:${cfb2._i++}`, cfb2_3, cfb2_11);
}

function cfb2_3(cfb2) {
  return cfb2.yld(`b:${cfb2._i++}`, cfb2_4, cfb2_11);
}

function cfb2_4(cfb2) {
  cfb2._fc = cfb2_8, cfb2._fe = cfb2_9;
  return cfb2.yld(`c:${cfb2._i++}`, cfb2_5, cfb2_10);
}

function cfb2_5(cfb2) {
  cfb2._ex = cfb2._err1;
  return cfb2.yld(`f:${cfb2._i++}`, cfb2._fc, cfb2._fe);
}

function cfb2_6(cfb2) {
  cfb2._e = cfb2._ex;
  return cfb2.yld(cfb2._e, cfb2_7);
}

function cfb2_7(cfb2) {
  return cfb2.yld(`e:${cfb2._i++}`, cfb2_8, cfb2_9);
}

function cfb2_8(cfb2) {
  return cfb2.pure();
}

function cfb2_9(cfb2, e) {
  return cfb2.raise(e);
}

function cfb2_10(cfb2, a) {
  cfb2._ex = a;
  return cfb2.jump(void 0, cfb2_6);
}

function cfb2_11(cfb2, a) {
  cfb2._fc = cfb2_6, cfb2._fe = cfb2_9, cfb2._err1 = a;
  return cfb2.jump(void 0, cfb2_5, cfb2_10);
}

function cfb3_1(cfb3) {
  cfb3._i = 0;
  return cfb3.jump(void 0, cfb3_2, cfb3_12);
}

function cfb3_2(cfb3) {
  return cfb3.yld(cfb3._i === 3, cfb3_3, cfb3_12);
}

function cfb3_3(cfb3, a) {
  if (a) {
    throw new Error(`AAAAAAAAA${cfb3._i++}`);
  }

  cfb3._fc = cfb3_5, cfb3._fe = cfb3_11;
  return cfb3.yld(`a${cfb3._i}`, cfb3_4, cfb3_11);
}

function cfb3_4(cfb3) {
  cfb3._ex = cfb3._err1;
  return cfb3.yld(`f1${cfb3._i++}`, cfb3._fc, cfb3._fe);
}

function cfb3_5(cfb3) {
  return cfb3.yld(`b${cfb3._i++}`, cfb3_9);
}

function cfb3_6(cfb3) {
  cfb3._e = cfb3._ex;
  return cfb3.yld(`e${cfb3._i}`, cfb3_7);
}

function cfb3_7(cfb3) {
  return cfb3.yld(cfb3._e, cfb3_8);
}

function cfb3_8(cfb3) {
  return cfb3.pure(cfb3._i);
}

function cfb3_9(cfb3) {
  cfb3._i++;
  return cfb3.jump(void 0, cfb3_2, cfb3_12);
}

function cfb3_10(cfb3, e) {
  return cfb3.raise(e);
}

function cfb3_11(cfb3, a) {
  cfb3._ex = a;
  return cfb3.jump(void 0, cfb3_6);
}

function cfb3_12(cfb3, a) {
  cfb3._fc = cfb3_6, cfb3._fe = cfb3_10, cfb3._err1 = a;
  return cfb3.jump(void 0, cfb3_4, cfb3_11);
}

function cfb4_1(cfb4) {
  return cfb4.yld(5, cfb4_3);
}

function cfb4_2(cfb4) {
  cfb4._e = cfb4._ex;
  return cfb4.pure(10);
}

function cfb4_3(cfb4) {
  return cfb4.pure(cfb4._r);
}

function cfb4_4(cfb4, a) {
  cfb4._ex = a;
  return cfb4.jump(void 0, cfb4_2);
}

function _cfb2_1(cfb2) {
  cfb2._i = 0;
  return cfb2.jump(void 0, _cfb2_2, _cfb2_9);
}

function _cfb2_2(cfb2) {
  cfb2._fc = _cfb2_6, cfb2._fe = _cfb2_7;
  return cfb2.yld(`c:${cfb2._i++}`, _cfb2_3, _cfb2_8);
}

function _cfb2_3(cfb2) {
  cfb2._ex = cfb2._err1;
  return cfb2.yld(`f:${cfb2._i++}`, cfb2._fc, cfb2._fe);
}

function _cfb2_4(cfb2) {
  cfb2._e = cfb2._ex;
  return cfb2.yld(cfb2._e, _cfb2_5);
}

function _cfb2_5(cfb2) {
  return cfb2.yld(`e:${cfb2._i++}`, _cfb2_6, _cfb2_7);
}

function _cfb2_6(cfb2) {
  return cfb2.pure();
}

function _cfb2_7(cfb2, e) {
  return cfb2.raise(e);
}

function _cfb2_8(cfb2, a) {
  cfb2._ex = a;
  return cfb2.jump(void 0, _cfb2_4);
}

function _cfb2_9(cfb2, a) {
  cfb2._fc = _cfb2_4, cfb2._fe = _cfb2_7, cfb2._err1 = a;
  return cfb2.jump(void 0, _cfb2_3, _cfb2_8);
}

function cfb6_1(cfb6) {
  cfb6._fc = cfb6_5, cfb6._fe = cfb6_6;
  return cfb6.yld(1, cfb6_4);
}

function cfb6_2(cfb6) {
  cfb6._e = cfb6._ex;
  return cfb6.yld(2, cfb6_3, cfb6_9);
}

function cfb6_3(cfb6) {
  cfb6._fc = cfb6_5, cfb6._fe = cfb6_6, cfb6._r = 3;
  return cfb6.jump(void 0, cfb6_4);
}

function cfb6_4(cfb6) {
  return cfb6.yld(4, cfb6._fc, cfb6._fe);
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
  return cfb6.jump(void 0, cfb6_2, cfb6_9);
}

function cfb6_9(cfb6, a) {
  cfb6._fc = cfb6_7, cfb6._fe = cfb6_6, cfb6._err1 = a;
  return cfb6.jump(void 0, cfb6_4);
}

function fb4_1(fb4) {
  fb4._i = 0;
  return fb4.jump(void 0, fb4_2, fb4_9);
}

function fb4_2(fb4) {
  var a;
  a = fb4._i++;
  return fb4.yld(a, fb4_3, fb4_9);
}

function fb4_3(fb4, a) {
  if (a === 3) {
    fb4._fc = fb4_6, fb4._fe = fb4_7, fb4._r = fb4._i;
    return fb4.jump(void 0, fb4_4);
  } else {
    return fb4.jump(void 0, fb4_2, fb4_9);
  }
}

function fb4_4(fb4) {
  return fb4.yld("exit", fb4_5);
}

function fb4_5(fb4) {
  return fb4.yld(fb4._i, fb4._fc, fb4._fe);
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
  return fb4.jump(void 0, fb4_4);
}

function while2_1(while2) {
  while2._i = 0;
  return while2.jump(void 0, while2_2);
}

function while2_2(while2) {
  var a;
  a = while2._i++;
  return while2.yld(a, while2_3);
}

function while2_3(while2, a) {
  var b;

  if (a < 3) {
    b = while2._i++;
    return while2.yld(b, while2_2);
  } else {
    return while2.pure();
  }
}

function for2_1(for2) {
  return for2.yld(void 0, for2_2);
}

function for2_2(for2, a) {
  for2._i = a;
  return for2.jump(void 0, for2_3);
}

function for2_3(for2) {
  return for2.yld(for2._i, for2_4);
}

function for2_4(for2, a) {
  if (a < 10) {
    return for2.yld(for2._i, for2_5);
  } else {
    return for2.pure();
  }
}

function for2_5(for2) {
  for2._i++;
  return for2.jump(void 0, for2_3);
}

function c_1(_c) {
  _c._c1._i++;
  return _c.pure();
}

function b_1(b) {
  return b.pure(function c() {
    var _c = M.context();

    _c._c1 = b._c1;
    return _c.scope(c_1);
  });
}

function a_11(a) {
  return a.pure();
}

function a_12(a) {
  a._ = a._c2._i;
  return a.yld(`a:${a._c2._i}`, _a_2);
}

function _a_2(a, c) {
  var b;
  b = a._c2._i = a._ + c;
  return a.pure(b);
}

function _z_1(_z) {
  _z._d = function z(j) {
    var c2 = _z._c2;
    return c2._i += j;
  };

  return _z.yldStar(_z._c(), _z_2);
}

function _z_2(_z, a) {
  return _z.yldStar(_z._d(a), _z_3);
}

function _z_3(_z, a) {
  return _z.yldStar(a, z_4);
}

function z_4(_z, a) {
  return _z.yld(`b:${a}`, z_5);
}

function z_1(z1) {
  var a;
  z1._ = z1._c2._i;
  a = z1._f._a;
  return z1.yldStar(a(), z_2);
}

function z_2(z1, b) {
  var a;
  z1._1 = b;
  a = z1._f._b;
  return z1.yldStar(a(), z_3);
}

function z_3(z1, b) {
  var a;
  a = z1._c2._i = z1._ + (z1._j + z1._1 + b);
  return z1.pure(a);
}

function z_5(_z) {
  return _z.pure(function z(j) {
    var z1 = M.context();
    z1._c2 = _z._c2;
    z1._f = _z._f;
    z1._j = j;
    return z1.scope(z_1);
  });
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
        var _z = M.context();

        _z._c = function c() {
          var c2 = _z._c2;
          return c2._i += this.something;
        };

        _z._c2 = inner._c2;
        _z._f = ctx;
        return _z.scope(_z_1);
      };
    }
  };

  inner._k = 1;
  return inner.yldStar(inner._b(), inner_2);
}

function inner_2(inner, a) {
  inner._f = [inner._a, a];
  inner._loop = inner.iterator(inner._f);
  return inner.jump(void 0, inner_3, inner_10);
}

function inner_3(inner) {
  if (!(inner._loop = inner._loop.step()).done) {
    inner._j = inner._loop.value;
    return inner.yldStar(inner._j(), inner_4, inner_10);
  } else {
    inner._fc = inner_7, inner._fe = inner_8;
    return inner.jump(void 0, inner_6);
  }
}

function inner_4(inner, a) {
  return inner.yldStar(a, inner_5, inner_10);
}

function inner_5(inner, a) {
  inner._k += a;
  return inner.jump(void 0, inner_3, inner_10);
}

function inner_6(inner) {
  if (inner._loop.exit) {
    inner._loop.exit();
  }

  return inner.jump(void 0, inner._fc, inner._fe);
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
  return inner.jump(void 0, inner_6);
}

function c1_1(c1) {
  c1._i = 0;
  return `a:${c1._i}`;
}

function c2_1(c2) {
  c2._i = 0;
  return c2.yld(`a:${c2._i}`, c2_2);
}

function c2_2(c2, b) {
  var a;
  a = c2._i += b;
  return c2.pure(a);
}

function forOf_1(forOf) {
  forOf._loop = forOf.iterator([1, 2, 3]);
  return forOf.jump(void 0, forOf_2, forOf_7);
}

function forOf_2(forOf) {
  if (!(forOf._loop = forOf._loop.step()).done) {
    forOf._i = forOf._loop.value;
    return forOf.yld(forOf._i, forOf_2, forOf_7);
  } else {
    forOf._fc = forOf_4, forOf._fe = forOf_5;
    return forOf.jump(void 0, forOf_3);
  }
}

function forOf_3(forOf) {
  if (forOf._loop.exit) {
    forOf._loop.exit();
  }

  return forOf.jump(void 0, forOf._fc, forOf._fe);
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
  return forOf.jump(void 0, forOf_3);
}

function a_13(ctx) {
  return ctx.yld(10, a_21);
}

function a_21(ctx) {
  return ctx.pure();
}

function _b_1(ctx) {
  return ctx.yld(1, b_2);
}

function b_2(ctx) {
  return ctx.yld(ctx.__this, b_3);
}

function b_3(ctx) {
  return ctx.yld(ctx.__args, b_4);
}

function b_4(ctx) {
  return ctx.pure();
}

function objMethod_1(ctx) {
  return ctx.yld(1, objMethod_2);
}

function objMethod_2(ctx) {
  return ctx.pure();
}

function objMethod1_1(ctx) {
  var a;
  ctx._j = 0;
  a = ctx._objMethodsClosure._i++;
  return ctx.yld(a, objMethod1_2);
}

function objMethod1_2(ctx) {
  var a;
  a = ctx._k++;
  return ctx.yld(a, objMethod1_3);
}

function objMethod1_3(ctx) {
  var a;
  a = ctx._objMethodsClosure._m++;
  return ctx.yld(a, objMethod1_4);
}

function objMethod2_1(_ctx) {
  var a;
  a = _ctx._f._j++;
  return _ctx.yld(a, objMethod2_2);
}

function objMethod2_2(_ctx) {
  var a;
  a = _ctx._f._k++;
  return _ctx.yld(a, objMethod2_3);
}

function objMethod2_3(_ctx) {
  var a;
  a = _ctx._m++;
  return _ctx.yld(a, objMethod2_4);
}

function objMethod2_4(_ctx) {
  return _ctx.pure();
}

function objMethod1_4(ctx) {
  return ctx.pure({
    objMethod2(m) {
      var _ctx = M.context();

      _ctx._f = ctx;
      _ctx._m = m;
      return _ctx.scope(objMethod2_1);
    }

  });
}

function objMethodsClosure_1(objMethodsClosure) {
  objMethodsClosure._i = 0;
  objMethodsClosure._k = 0;
  objMethodsClosure._m = 0;
  return objMethodsClosure.pure({
    objMethod1(k) {
      var ctx = M.context();
      ctx._objMethodsClosure = objMethodsClosure;
      ctx._k = k;
      return ctx.scope(objMethod1_1);
    }

  });
}

function f_1(ctx) {
  return ctx.yld(ctx.__this, f_2);
}

function f_2(ctx) {
  return ctx.yld(ctx.__this, f_3);
}

function f_3(ctx) {
  var a;
  a = ctx.__args[0];
  return ctx.yld(a, f_4);
}

function f_4(ctx) {
  return ctx.pure();
}

function _f_1(ctx) {
  return ctx.yld(ctx._i, _f_2);
}

function _f_2(ctx) {
  return ctx.yld(ctx.__args, _f_3);
}

function _f_3(ctx) {
  return ctx.yld(ctx.__this, _f_4);
}

function _f_4(ctx) {
  return ctx.pure();
}

function f_11(ctx) {
  return ctx.yld(ctx._i, f_21);
}

function f_21(ctx) {
  return ctx.yld(ctx.__args, f_31);
}

function f_31(ctx) {
  var a;
  a = Object.getPrototypeOf(SomeChild.prototype)[ctx._i].call(ctx.__this, ctx._i);
  return ctx.yldStar(a, f_41);
}

function f_41(ctx) {
  return ctx.pure();
}

function f_12(ctx) {
  var a;
  a = Object.getPrototypeOf(SomeChild.prototype)[ctx._i].call(ctx.__this, ctx._i);
  return ctx.yldStar(a, f_22);
}

function f_22(ctx) {
  return ctx.pure();
}

function f_13(ctx) {
  return ctx.yld(1, f_23);
}

function f_23(ctx) {
  return ctx.pure();
}

function f_14(ctx) {
  var a;
  a = ctx._clasClosure._cnt += 2;
  return ctx.yld(a, f_24);
}

function f_24(ctx) {
  return ctx.pure();
}

function clasClosure_1(clasClosure) {
  var a;
  clasClosure._cnt = 0;
  a = clasClosure._cnt++;
  return clasClosure.yld(a, clasClosure_2);
}

function clasClosure_2(clasClosure) {
  var a;
  a = clasClosure._B.f();
  return clasClosure.yldStar(a, clasClosure_3);
}

function f_15(ctx) {
  var a;
  a = ctx._clasClosure._cnt += 3;
  return ctx.yld(a, f_25);
}

function f_25(ctx) {
  var a;
  a = ctx._clasClosure._B1.f();
  return ctx.yldStar(a, f_32);
}

function f_32(ctx) {
  return ctx.pure();
}

function clasClosure_3(clasClosure) {
  var a;
  clasClosure._C = class extends clasClosure._A {
    static f() {
      var ctx = M.context();
      ctx._clasClosure = clasClosure;
      return ctx.scope(f_15);
    }

  };
  a = clasClosure._cnt += 3;
  return clasClosure.yld(a, clasClosure_4);
}

function clasClosure_4(clasClosure) {
  var a;
  a = clasClosure._C.f();
  return clasClosure.yldStar(a, clasClosure_5);
}

function clasClosure_5(clasClosure) {
  var a;
  a = clasClosure._B1.f();
  return clasClosure.yldStar(a, clasClosure_6);
}

function clasClosure_6(clasClosure) {
  return clasClosure.pure();
}

function closure1_a_1(closure1_a) {
  closure1_a._ = closure1_a._c2._i;
  return closure1_a.yld(`a`, closure1_a_2);
}

function closure1_a_2(closure1_a, b) {
  var a;
  a = closure1_a._c2._i = closure1_a._ + b;
  return closure1_a.pure(a);
}

function _c2_1(c2) {
  c2._i = 0;
  return c2.pure(c2._closure1_b()());
}

function iter_1(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f._j++}`, iter_2);
}

function iter_2(_iter) {
  return _iter.pure();
}

function loopCapt1_1(loopCapt1) {
  for (loopCapt1._i = 0; loopCapt1._i < 3; loopCapt1._i++) {
    (i => {
      var ctx = {};
      ctx._i = i;
      ctx._j = 0;
      funs(function iter() {
        var _iter = M.context();

        _iter._f = ctx;
        return _iter.scope(iter_1);
      });
    })(loopCapt1._i);
  }

  return loopCapt1.pure();
}

function loopCapt2_1(loopCapt2) {
  loopCapt2._i = 0;
  return loopCapt2.jump(void 0, loopCapt2_2);
}

function f_16(ctx) {
  var a;
  a = ctx._i;
  return ctx.yld(a, f_26);
}

function _iter_1(_iter) {
  return _iter.yld(_iter._f._j + _iter._f._i, _iter_2);
}

function _iter_2(_iter) {
  return _iter.pure();
}

function f_26(ctx) {
  ctx._j = ctx._i + 1;
  funs(function iter() {
    var _iter = M.context();

    _iter._f = ctx;
    return _iter.scope(_iter_1);
  });
  return ctx.pure();
}

function loopCapt2_2(loopCapt2) {
  var a;

  if (loopCapt2._i < 3) {
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      return ctx.scope(f_16);
    })(loopCapt2._i);

    return loopCapt2.yldStar(a, loopCapt2_3);
  } else {
    return loopCapt2.yld("f", loopCapt2_4);
  }
}

function loopCapt2_3(loopCapt2) {
  loopCapt2._i++;
  return loopCapt2.jump(void 0, loopCapt2_2);
}

function loopCapt2_4(loopCapt2) {
  return loopCapt2.pure();
}

function loopCapt3_1(loopCapt3) {
  loopCapt3._i = 0;
  return loopCapt3.jump(void 0, loopCapt3_2);
}

function f_18(ctx) {
  var a;
  a = ctx._i;
  return ctx.yld(a, f_28);
}

function f_28(ctx) {
  ctx._j = 0;
  return ctx.jump(void 0, f_33);
}

function f_17(_ctx) {
  var a;
  a = _ctx._j;
  return _ctx.yld(a, f_27);
}

function iter_11(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f1._j++}`, iter_21);
}

function iter_21(_iter) {
  return _iter.pure();
}

function f_27(_ctx) {
  funs(function iter() {
    var _iter = M.context();

    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return _iter.scope(iter_11);
  });
  return _ctx.pure();
}

function f_33(ctx) {
  var a;

  if (ctx._j < 3) {
    a = (j => {
      var _ctx = M.context();

      _ctx._f = ctx;
      _ctx._j = j;
      return _ctx.scope(f_17);
    })(ctx._j);

    return ctx.yldStar(a, f_42);
  } else {
    return ctx.pure();
  }
}

function f_42(ctx) {
  ctx._j++;
  return ctx.jump(void 0, f_33);
}

function loopCapt3_2(loopCapt3) {
  var a;

  if (loopCapt3._i < 3) {
    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      return ctx.scope(f_18);
    })(loopCapt3._i);

    return loopCapt3.yldStar(a, loopCapt3_3);
  } else {
    return loopCapt3.pure();
  }
}

function loopCapt3_3(loopCapt3) {
  loopCapt3._i++;
  return loopCapt3.jump(void 0, loopCapt3_2);
}

function iter_12(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f1._j++}`, iter_22);
}

function iter_22(_iter) {
  return _iter.pure();
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
            var _iter = M.context();

            _iter._f = f;
            _iter._f1 = _ctx;
            return _iter.scope(iter_12);
          });
        })(j);
      }
    })(loopCapt4._i);
  }

  return loopCapt4.pure();
}

function iter_13(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f._j++}`, iter_23);
}

function iter_23(_iter) {
  return _iter.pure();
}

function forOfCapt1_1(forOfCapt1) {
  for (forOfCapt1._i of a) {
    (i => {
      var ctx = {};
      ctx._i = i;
      ctx._j = 0;
      funs(function iter() {
        var _iter = M.context();

        _iter._f = ctx;
        return _iter.scope(iter_13);
      });
    })(forOfCapt1._i);
  }

  return forOfCapt1.pure();
}

function forOfCapt2_1(forOfCapt2) {
  forOfCapt2._loop = forOfCapt2.iterator(a);
  return forOfCapt2.jump(void 0, forOfCapt2_2, forOfCapt2_7);
}

function f_19(ctx) {
  var a;
  ctx._j = 0;
  a = ctx._i;
  return ctx.yld(a, f_29);
}

function iter_14(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f._j++}`, iter_24);
}

function iter_24(_iter) {
  return _iter.pure();
}

function f_29(ctx) {
  funs(function iter() {
    var _iter = M.context();

    _iter._f = ctx;
    return _iter.scope(iter_14);
  });
  return ctx.pure();
}

function forOfCapt2_2(forOfCapt2) {
  var a;

  if (!(forOfCapt2._loop = forOfCapt2._loop.step()).done) {
    forOfCapt2._i = forOfCapt2._loop.value;

    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      return ctx.scope(f_19);
    })(forOfCapt2._i);

    return forOfCapt2.yldStar(a, forOfCapt2_2, forOfCapt2_7);
  } else {
    forOfCapt2._fc = forOfCapt2_4, forOfCapt2._fe = forOfCapt2_5;
    return forOfCapt2.jump(void 0, forOfCapt2_3);
  }
}

function forOfCapt2_3(forOfCapt2) {
  if (forOfCapt2._loop.exit) {
    forOfCapt2._loop.exit();
  }

  return forOfCapt2.jump(void 0, forOfCapt2._fc, forOfCapt2._fe);
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
  return forOfCapt2.jump(void 0, forOfCapt2_3);
}

function iter_15(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f1._j++}`, iter_25);
}

function iter_25(_iter) {
  return _iter.pure();
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
            var _iter = M.context();

            _iter._f = f;
            _iter._f1 = _ctx;
            return _iter.scope(iter_15);
          });
        })(j);
      }
    })(forOfCapt3._i);
  }

  return forOfCapt3.pure();
}

function forOfCapt4_1(forOfCapt4) {
  forOfCapt4._loop = forOfCapt4.iterator(a);
  return forOfCapt4.jump(void 0, forOfCapt4_2, forOfCapt4_7);
}

function f_111(ctx) {
  ctx._loop = ctx.iterator(b);
  return ctx.jump(void 0, f_211, f_7);
}

function f_110(_ctx) {
  var a;
  a = _ctx._j;
  return _ctx.yld(a, f_210);
}

function iter_16(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f1._j++}`, iter_26);
}

function iter_26(_iter) {
  return _iter.pure();
}

function f_210(_ctx) {
  funs(function iter() {
    var _iter = M.context();

    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return _iter.scope(iter_16);
  });
  return _ctx.pure();
}

function f_211(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._f = ctx;
      _ctx._j = j;
      return _ctx.scope(f_110);
    })(ctx._j);

    return ctx.yldStar(a, f_211, f_7);
  } else {
    ctx._fc = f_43, ctx._fe = f_5;
    return ctx.jump(void 0, f_34);
  }
}

function f_34(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return ctx.jump(void 0, ctx._fc, ctx._fe);
}

function f_43(ctx) {
  return ctx.pure();
}

function f_5(ctx, e) {
  return ctx.raise(e);
}

function f_6(ctx) {
  return ctx.raise(ctx._err1);
}

function f_7(ctx, a) {
  ctx._fc = f_6, ctx._fe = f_5, ctx._err1 = a;
  return ctx.jump(void 0, f_34);
}

function forOfCapt4_2(forOfCapt4) {
  var a;

  if (!(forOfCapt4._loop = forOfCapt4._loop.step()).done) {
    forOfCapt4._i = forOfCapt4._loop.value;

    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      return ctx.scope(f_111);
    })(forOfCapt4._i);

    return forOfCapt4.yldStar(a, forOfCapt4_2, forOfCapt4_7);
  } else {
    forOfCapt4._fc = forOfCapt4_4, forOfCapt4._fe = forOfCapt4_5;
    return forOfCapt4.jump(void 0, forOfCapt4_3);
  }
}

function forOfCapt4_3(forOfCapt4) {
  if (forOfCapt4._loop.exit) {
    forOfCapt4._loop.exit();
  }

  return forOfCapt4.jump(void 0, forOfCapt4._fc, forOfCapt4._fe);
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
  return forOfCapt4.jump(void 0, forOfCapt4_3);
}

function forOfCapt5_1(forOfCapt5) {
  forOfCapt5._loop = forOfCapt5.iterator(a);
  return forOfCapt5.jump(void 0, forOfCapt5_2, forOfCapt5_7);
}

function f_112(ctx) {
  var a;
  a = ctx._i;
  return ctx.yld(a, f_212);
}

function iter_17(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f1._j++}`, iter_27);
}

function iter_27(_iter) {
  return _iter.pure();
}

function f_212(ctx) {
  for (ctx._j of b) {
    (j => {
      var _ctx = {},
          f = ctx;
      _ctx._j = j;
      funs(function iter() {
        var _iter = M.context();

        _iter._f = f;
        _iter._f1 = _ctx;
        return _iter.scope(iter_17);
      });
    })(ctx._j);
  }

  return ctx.pure();
}

function forOfCapt5_2(forOfCapt5) {
  var a;

  if (!(forOfCapt5._loop = forOfCapt5._loop.step()).done) {
    forOfCapt5._i = forOfCapt5._loop.value;

    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      return ctx.scope(f_112);
    })(forOfCapt5._i);

    return forOfCapt5.yldStar(a, forOfCapt5_2, forOfCapt5_7);
  } else {
    forOfCapt5._fc = forOfCapt5_4, forOfCapt5._fe = forOfCapt5_5;
    return forOfCapt5.jump(void 0, forOfCapt5_3);
  }
}

function forOfCapt5_3(forOfCapt5) {
  if (forOfCapt5._loop.exit) {
    forOfCapt5._loop.exit();
  }

  return forOfCapt5.jump(void 0, forOfCapt5._fc, forOfCapt5._fe);
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
  return forOfCapt5.jump(void 0, forOfCapt5_3);
}

function forOfCapt6_1(forOfCapt6) {
  forOfCapt6._loop = forOfCapt6.iterator(a);
  return forOfCapt6.jump(void 0, forOfCapt6_2, forOfCapt6_7);
}

function f_114(ctx) {
  var a;
  a = ctx._i;
  return ctx.yld(a, f_214);
}

function f_214(ctx) {
  ctx._loop = ctx.iterator(b);
  return ctx.jump(void 0, f_35, f_8);
}

function f_113(_ctx) {
  var a;
  a = _ctx._f._i;
  return _ctx.yld(a, f_213);
}

function iter_18(_iter) {
  return _iter.yld(`${_iter._f._i} ${_iter._f1._j++}`, iter_28);
}

function iter_28(_iter) {
  return _iter.pure();
}

function f_213(_ctx) {
  funs(function iter() {
    var _iter = M.context();

    _iter._f = _ctx._f;
    _iter._f1 = _ctx;
    return _iter.scope(iter_18);
  });
  return _ctx.pure();
}

function f_35(ctx) {
  var a;

  if (!(ctx._loop = ctx._loop.step()).done) {
    ctx._j = ctx._loop.value;

    a = (j => {
      var _ctx = M.context();

      _ctx._f = ctx;
      _ctx._j = j;
      return _ctx.scope(f_113);
    })(ctx._j);

    return ctx.yldStar(a, f_35, f_8);
  } else {
    ctx._fc = _f_5, ctx._fe = _f_6;
    return ctx.jump(void 0, f_44);
  }
}

function f_44(ctx) {
  if (ctx._loop.exit) {
    ctx._loop.exit();
  }

  return ctx.jump(void 0, ctx._fc, ctx._fe);
}

function _f_5(ctx) {
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
  return ctx.jump(void 0, f_44);
}

function forOfCapt6_2(forOfCapt6) {
  var a;

  if (!(forOfCapt6._loop = forOfCapt6._loop.step()).done) {
    forOfCapt6._i = forOfCapt6._loop.value;

    a = (i => {
      var ctx = M.context();
      ctx._i = i;
      return ctx.scope(f_114);
    })(forOfCapt6._i);

    return forOfCapt6.yldStar(a, forOfCapt6_2, forOfCapt6_7);
  } else {
    forOfCapt6._fc = forOfCapt6_4, forOfCapt6._fe = forOfCapt6_5;
    return forOfCapt6.jump(void 0, forOfCapt6_3);
  }
}

function forOfCapt6_3(forOfCapt6) {
  if (forOfCapt6._loop.exit) {
    forOfCapt6._loop.exit();
  }

  return forOfCapt6.jump(void 0, forOfCapt6._fc, forOfCapt6._fe);
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
  return forOfCapt6.jump(void 0, forOfCapt6_3);
}

function forIn_1(forIn) {
  forIn._loop = forIn.forInIterator({
    a: 1
  });
  return forIn.jump(void 0, forIn_2);
}

function forIn_2(forIn) {
  if (!(forIn._loop = forIn._loop.step()).done) {
    forIn._i = forIn._loop.value;
    return forIn.yld(forIn._i, forIn_2);
  } else {
    return forIn.pure();
  }
}

function while1_1(while1) {
  while1._i = 0;
  return while1.jump(void 0, while1_2);
}

function while1_2(while1) {
  var a;
  a = while1._i++;
  return while1.yld(a, while1_3);
}

function while1_3(while1, a) {
  var b;

  if (a < 3) {
    b = while1._i++;
    return while1.yld(b, while1_2);
  } else {
    while1._i = 0;
    return while1.pure();
  }
}

function catchBlock2_1(catchBlock2) {
  catchBlock2._i = 0;
  return catchBlock2.jump(void 0, catchBlock2_2, catchBlock2_8);
}

function catchBlock2_2(catchBlock2) {
  return catchBlock2.yld(catchBlock2._i === 3, catchBlock2_3, catchBlock2_8);
}

function catchBlock2_3(catchBlock2, a) {
  if (a) {
    throw new Error(`AAAAAAAAA${catchBlock2._i++}`);
  }

  return catchBlock2.yld(`a${catchBlock2._i}`, catchBlock2_7);
}

function catchBlock2_4(catchBlock2) {
  catchBlock2._e = catchBlock2._ex;
  return catchBlock2.yld(`e${catchBlock2._i}`, catchBlock2_5);
}

function catchBlock2_5(catchBlock2) {
  return catchBlock2.yld(catchBlock2._e, catchBlock2_6);
}

function catchBlock2_6(catchBlock2) {
  return catchBlock2.pure(catchBlock2._i);
}

function catchBlock2_7(catchBlock2) {
  catchBlock2._i++;
  return catchBlock2.jump(void 0, catchBlock2_2, catchBlock2_8);
}

function catchBlock2_8(catchBlock2, a) {
  catchBlock2._ex = a;
  return catchBlock2.jump(void 0, catchBlock2_4);
}

function closure2_1(closure2) {
  closure2._k = 0;
  closure2._j = 1;
  closure2._m = 0;
  return closure2.yld(closure2._k++ + closure2._j + closure2._m++, closure2_2);
}

function closure2_2(closure2) {
  var a;
  a = closure2._m++;
  return closure2.yld(a, closure2_3);
}

function sub_1(_sub) {
  var a;
  a = _sub._k++;
  return _sub.yld(a, sub_2);
}

function sub_2(_sub, a) {
  var b;
  b = _sub._closure2._j;
  a, b;
  return _sub.pure();
}

function closure2_3(closure2) {
  return closure2.pure(function sub(k) {
    var _sub = M.context();

    _sub._closure2 = closure2;
    _sub._k = k;
    return _sub.scope(sub_1);
  });
}

function switches_1(switches) {
  if (a) {
    return switches.yld(1, switches_2);
  } else {
    return switches.jump(void 0, switches_2);
  }
}

function switches_2(switches) {
  switch (a) {
    case 1:
      return switches.yld(2, switches_3);

    case 2:
      {
        console.log(3);
      }

    default:
      return switches.jump(void 0, switches_4);
  }
}

function switches_3(switches) {
  return switches.yld(3, switches_4);
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
  return switches.jump(void 0, switches_5);
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
      return switches.jump(void 0, switches_7, switches_48);

    default:
      return switches.yld(`f2-${switches._i1}`, switches_6);
  }
}

function switches_6(switches) {
  switches._i1++;
  return switches.jump(void 0, switches_5);
}

function switches_7(switches) {
  if (!(switches._loop = switches._loop.step()).done) {
    switches._i3 = switches._loop.value;

    switch (switches._i3) {
      case 3:
        return switches.yld(`l2-${switches._i3}`, switches_8, switches_48);

      default:
        return switches.jump(void 0, switches_7, switches_48);
    }
  } else {
    switches._fc = switches_10, switches._fe = switches_39;
    return switches.jump(void 0, switches_9);
  }
}

function switches_8(switches) {
  switches._fc = switches_10, switches._fe = switches_39;
  return switches.jump(void 0, switches_9);
}

function switches_9(switches) {
  if (switches._loop.exit) {
    switches._loop.exit();
  }

  return switches.jump(void 0, switches._fc, switches._fe);
}

function switches_10(switches) {
  switches._loop1 = switches.iterator(gen());
  return switches.jump(void 0, switches_11, switches_49);
}

function switches_11(switches) {
  if (!(switches._loop1 = switches._loop1.step()).done) {
    switches._i4 = switches._loop1.value;

    switch (switches._i4) {
      case 3:
        switches._fc1 = switches_13, switches._fe1 = switches_39;
        return switches.jump(void 0, switches_12);

      default:
        return switches.yld(`l3-${switches._i4}`, switches_11, switches_49);
    }
  } else {
    switches._fc1 = switches_13, switches._fe1 = switches_39;
    return switches.jump(void 0, switches_12);
  }
}

function switches_12(switches) {
  if (switches._loop1.exit) {
    switches._loop1.exit();
  }

  return switches.jump(void 0, switches._fc1, switches._fe1);
}

function switches_13(switches) {
  switches._loop2 = switches.iterator(gen());
  return switches.jump(void 0, switches_14, switches_50);
}

function switches_14(switches) {
  if (!(switches._loop2 = switches._loop2.step()).done) {
    switches._i5 = switches._loop2.value;

    switch (switches._i5) {
      case 3:
        switches._fc2 = switches_16, switches._fe2 = switches_39;
        return switches.jump(void 0, switches_15);

      default:
        return switches.yld(`l4-${switches._i5}`, switches_14, switches_50);
    }
  } else {
    switches._fc2 = switches_16, switches._fe2 = switches_39;
    return switches.jump(void 0, switches_15);
  }
}

function switches_15(switches) {
  if (switches._loop2.exit) {
    switches._loop2.exit();
  }

  return switches.jump(void 0, switches._fc2, switches._fe2);
}

function switches_16(switches) {
  switches._loop3 = switches.iterator(gen());
  return switches.jump(void 0, switches_17, switches_51);
}

function switches_17(switches) {
  if (!(switches._loop3 = switches._loop3.step()).done) {
    switches._i6 = switches._loop3.value;
    return switches.yld(`l5-${switches._i6}`, switches_18, switches_51);
  } else {
    switches._fc3 = switches_20, switches._fe3 = switches_39;
    return switches.jump(void 0, switches_19);
  }
}

function switches_18(switches) {
  switch (switches._i6) {
    case 3:
      switches._fc3 = switches_20, switches._fe3 = switches_39;
      return switches.jump(void 0, switches_19);

    default:
      return switches.jump(void 0, switches_17, switches_51);
  }
}

function switches_19(switches) {
  if (switches._loop3.exit) {
    switches._loop3.exit();
  }

  return switches.jump(void 0, switches._fc3, switches._fe3);
}

function switches_20(switches) {
  switches._loop4 = switches.iterator(gen());
  return switches.jump(void 0, switches_21, switches_52);
}

function switches_21(switches) {
  if (!(switches._loop4 = switches._loop4.step()).done) {
    switches._i7 = switches._loop4.value;

    switch (switches._i7) {
      case 3:
        return switches.yld(`l6-1-${switches._i7}`, switches_22, switches_52);

      default:
        return switches.yld(`l6-2-${switches._i7}`, switches_21, switches_52);
    }
  } else {
    switches._fc4 = switches_24, switches._fe4 = switches_39;
    return switches.jump(void 0, switches_23);
  }
}

function switches_22(switches) {
  switches._fc4 = switches_24, switches._fe4 = switches_39;
  return switches.jump(void 0, switches_23);
}

function switches_23(switches) {
  if (switches._loop4.exit) {
    switches._loop4.exit();
  }

  return switches.jump(void 0, switches._fc4, switches._fe4);
}

function switches_24(switches) {
  switches._loop5 = switches.iterator(gen());
  return switches.jump(void 0, switches_25, switches_53);
}

function switches_25(switches) {
  if (!(switches._loop5 = switches._loop5.step()).done) {
    switches._i8 = switches._loop5.value;

    switch (switches._i8) {
      case 0:
        return switches.jump(void 0, switches_25, switches_53);

      case 1:
      case 2:
        return switches.yld(`l7-1-${switches._i8}`, switches_25, switches_53);

      case 3:
        return switches.jump(void 0, switches_25, switches_53);

      case 4:
        return switches.yld(`l7-2-${switches._i8}`, switches_25, switches_53);

      case 5:
        return switches.yld(`l7-3-${switches._i8}`, switches_27, switches_53);

      case 6:
        return switches.jump(void 0, switches_25, switches_53);

      case 7:
        return switches.yld(`l7-4-${switches._i8}`, switches_26, switches_53);

      default:
        return switches.yld(`l7-5-${switches._i8}`, switches_27, switches_53);
    }
  } else {
    switches._fc5 = switches_29, switches._fe5 = switches_39;
    return switches.jump(void 0, switches_28);
  }
}

function switches_26(switches) {
  switches._fc5 = switches_29, switches._fe5 = switches_39;
  return switches.jump(void 0, switches_28);
}

function switches_27(switches) {
  return switches.yld(`l7-6-${switches._i8}`, switches_25, switches_53);
}

function switches_28(switches) {
  if (switches._loop5.exit) {
    switches._loop5.exit();
  }

  return switches.jump(void 0, switches._fc5, switches._fe5);
}

function switches_29(switches) {
  switches._loop6 = switches.iterator(gen());
  return switches.jump(void 0, switches_30, switches_54);
}

function switches_30(switches) {
  if (!(switches._loop6 = switches._loop6.step()).done) {
    switches._i9 = switches._loop6.value;
    switches._loop7 = switches.iterator(gen());
    return switches.jump(void 0, switches_31, switches_55);
  } else {
    switches._fc7 = switches_38, switches._fe7 = switches_39;
    return switches.jump(void 0, switches_37);
  }
}

function switches_31(switches) {
  if (!(switches._loop7 = switches._loop7.step()).done) {
    switches._j = switches._loop7.value;

    switch (switches._i9) {
      case 0:
      case 1:
      case 2:
        return switches.yld(`s1:${switches._i9},${switches._j}`, switches_32, switches_55);

      case 3:
        switch (switches._j) {
          case 2:
          case 3:
            return switches.yld(`s2:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 5:
            return switches.yld(`s3:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 7:
            return switches.yld(`s4:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 8:
            return switches.yld(`s5:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 9:
            return switches.yld(`s6:${switches._i9},${switches._j}`, switches_33, switches_55);

          default:
            return switches.jump(void 0, switches_31, switches_55);
        }

      case 4:
        switch (switches._j) {
          case 2:
          case 3:
            return switches.yld(`s7:${switches._i9},${switches._j}`, switches_35, switches_55);

          case 5:
            return switches.yld(`s8:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 6:
            switches._fc6 = switches_30, switches._fe6 = switches_54;
            return switches.jump(void 0, switches_36, switches_54);

          case 7:
            return switches.yld(`s9:${switches._i9},${switches._j}`, switches_35, switches_55);

          case 8:
            return switches.yld(`s10:${switches._i9},${switches._j}`, switches_31, switches_55);

          case 9:
            return switches.yld(`s11:${switches._i9},${switches._j}`, switches_34, switches_55);

          default:
            return switches.yld(`s12:${switches._i9},${switches._j}`, switches_35, switches_55);
        }

      case 5:
        switch (switches._j) {
          case 2:
          case 3:
            switches._fc6 = switches_37, switches._fe6 = switches_39, switches._fc7 = switches_38, switches._fe7 = switches_39;
            return switches.jump(void 0, switches_36, switches_54);

          default:
            return switches.jump(void 0, switches_31, switches_55);
        }

      default:
        return switches.jump(void 0, switches_31, switches_55);
    }
  } else {
    switches._fc6 = switches_30, switches._fe6 = switches_54;
    return switches.jump(void 0, switches_36, switches_54);
  }
}

function switches_32(switches) {
  if (switches._j > 3) {
    switches._fc6 = switches_30, switches._fe6 = switches_54;
    return switches.jump(void 0, switches_36, switches_54);
  } else {
    return switches.jump(void 0, switches_31, switches_55);
  }
}

function switches_33(switches) {
  switches._fc6 = switches_30, switches._fe6 = switches_54;
  return switches.jump(void 0, switches_36, switches_54);
}

function switches_34(switches) {
  switches._fc6 = switches_37, switches._fe6 = switches_39, switches._fc7 = switches_38, switches._fe7 = switches_39;
  return switches.jump(void 0, switches_36, switches_54);
}

function switches_35(switches) {
  return switches.yld(`s13:${switches._i9},${switches._j}`, switches_31, switches_55);
}

function switches_36(switches) {
  if (switches._loop7.exit) {
    switches._loop7.exit();
  }

  switches._err7 = switches._err8;
  return switches.jump(void 0, switches._fc6, switches._fe6);
}

function switches_37(switches) {
  if (switches._loop6.exit) {
    switches._loop6.exit();
  }

  return switches.jump(void 0, switches._fc7, switches._fe7);
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
  return switches.jump(void 0, switches_9);
}

function switches_49(switches, a) {
  switches._fc1 = switches_41, switches._fe1 = switches_39, switches._err2 = a;
  return switches.jump(void 0, switches_12);
}

function switches_50(switches, a) {
  switches._fc2 = switches_42, switches._fe2 = switches_39, switches._err3 = a;
  return switches.jump(void 0, switches_15);
}

function switches_51(switches, a) {
  switches._fc3 = switches_43, switches._fe3 = switches_39, switches._err4 = a;
  return switches.jump(void 0, switches_19);
}

function switches_52(switches, a) {
  switches._fc4 = switches_44, switches._fe4 = switches_39, switches._err5 = a;
  return switches.jump(void 0, switches_23);
}

function switches_53(switches, a) {
  switches._fc5 = switches_45, switches._fe5 = switches_39, switches._err6 = a;
  return switches.jump(void 0, switches_28);
}

function switches_54(switches, a) {
  switches._fc7 = switches_46, switches._fe7 = switches_39, switches._err7 = a;
  return switches.jump(void 0, switches_37);
}

function switches_55(switches, a) {
  switches._fc6 = switches_37, switches._fe6 = switches_39, switches._fc7 = switches_47, switches._fe7 = switches_39, switches._err8 = a;
  return switches.jump(void 0, switches_36, switches_54);
}