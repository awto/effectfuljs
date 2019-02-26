import * as M from "@effectful/core";

function a() {
  var a = M.context();
  return a.scope(_1);

  function _1(a) {
    return a.pure();
  }

  function _2(a, r) {
    return a.pure(r);
  }
}

function a1() {
  var a1 = M.context();
  return a1.scope(_1);

  function _1(a1) {
    return a1.yld(void 0, _2);
  }

  function _2(a1) {
    return a1.pure();
  }

  function _3(a1, r) {
    return a1.pure(r);
  }
}

function a3() {
  var a3 = M.context();
  return a3.scope(_1);

  function _1(a3) {
    return a3.yld(void 0, _2);
  }

  function _2(a3, a) {
    return a3.pure(a);
  }

  function _3(a3, r) {
    return a3.pure(r);
  }
}

function a2() {
  var a2 = M.context();
  return a2.scope(_1);

  function _1(a2) {
    return a2.yld(1, _2);
  }

  function _2(a2) {
    return a2.pure();
  }

  function _3(a2, r) {
    return a2.pure(r);
  }
}

function a() {
  var a = M.context();
  return a.scope(_1);

  function _1(a) {
    return a.yld(1, _2, _6);
  }

  function _2(a) {
    return a.yld(2, _4);
  }

  function _3(a) {
    var e;
    e = a._ex;
    return a.yld(e, _4);
  }

  function _4(a) {
    return a.pure();
  }

  function _5(a, r) {
    return a.pure(r);
  }

  function _6(a, b) {
    a._ex = b;
    return a.jump(void 0, _3);
  }
}

function d(i) {
  var d = M.context();
  d._i = i;
  return d.scope(_1);

  function _1(d) {
    var a;
    d._j = 0;
    a = d._i++;
    return d.yld(a, _2);
  }

  function _2(d, a) {
    return d.yld(a, _3);
  }

  function _3(d, a) {
    var b;
    b = d._j++;
    return d.pure((a, b));
  }

  function _4(d, r) {
    return d.pure(r);
  }
}

function d2(i) {
  var d2 = M.context();
  d2._i = i;
  return d2.scope(_1);

  function _1(d2) {
    var a;
    d2._j = 0;
    a = d2._i++;
    return d2.yld(a, _2);
  }

  function _2(d2, a) {
    var b;
    b = d2._j++;
    return d2.yld((a, b), _3);
  }

  function _3(d2) {
    return d2.yldStar(some(d2._i += 2, d2._j) + d2._j, _4);
  }

  function _4(d2, a) {
    return d2.yld(a, _5);
  }

  function _5(d2, a) {
    var b;

    if (a) {
      b = d2._i += 3;
      return d2.yldStar(b, _6);
    } else {
      return d2.pure(d2._i);
    }
  }

  function _6(d2, a) {
    return d2.pure(a);
  }

  function _7(d2, r) {
    return d2.pure(r);
  }
}

function a4() {
  var a4 = M.context();
  return a4.scope(_1);

  function _1(a4) {
    return a4.yld(1, _2, _17);
  }

  function _2(a4) {
    return a4.yld(2, _3, _17);
  }

  function _3(a4) {
    a4._fc = _9, a4._fe = _14;
    return a4.yld(3, _7);
  }

  function _4(a4) {
    a4._e = a4._ex;
    return a4.yld("excep", _5, _18);
  }

  function _5(a4) {
    return a4.yld(a4._e, _6, _18);
  }

  function _6(a4, a) {
    if (a) {
      a4._fc = _15, a4._fe = _14, a4._r = 10;
      return a4.jump(void 0, _7);
    } else {
      a4._fc = _9, a4._fe = _14;
      return a4.jump(void 0, _7);
    }
  }

  function _7(a4) {
    return a4.yld("f", _8);
  }

  function _8(a4) {
    return a4.yld("e", a4._fc, a4._fe);
  }

  function _9(a4) {
    var a;
    a4._ = a1;
    a = a2();
    return a4.yldStar(a, _10);
  }

  function _10(a4, b) {
    var a;
    a4._1 = b;
    a = a3();
    return a4.yldStar(a, _11);
  }

  function _11(a4, b) {
    var a;
    a = a4._(a4._1, b);
    return a4.yld(a, _12);
  }

  function _12(a4) {
    return a4.pure();
  }

  function _13(a4, r) {
    return a4.pure(r);
  }

  function _14(a4, e) {
    return a4.raise(e);
  }

  function _15(a4) {
    return a4.jump(a4._r, _13);
  }

  function _16(a4) {
    return a4.raise(a4._err1);
  }

  function _17(a4, a) {
    a4._ex = a;
    return a4.jump(void 0, _4, _18);
  }

  function _18(a4, a) {
    a4._fc = _16, a4._fe = _14, a4._err1 = a;
    return a4.jump(void 0, _7);
  }
}

function a5() {
  var a5 = M.context();
  return a5.scope(_1);

  function _1(a5) {
    a5._loop = a5.iterator(a4());
    return a5.jump(void 0, _2, _8);
  }

  function _2(a5) {
    if (!(a5._loop = a5._loop.step()).done) {
      a5._i = a5._loop.value;
      return a5.yld(a5._i, _2, _8);
    } else {
      a5._fc = _4, a5._fe = _6;
      return a5.jump(void 0, _3);
    }
  }

  function _3(a5) {
    if (a5._loop.exit) {
      a5._loop.exit();
    }

    return a5.jump(void 0, a5._fc, a5._fe);
  }

  function _4(a5) {
    return a5.pure();
  }

  function _5(a5, r) {
    return a5.pure(r);
  }

  function _6(a5, e) {
    return a5.raise(e);
  }

  function _7(a5) {
    return a5.raise(a5._err1);
  }

  function _8(a5, a) {
    a5._fc = _7, a5._fe = _6, a5._err1 = a;
    return a5.jump(void 0, _3);
  }
}

function a6() {
  var a6 = M.context();
  return a6.scope(_1);

  function _1(a6) {
    return a6.yld(1, _2, _14);
  }

  function _2(a6) {
    return a6.yld(2, _3, _15);
  }

  function _3(a6) {
    return a6.yld(3, _4, _15);
  }

  function _4(a6, a) {
    if (a) {
      a6._fc1 = _11, a6._fe1 = _10, a6._r = 10;
      return a6.jump(void 0, _5, _16);
    } else {
      a6._fc1 = _7, a6._fe1 = _10;
      return a6.yld(4, _5, _16);
    }
  }

  function _5(a6) {
    a6._err1 = a6._err2;
    return a6.yld("f1", _6);
  }

  function _6(a6) {
    return a6.yld("f2", a6._fc1, a6._fe1);
  }

  function _7(a6) {
    return a6.yld(5, _8);
  }

  function _8(a6) {
    return a6.pure();
  }

  function _9(a6, r) {
    return a6.pure(r);
  }

  function _10(a6, e) {
    return a6.raise(e);
  }

  function _11(a6) {
    return a6.jump(a6._r, _9);
  }

  function _12(a6) {
    return a6.raise(a6._err1);
  }

  function _13(a6) {
    return a6.raise(a6._err2);
  }

  function _14(a6, a) {
    a6._fc1 = _12, a6._fe1 = _10, a6._err1 = a;
    return a6.jump(void 0, _6);
  }

  function _15(a6, a) {
    a6._fc1 = _13, a6._fe1 = _10, a6._err2 = a;
    return a6.jump(void 0, _5, _16);
  }

  function _16(a6, a) {
    a6._fc1 = _12, a6._fe1 = _10, a6._err1 = a;
    return a6.jump(void 0, _6);
  }
}

function a1() {
  var a1 = M.context();
  return a1.scope(_1);

  function _1(a1) {
    return a1.yld(1, _2);
  }

  function _2(a1) {
    return a1.pure(2);
  }

  function _3(a1, r) {
    return a1.pure(r);
  }
}

function a2() {
  var a2 = M.context();
  return a2.scope(_1);

  function _1(a2) {
    a2._loop = a2.iterator(a4());
    return a2.jump(void 0, _2, _9);
  }

  function _2(a2) {
    if (!(a2._loop = a2._loop.step()).done) {
      a2._i = a2._loop.value;
      return a2.yld(a2._i, _2, _9);
    } else {
      a2._fc = _4, a2._fe = _7;
      return a2.jump(void 0, _3);
    }
  }

  function _3(a2) {
    if (a2._loop.exit) {
      a2._loop.exit();
    }

    return a2.jump(void 0, a2._fc, a2._fe);
  }

  function _4(a2) {
    return a2.yld(10, _5);
  }

  function _5(a2) {
    return a2.pure();
  }

  function _6(a2, r) {
    return a2.pure(r);
  }

  function _7(a2, e) {
    return a2.raise(e);
  }

  function _8(a2) {
    return a2.raise(a2._err1);
  }

  function _9(a2, a) {
    a2._fc = _8, a2._fe = _7, a2._err1 = a;
    return a2.jump(void 0, _3);
  }
}

function a3() {
  var a3 = M.context();
  return a3.scope(_1);

  function _1(a3) {
    a3._loop = a3.iterator(a4());
    return a3.jump(void 0, _2, _8);
  }

  function _2(a3) {
    if (!(a3._loop = a3._loop.step()).done) {
      a3._i = a3._loop.value;
      return a3.yld(a3._i, _2, _8);
    } else {
      a3._fc = _4, a3._fe = _6;
      return a3.jump(void 0, _3);
    }
  }

  function _3(a3) {
    if (a3._loop.exit) {
      a3._loop.exit();
    }

    return a3.jump(void 0, a3._fc, a3._fe);
  }

  function _4(a3) {
    return a3.pure();
  }

  function _5(a3, r) {
    return a3.pure(r);
  }

  function _6(a3, e) {
    return a3.raise(e);
  }

  function _7(a3) {
    return a3.raise(a3._err1);
  }

  function _8(a3, a) {
    a3._fc = _7, a3._fe = _6, a3._err1 = a;
    return a3.jump(void 0, _3);
  }
}

function a6() {
  var a6 = M.context();
  return a6.scope(_1);

  function _1(a6) {
    a6._i = 0;
    return a6.jump(void 0, _2);
  }

  function _2(a6) {
    var a;
    a = a6._i++;
    return a6.yld(a, _3);
  }

  function _3(a6, a) {
    if (a === "exit") {
      return a6.pure(100);
    } else {
      return a6.jump(void 0, _2);
    }
  }

  function _4(a6, r) {
    return a6.pure(r);
  }
}

function a7() {
  var a7 = M.context();
  return a7.scope(_1);

  function _1(a7) {
    return a7.yld(1, _2);
  }

  function _2(a7, a) {
    if (a) {
      return a7.yld("A", _3);
    } else {
      return a7.yld("c", _5);
    }
  }

  function _3(a7, a) {
    a7._1 = a;
    return a7.yld("b", _4);
  }

  function _4(a7, a) {
    a7._ = a7._1 && a;
    return a7.jump(void 0, _8);
  }

  function _5(a7, a) {
    a7._2 = a;
    return a7.yld("d", _6);
  }

  function _6(a7, a) {
    if (a) {
      return a7.yld("e", _7);
    } else {
      return a7.jump(a, _7);
    }
  }

  function _7(a7, a) {
    a7._ = a7._2 || a;
    return a7.jump(void 0, _8);
  }

  function _8(a7) {
    return a7.pure(a7._);
  }

  function _9(a7, r) {
    return a7.pure(r);
  }
}

function a7_1() {
  var a7_1 = M.context();
  return a7_1.scope(_1);

  function _1(a7_1) {
    return a7_1.yld(1, _2);
  }

  function _2(a7_1, a) {
    if (a) {
      return a7_1.yld("A", _3);
    } else {
      return a7_1.yld("c", _5);
    }
  }

  function _3(a7_1, a) {
    a7_1._1 = a;
    return a7_1.yld("b", _4);
  }

  function _4(a7_1, a) {
    a7_1._ = a7_1._1 && a;
    return a7_1.jump(void 0, _8);
  }

  function _5(a7_1, a) {
    a7_1._2 = a;
    return a7_1.yld("d", _6);
  }

  function _6(a7_1, a) {
    if (a) {
      return a7_1.yld("e", _7);
    } else {
      return a7_1.jump(a, _7);
    }
  }

  function _7(a7_1, a) {
    a7_1._ = a7_1._2 || a;
    return a7_1.jump(void 0, _8);
  }

  function _8(a7_1) {
    return a7_1.yld(2, _9);
  }

  function _9(a7_1, a) {
    return a7_1.yld(a7_1._ + a, _10);
  }

  function _10(a7_1, a) {
    return a7_1.pure(a);
  }

  function _11(a7_1, r) {
    return a7_1.pure(r);
  }
}

function a7_2() {
  var a7_2 = M.context();
  return a7_2.scope(_1);

  function _1(a7_2) {
    return a7_2.yld(1, _2);
  }

  function _2(a7_2, a) {
    if (a) {
      return a7_2.yld("A", _3);
    } else {
      return a7_2.yld("c", _5);
    }
  }

  function _3(a7_2, a) {
    a7_2._1 = a;
    return a7_2.yld("b", _4);
  }

  function _4(a7_2, a) {
    a7_2._ = a7_2._1 && a;
    return a7_2.jump(void 0, _8);
  }

  function _5(a7_2, a) {
    a7_2._2 = a;
    return a7_2.yld("d", _6);
  }

  function _6(a7_2, a) {
    if (a) {
      return a7_2.yld("e", _7);
    } else {
      return a7_2.jump(a, _7);
    }
  }

  function _7(a7_2, a) {
    a7_2._ = a7_2._2 || a;
    return a7_2.jump(void 0, _8);
  }

  function _8(a7_2) {
    return a7_2.yld(2, _9);
  }

  function _9(a7_2, a) {
    return a7_2.yld(a7_2._ + a, _10);
  }

  function _10(a7_2) {
    return a7_2.yld("ex", _11);
  }

  function _11(a7_2) {
    return a7_2.pure();
  }

  function _12(a7_2, r) {
    return a7_2.pure(r);
  }
}

function a7_3() {
  var a7_3 = M.context();
  return a7_3.scope(_1);

  function _1(a7_3) {
    return a7_3.yld(1, _2);
  }

  function _2(a7_3, a) {
    if (a % 2) {
      return a7_3.yld("A", _3);
    } else {
      return a7_3.yld("c", _5);
    }
  }

  function _3(a7_3, a) {
    a7_3._ = a;
    return a7_3.yld("b", _4);
  }

  function _4(a7_3, a) {
    return a7_3.jump(a7_3._ && a, _5);
  }

  function _5(a7_3) {
    return a7_3.yld(2, _6);
  }

  function _6(a7_3) {
    return a7_3.pure();
  }

  function _7(a7_3, r) {
    return a7_3.pure(r);
  }
}

function a7_4() {
  var a7_4 = M.context();
  return a7_4.scope(_1);

  function _1(a7_4) {
    if (1) {
      return a7_4.yld(2, _4);
    } else {
      return a7_4.yld(3, _2);
    }
  }

  function _2(a7_4, a) {
    a7_4._ = a;
    return a7_4.yld(4, _3);
  }

  function _3(a7_4, a) {
    return a7_4.jump((a7_4._, a), _4);
  }

  function _4(a7_4, a) {
    return a7_4.yld(a, _5);
  }

  function _5(a7_4, a) {
    return a7_4.yld(a, _6);
  }

  function _6(a7_4, a) {
    return a7_4.pure(a);
  }

  function _7(a7_4, r) {
    return a7_4.pure(r);
  }
}

function a7_5() {
  var a7_5 = M.context();
  return a7_5.scope(_1);

  function _1(a7_5) {
    return a7_5.yld(1, _2);
  }

  function _2(a7_5, a) {
    if (a) {
      return a7_5.yld(2, _3);
    } else {
      return a7_5.yld(3, _3);
    }
  }

  function _3(a7_5, a) {
    return a7_5.yld(a, _4);
  }

  function _4(a7_5, a) {
    return a7_5.pure(a);
  }

  function _5(a7_5, r) {
    return a7_5.pure(r);
  }
}

function a7_6() {
  var a7_6 = M.context();
  return a7_6.scope(_1);

  function _1(a7_6) {
    return a7_6.yld(1, _2);
  }

  function _2(a7_6, a) {
    if (a) {
      return a7_6.yld("A", _3);
    } else {
      a7_6._ = 1;
      return a7_6.jump(void 0, _5);
    }
  }

  function _3(a7_6, a) {
    a7_6._1 = a;
    return a7_6.yld("b", _4);
  }

  function _4(a7_6, a) {
    a7_6._ = a7_6._1 && a;
    return a7_6.jump(void 0, _5);
  }

  function _5(a7_6) {
    return a7_6.yld(a7_6._, _6);
  }

  function _6(a7_6, a) {
    return a7_6.pure(a);
  }

  function _7(a7_6, r) {
    return a7_6.pure(r);
  }
}

function finallyBlock1() {
  var finallyBlock1 = M.context();
  return finallyBlock1.scope(_1);

  function _1(finallyBlock1) {
    finallyBlock1._i = 0;
    return finallyBlock1.jump(void 0, _2, _10);
  }

  function _2(finallyBlock1) {
    return finallyBlock1.yld(finallyBlock1._i++ === 3, _3, _10);
  }

  function _3(finallyBlock1, a) {
    if (a) {
      finallyBlock1._fc = _8, finallyBlock1._fe = _7;
      return finallyBlock1.jump(void 0, _4);
    } else {
      return finallyBlock1.jump(void 0, _2, _10);
    }
  }

  function _4(finallyBlock1) {
    return finallyBlock1.yld("exit", _5);
  }

  function _5(finallyBlock1) {
    return finallyBlock1.yld(finallyBlock1._i, finallyBlock1._fc, finallyBlock1._fe);
  }

  function _6(finallyBlock1, r) {
    return finallyBlock1.pure(r);
  }

  function _7(finallyBlock1, e) {
    return finallyBlock1.raise(e);
  }

  function _8(finallyBlock1) {
    return finallyBlock1.jump(finallyBlock1._r, _6);
  }

  function _9(finallyBlock1) {
    return finallyBlock1.raise(finallyBlock1._err1);
  }

  function _10(finallyBlock1, a) {
    finallyBlock1._fc = _9, finallyBlock1._fe = _7, finallyBlock1._err1 = a;
    return finallyBlock1.jump(void 0, _4);
  }
}

function ae() {
  var ae = M.context();
  return ae.scope(_1);

  function _1(ae) {
    return ae.yld(1, _2);
  }

  function _2(ae) {
    return ae.yld(2, _3);
  }

  function _3(ae) {
    return ae.yld(3, _4);
  }

  function _4(ae, a) {
    if (a) {
      return ae.pure(1);
    } else {
      return ae.pure(2);
    }
  }

  function _5(ae, r) {
    return ae.pure(r);
  }
}

function cfb() {
  var cfb = M.context();
  return cfb.scope(_1);

  function _1(cfb) {
    cfb._i = 0;
    return cfb.jump(void 0, _2, _13);
  }

  function _2(cfb) {
    return cfb.yld(cfb._i++ === 3, _3, _13);
  }

  function _3(cfb, a) {
    if (a) {
      throw new Error(`AAAAAAAAA${cfb._i++}`);
    }

    cfb._fc = _8, cfb._fe = _10;
    return cfb.yld(`a${cfb._i++}`, _7);
  }

  function _4(cfb) {
    cfb._e = cfb._ex;
    return cfb.yld(`e${cfb._i++}`, _5, _14);
  }

  function _5(cfb) {
    return cfb.yld(cfb._e, _6, _14);
  }

  function _6(cfb) {
    cfb._fc = _11, cfb._fe = _10, cfb._r = cfb._i++;
    return cfb.jump(void 0, _7);
  }

  function _7(cfb) {
    return cfb.yld(`f1${cfb._i++}`, cfb._fc, cfb._fe);
  }

  function _8(cfb) {
    return cfb.pure();
  }

  function _9(cfb, r) {
    return cfb.pure(r);
  }

  function _10(cfb, e) {
    return cfb.raise(e);
  }

  function _11(cfb) {
    return cfb.jump(cfb._r, _9);
  }

  function _12(cfb) {
    return cfb.raise(cfb._err1);
  }

  function _13(cfb, a) {
    cfb._ex = a;
    return cfb.jump(void 0, _4, _14);
  }

  function _14(cfb, a) {
    cfb._fc = _12, cfb._fe = _10, cfb._err1 = a;
    return cfb.jump(void 0, _7);
  }
}

function cfb1() {
  var cfb1 = M.context();
  return cfb1.scope(_1);

  function _1(cfb1) {
    cfb1._i = 0;
    return cfb1.jump(void 0, _2, _11);
  }

  function _2(cfb1) {
    return cfb1.yld(cfb1._i, _3, _11);
  }

  function _3(cfb1) {
    throw new Error(`AAAAAAAAA${cfb1._i++}`);
  }

  function _4(cfb1) {
    var e;
    e = cfb1._ex;
    cfb1._fc = _9, cfb1._fe = _8, cfb1._r = cfb1._i++;
    return cfb1.jump(void 0, _5);
  }

  function _5(cfb1) {
    console.log(`f${cfb1._i}`);
    return cfb1.jump(void 0, cfb1._fc, cfb1._fe);
  }

  function _6(cfb1) {
    return cfb1.pure();
  }

  function _7(cfb1, r) {
    return cfb1.pure(r);
  }

  function _8(cfb1, e) {
    return cfb1.raise(e);
  }

  function _9(cfb1) {
    return cfb1.jump(cfb1._r, _7);
  }

  function _10(cfb1) {
    return cfb1.raise(cfb1._err1);
  }

  function _11(cfb1, a) {
    cfb1._ex = a;
    return cfb1.jump(void 0, _4, _12);
  }

  function _12(cfb1, a) {
    cfb1._fc = _10, cfb1._fe = _8, cfb1._err1 = a;
    return cfb1.jump(void 0, _5);
  }
}

function cfb1() {
  var cfb1 = M.context();
  return cfb1.scope(_1);

  function _1(cfb1) {
    cfb1._i = 0;
    return cfb1.jump(void 0, _2, _7);
  }

  function _2(cfb1) {
    return cfb1.yld(cfb1._i, _3, _7);
  }

  function _3(cfb1) {
    return cfb1.yld(5, _5);
  }

  function _4(cfb1) {
    var e;
    e = cfb1._ex;
    return cfb1.pure(cfb1._i++);
  }

  function _5(cfb1) {
    return cfb1.pure();
  }

  function _6(cfb1, r) {
    return cfb1.pure(r);
  }

  function _7(cfb1, a) {
    cfb1._ex = a;
    return cfb1.jump(void 0, _4);
  }
}

function cfb2() {
  var cfb2 = M.context();
  return cfb2.scope(_1);

  function _1(cfb2) {
    cfb2._i = 0;
    return cfb2.jump(void 0, _2, _11);
  }

  function _2(cfb2) {
    return cfb2.yld(`a:${cfb2._i++}`, _3, _11);
  }

  function _3(cfb2) {
    return cfb2.yld(`b:${cfb2._i++}`, _4, _11);
  }

  function _4(cfb2) {
    cfb2._fc = _8, cfb2._fe = _10;
    return cfb2.yld(`c:${cfb2._i++}`, _5, _12);
  }

  function _5(cfb2) {
    cfb2._ex = cfb2._err1;
    return cfb2.yld(`f:${cfb2._i++}`, cfb2._fc, cfb2._fe);
  }

  function _6(cfb2) {
    var e;
    e = cfb2._ex;
    return cfb2.yld(e, _7);
  }

  function _7(cfb2) {
    return cfb2.yld(`e:${cfb2._i++}`, _8);
  }

  function _8(cfb2) {
    return cfb2.pure();
  }

  function _9(cfb2, r) {
    return cfb2.pure(r);
  }

  function _10(cfb2, e) {
    return cfb2.raise(e);
  }

  function _11(cfb2, a) {
    cfb2._fc = _6, cfb2._fe = _10, cfb2._err1 = a;
    return cfb2.jump(void 0, _5, _12);
  }

  function _12(cfb2, a) {
    cfb2._ex = a;
    return cfb2.jump(void 0, _6);
  }
}

function cfb3() {
  var cfb3 = M.context();
  return cfb3.scope(_1);

  function _1(cfb3) {
    cfb3._i = 0;
    return cfb3.jump(void 0, _2, _13);
  }

  function _2(cfb3) {
    return cfb3.yld(cfb3._i === 3, _3, _13);
  }

  function _3(cfb3, a) {
    if (a) {
      throw new Error(`AAAAAAAAA${cfb3._i++}`);
    }

    cfb3._fc = _5, cfb3._fe = _12;
    return cfb3.yld(`a${cfb3._i}`, _4, _14);
  }

  function _4(cfb3) {
    cfb3._ex = cfb3._err1;
    return cfb3.yld(`f1${cfb3._i++}`, cfb3._fc, cfb3._fe);
  }

  function _5(cfb3) {
    return cfb3.yld(`b${cfb3._i++}`, _9);
  }

  function _6(cfb3) {
    cfb3._e = cfb3._ex;
    return cfb3.yld(`e${cfb3._i}`, _7);
  }

  function _7(cfb3) {
    return cfb3.yld(cfb3._e, _8);
  }

  function _8(cfb3) {
    return cfb3.pure(cfb3._i);
  }

  function _9(cfb3) {
    cfb3._i++;
    return cfb3.jump(void 0, _2, _13);
  }

  function _10(cfb3, r) {
    return cfb3.pure(r);
  }

  function _11(cfb3, e) {
    return cfb3.raise(e);
  }

  function _12(cfb3, a) {
    cfb3._ex = a;
    return cfb3.jump(void 0, _6);
  }

  function _13(cfb3, a) {
    cfb3._fc = _6, cfb3._fe = _11, cfb3._err1 = a;
    return cfb3.jump(void 0, _4, _14);
  }

  function _14(cfb3, a) {
    cfb3._ex = a;
    return cfb3.jump(void 0, _6);
  }
}

function cfb4() {
  var cfb4 = M.context();
  return cfb4.scope(_1, _5);

  function _1(cfb4) {
    return cfb4.yld(5, _3);
  }

  function _2(cfb4) {
    var e;
    e = cfb4._ex;
    return cfb4.pure(10);
  }

  function _3(cfb4) {
    return cfb4.pure();
  }

  function _4(cfb4, r) {
    return cfb4.pure(r);
  }

  function _5(cfb4, a) {
    cfb4._ex = a;
    return cfb4.jump(void 0, _2);
  }
}

function cfb2() {
  var cfb2 = M.context();
  return cfb2.scope(_1);

  function _1(cfb2) {
    cfb2._i = 0;
    return cfb2.jump(void 0, _2, _9);
  }

  function _2(cfb2) {
    cfb2._fc = _6, cfb2._fe = _8;
    return cfb2.yld(`c:${cfb2._i++}`, _3, _10);
  }

  function _3(cfb2) {
    cfb2._ex = cfb2._err1;
    return cfb2.yld(`f:${cfb2._i++}`, cfb2._fc, cfb2._fe);
  }

  function _4(cfb2) {
    var e;
    e = cfb2._ex;
    return cfb2.yld(e, _5);
  }

  function _5(cfb2) {
    return cfb2.yld(`e:${cfb2._i++}`, _6);
  }

  function _6(cfb2) {
    return cfb2.pure();
  }

  function _7(cfb2, r) {
    return cfb2.pure(r);
  }

  function _8(cfb2, e) {
    return cfb2.raise(e);
  }

  function _9(cfb2, a) {
    cfb2._fc = _4, cfb2._fe = _8, cfb2._err1 = a;
    return cfb2.jump(void 0, _3, _10);
  }

  function _10(cfb2, a) {
    cfb2._ex = a;
    return cfb2.jump(void 0, _4);
  }
}

function cfb6() {
  var cfb6 = M.context();
  return cfb6.scope(_1, _10);

  function _1(cfb6) {
    cfb6._fc = _5, cfb6._fe = _7;
    return cfb6.yld(1, _4);
  }

  function _2(cfb6) {
    var e;
    e = cfb6._ex;
    return cfb6.yld(2, _3, _11);
  }

  function _3(cfb6) {
    cfb6._fc = _8, cfb6._fe = _7, cfb6._r = 3;
    return cfb6.jump(void 0, _4);
  }

  function _4(cfb6) {
    return cfb6.yld(4, cfb6._fc, cfb6._fe);
  }

  function _5(cfb6) {
    return cfb6.pure();
  }

  function _6(cfb6, r) {
    return cfb6.pure(r);
  }

  function _7(cfb6, e) {
    return cfb6.raise(e);
  }

  function _8(cfb6) {
    return cfb6.jump(cfb6._r, _6);
  }

  function _9(cfb6) {
    return cfb6.raise(cfb6._err1);
  }

  function _10(cfb6, a) {
    cfb6._ex = a;
    return cfb6.jump(void 0, _2, _11);
  }

  function _11(cfb6, a) {
    cfb6._fc = _9, cfb6._fe = _7, cfb6._err1 = a;
    return cfb6.jump(void 0, _4);
  }
}

function fb4() {
  var fb4 = M.context();
  return fb4.scope(_1);

  function _1(fb4) {
    fb4._i = 0;
    return fb4.jump(void 0, _2, _10);
  }

  function _2(fb4) {
    var a;
    a = fb4._i++;
    return fb4.yld(a, _3, _10);
  }

  function _3(fb4, a) {
    if (a === 3) {
      fb4._fc = _8, fb4._fe = _7, fb4._r = fb4._i;
      return fb4.jump(void 0, _4);
    } else {
      return fb4.jump(void 0, _2, _10);
    }
  }

  function _4(fb4) {
    return fb4.yld("exit", _5);
  }

  function _5(fb4) {
    return fb4.yld(fb4._i, fb4._fc, fb4._fe);
  }

  function _6(fb4, r) {
    return fb4.pure(r);
  }

  function _7(fb4, e) {
    return fb4.raise(e);
  }

  function _8(fb4) {
    return fb4.jump(fb4._r, _6);
  }

  function _9(fb4) {
    return fb4.raise(fb4._err1);
  }

  function _10(fb4, a) {
    fb4._fc = _9, fb4._fe = _7, fb4._err1 = a;
    return fb4.jump(void 0, _4);
  }
}

function while2() {
  var while2 = M.context();
  return while2.scope(_1);

  function _1(while2) {
    while2._i = 0;
    return while2.jump(void 0, _2);
  }

  function _2(while2) {
    var a;
    a = while2._i++;
    return while2.yld(a, _3);
  }

  function _3(while2, a) {
    var b;

    if (a < 3) {
      b = while2._i++;
      return while2.yld(b, _2);
    } else {
      return while2.pure();
    }
  }

  function _4(while2, r) {
    return while2.pure(r);
  }
}

function for2() {
  var for2 = M.context();
  return for2.scope(_1);

  function _1(for2) {
    return for2.yld(void 0, _2);
  }

  function _2(for2, a) {
    for2._i = a;
    return for2.jump(void 0, _3);
  }

  function _3(for2) {
    return for2.yld(for2._i, _4);
  }

  function _4(for2, a) {
    if (a < 10) {
      return for2.yld(for2._i, _5);
    } else {
      return for2.pure();
    }
  }

  function _5(for2) {
    for2._i++;
    return for2.jump(void 0, _3);
  }

  function _6(for2, r) {
    return for2.pure(r);
  }
}

function c1() {
  var a = function _a() {
    var a = M.context();

    a._b = function _b() {
      var b = M.context();
      b._c1 = c1;
      return b.scope(_1);

      function _1(b) {
        return b.pure(function c() {
          var _c = M.context();

          _c._c1 = c1;
          return _c.scope(_1);

          function _1(_c) {
            _c._c1._i++;
            return _c.pure();
          }

          function _2(_c, r) {
            return _c.pure(r);
          }
        });
      }

      function _2(b, r) {
        return b.pure(r);
      }
    };

    return a.scope(_1);

    function _1(a) {
      return a.pure();
    }

    function _2(a, r) {
      return a.pure(r);
    }
  },
      c1 = {};

  c1._i = 0;
}

function c2() {
  let i = 0;

  function inner() {
    var a = function a() {
      var b, r;
      return M.scope(_1);

      function _1() {
        b = i;
        return M.yldStar(M.yld(`a:${i}`), _2);
      }

      function _2(c) {
        var a;
        a = i = b + c;
        return M.pure(a);
      }

      function _3(r) {
        return M.pure(r);
      }
    },
        b,
        k,
        f,
        j,
        loop,
        fc,
        fe,
        r,
        err;

    return M.scope(_1);

    function _1() {
      b = () => {
        function a() {
          i += 2;
          return i;
        }

        {
          let j = 10;

          function b() {
            i += j;
          }

          i++;
          return function z() {
            var d,
                c = function c() {
              return i += this.something;
            },
                r;

            return M.scope(_1);

            function _1() {
              d = function z(j) {
                return i += j;
              };

              return M.yldStar(c(), _2);
            }

            function _2(a) {
              return M.yldStar(d(a), _3);
            }

            function _3(a) {
              return M.yldStar(M.yldStar(a), _4);
            }

            function _4(a) {
              return M.yldStar(M.yld(`b:${a}`), _5);
            }

            function _5() {
              return M.pure(function z(j) {
                var c, d, r;
                return M.scope(_1);

                function _1() {
                  var b;
                  c = i;
                  b = a;
                  return M.yldStar(b(), _2);
                }

                function _2(c) {
                  var a;
                  d = c;
                  a = b;
                  return M.yldStar(a(), _3);
                }

                function _3(b) {
                  var a;
                  a = i = c + (j + d + b);
                  return M.pure(a);
                }

                function _4(r) {
                  return M.pure(r);
                }
              });
            }

            function _6(r) {
              return M.pure(r);
            }
          };
        }
      };

      k = 1;
      return M.yldStar(b(), _2);
    }

    function _2(b) {
      f = [a, b];
      loop = M.iterator(f);
      return M.jump(void 0, _3, _11);
    }

    function _3() {
      if (!(loop = loop.step()).done) {
        j = loop.value;
        return M.yldStar(j(), _4, _11);
      } else {
        fc = _7, fe = _9;
        return M.jump(void 0, _6);
      }
    }

    function _4(a) {
      return M.yldStar(M.yldStar(a), _5, _11);
    }

    function _5(a) {
      k += a;
      return M.jump(void 0, _3, _11);
    }

    function _6() {
      if (loop.exit) {
        loop.exit();
      }

      return M.jump(void 0, fc, fe);
    }

    function _7() {
      return M.pure(k);
    }

    function _8(r) {
      return M.pure(r);
    }

    function _9(e) {
      return M.raise(e);
    }

    function _10() {
      return M.raise(err);
    }

    function _11(a) {
      fc = _10, fe = _9, err = a;
      return M.jump(void 0, _6);
    }
  }

  return inner;
}

function c1() {
  var i, r;
  return M.scope(_1);

  function _1() {
    i = 0;
    return M.yldStar(M.yld(`a:${i}`), _2);
  }

  function _2(a) {
    return M.pure(a);
  }

  function _3(r) {
    return M.pure(r);
  }
}

function c2() {
  var i, r;
  return M.scope(_1);

  function _1() {
    i = 0;
    return M.yldStar(M.yld(`a:${i}`), _2);
  }

  function _2(b) {
    var a;
    a = i += b;
    return M.pure(a);
  }

  function _3(r) {
    return M.pure(r);
  }
}

function forOf() {
  var i, loop, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    loop = M.iterator([1, 2, 3]);
    return M.jump(void 0, _2, _8);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.yldStar(M.yld(i), _2, _8);
    } else {
      fc = _4, fe = _6;
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _4() {
    return M.pure();
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _6, err = a;
    return M.jump(void 0, _3);
  }
}

const objMethods = {
  a() {
    var r;
    return M.scope(_1);

    function _1() {
      return M.yldStar(M.yld(10), _2);
    }

    function _2() {
      return M.pure();
    }

    function _3(r) {
      return M.pure(r);
    }
  },

  b() {
    var _this = this,
        _args = arguments,
        r;

    return M.scope(_1);

    function _1() {
      return M.yldStar(M.yld(1), _2);
    }

    function _2() {
      return M.yldStar(M.yld(_this), _3);
    }

    function _3() {
      return M.yldStar(M.yld(_args), _4);
    }

    function _4() {
      return M.pure();
    }

    function _5(r) {
      return M.pure(r);
    }
  }

};
const objM = {
  objMethod() {
    var r;
    return M.scope(_1);

    function _1() {
      return M.yldStar(M.yld(1), _2);
    }

    function _2() {
      return M.pure();
    }

    function _3(r) {
      return M.pure(r);
    }
  }

};

function objMethodsClosure() {
  var i, k, m, r;
  return M.scope(_1);

  function _1() {
    i = 0;
    k = 0;
    m = 0;
    return M.pure({
      objMethod1(k) {
        var j, r;
        return M.scope(_1);

        function _1() {
          var a;
          j = 0;
          a = i++;
          return M.yldStar(M.yld(a), _2);
        }

        function _2() {
          var a;
          a = k++;
          return M.yldStar(M.yld(a), _3);
        }

        function _3() {
          var a;
          a = m++;
          return M.yldStar(M.yld(a), _4);
        }

        function _4() {
          return M.pure({
            objMethod2(m) {
              var r;
              return M.scope(_1);

              function _1() {
                var a;
                a = j++;
                return M.yldStar(M.yld(a), _2);
              }

              function _2() {
                var a;
                a = k++;
                return M.yldStar(M.yld(a), _3);
              }

              function _3() {
                var a;
                a = m++;
                return M.yldStar(M.yld(a), _4);
              }

              function _4() {
                return M.pure();
              }

              function _5(r) {
                return M.pure(r);
              }
            }

          });
        }

        function _5(r) {
          return M.pure(r);
        }
      }

    });
  }

  function _2(r) {
    return M.pure(r);
  }
}

const objMThis = {
  [objMethod(a)]() {
    var _this = this,
        _args = arguments,
        r;

    return M.scope(_1);

    function _1() {
      return M.yldStar(M.yld(_this), _2);
    }

    function _2() {
      return M.yldStar(M.yld(_this), _3);
    }

    function _3() {
      var a;
      a = _args[0];
      return M.yldStar(M.yld(a), _4);
    }

    function _4() {
      return M.pure();
    }

    function _5(r) {
      return M.pure(r);
    }
  }

};

class SomeClass {
  f(i) {
    var _this = this,
        _args = arguments,
        r;

    return M.scope(_1);

    function _1() {
      return M.yldStar(M.yld(i), _2);
    }

    function _2() {
      return M.yldStar(M.yld(_args), _3);
    }

    function _3() {
      return M.yldStar(M.yld(_this), _4);
    }

    function _4() {
      return M.pure();
    }

    function _5(r) {
      return M.pure(r);
    }
  }

}

class SomeChild extends SomeClass {
  f(i) {
    var _this = this,
        _args = arguments,
        r;

    return M.scope(_1);

    function _1() {
      return M.yldStar(M.yld(i), _2);
    }

    function _2() {
      return M.yldStar(M.yld(_args), _3);
    }

    function _3() {
      var a;
      a = Object.getPrototypeOf(SomeChild.prototype)[i].call(_this, i);
      return M.yldStar(M.yldStar(a), _4);
    }

    function _4() {
      return M.pure();
    }

    function _5(r) {
      return M.pure(r);
    }
  }

  static f(i) {
    var _this = this,
        r;

    return M.scope(_1);

    function _1() {
      var a;
      a = Object.getPrototypeOf(SomeChild.prototype)[i].call(_this, i);
      return M.yldStar(M.yldStar(a), _2);
    }

    function _2() {
      return M.pure();
    }

    function _3(r) {
      return M.pure(r);
    }
  }

}

function clasClosure(A) {
  var cnt,
      B = class B extends A {
    constructor() {
      cnt++;
    }

    static f() {
      var r;
      return M.scope(_1);

      function _1() {
        return M.yldStar(M.yld(1), _2);
      }

      function _2() {
        return M.pure();
      }

      function _3(r) {
        return M.pure(r);
      }
    }

  },
      _B = class _B extends A {
    constructor() {
      cnt += 2;
    }

    static f() {
      var r;
      return M.scope(_1);

      function _1() {
        var a;
        a = cnt += 2;
        return M.yldStar(M.yld(a), _2);
      }

      function _2() {
        return M.pure();
      }

      function _3(r) {
        return M.pure(r);
      }
    }

  },
      C,
      r;

  return M.scope(_1);

  function _1() {
    var a;
    cnt = 0;
    a = cnt++;
    return M.yldStar(M.yld(a), _2);
  }

  function _2() {
    var a;
    a = B.f();
    return M.yldStar(M.yldStar(a), _3);
  }

  function _3() {
    var a;
    C = class extends A {
      static f() {
        var r;
        return M.scope(_1);

        function _1() {
          var a;
          a = cnt += 3;
          return M.yldStar(M.yld(a), _2);
        }

        function _2() {
          var a;
          a = _B.f();
          return M.yldStar(M.yldStar(a), _3);
        }

        function _3() {
          return M.pure();
        }

        function _4(r) {
          return M.pure(r);
        }
      }

    };
    a = cnt += 3;
    return M.yldStar(M.yld(a), _4);
  }

  function _4() {
    var a;
    a = C.f();
    return M.yldStar(M.yldStar(a), _5);
  }

  function _5() {
    var a;
    a = _B.f();
    return M.yldStar(M.yldStar(a), _6);
  }

  function _6() {
    return M.pure();
  }

  function _7(r) {
    return M.pure(r);
  }
}

function c2() {
  var i,
      closure1_a = function closure1_a() {
    var a, r;
    return M.scope(_1);

    function _1() {
      a = i;
      return M.yldStar(M.yld(`a`), _2);
    }

    function _2(c) {
      var b;
      b = i = a + c;
      return M.pure(b);
    }

    function _3(r) {
      return M.pure(r);
    }
  },
      closure1_b = function closure1_b() {
    i++;

    function closure1_c() {
      i += 2;
      return i;
    }

    function closure1_d() {
      return closure1_c();
    }

    return closure1_c;
  },
      r;

  return M.scope(_1);

  function _1() {
    i = 0;
    return M.pure(closure1_b()());
  }

  function _2(r) {
    return M.pure(r);
  }
}

function loopCapt1() {
  var i, r;
  return M.scope(_1);

  function _1() {
    for (i = 0; i < 3; i++) {
      (i => {
        let j = 0;
        funs(function iter() {
          var r;
          return M.scope(_1);

          function _1() {
            return M.yldStar(M.yld(`${i} ${j++}`), _2);
          }

          function _2() {
            return M.pure();
          }

          function _3(r) {
            return M.pure(r);
          }
        });
      })(i);
    }

    return M.pure();
  }

  function _2(r) {
    return M.pure(r);
  }
}

function loopCapt2() {
  var i, r;
  return M.scope(_1);

  function _1() {
    i = 0;
    return M.jump(void 0, _2);
  }

  function _2() {
    var a;

    if (i < 3) {
      a = (i => {
        var j, r;
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(i), _2);
        }

        function _2() {
          j = i + 1;
          funs(function iter() {
            var r;
            return M.scope(_1);

            function _1() {
              return M.yldStar(M.yld(j + i), _2);
            }

            function _2() {
              return M.pure();
            }

            function _3(r) {
              return M.pure(r);
            }
          });
          return M.pure();
        }

        function _3(r) {
          return M.pure(r);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _3);
    } else {
      return M.yldStar(M.yld("f"), _4);
    }
  }

  function _3() {
    i++;
    return M.jump(void 0, _2);
  }

  function _4() {
    return M.pure();
  }

  function _5(r) {
    return M.pure(r);
  }
}

function loopCapt3() {
  var i, j, r;
  return M.scope(_1);

  function _1() {
    i = 0;
    return M.jump(void 0, _2);
  }

  function _2() {
    var a;

    if (i < 3) {
      a = (i => {
        var j, r;
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(i), _2);
        }

        function _2() {
          j = 0;
          return M.jump(void 0, _3);
        }

        function _3() {
          var a;

          if (j < 3) {
            a = (j => {
              var r;
              return M.scope(_1);

              function _1() {
                var a;
                a = j;
                return M.yldStar(M.yld(a), _2);
              }

              function _2() {
                funs(function iter() {
                  var r;
                  return M.scope(_1);

                  function _1() {
                    return M.yldStar(M.yld(`${i} ${j++}`), _2);
                  }

                  function _2() {
                    return M.pure();
                  }

                  function _3(r) {
                    return M.pure(r);
                  }
                });
                return M.pure();
              }

              function _3(r) {
                return M.pure(r);
              }
            })(j);

            return M.yldStar(M.yldStar(a), _4);
          } else {
            return M.pure();
          }
        }

        function _4() {
          j++;
          return M.jump(void 0, _3);
        }

        function _5(r) {
          return M.pure(r);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _3);
    } else {
      return M.pure();
    }
  }

  function _3() {
    i++;
    return M.jump(void 0, _2);
  }

  function _4(r) {
    return M.pure(r);
  }
}

function loopCapt4() {
  var i, j, r;
  return M.scope(_1);

  function _1() {
    for (i = 0; i < 3; i++) {
      (i => {
        for (let j = 0; j < 3; j++) {
          (j => {
            funs(function iter() {
              var r;
              return M.scope(_1);

              function _1() {
                return M.yldStar(M.yld(`${i} ${j++}`), _2);
              }

              function _2() {
                return M.pure();
              }

              function _3(r) {
                return M.pure(r);
              }
            });
          })(j);
        }
      })(i);
    }

    return M.pure();
  }

  function _2(r) {
    return M.pure(r);
  }
}

function forOfCapt1() {
  var i, r;
  return M.scope(_1);

  function _1() {
    for (i of a) {
      (i => {
        let j = 0;
        funs(function iter() {
          var r;
          return M.scope(_1);

          function _1() {
            return M.yldStar(M.yld(`${i} ${j++}`), _2);
          }

          function _2() {
            return M.pure();
          }

          function _3(r) {
            return M.pure(r);
          }
        });
      })(i);
    }

    return M.pure();
  }

  function _2(r) {
    return M.pure(r);
  }
}

function forOfCapt2() {
  var i, loop, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    loop = M.iterator(a);
    return M.jump(void 0, _2, _8);
  }

  function _2() {
    var a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var j, r;
        return M.scope(_1);

        function _1() {
          j = 0;
          return M.yldStar(M.yld(i), _2);
        }

        function _2() {
          funs(function iter() {
            var r;
            return M.scope(_1);

            function _1() {
              return M.yldStar(M.yld(`${i} ${j++}`), _2);
            }

            function _2() {
              return M.pure();
            }

            function _3(r) {
              return M.pure(r);
            }
          });
          return M.pure();
        }

        function _3(r) {
          return M.pure(r);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _2, _8);
    } else {
      fc = _4, fe = _6;
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _4() {
    return M.pure();
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _6, err = a;
    return M.jump(void 0, _3);
  }
}

function forOfCapt3() {
  var i, j, r;
  return M.scope(_1);

  function _1() {
    for (i of a) {
      (i => {
        for (const j of b) {
          (j => {
            funs(function iter() {
              var r;
              return M.scope(_1);

              function _1() {
                return M.yldStar(M.yld(`${i} ${j++}`), _2);
              }

              function _2() {
                return M.pure();
              }

              function _3(r) {
                return M.pure(r);
              }
            });
          })(j);
        }
      })(i);
    }

    return M.pure();
  }

  function _2(r) {
    return M.pure(r);
  }
}

function forOfCapt4() {
  var i, j, loop, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    loop = M.iterator(a);
    return M.jump(void 0, _2, _8);
  }

  function _2() {
    var a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var j, loop, fc, fe, r, err;
        return M.scope(_1);

        function _1() {
          loop = M.iterator(b);
          return M.jump(void 0, _2, _8);
        }

        function _2() {
          var a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              var r;
              return M.scope(_1);

              function _1() {
                var a;
                a = j;
                return M.yldStar(M.yld(a), _2);
              }

              function _2() {
                funs(function iter() {
                  var r;
                  return M.scope(_1);

                  function _1() {
                    return M.yldStar(M.yld(`${i} ${j++}`), _2);
                  }

                  function _2() {
                    return M.pure();
                  }

                  function _3(r) {
                    return M.pure(r);
                  }
                });
                return M.pure();
              }

              function _3(r) {
                return M.pure(r);
              }
            })(j);

            return M.yldStar(M.yldStar(a), _2, _8);
          } else {
            fc = _4, fe = _6;
            return M.jump(void 0, _3);
          }
        }

        function _3() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe);
        }

        function _4() {
          return M.pure();
        }

        function _5(r) {
          return M.pure(r);
        }

        function _6(e) {
          return M.raise(e);
        }

        function _7() {
          return M.raise(err);
        }

        function _8(a) {
          fc = _7, fe = _6, err = a;
          return M.jump(void 0, _3);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _2, _8);
    } else {
      fc = _4, fe = _6;
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _4() {
    return M.pure();
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _6, err = a;
    return M.jump(void 0, _3);
  }
}

function forOfCapt5() {
  var i, j, loop, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    loop = M.iterator(a);
    return M.jump(void 0, _2, _8);
  }

  function _2() {
    var a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var j, r;
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(i), _2);
        }

        function _2() {
          for (j of b) {
            (j => {
              funs(function iter() {
                var r;
                return M.scope(_1);

                function _1() {
                  return M.yldStar(M.yld(`${i} ${j++}`), _2);
                }

                function _2() {
                  return M.pure();
                }

                function _3(r) {
                  return M.pure(r);
                }
              });
            })(j);
          }

          return M.pure();
        }

        function _3(r) {
          return M.pure(r);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _2, _8);
    } else {
      fc = _4, fe = _6;
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _4() {
    return M.pure();
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _6, err = a;
    return M.jump(void 0, _3);
  }
}

function forOfCapt6() {
  var i, j, loop, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    loop = M.iterator(a);
    return M.jump(void 0, _2, _8);
  }

  function _2() {
    var a;

    if (!(loop = loop.step()).done) {
      i = loop.value;

      a = (i => {
        var j, loop, fc, fe, r, err;
        return M.scope(_1);

        function _1() {
          return M.yldStar(M.yld(i), _2);
        }

        function _2() {
          loop = M.iterator(b);
          return M.jump(void 0, _3, _9);
        }

        function _3() {
          var a;

          if (!(loop = loop.step()).done) {
            j = loop.value;

            a = (j => {
              var r;
              return M.scope(_1);

              function _1() {
                return M.yldStar(M.yld(i), _2);
              }

              function _2() {
                funs(function iter() {
                  var r;
                  return M.scope(_1);

                  function _1() {
                    return M.yldStar(M.yld(`${i} ${j++}`), _2);
                  }

                  function _2() {
                    return M.pure();
                  }

                  function _3(r) {
                    return M.pure(r);
                  }
                });
                return M.pure();
              }

              function _3(r) {
                return M.pure(r);
              }
            })(j);

            return M.yldStar(M.yldStar(a), _3, _9);
          } else {
            fc = _5, fe = _7;
            return M.jump(void 0, _4);
          }
        }

        function _4() {
          if (loop.exit) {
            loop.exit();
          }

          return M.jump(void 0, fc, fe);
        }

        function _5() {
          return M.pure();
        }

        function _6(r) {
          return M.pure(r);
        }

        function _7(e) {
          return M.raise(e);
        }

        function _8() {
          return M.raise(err);
        }

        function _9(a) {
          fc = _8, fe = _7, err = a;
          return M.jump(void 0, _4);
        }
      })(i);

      return M.yldStar(M.yldStar(a), _2, _8);
    } else {
      fc = _4, fe = _6;
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _4() {
    return M.pure();
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _6, err = a;
    return M.jump(void 0, _3);
  }
}

function forIn() {
  var i, loop, r;
  return M.scope(_1);

  function _1() {
    loop = M.forInIterator({
      a: 1
    });
    return M.jump(void 0, _2);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.yldStar(M.yld(i), _2);
    } else {
      return M.pure();
    }
  }

  function _3(r) {
    return M.pure(r);
  }
}

function while1() {
  var i, r;
  return M.scope(_1);

  function _1() {
    i = 0;
    return M.jump(void 0, _2);
  }

  function _2() {
    var a;
    a = i++;
    return M.yldStar(M.yld(a), _3);
  }

  function _3(a) {
    var b;

    if (a < 3) {
      b = i++;
      return M.yldStar(M.yld(b), _2);
    } else {
      i = 0;
      return M.pure();
    }
  }

  function _4(r) {
    return M.pure(r);
  }
}

function catchBlock2() {
  var i, e, ex, r;
  return M.scope(_1);

  function _1() {
    i = 0;
    return M.jump(void 0, _2, _9);
  }

  function _2() {
    return M.yldStar(M.yld(i === 3), _3, _9);
  }

  function _3(a) {
    if (a) {
      throw new Error(`AAAAAAAAA${i++}`);
    }

    return M.yldStar(M.yld(`a${i}`), _7);
  }

  function _4() {
    e = ex;
    return M.yldStar(M.yld(`e${i}`), _5);
  }

  function _5() {
    return M.yldStar(M.yld(e), _6);
  }

  function _6() {
    return M.pure(i);
  }

  function _7() {
    i++;
    return M.jump(void 0, _2, _9);
  }

  function _8(r) {
    return M.pure(r);
  }

  function _9(a) {
    ex = a;
    return M.jump(void 0, _4);
  }
}

function closure2() {
  var k, j, m, r;
  return M.scope(_1);

  function _1() {
    k = 0;
    j = 1;
    m = 0;
    return M.yldStar(M.yld(k++ + j + m++), _2);
  }

  function _2() {
    var a;
    a = m++;
    return M.yldStar(M.yld(a), _3);
  }

  function _3() {
    return M.pure(function sub(k) {
      var r;
      return M.scope(_1);

      function _1() {
        var a;
        a = k++;
        return M.yldStar(M.yld(a), _2);
      }

      function _2(a) {
        a, j;
        return M.pure();
      }

      function _3(r) {
        return M.pure(r);
      }
    });
  }

  function _4(r) {
    return M.pure(r);
  }
}

function switches() {
  var i, _i, i1, i2, i3, i4, i5, i6, i7, i8, j, loop, _loop, loop1, loop2, loop3, loop4, loop5, loop6, fc, fe, _fc, _fe, fc1, fe1, fc2, fe2, fc3, fe3, fc4, fe4, fc5, fe5, fc6, fe6, r, err, _err, err1, err2, err3, err4, err5, err6;

  return M.scope(_1);

  function _1() {
    if (a) {
      return M.yldStar(M.yld(1), _2);
    } else {
      return M.jump(void 0, _2);
    }
  }

  function _2() {
    switch (a) {
      case 1:
        return M.yldStar(M.yld(2), _3);

      case 2:
        {
          console.log(3);
        }

      default:
        return M.jump(void 0, _4);
    }
  }

  function _3() {
    return M.yldStar(M.yld(3), _4);
  }

  function _4() {
    console.log(4);

    f1: for (i = 0;; i++) {
      switch (i) {
        case 3:
          {
            break f1;
          }
      }
    }

    _i = 0;
    return M.jump(void 0, _5);
  }

  function _5() {
    switch (_i) {
      case 3:
        l1: for (i1 of gen()) {
          switch (i1) {
            case 3:
              {
                break l1;
              }
          }
        }

        loop = M.iterator(gen());
        return M.jump(void 0, _7, _49);

      default:
        return M.yldStar(M.yld(`f2-${_i}`), _6);
    }
  }

  function _6() {
    _i++;
    return M.jump(void 0, _5);
  }

  function _7() {
    if (!(loop = loop.step()).done) {
      i2 = loop.value;

      switch (i2) {
        case 3:
          return M.yldStar(M.yld(`l2-${i2}`), _8, _49);

        default:
          return M.jump(void 0, _7, _49);
      }
    } else {
      fc = _10, fe = _40;
      return M.jump(void 0, _9);
    }
  }

  function _8() {
    fc = _10, fe = _40;
    return M.jump(void 0, _9);
  }

  function _9() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _10() {
    _loop = M.iterator(gen());
    return M.jump(void 0, _11, _50);
  }

  function _11() {
    if (!(_loop = _loop.step()).done) {
      i3 = _loop.value;

      switch (i3) {
        case 3:
          _fc = _13, _fe = _40;
          return M.jump(void 0, _12);

        default:
          return M.yldStar(M.yld(`l3-${i3}`), _11, _50);
      }
    } else {
      _fc = _13, _fe = _40;
      return M.jump(void 0, _12);
    }
  }

  function _12() {
    if (_loop.exit) {
      _loop.exit();
    }

    return M.jump(void 0, _fc, _fe);
  }

  function _13() {
    loop1 = M.iterator(gen());
    return M.jump(void 0, _14, _51);
  }

  function _14() {
    if (!(loop1 = loop1.step()).done) {
      i4 = loop1.value;

      switch (i4) {
        case 3:
          fc1 = _16, fe1 = _40;
          return M.jump(void 0, _15);

        default:
          return M.yldStar(M.yld(`l4-${i4}`), _14, _51);
      }
    } else {
      fc1 = _16, fe1 = _40;
      return M.jump(void 0, _15);
    }
  }

  function _15() {
    if (loop1.exit) {
      loop1.exit();
    }

    return M.jump(void 0, fc1, fe1);
  }

  function _16() {
    loop2 = M.iterator(gen());
    return M.jump(void 0, _17, _52);
  }

  function _17() {
    if (!(loop2 = loop2.step()).done) {
      i5 = loop2.value;
      return M.yldStar(M.yld(`l5-${i5}`), _18, _52);
    } else {
      fc2 = _20, fe2 = _40;
      return M.jump(void 0, _19);
    }
  }

  function _18() {
    switch (i5) {
      case 3:
        fc2 = _20, fe2 = _40;
        return M.jump(void 0, _19);

      default:
        return M.jump(void 0, _17, _52);
    }
  }

  function _19() {
    if (loop2.exit) {
      loop2.exit();
    }

    return M.jump(void 0, fc2, fe2);
  }

  function _20() {
    loop3 = M.iterator(gen());
    return M.jump(void 0, _21, _53);
  }

  function _21() {
    if (!(loop3 = loop3.step()).done) {
      i6 = loop3.value;

      switch (i6) {
        case 3:
          return M.yldStar(M.yld(`l6-1-${i6}`), _22, _53);

        default:
          return M.yldStar(M.yld(`l6-2-${i6}`), _21, _53);
      }
    } else {
      fc3 = _24, fe3 = _40;
      return M.jump(void 0, _23);
    }
  }

  function _22() {
    fc3 = _24, fe3 = _40;
    return M.jump(void 0, _23);
  }

  function _23() {
    if (loop3.exit) {
      loop3.exit();
    }

    return M.jump(void 0, fc3, fe3);
  }

  function _24() {
    loop4 = M.iterator(gen());
    return M.jump(void 0, _25, _54);
  }

  function _25() {
    if (!(loop4 = loop4.step()).done) {
      i7 = loop4.value;

      switch (i7) {
        case 0:
          return M.jump(void 0, _25, _54);

        case 1:
        case 2:
          return M.yldStar(M.yld(`l7-1-${i7}`), _25, _54);

        case 3:
          return M.jump(void 0, _25, _54);

        case 4:
          return M.yldStar(M.yld(`l7-2-${i7}`), _25, _54);

        case 5:
          return M.yldStar(M.yld(`l7-3-${i7}`), _27, _54);

        case 6:
          return M.jump(void 0, _25, _54);

        case 7:
          return M.yldStar(M.yld(`l7-4-${i7}`), _26, _54);

        default:
          return M.yldStar(M.yld(`l7-5-${i7}`), _27, _54);
      }
    } else {
      fc4 = _29, fe4 = _40;
      return M.jump(void 0, _28);
    }
  }

  function _26() {
    fc4 = _29, fe4 = _40;
    return M.jump(void 0, _28);
  }

  function _27() {
    return M.yldStar(M.yld(`l7-6-${i7}`), _25, _54);
  }

  function _28() {
    if (loop4.exit) {
      loop4.exit();
    }

    return M.jump(void 0, fc4, fe4);
  }

  function _29() {
    loop5 = M.iterator(gen());
    return M.jump(void 0, _30, _55);
  }

  function _30() {
    if (!(loop5 = loop5.step()).done) {
      i8 = loop5.value;
      loop6 = M.iterator(gen());
      return M.jump(void 0, _31, _56);
    } else {
      fc6 = _38, fe6 = _40;
      return M.jump(void 0, _37);
    }
  }

  function _31() {
    if (!(loop6 = loop6.step()).done) {
      j = loop6.value;

      switch (i8) {
        case 0:
        case 1:
        case 2:
          return M.yldStar(M.yld(`s1:${i8},${j}`), _32, _56);

        case 3:
          switch (j) {
            case 2:
            case 3:
              return M.yldStar(M.yld(`s2:${i8},${j}`), _31, _56);

            case 5:
              return M.yldStar(M.yld(`s3:${i8},${j}`), _31, _56);

            case 7:
              return M.yldStar(M.yld(`s4:${i8},${j}`), _31, _56);

            case 8:
              return M.yldStar(M.yld(`s5:${i8},${j}`), _31, _56);

            case 9:
              return M.yldStar(M.yld(`s6:${i8},${j}`), _33, _56);

            default:
              return M.jump(void 0, _31, _56);
          }

        case 4:
          switch (j) {
            case 2:
            case 3:
              return M.yldStar(M.yld(`s7:${i8},${j}`), _35, _56);

            case 5:
              return M.yldStar(M.yld(`s8:${i8},${j}`), _31, _56);

            case 6:
              fc5 = _30, fe5 = _55;
              return M.jump(void 0, _36, _57);

            case 7:
              return M.yldStar(M.yld(`s9:${i8},${j}`), _35, _56);

            case 8:
              return M.yldStar(M.yld(`s10:${i8},${j}`), _31, _56);

            case 9:
              return M.yldStar(M.yld(`s11:${i8},${j}`), _34, _56);

            default:
              return M.yldStar(M.yld(`s12:${i8},${j}`), _35, _56);
          }

        case 5:
          switch (j) {
            case 2:
            case 3:
              fc5 = _37, fe5 = _40, fc6 = _38, fe6 = _40;
              return M.jump(void 0, _36, _57);

            default:
              return M.jump(void 0, _31, _56);
          }

        default:
          return M.jump(void 0, _31, _56);
      }
    } else {
      fc5 = _30, fe5 = _55;
      return M.jump(void 0, _36, _57);
    }
  }

  function _32() {
    if (j > 3) {
      fc5 = _30, fe5 = _55;
      return M.jump(void 0, _36, _57);
    } else {
      return M.jump(void 0, _31, _56);
    }
  }

  function _33() {
    fc5 = _30, fe5 = _55;
    return M.jump(void 0, _36, _57);
  }

  function _34() {
    fc5 = _37, fe5 = _40, fc6 = _38, fe6 = _40;
    return M.jump(void 0, _36, _57);
  }

  function _35() {
    return M.yldStar(M.yld(`s13:${i8},${j}`), _31, _56);
  }

  function _36() {
    if (loop6.exit) {
      loop6.exit();
    }

    err5 = err6;
    return M.jump(void 0, fc5, fe5);
  }

  function _37() {
    if (loop5.exit) {
      loop5.exit();
    }

    return M.jump(void 0, fc6, fe6);
  }

  function _38() {
    return M.pure();
  }

  function _39(r) {
    return M.pure(r);
  }

  function _40(e) {
    return M.raise(e);
  }

  function _41() {
    return M.raise(err);
  }

  function _42() {
    return M.raise(_err);
  }

  function _43() {
    return M.raise(err1);
  }

  function _44() {
    return M.raise(err2);
  }

  function _45() {
    return M.raise(err3);
  }

  function _46() {
    return M.raise(err4);
  }

  function _47() {
    return M.raise(err5);
  }

  function _48() {
    return M.raise(err6);
  }

  function _49(a) {
    fc = _41, fe = _40, err = a;
    return M.jump(void 0, _9);
  }

  function _50(a) {
    _fc = _42, _fe = _40, _err = a;
    return M.jump(void 0, _12);
  }

  function _51(a) {
    fc1 = _43, fe1 = _40, err1 = a;
    return M.jump(void 0, _15);
  }

  function _52(a) {
    fc2 = _44, fe2 = _40, err2 = a;
    return M.jump(void 0, _19);
  }

  function _53(a) {
    fc3 = _45, fe3 = _40, err3 = a;
    return M.jump(void 0, _23);
  }

  function _54(a) {
    fc4 = _46, fe4 = _40, err4 = a;
    return M.jump(void 0, _28);
  }

  function _55(a) {
    fc6 = _47, fe6 = _40, err5 = a;
    return M.jump(void 0, _37);
  }

  function _56(a) {
    fc5 = _37, fe5 = _40, fc6 = _48, fe6 = _40, err6 = a;
    return M.jump(void 0, _36, _57);
  }

  function _57(a) {
    fc6 = _47, fe6 = _40, err5 = a;
    return M.jump(void 0, _37);
  }
}