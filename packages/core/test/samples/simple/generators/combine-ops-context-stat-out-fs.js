function a() {
  var a = M.generator();
  return a.scopeH(_1, _2);

  function _1(a) {
    return a.pure();
  }

  function _2(a, e) {
    return a.raise(e);
  }
}

function a1() {
  var a1 = M.generator();
  return a1.scopeH(_1, _3);

  function _1(a1) {
    return a1.yldH(void 0, _2, _3);
  }

  function _2(a1) {
    return a1.pure();
  }

  function _3(a1, e) {
    return a1.raise(e);
  }
}

function a3() {
  var a3 = M.generator();
  return a3.scopeH(_1, _3);

  function _1(a3) {
    return a3.yldH(void 0, _2, _3);
  }

  function _2(a3, r) {
    return a3.pure(r);
  }

  function _3(a3, e) {
    return a3.raise(e);
  }
}

function a2() {
  var a2 = M.generator();
  return a2.scopeH(_1, _3);

  function _1(a2) {
    return a2.yldH(1, _2, _3);
  }

  function _2(a2) {
    return a2.pure();
  }

  function _3(a2, e) {
    return a2.raise(e);
  }
}

function a() {
  var a = M.generator();
  return a.scopeH(_1, _5);

  function _1(a) {
    return a.yldH(1, _2, _6);
  }

  function _2(a) {
    return a.yldH(2, _4, _5);
  }

  function _3(a) {
    a._e = a._ex;
    return a.yldH(a._e, _4, _5);
  }

  function _4(a) {
    return a.pure();
  }

  function _5(a, e) {
    return a.raise(e);
  }

  function _6(a, b) {
    a._ex = b;
    return a.jumpH(void 0, _3, _5);
  }
}

function d(i) {
  var d = M.generator();
  d._i = i;
  return d.scopeH(_1, _4);

  function _1(d) {
    var a;
    d._j = 0;
    a = d._i++;
    return d.yldH(a, _2, _4);
  }

  function _2(d, a) {
    return d.yldH(a, _3, _4);
  }

  function _3(d, a) {
    var b;
    b = d._j++;
    return d.pure((a, b));
  }

  function _4(d, e) {
    return d.raise(e);
  }
}

function d2(i) {
  var d2 = M.generator();
  d2._i = i;
  return d2.scopeH(_1, _7);

  function _1(d2) {
    var a;
    d2._j = 0;
    a = d2._i++;
    return d2.yldH(a, _2, _7);
  }

  function _2(d2, a) {
    var b;
    b = d2._j++;
    return d2.yldH((a, b), _3, _7);
  }

  function _3(d2) {
    return d2.yldStarH(some(d2._i += 2, d2._j) + d2._j, _4, _7);
  }

  function _4(d2, a) {
    return d2.yldH(a, _5, _7);
  }

  function _5(d2, a) {
    var b;

    if (a) {
      b = d2._i += 3;
      return d2.yldStarH(b, _6, _7);
    } else {
      return d2.pure(d2._i);
    }
  }

  function _6(d2, r) {
    return d2.pure(r);
  }

  function _7(d2, e) {
    return d2.raise(e);
  }
}

function a4() {
  var a4 = M.generator();
  return a4.scopeH(_1, _13);

  function _1(a4) {
    return a4.yldH(1, _2, _15);
  }

  function _2(a4) {
    return a4.yldH(2, _3, _15);
  }

  function _3(a4) {
    a4._fc = _9, a4._fe = _13;
    return a4.yldH(3, _7, _13);
  }

  function _4(a4) {
    a4._e = a4._ex;
    return a4.yldH('excep', _5, _16);
  }

  function _5(a4) {
    return a4.yldH(a4._e, _6, _16);
  }

  function _6(a4, a) {
    if (a) {
      a4._fc = _12, a4._fe = _13, a4._r = 10;
      return a4.jumpH(void 0, _7, _13);
    } else {
      a4._fc = _9, a4._fe = _13;
      return a4.jumpH(void 0, _7, _13);
    }
  }

  function _7(a4) {
    return a4.yldH('f', _8, _13);
  }

  function _8(a4) {
    return a4.yldH('e', a4._fc, a4._fe);
  }

  function _9(a4) {
    var a;
    a4._1 = a1;
    a = a2();
    return a4.yldStarH(a, _10, _13);
  }

  function _10(a4, b) {
    var a;
    a4._2 = b;
    a = a3();
    return a4.yldStarH(a, _11, _13);
  }

  function _11(a4, b) {
    var a;
    a = a4._1(a4._2, b);
    return a4.yldH(a, _12, _13);
  }

  function _12(a4) {
    return a4.pure(a4._r);
  }

  function _13(a4, e) {
    return a4.raise(e);
  }

  function _14(a4) {
    return a4.raise(a4._err1);
  }

  function _15(a4, a) {
    a4._ex = a;
    return a4.jumpH(void 0, _4, _16);
  }

  function _16(a4, a) {
    a4._fc = _14, a4._fe = _13, a4._err1 = a;
    return a4.jumpH(void 0, _7, _13);
  }
}

function a5() {
  var a5 = M.generator();
  return a5.scopeH(_1, _5);

  function _1(a5) {
    a5._loop = a5.iterator(a4());
    return a5.jumpH(void 0, _2, _7);
  }

  function _2(a5) {
    if (!(a5._loop = a5._loop.step()).done) {
      a5._i = a5._loop.value;
      return a5.yldH(a5._i, _2, _7);
    } else {
      a5._fc = _4, a5._fe = _5;
      return a5.jumpH(void 0, _3, _5);
    }
  }

  function _3(a5) {
    if (a5._loop.exit) {
      a5._loop.exit();
    }

    return a5.jumpH(void 0, a5._fc, a5._fe);
  }

  function _4(a5) {
    return a5.pure();
  }

  function _5(a5, e) {
    return a5.raise(e);
  }

  function _6(a5) {
    return a5.raise(a5._err1);
  }

  function _7(a5, a) {
    a5._fc = _6, a5._fe = _5, a5._err1 = a;
    return a5.jumpH(void 0, _3, _5);
  }
}

function a6() {
  var a6 = M.generator();
  return a6.scopeH(_1, _9);

  function _1(a6) {
    return a6.yldH(1, _2, _12);
  }

  function _2(a6) {
    return a6.yldH(2, _3, _13);
  }

  function _3(a6) {
    return a6.yldH(3, _4, _13);
  }

  function _4(a6, a) {
    if (a) {
      a6._fc1 = _8, a6._fe1 = _9, a6._r = 10;
      return a6.jumpH(void 0, _5, _12);
    } else {
      a6._fc1 = _7, a6._fe1 = _9;
      return a6.yldH(4, _5, _12);
    }
  }

  function _5(a6) {
    a6._err1 = a6._err2;
    return a6.yldH('f1', _6, _9);
  }

  function _6(a6) {
    return a6.yldH('f2', a6._fc1, a6._fe1);
  }

  function _7(a6) {
    return a6.yldH(5, _8, _9);
  }

  function _8(a6) {
    return a6.pure(a6._r);
  }

  function _9(a6, e) {
    return a6.raise(e);
  }

  function _10(a6) {
    return a6.raise(a6._err1);
  }

  function _11(a6) {
    return a6.raise(a6._err2);
  }

  function _12(a6, a) {
    a6._fc1 = _10, a6._fe1 = _9, a6._err1 = a;
    return a6.jumpH(void 0, _6, _9);
  }

  function _13(a6, a) {
    a6._fc1 = _11, a6._fe1 = _9, a6._err2 = a;
    return a6.jumpH(void 0, _5, _12);
  }
}

function a1() {
  var a1 = M.generator();
  return a1.scopeH(_1, _3);

  function _1(a1) {
    return a1.yldH(1, _2, _3);
  }

  function _2(a1) {
    return a1.pure(2);
  }

  function _3(a1, e) {
    return a1.raise(e);
  }
}

function a2() {
  var a2 = M.generator();
  return a2.scopeH(_1, _6);

  function _1(a2) {
    a2._loop = a2.iterator(a4());
    return a2.jumpH(void 0, _2, _8);
  }

  function _2(a2) {
    if (!(a2._loop = a2._loop.step()).done) {
      a2._i = a2._loop.value;
      return a2.yldH(a2._i, _2, _8);
    } else {
      a2._fc = _4, a2._fe = _6;
      return a2.jumpH(void 0, _3, _6);
    }
  }

  function _3(a2) {
    if (a2._loop.exit) {
      a2._loop.exit();
    }

    return a2.jumpH(void 0, a2._fc, a2._fe);
  }

  function _4(a2) {
    return a2.yldH(10, _5, _6);
  }

  function _5(a2) {
    return a2.pure();
  }

  function _6(a2, e) {
    return a2.raise(e);
  }

  function _7(a2) {
    return a2.raise(a2._err1);
  }

  function _8(a2, a) {
    a2._fc = _7, a2._fe = _6, a2._err1 = a;
    return a2.jumpH(void 0, _3, _6);
  }
}

function a3() {
  var a3 = M.generator();
  return a3.scopeH(_1, _5);

  function _1(a3) {
    a3._loop = a3.iterator(a4());
    return a3.jumpH(void 0, _2, _7);
  }

  function _2(a3) {
    if (!(a3._loop = a3._loop.step()).done) {
      a3._i = a3._loop.value;
      return a3.yldH(a3._i, _2, _7);
    } else {
      a3._fc = _4, a3._fe = _5;
      return a3.jumpH(void 0, _3, _5);
    }
  }

  function _3(a3) {
    if (a3._loop.exit) {
      a3._loop.exit();
    }

    return a3.jumpH(void 0, a3._fc, a3._fe);
  }

  function _4(a3) {
    return a3.pure();
  }

  function _5(a3, e) {
    return a3.raise(e);
  }

  function _6(a3) {
    return a3.raise(a3._err1);
  }

  function _7(a3, a) {
    a3._fc = _6, a3._fe = _5, a3._err1 = a;
    return a3.jumpH(void 0, _3, _5);
  }
}

function a6() {
  var a6 = M.generator();
  return a6.scopeH(_1, _4);

  function _1(a6) {
    a6._i = 0;
    return a6.jumpH(void 0, _2, _4);
  }

  function _2(a6) {
    var a;
    a = a6._i++;
    return a6.yldH(a, _3, _4);
  }

  function _3(a6, a) {
    if (a === 'exit') {
      return a6.pure(100);
    } else {
      return a6.jumpRH(void 0, _2, _4);
    }
  }

  function _4(a6, e) {
    return a6.raise(e);
  }
}

function a7() {
  var a7 = M.generator();
  return a7.scopeH(_1, _9);

  function _1(a7) {
    return a7.yldH(1, _2, _9);
  }

  function _2(a7, a) {
    if (a) {
      return a7.yldH('A', _3, _9);
    } else {
      return a7.yldH('c', _5, _9);
    }
  }

  function _3(a7, a) {
    a7._ = a;
    return a7.yldH('b', _4, _9);
  }

  function _4(a7, a) {
    a7._ && a;
    return a7.jumpH(void 0, _8, _9);
  }

  function _5(a7, a) {
    a7._1 = a;
    return a7.yldH('d', _6, _9);
  }

  function _6(a7, a) {
    if (a) {
      return a7.yldH('e', _7, _9);
    } else {
      return a7.yldStarH(a, _7, _9);
    }
  }

  function _7(a7, a) {
    a7._1 || a;
    return a7.jumpH(void 0, _8, _9);
  }

  function _8(a7, r) {
    return a7.pure(r);
  }

  function _9(a7, e) {
    return a7.raise(e);
  }
}

function a7_1() {
  var a7_1 = M.generator();
  return a7_1.scopeH(_1, _11);

  function _1(a7_1) {
    return a7_1.yldH(1, _2, _11);
  }

  function _2(a7_1, a) {
    if (a) {
      return a7_1.yldH('A', _3, _11);
    } else {
      return a7_1.yldH('c', _5, _11);
    }
  }

  function _3(a7_1, a) {
    a7_1._2 = a;
    return a7_1.yldH('b', _4, _11);
  }

  function _4(a7_1, a) {
    a7_1._1 = a7_1._2 && a;
    return a7_1.jumpH(void 0, _8, _11);
  }

  function _5(a7_1, a) {
    a7_1._3 = a;
    return a7_1.yldH('d', _6, _11);
  }

  function _6(a7_1, a) {
    if (a) {
      return a7_1.yldH('e', _7, _11);
    } else {
      return a7_1.yldStarH(a, _7, _11);
    }
  }

  function _7(a7_1, a) {
    a7_1._1 = a7_1._3 || a;
    return a7_1.jumpH(void 0, _8, _11);
  }

  function _8(a7_1) {
    return a7_1.yldH(2, _9, _11);
  }

  function _9(a7_1, a) {
    return a7_1.yldH(a7_1._1 + a, _10, _11);
  }

  function _10(a7_1, r) {
    return a7_1.pure(r);
  }

  function _11(a7_1, e) {
    return a7_1.raise(e);
  }
}

function a7_2() {
  var a7_2 = M.generator();
  return a7_2.scopeH(_1, _12);

  function _1(a7_2) {
    return a7_2.yldH(1, _2, _12);
  }

  function _2(a7_2, a) {
    if (a) {
      return a7_2.yldH('A', _3, _12);
    } else {
      return a7_2.yldH('c', _5, _12);
    }
  }

  function _3(a7_2, a) {
    a7_2._1 = a;
    return a7_2.yldH('b', _4, _12);
  }

  function _4(a7_2, a) {
    a7_2._ = a7_2._1 && a;
    return a7_2.jumpH(void 0, _8, _12);
  }

  function _5(a7_2, a) {
    a7_2._2 = a;
    return a7_2.yldH('d', _6, _12);
  }

  function _6(a7_2, a) {
    if (a) {
      return a7_2.yldH('e', _7, _12);
    } else {
      return a7_2.yldStarH(a, _7, _12);
    }
  }

  function _7(a7_2, a) {
    a7_2._ = a7_2._2 || a;
    return a7_2.jumpH(void 0, _8, _12);
  }

  function _8(a7_2) {
    return a7_2.yldH(2, _9, _12);
  }

  function _9(a7_2, a) {
    return a7_2.yldH(a7_2._ + a, _10, _12);
  }

  function _10(a7_2) {
    return a7_2.yldH('ex', _11, _12);
  }

  function _11(a7_2) {
    return a7_2.pure();
  }

  function _12(a7_2, e) {
    return a7_2.raise(e);
  }
}

function a7_3() {
  var a7_3 = M.generator();
  return a7_3.scopeH(_1, _7);

  function _1(a7_3) {
    return a7_3.yldH(1, _2, _7);
  }

  function _2(a7_3, a) {
    if (a % 2) {
      return a7_3.yldH('A', _3, _7);
    } else {
      return a7_3.yldH('c', _5, _7);
    }
  }

  function _3(a7_3, a) {
    a7_3._ = a;
    return a7_3.yldH('b', _4, _7);
  }

  function _4(a7_3, a) {
    a7_3._ && a;
    return a7_3.jumpH(void 0, _5, _7);
  }

  function _5(a7_3) {
    return a7_3.yldH(2, _6, _7);
  }

  function _6(a7_3) {
    return a7_3.pure();
  }

  function _7(a7_3, e) {
    return a7_3.raise(e);
  }
}

function a7_4() {
  var a7_4 = M.generator();
  return a7_4.scopeH(_1, _7);

  function _1(a7_4) {
    if (1) {
      return a7_4.yldH(2, _4, _7);
    } else {
      return a7_4.yldH(3, _2, _7);
    }
  }

  function _2(a7_4, a) {
    a7_4._1 = a;
    return a7_4.yldH(4, _3, _7);
  }

  function _3(a7_4, b) {
    var a;
    a = (a7_4._1, b);
    return a7_4.jumpH(void 0, _4, _7);
  }

  function _4(a7_4, a) {
    return a7_4.yldH(a, _5, _7);
  }

  function _5(a7_4, a) {
    return a7_4.yldH(a, _6, _7);
  }

  function _6(a7_4, r) {
    return a7_4.pure(r);
  }

  function _7(a7_4, e) {
    return a7_4.raise(e);
  }
}

function a7_5() {
  var a7_5 = M.generator();
  return a7_5.scopeH(_1, _5);

  function _1(a7_5) {
    return a7_5.yldH(1, _2, _5);
  }

  function _2(a7_5, a) {
    if (a) {
      return a7_5.yldH(2, _3, _5);
    } else {
      return a7_5.yldH(3, _3, _5);
    }
  }

  function _3(a7_5, a) {
    return a7_5.yldH(a, _4, _5);
  }

  function _4(a7_5, r) {
    return a7_5.pure(r);
  }

  function _5(a7_5, e) {
    return a7_5.raise(e);
  }
}

function a7_6() {
  var a7_6 = M.generator();
  return a7_6.scopeH(_1, _7);

  function _1(a7_6) {
    return a7_6.yldH(1, _2, _7);
  }

  function _2(a7_6, a) {
    var b;

    if (a) {
      return a7_6.yldH('A', _3, _7);
    } else {
      b = 1;
      return a7_6.yldStarH(b, _5, _7);
    }
  }

  function _3(a7_6, a) {
    a7_6._1 = a;
    return a7_6.yldH('b', _4, _7);
  }

  function _4(a7_6, b) {
    var a;
    a = a7_6._1 && b;
    return a7_6.jumpH(void 0, _5, _7);
  }

  function _5(a7_6, a) {
    return a7_6.yldH(a, _6, _7);
  }

  function _6(a7_6, r) {
    return a7_6.pure(r);
  }

  function _7(a7_6, e) {
    return a7_6.raise(e);
  }
}

function finallyBlock1() {
  var finallyBlock1 = M.generator();
  return finallyBlock1.scopeH(_1, _7);

  function _1(finallyBlock1) {
    finallyBlock1._i = 0;
    return finallyBlock1.jumpH(void 0, _2, _9);
  }

  function _2(finallyBlock1) {
    return finallyBlock1.yldH(finallyBlock1._i++ === 3, _3, _9);
  }

  function _3(finallyBlock1, a) {
    if (a) {
      finallyBlock1._fc = _6, finallyBlock1._fe = _7;
      return finallyBlock1.jumpH(void 0, _4, _7);
    } else {
      return finallyBlock1.jumpRH(void 0, _2, _9);
    }
  }

  function _4(finallyBlock1) {
    return finallyBlock1.yldH('exit', _5, _7);
  }

  function _5(finallyBlock1) {
    return finallyBlock1.yldH(finallyBlock1._i, finallyBlock1._fc, finallyBlock1._fe);
  }

  function _6(finallyBlock1) {
    return finallyBlock1.pure();
  }

  function _7(finallyBlock1, e) {
    return finallyBlock1.raise(e);
  }

  function _8(finallyBlock1) {
    return finallyBlock1.raise(finallyBlock1._err1);
  }

  function _9(finallyBlock1, a) {
    finallyBlock1._fc = _8, finallyBlock1._fe = _7, finallyBlock1._err1 = a;
    return finallyBlock1.jumpH(void 0, _4, _7);
  }
}

function ae() {
  var ae = M.generator();
  return ae.scopeH(_1, _5);

  function _1(ae) {
    return ae.yldH(1, _2, _5);
  }

  function _2(ae) {
    return ae.yldH(2, _3, _5);
  }

  function _3(ae) {
    return ae.yldH(3, _4, _5);
  }

  function _4(ae, a) {
    if (a) {
      return ae.pure(1);
    } else {
      return ae.pure(2);
    }
  }

  function _5(ae, e) {
    return ae.raise(e);
  }
}

function cfb() {
  var cfb = M.generator();
  return cfb.scopeH(_1, _9);

  function _1(cfb) {
    cfb._i = 0;
    return cfb.jumpH(void 0, _2, _11);
  }

  function _2(cfb) {
    return cfb.yldH(cfb._i++ === 3, _3, _11);
  }

  function _3(cfb, a) {
    if (a) {
      throw new Error(`AAAAAAAAA${cfb._i++}`);
    }

    cfb._fc = _8, cfb._fe = _9;
    return cfb.yldH(`a${cfb._i++}`, _7, _9);
  }

  function _4(cfb) {
    cfb._e = cfb._ex;
    return cfb.yldH(`e${cfb._i++}`, _5, _12);
  }

  function _5(cfb) {
    return cfb.yldH(cfb._e, _6, _12);
  }

  function _6(cfb) {
    cfb._fc = _8, cfb._fe = _9, cfb._r = cfb._i++;
    return cfb.jumpH(void 0, _7, _9);
  }

  function _7(cfb) {
    return cfb.yldH(`f1${cfb._i++}`, cfb._fc, cfb._fe);
  }

  function _8(cfb) {
    return cfb.pure(cfb._r);
  }

  function _9(cfb, e) {
    return cfb.raise(e);
  }

  function _10(cfb) {
    return cfb.raise(cfb._err1);
  }

  function _11(cfb, a) {
    cfb._ex = a;
    return cfb.jumpH(void 0, _4, _12);
  }

  function _12(cfb, a) {
    cfb._fc = _10, cfb._fe = _9, cfb._err1 = a;
    return cfb.jumpH(void 0, _7, _9);
  }
}

function cfb1() {
  var cfb1 = M.generator();
  return cfb1.scopeH(_1, _7);

  function _1(cfb1) {
    cfb1._i = 0;
    return cfb1.jumpH(void 0, _2, _9);
  }

  function _2(cfb1) {
    return cfb1.yldH(cfb1._i, _3, _9);
  }

  function _3(cfb1) {
    throw new Error(`AAAAAAAAA${cfb1._i++}`);
  }

  function _4(cfb1) {
    cfb1._e = cfb1._ex;
    cfb1._fc = _6, cfb1._fe = _7, cfb1._r = cfb1._i++;
    return cfb1.jumpH(void 0, _5, _7);
  }

  function _5(cfb1) {
    console.log(`f${cfb1._i}`);
    return cfb1.jumpH(void 0, cfb1._fc, cfb1._fe);
  }

  function _6(cfb1) {
    return cfb1.pure(cfb1._r);
  }

  function _7(cfb1, e) {
    return cfb1.raise(e);
  }

  function _8(cfb1) {
    return cfb1.raise(cfb1._err1);
  }

  function _9(cfb1, a) {
    cfb1._ex = a;
    return cfb1.jumpH(void 0, _4, _10);
  }

  function _10(cfb1, a) {
    cfb1._fc = _8, cfb1._fe = _7, cfb1._err1 = a;
    return cfb1.jumpH(void 0, _5, _7);
  }
}

function cfb1() {
  var cfb1 = M.generator();
  return cfb1.scopeH(_1, _6);

  function _1(cfb1) {
    cfb1._i = 0;
    return cfb1.jumpH(void 0, _2, _7);
  }

  function _2(cfb1) {
    return cfb1.yldH(cfb1._i, _3, _7);
  }

  function _3(cfb1) {
    return cfb1.yldH(5, _5, _6);
  }

  function _4(cfb1) {
    cfb1._e = cfb1._ex;
    return cfb1.pure(cfb1._i++);
  }

  function _5(cfb1) {
    return cfb1.pure(cfb1._r);
  }

  function _6(cfb1, e) {
    return cfb1.raise(e);
  }

  function _7(cfb1, a) {
    cfb1._ex = a;
    return cfb1.jumpH(void 0, _4, _6);
  }
}

function cfb2() {
  var cfb2 = M.generator();
  return cfb2.scopeH(_1, _9);

  function _1(cfb2) {
    cfb2._i = 0;
    return cfb2.jumpH(void 0, _2, _11);
  }

  function _2(cfb2) {
    return cfb2.yldH(`a:${cfb2._i++}`, _3, _11);
  }

  function _3(cfb2) {
    return cfb2.yldH(`b:${cfb2._i++}`, _4, _11);
  }

  function _4(cfb2) {
    cfb2._fc = _8, cfb2._fe = _9;
    return cfb2.yldH(`c:${cfb2._i++}`, _5, _10);
  }

  function _5(cfb2) {
    cfb2._ex = cfb2._err1;
    return cfb2.yldH(`f:${cfb2._i++}`, cfb2._fc, cfb2._fe);
  }

  function _6(cfb2) {
    cfb2._e = cfb2._ex;
    return cfb2.yldH(cfb2._e, _7, _9);
  }

  function _7(cfb2) {
    return cfb2.yldH(`e:${cfb2._i++}`, _8, _9);
  }

  function _8(cfb2) {
    return cfb2.pure();
  }

  function _9(cfb2, e) {
    return cfb2.raise(e);
  }

  function _10(cfb2, a) {
    cfb2._ex = a;
    return cfb2.jumpH(void 0, _6, _9);
  }

  function _11(cfb2, a) {
    cfb2._fc = _6, cfb2._fe = _9, cfb2._err1 = a;
    return cfb2.jumpH(void 0, _5, _10);
  }
}

function cfb3() {
  var cfb3 = M.generator();
  return cfb3.scopeH(_1, _10);

  function _1(cfb3) {
    cfb3._i = 0;
    return cfb3.jumpH(void 0, _2, _12);
  }

  function _2(cfb3) {
    return cfb3.yldH(cfb3._i === 3, _3, _12);
  }

  function _3(cfb3, a) {
    if (a) {
      throw new Error(`AAAAAAAAA${cfb3._i++}`);
    }

    cfb3._fc = _5, cfb3._fe = _11;
    return cfb3.yldH(`a${cfb3._i}`, _4, _11);
  }

  function _4(cfb3) {
    cfb3._ex = cfb3._err1;
    return cfb3.yldH(`f1${cfb3._i++}`, cfb3._fc, cfb3._fe);
  }

  function _5(cfb3) {
    return cfb3.yldH(`b${cfb3._i++}`, _9, _10);
  }

  function _6(cfb3) {
    cfb3._e = cfb3._ex;
    return cfb3.yldH(`e${cfb3._i}`, _7, _10);
  }

  function _7(cfb3) {
    return cfb3.yldH(cfb3._e, _8, _10);
  }

  function _8(cfb3) {
    return cfb3.pure(cfb3._i);
  }

  function _9(cfb3) {
    cfb3._i++;
    return cfb3.jumpRH(void 0, _2, _12);
  }

  function _10(cfb3, e) {
    return cfb3.raise(e);
  }

  function _11(cfb3, a) {
    cfb3._ex = a;
    return cfb3.jumpH(void 0, _6, _10);
  }

  function _12(cfb3, a) {
    cfb3._fc = _6, cfb3._fe = _10, cfb3._err1 = a;
    return cfb3.jumpH(void 0, _4, _11);
  }
}

function cfb4() {
  var cfb4 = M.generator();
  return cfb4.scopeH(_1, _5);

  function _1(cfb4) {
    return cfb4.yldH(5, _3, _4);
  }

  function _2(cfb4) {
    cfb4._e = cfb4._ex;
    return cfb4.pure(10);
  }

  function _3(cfb4) {
    return cfb4.pure(cfb4._r);
  }

  function _4(cfb4, e) {
    return cfb4.raise(e);
  }

  function _5(cfb4, a) {
    cfb4._ex = a;
    return cfb4.jumpH(void 0, _2, _4);
  }
}

function cfb2() {
  var cfb2 = M.generator();
  return cfb2.scopeH(_1, _7);

  function _1(cfb2) {
    cfb2._i = 0;
    return cfb2.jumpH(void 0, _2, _9);
  }

  function _2(cfb2) {
    cfb2._fc = _6, cfb2._fe = _7;
    return cfb2.yldH(`c:${cfb2._i++}`, _3, _8);
  }

  function _3(cfb2) {
    cfb2._ex = cfb2._err1;
    return cfb2.yldH(`f:${cfb2._i++}`, cfb2._fc, cfb2._fe);
  }

  function _4(cfb2) {
    cfb2._e = cfb2._ex;
    return cfb2.yldH(cfb2._e, _5, _7);
  }

  function _5(cfb2) {
    return cfb2.yldH(`e:${cfb2._i++}`, _6, _7);
  }

  function _6(cfb2) {
    return cfb2.pure();
  }

  function _7(cfb2, e) {
    return cfb2.raise(e);
  }

  function _8(cfb2, a) {
    cfb2._ex = a;
    return cfb2.jumpH(void 0, _4, _7);
  }

  function _9(cfb2, a) {
    cfb2._fc = _4, cfb2._fe = _7, cfb2._err1 = a;
    return cfb2.jumpH(void 0, _3, _8);
  }
}

function cfb6() {
  var cfb6 = M.generator();
  return cfb6.scopeH(_1, _8);

  function _1(cfb6) {
    cfb6._fc = _5, cfb6._fe = _6;
    return cfb6.yldH(1, _4, _6);
  }

  function _2(cfb6) {
    cfb6._e = cfb6._ex;
    return cfb6.yldH(2, _3, _9);
  }

  function _3(cfb6) {
    cfb6._fc = _5, cfb6._fe = _6, cfb6._r = 3;
    return cfb6.jumpH(void 0, _4, _6);
  }

  function _4(cfb6) {
    return cfb6.yldH(4, cfb6._fc, cfb6._fe);
  }

  function _5(cfb6) {
    return cfb6.pure(cfb6._r);
  }

  function _6(cfb6, e) {
    return cfb6.raise(e);
  }

  function _7(cfb6) {
    return cfb6.raise(cfb6._err1);
  }

  function _8(cfb6, a) {
    cfb6._ex = a;
    return cfb6.jumpH(void 0, _2, _9);
  }

  function _9(cfb6, a) {
    cfb6._fc = _7, cfb6._fe = _6, cfb6._err1 = a;
    return cfb6.jumpH(void 0, _4, _6);
  }
}

function fb4() {
  var fb4 = M.generator();
  return fb4.scopeH(_1, _7);

  function _1(fb4) {
    fb4._i = 0;
    return fb4.jumpH(void 0, _2, _9);
  }

  function _2(fb4) {
    var a;
    a = fb4._i++;
    return fb4.yldH(a, _3, _9);
  }

  function _3(fb4, a) {
    if (a === 3) {
      fb4._fc = _6, fb4._fe = _7, fb4._r = fb4._i;
      return fb4.jumpH(void 0, _4, _7);
    } else {
      return fb4.jumpRH(void 0, _2, _9);
    }
  }

  function _4(fb4) {
    return fb4.yldH('exit', _5, _7);
  }

  function _5(fb4) {
    return fb4.yldH(fb4._i, fb4._fc, fb4._fe);
  }

  function _6(fb4) {
    return fb4.pure(fb4._r);
  }

  function _7(fb4, e) {
    return fb4.raise(e);
  }

  function _8(fb4) {
    return fb4.raise(fb4._err1);
  }

  function _9(fb4, a) {
    fb4._fc = _8, fb4._fe = _7, fb4._err1 = a;
    return fb4.jumpH(void 0, _4, _7);
  }
}

function while2() {
  var while2 = M.generator();
  return while2.scopeH(_1, _4);

  function _1(while2) {
    while2._i = 0;
    return while2.jumpH(void 0, _2, _4);
  }

  function _2(while2) {
    var a;
    a = while2._i++;
    return while2.yldH(a, _3, _4);
  }

  function _3(while2, a) {
    var b;

    if (a < 3) {
      b = while2._i++;
      return while2.yldH(b, _2, _4);
    } else {
      return while2.pure();
    }
  }

  function _4(while2, e) {
    return while2.raise(e);
  }
}

function for2() {
  var for2 = M.generator();
  return for2.scopeH(_1, _6);

  function _1(for2) {
    return for2.yldH(void 0, _2, _6);
  }

  function _2(for2, a) {
    for2._i = a;
    return for2.jumpH(void 0, _3, _6);
  }

  function _3(for2) {
    return for2.yldH(for2._i, _4, _6);
  }

  function _4(for2, a) {
    if (a < 10) {
      return for2.yldH(for2._i, _5, _6);
    } else {
      return for2.pure();
    }
  }

  function _5(for2) {
    for2._i++;
    return for2.jumpRH(void 0, _3, _6);
  }

  function _6(for2, e) {
    return for2.raise(e);
  }
}

function c1() {
  var a = function _a() {
    var a = M.generator();

    a._b = function _b() {
      var b = M.generator();
      b._c1 = c1;
      return b.scopeH(_1, _2);

      function _1(b) {
        return b.pure(function c() {
          var _c = M.generator();

          _c._c1 = c1;
          return _c.scopeH(_1, _2);

          function _1(_c) {
            _c._c1._i++;
            return _c.pure();
          }

          function _2(_c, e) {
            return _c.raise(e);
          }
        });
      }

      function _2(b, e) {
        return b.raise(e);
      }
    };

    return a.scopeH(_1, _2);

    function _1(a) {
      return a.pure();
    }

    function _2(a, e) {
      return a.raise(e);
    }
  },
      c1 = {};

  c1._i = 0;
}

function c2() {
  var inner = function _inner() {
    var inner = M.generator();

    inner._a = function a1() {
      var _a = M.generator();

      _a._c2 = c2;
      return _a.scopeH(_1, _3);

      function _1(_a) {
        _a._ = _a._c2._i;
        return _a.yldH(`a:${_a._c2._i}`, _2, _3);
      }

      function _2(_a, b) {
        var a;
        a = _a._c2._i = _a._ + b;
        return _a.pure(a);
      }

      function _3(_a, e) {
        return _a.raise(e);
      }
    };

    return inner.scopeH(_1, _8);

    function _1(inner) {
      inner._b = () => {
        var j,
            ctx = {},
            _c2 = c2;

        ctx._a = function a() {
          var _c2 = c2;
          _c2._i += 2;
          return _c2._i;
        };

        ctx._b = function b() {
          var _c2 = c2;
          _c2._i += j;
        };

        {
          j = 10;
          _c2._i++;
          return function z() {
            var _z = M.generator();

            _z._c = function c() {
              var _c2 = c2;
              return _c2._i += this.something;
            };

            return _z.scopeH(_1, _6);

            function _1(_z) {
              _z._d = function z(j) {
                var _c2 = c2;
                return _c2._i += j;
              };

              return _z.yldStarH(_z._c(), _2, _6);
            }

            function _2(_z, a) {
              return _z.yldStarH(_z._d(a), _3, _6);
            }

            function _3(_z, a) {
              return _z.yldStarH(a, _4, _6);
            }

            function _4(_z, a) {
              return _z.yldH(`b:${a}`, _5, _6);
            }

            function _5(_z) {
              return _z.pure(function z(j) {
                var _z = M.generator();

                _z._c2 = c2;
                _z._f = ctx;
                _z._j = j;
                return _z.scopeH(_1, _4);

                function _1(_z) {
                  var a;
                  _z._ = _z._c2._i;
                  a = _z._f._a;
                  return _z.yldStarH(a(), _2, _4);
                }

                function _2(_z, b) {
                  var a;
                  _z._1 = b;
                  a = _z._f._b;
                  return _z.yldStarH(a(), _3, _4);
                }

                function _3(_z, b) {
                  var a;
                  a = _z._c2._i = _z._ + (_z._j + _z._1 + b);
                  return _z.pure(a);
                }

                function _4(_z, e) {
                  return _z.raise(e);
                }
              });
            }

            function _6(_z, e) {
              return _z.raise(e);
            }
          };
        }
      };

      inner._k = 1;
      return inner.yldStarH(inner._b(), _2, _8);
    }

    function _2(inner, a) {
      inner._f = [inner._a, a];
      inner._loop = inner.iterator(inner._f);
      return inner.jumpH(void 0, _3, _10);
    }

    function _3(inner) {
      if (!(inner._loop = inner._loop.step()).done) {
        inner._j = inner._loop.value;
        return inner.yldStarH(inner._j(), _4, _10);
      } else {
        inner._fc = _7, inner._fe = _8;
        return inner.jumpH(void 0, _6, _8);
      }
    }

    function _4(inner, a) {
      return inner.yldStarH(a, _5, _10);
    }

    function _5(inner, a) {
      inner._k += a;
      return inner.jumpRH(void 0, _3, _10);
    }

    function _6(inner) {
      if (inner._loop.exit) {
        inner._loop.exit();
      }

      return inner.jumpH(void 0, inner._fc, inner._fe);
    }

    function _7(inner) {
      return inner.pure(inner._k);
    }

    function _8(inner, e) {
      return inner.raise(e);
    }

    function _9(inner) {
      return inner.raise(inner._err1);
    }

    function _10(inner, a) {
      inner._fc = _9, inner._fe = _8, inner._err1 = a;
      return inner.jumpH(void 0, _6, _8);
    }
  },
      c2 = {};

  c2._i = 0;
  return inner;
}

function c1() {
  var c1 = M.generator();
  return c1.scopeH(_1, _3);

  function _1(c1) {
    c1._i = 0;
    return c1.yldH(`a:${c1._i}`, _2, _3);
  }

  function _2(c1, r) {
    return c1.pure(r);
  }

  function _3(c1, e) {
    return c1.raise(e);
  }
}

function c2() {
  var c2 = M.generator();
  return c2.scopeH(_1, _3);

  function _1(c2) {
    c2._i = 0;
    return c2.yldH(`a:${c2._i}`, _2, _3);
  }

  function _2(c2, b) {
    var a;
    a = c2._i += b;
    return c2.pure(a);
  }

  function _3(c2, e) {
    return c2.raise(e);
  }
}

function forOf() {
  var forOf = M.generator();
  return forOf.scopeH(_1, _5);

  function _1(forOf) {
    forOf._loop = forOf.iterator([1, 2, 3]);
    return forOf.jumpH(void 0, _2, _7);
  }

  function _2(forOf) {
    if (!(forOf._loop = forOf._loop.step()).done) {
      forOf._i = forOf._loop.value;
      return forOf.yldH(forOf._i, _2, _7);
    } else {
      forOf._fc = _4, forOf._fe = _5;
      return forOf.jumpH(void 0, _3, _5);
    }
  }

  function _3(forOf) {
    if (forOf._loop.exit) {
      forOf._loop.exit();
    }

    return forOf.jumpH(void 0, forOf._fc, forOf._fe);
  }

  function _4(forOf) {
    return forOf.pure();
  }

  function _5(forOf, e) {
    return forOf.raise(e);
  }

  function _6(forOf) {
    return forOf.raise(forOf._err1);
  }

  function _7(forOf, a) {
    forOf._fc = _6, forOf._fe = _5, forOf._err1 = a;
    return forOf.jumpH(void 0, _3, _5);
  }
}

const objMethods = {
  a() {
    var ctx = M.generator();
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      return ctx.yldH(10, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
  },

  b() {
    var ctx = M.generator();
    ctx.__this = this;
    ctx.__args = arguments;
    return ctx.scopeH(_1, _5);

    function _1(ctx) {
      return ctx.yldH(1, _2, _5);
    }

    function _2(ctx) {
      return ctx.yldH(ctx.__this, _3, _5);
    }

    function _3(ctx) {
      return ctx.yldH(ctx.__args, _4, _5);
    }

    function _4(ctx) {
      return ctx.pure();
    }

    function _5(ctx, e) {
      return ctx.raise(e);
    }
  }

};
const objM = {
  objMethod() {
    var ctx = M.generator();
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      return ctx.yldH(1, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
  }

};

function objMethodsClosure() {
  var objMethodsClosure = M.generator();
  return objMethodsClosure.scopeH(_1, _2);

  function _1(objMethodsClosure) {
    objMethodsClosure._i = 0;
    objMethodsClosure._k = 0;
    objMethodsClosure._m = 0;
    return objMethodsClosure.pure({
      objMethod1(k) {
        var ctx = M.generator();
        ctx._objMethodsClosure = objMethodsClosure;
        ctx._k = k;
        return ctx.scopeH(_1, _5);

        function _1(ctx) {
          var a;
          ctx._j = 0;
          a = ctx._objMethodsClosure._i++;
          return ctx.yldH(a, _2, _5);
        }

        function _2(ctx) {
          var a;
          a = ctx._k++;
          return ctx.yldH(a, _3, _5);
        }

        function _3(ctx) {
          var a;
          a = ctx._objMethodsClosure._m++;
          return ctx.yldH(a, _4, _5);
        }

        function _4(ctx) {
          return ctx.pure({
            objMethod2(m) {
              var _ctx = M.generator();

              _ctx._f = ctx;
              _ctx._m = m;
              return _ctx.scopeH(_1, _5);

              function _1(_ctx) {
                var a;
                a = _ctx._f._j++;
                return _ctx.yldH(a, _2, _5);
              }

              function _2(_ctx) {
                var a;
                a = _ctx._f._k++;
                return _ctx.yldH(a, _3, _5);
              }

              function _3(_ctx) {
                var a;
                a = _ctx._m++;
                return _ctx.yldH(a, _4, _5);
              }

              function _4(_ctx) {
                return _ctx.pure();
              }

              function _5(_ctx, e) {
                return _ctx.raise(e);
              }
            }

          });
        }

        function _5(ctx, e) {
          return ctx.raise(e);
        }
      }

    });
  }

  function _2(objMethodsClosure, e) {
    return objMethodsClosure.raise(e);
  }
}

const objMThis = {
  [objMethod(a)]() {
    var ctx = M.generator();
    ctx.__this = this;
    ctx.__args = arguments;
    return ctx.scopeH(_1, _5);

    function _1(ctx) {
      return ctx.yldH(ctx.__this, _2, _5);
    }

    function _2(ctx) {
      return ctx.yldH(ctx.__this, _3, _5);
    }

    function _3(ctx) {
      var a;
      a = ctx.__args[0];
      return ctx.yldH(a, _4, _5);
    }

    function _4(ctx) {
      return ctx.pure();
    }

    function _5(ctx, e) {
      return ctx.raise(e);
    }
  }

};

class SomeClass {
  f(i) {
    var ctx = M.generator();
    ctx.__this = this;
    ctx.__args = arguments;
    ctx._i = i;
    return ctx.scopeH(_1, _5);

    function _1(ctx) {
      return ctx.yldH(ctx._i, _2, _5);
    }

    function _2(ctx) {
      return ctx.yldH(ctx.__args, _3, _5);
    }

    function _3(ctx) {
      return ctx.yldH(ctx.__this, _4, _5);
    }

    function _4(ctx) {
      return ctx.pure();
    }

    function _5(ctx, e) {
      return ctx.raise(e);
    }
  }

}

class SomeChild extends SomeClass {
  f(i) {
    var ctx = M.generator();
    ctx.__this = this;
    ctx.__args = arguments;
    ctx._i = i;
    return ctx.scopeH(_1, _5);

    function _1(ctx) {
      return ctx.yldH(ctx._i, _2, _5);
    }

    function _2(ctx) {
      return ctx.yldH(ctx.__args, _3, _5);
    }

    function _3(ctx) {
      var a;
      a = Object.getPrototypeOf(SomeChild.prototype)[ctx._i].call(ctx.__this, ctx._i);
      return ctx.yldStarH(a, _4, _5);
    }

    function _4(ctx) {
      return ctx.pure();
    }

    function _5(ctx, e) {
      return ctx.raise(e);
    }
  }

  static f(i) {
    var ctx = M.generator();
    ctx.__this = this;
    ctx._i = i;
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      var a;
      a = Object.getPrototypeOf(SomeChild.prototype)[ctx._i].call(ctx.__this, ctx._i);
      return ctx.yldStarH(a, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
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
      return ctx.scopeH(_1, _3);

      function _1(ctx) {
        return ctx.yldH(1, _2, _3);
      }

      function _2(ctx) {
        return ctx.pure();
      }

      function _3(ctx, e) {
        return ctx.raise(e);
      }
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
      return ctx.scopeH(_1, _3);

      function _1(ctx) {
        var a;
        a = ctx._clasClosure._cnt += 2;
        return ctx.yldH(a, _2, _3);
      }

      function _2(ctx) {
        return ctx.pure();
      }

      function _3(ctx, e) {
        return ctx.raise(e);
      }
    }

  };
  clasClosure._A = A;
  return clasClosure.scopeH(_1, _7);

  function _1(clasClosure) {
    var a;
    clasClosure._cnt = 0;
    a = clasClosure._cnt++;
    return clasClosure.yldH(a, _2, _7);
  }

  function _2(clasClosure) {
    var a;
    a = clasClosure._B.f();
    return clasClosure.yldStarH(a, _3, _7);
  }

  function _3(clasClosure) {
    var a;
    clasClosure._C = class extends clasClosure._A {
      static f() {
        var ctx = M.generator();
        ctx._clasClosure = clasClosure;
        return ctx.scopeH(_1, _4);

        function _1(ctx) {
          var a;
          a = ctx._clasClosure._cnt += 3;
          return ctx.yldH(a, _2, _4);
        }

        function _2(ctx) {
          var a;
          a = ctx._clasClosure._B1.f();
          return ctx.yldStarH(a, _3, _4);
        }

        function _3(ctx) {
          return ctx.pure();
        }

        function _4(ctx, e) {
          return ctx.raise(e);
        }
      }

    };
    a = clasClosure._cnt += 3;
    return clasClosure.yldH(a, _4, _7);
  }

  function _4(clasClosure) {
    var a;
    a = clasClosure._C.f();
    return clasClosure.yldStarH(a, _5, _7);
  }

  function _5(clasClosure) {
    var a;
    a = clasClosure._B1.f();
    return clasClosure.yldStarH(a, _6, _7);
  }

  function _6(clasClosure) {
    return clasClosure.pure();
  }

  function _7(clasClosure, e) {
    return clasClosure.raise(e);
  }
}

function c2() {
  var c2 = M.generator();

  c2._closure1_a = function _closure1_a() {
    var closure1_a = M.generator();
    closure1_a._c2 = c2;
    return closure1_a.scopeH(_1, _3);

    function _1(closure1_a) {
      closure1_a._ = closure1_a._c2._i;
      return closure1_a.yldH(`a`, _2, _3);
    }

    function _2(closure1_a, b) {
      var a;
      a = closure1_a._c2._i = closure1_a._ + b;
      return closure1_a.pure(a);
    }

    function _3(closure1_a, e) {
      return closure1_a.raise(e);
    }
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

  return c2.scopeH(_1, _2);

  function _1(c2) {
    c2._i = 0;
    return c2.pure(c2._closure1_b()());
  }

  function _2(c2, e) {
    return c2.raise(e);
  }
}

function loopCapt1() {
  var loopCapt1 = M.generator();
  return loopCapt1.scopeH(_1, _2);

  function _1(loopCapt1) {
    for (loopCapt1._i = 0; loopCapt1._i < 3; loopCapt1._i++) {
      (i => {
        var ctx = {};
        ctx._i = i;
        ctx._j = 0;
        funs(function iter() {
          var _iter = M.generator();

          _iter._f = ctx;
          return _iter.scopeH(_1, _3);

          function _1(_iter) {
            return _iter.yldH(`${_iter._f._i} ${_iter._f._j++}`, _2, _3);
          }

          function _2(_iter) {
            return _iter.pure();
          }

          function _3(_iter, e) {
            return _iter.raise(e);
          }
        });
      })(loopCapt1._i);
    }

    return loopCapt1.pure();
  }

  function _2(loopCapt1, e) {
    return loopCapt1.raise(e);
  }
}

function loopCapt2() {
  var loopCapt2 = M.generator();
  return loopCapt2.scopeH(_1, _5);

  function _1(loopCapt2) {
    loopCapt2._i = 0;
    return loopCapt2.jumpH(void 0, _2, _5);
  }

  function _2(loopCapt2) {
    var a;

    if (loopCapt2._i < 3) {
      a = (i => {
        var ctx = M.generator();
        ctx._i = i;
        return ctx.scopeH(_1, _3);

        function _1(ctx) {
          var a;
          a = ctx._i;
          return ctx.yldH(a, _2, _3);
        }

        function _2(ctx) {
          ctx._j = ctx._i + 1;
          funs(function iter() {
            var _iter = M.generator();

            _iter._f = ctx;
            return _iter.scopeH(_1, _3);

            function _1(_iter) {
              return _iter.yldH(_iter._f._j + _iter._f._i, _2, _3);
            }

            function _2(_iter) {
              return _iter.pure();
            }

            function _3(_iter, e) {
              return _iter.raise(e);
            }
          });
          return ctx.pure();
        }

        function _3(ctx, e) {
          return ctx.raise(e);
        }
      })(loopCapt2._i);

      return loopCapt2.yldStarH(a, _3, _5);
    } else {
      return loopCapt2.yldH('f', _4, _5);
    }
  }

  function _3(loopCapt2) {
    loopCapt2._i++;
    return loopCapt2.jumpRH(void 0, _2, _5);
  }

  function _4(loopCapt2) {
    return loopCapt2.pure();
  }

  function _5(loopCapt2, e) {
    return loopCapt2.raise(e);
  }
}

function loopCapt3() {
  var loopCapt3 = M.generator();
  return loopCapt3.scopeH(_1, _4);

  function _1(loopCapt3) {
    loopCapt3._i = 0;
    return loopCapt3.jumpH(void 0, _2, _4);
  }

  function _2(loopCapt3) {
    var a;

    if (loopCapt3._i < 3) {
      a = (i => {
        var ctx = M.generator();
        ctx._i = i;
        return ctx.scopeH(_1, _5);

        function _1(ctx) {
          var a;
          a = ctx._i;
          return ctx.yldH(a, _2, _5);
        }

        function _2(ctx) {
          ctx._j = 0;
          return ctx.jumpH(void 0, _3, _5);
        }

        function _3(ctx) {
          var a;

          if (ctx._j < 3) {
            a = (j => {
              var _ctx = M.generator();

              _ctx._j = j;
              return _ctx.scopeH(_1, _3);

              function _1(_ctx) {
                var a;
                a = _ctx._j;
                return _ctx.yldH(a, _2, _3);
              }

              function _2(_ctx) {
                funs(function iter() {
                  var _iter = M.generator();

                  _iter._f = ctx;
                  _iter._f1 = _ctx;
                  return _iter.scopeH(_1, _3);

                  function _1(_iter) {
                    return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, _2, _3);
                  }

                  function _2(_iter) {
                    return _iter.pure();
                  }

                  function _3(_iter, e) {
                    return _iter.raise(e);
                  }
                });
                return _ctx.pure();
              }

              function _3(_ctx, e) {
                return _ctx.raise(e);
              }
            })(ctx._j);

            return ctx.yldStarH(a, _4, _5);
          } else {
            return ctx.pure();
          }
        }

        function _4(ctx) {
          ctx._j++;
          return ctx.jumpRH(void 0, _3, _5);
        }

        function _5(ctx, e) {
          return ctx.raise(e);
        }
      })(loopCapt3._i);

      return loopCapt3.yldStarH(a, _3, _4);
    } else {
      return loopCapt3.pure();
    }
  }

  function _3(loopCapt3) {
    loopCapt3._i++;
    return loopCapt3.jumpRH(void 0, _2, _4);
  }

  function _4(loopCapt3, e) {
    return loopCapt3.raise(e);
  }
}

function loopCapt4() {
  var loopCapt4 = M.generator();
  return loopCapt4.scopeH(_1, _2);

  function _1(loopCapt4) {
    for (loopCapt4._i = 0; loopCapt4._i < 3; loopCapt4._i++) {
      (i => {
        var j,
            ctx = {};
        ctx._i = i;

        for (j = 0; j < 3; j++) {
          (j => {
            var _ctx = {};
            _ctx._j = j;
            funs(function iter() {
              var _iter = M.generator();

              _iter._f = ctx;
              _iter._f1 = _ctx;
              return _iter.scopeH(_1, _3);

              function _1(_iter) {
                return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, _2, _3);
              }

              function _2(_iter) {
                return _iter.pure();
              }

              function _3(_iter, e) {
                return _iter.raise(e);
              }
            });
          })(j);
        }
      })(loopCapt4._i);
    }

    return loopCapt4.pure();
  }

  function _2(loopCapt4, e) {
    return loopCapt4.raise(e);
  }
}

function forOfCapt1() {
  var forOfCapt1 = M.generator();
  return forOfCapt1.scopeH(_1, _2);

  function _1(forOfCapt1) {
    for (forOfCapt1._i of a) {
      (i => {
        var ctx = {};
        ctx._i = i;
        ctx._j = 0;
        funs(function iter() {
          var _iter = M.generator();

          _iter._f = ctx;
          return _iter.scopeH(_1, _3);

          function _1(_iter) {
            return _iter.yldH(`${_iter._f._i} ${_iter._f._j++}`, _2, _3);
          }

          function _2(_iter) {
            return _iter.pure();
          }

          function _3(_iter, e) {
            return _iter.raise(e);
          }
        });
      })(forOfCapt1._i);
    }

    return forOfCapt1.pure();
  }

  function _2(forOfCapt1, e) {
    return forOfCapt1.raise(e);
  }
}

function forOfCapt2() {
  var forOfCapt2 = M.generator();
  return forOfCapt2.scopeH(_1, _5);

  function _1(forOfCapt2) {
    forOfCapt2._loop = forOfCapt2.iterator(a);
    return forOfCapt2.jumpH(void 0, _2, _7);
  }

  function _2(forOfCapt2) {
    var a;

    if (!(forOfCapt2._loop = forOfCapt2._loop.step()).done) {
      forOfCapt2._i = forOfCapt2._loop.value;

      a = (i => {
        var ctx = M.generator();
        ctx._i = i;
        return ctx.scopeH(_1, _3);

        function _1(ctx) {
          var a;
          ctx._j = 0;
          a = ctx._i;
          return ctx.yldH(a, _2, _3);
        }

        function _2(ctx) {
          funs(function iter() {
            var _iter = M.generator();

            _iter._f = ctx;
            return _iter.scopeH(_1, _3);

            function _1(_iter) {
              return _iter.yldH(`${_iter._f._i} ${_iter._f._j++}`, _2, _3);
            }

            function _2(_iter) {
              return _iter.pure();
            }

            function _3(_iter, e) {
              return _iter.raise(e);
            }
          });
          return ctx.pure();
        }

        function _3(ctx, e) {
          return ctx.raise(e);
        }
      })(forOfCapt2._i);

      return forOfCapt2.yldStarH(a, _2, _7);
    } else {
      forOfCapt2._fc = _4, forOfCapt2._fe = _5;
      return forOfCapt2.jumpH(void 0, _3, _5);
    }
  }

  function _3(forOfCapt2) {
    if (forOfCapt2._loop.exit) {
      forOfCapt2._loop.exit();
    }

    return forOfCapt2.jumpH(void 0, forOfCapt2._fc, forOfCapt2._fe);
  }

  function _4(forOfCapt2) {
    return forOfCapt2.pure();
  }

  function _5(forOfCapt2, e) {
    return forOfCapt2.raise(e);
  }

  function _6(forOfCapt2) {
    return forOfCapt2.raise(forOfCapt2._err1);
  }

  function _7(forOfCapt2, a) {
    forOfCapt2._fc = _6, forOfCapt2._fe = _5, forOfCapt2._err1 = a;
    return forOfCapt2.jumpH(void 0, _3, _5);
  }
}

function forOfCapt3() {
  var forOfCapt3 = M.generator();
  return forOfCapt3.scopeH(_1, _2);

  function _1(forOfCapt3) {
    for (forOfCapt3._i of a) {
      (i => {
        var j,
            ctx = {};
        ctx._i = i;

        for (j of b) {
          (j => {
            var _ctx = {};
            _ctx._j = j;
            funs(function iter() {
              var _iter = M.generator();

              _iter._f = ctx;
              _iter._f1 = _ctx;
              return _iter.scopeH(_1, _3);

              function _1(_iter) {
                return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, _2, _3);
              }

              function _2(_iter) {
                return _iter.pure();
              }

              function _3(_iter, e) {
                return _iter.raise(e);
              }
            });
          })(j);
        }
      })(forOfCapt3._i);
    }

    return forOfCapt3.pure();
  }

  function _2(forOfCapt3, e) {
    return forOfCapt3.raise(e);
  }
}

function forOfCapt4() {
  var forOfCapt4 = M.generator();
  return forOfCapt4.scopeH(_1, _5);

  function _1(forOfCapt4) {
    forOfCapt4._loop = forOfCapt4.iterator(a);
    return forOfCapt4.jumpH(void 0, _2, _7);
  }

  function _2(forOfCapt4) {
    var a;

    if (!(forOfCapt4._loop = forOfCapt4._loop.step()).done) {
      forOfCapt4._i = forOfCapt4._loop.value;

      a = (i => {
        var ctx = M.generator();
        ctx._i = i;
        return ctx.scopeH(_1, _5);

        function _1(ctx) {
          ctx._loop = ctx.iterator(b);
          return ctx.jumpH(void 0, _2, _7);
        }

        function _2(ctx) {
          var a;

          if (!(ctx._loop = ctx._loop.step()).done) {
            ctx._j = ctx._loop.value;

            a = (j => {
              var _ctx = M.generator();

              _ctx._j = j;
              return _ctx.scopeH(_1, _3);

              function _1(_ctx) {
                var a;
                a = _ctx._j;
                return _ctx.yldH(a, _2, _3);
              }

              function _2(_ctx) {
                funs(function iter() {
                  var _iter = M.generator();

                  _iter._f = ctx;
                  _iter._f1 = _ctx;
                  return _iter.scopeH(_1, _3);

                  function _1(_iter) {
                    return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, _2, _3);
                  }

                  function _2(_iter) {
                    return _iter.pure();
                  }

                  function _3(_iter, e) {
                    return _iter.raise(e);
                  }
                });
                return _ctx.pure();
              }

              function _3(_ctx, e) {
                return _ctx.raise(e);
              }
            })(ctx._j);

            return ctx.yldStarH(a, _2, _7);
          } else {
            ctx._fc = _4, ctx._fe = _5;
            return ctx.jumpH(void 0, _3, _5);
          }
        }

        function _3(ctx) {
          if (ctx._loop.exit) {
            ctx._loop.exit();
          }

          return ctx.jumpH(void 0, ctx._fc, ctx._fe);
        }

        function _4(ctx) {
          return ctx.pure();
        }

        function _5(ctx, e) {
          return ctx.raise(e);
        }

        function _6(ctx) {
          return ctx.raise(ctx._err1);
        }

        function _7(ctx, a) {
          ctx._fc = _6, ctx._fe = _5, ctx._err1 = a;
          return ctx.jumpH(void 0, _3, _5);
        }
      })(forOfCapt4._i);

      return forOfCapt4.yldStarH(a, _2, _7);
    } else {
      forOfCapt4._fc = _4, forOfCapt4._fe = _5;
      return forOfCapt4.jumpH(void 0, _3, _5);
    }
  }

  function _3(forOfCapt4) {
    if (forOfCapt4._loop.exit) {
      forOfCapt4._loop.exit();
    }

    return forOfCapt4.jumpH(void 0, forOfCapt4._fc, forOfCapt4._fe);
  }

  function _4(forOfCapt4) {
    return forOfCapt4.pure();
  }

  function _5(forOfCapt4, e) {
    return forOfCapt4.raise(e);
  }

  function _6(forOfCapt4) {
    return forOfCapt4.raise(forOfCapt4._err1);
  }

  function _7(forOfCapt4, a) {
    forOfCapt4._fc = _6, forOfCapt4._fe = _5, forOfCapt4._err1 = a;
    return forOfCapt4.jumpH(void 0, _3, _5);
  }
}

function forOfCapt5() {
  var forOfCapt5 = M.generator();
  return forOfCapt5.scopeH(_1, _5);

  function _1(forOfCapt5) {
    forOfCapt5._loop = forOfCapt5.iterator(a);
    return forOfCapt5.jumpH(void 0, _2, _7);
  }

  function _2(forOfCapt5) {
    var a;

    if (!(forOfCapt5._loop = forOfCapt5._loop.step()).done) {
      forOfCapt5._i = forOfCapt5._loop.value;

      a = (i => {
        var ctx = M.generator();
        ctx._i = i;
        return ctx.scopeH(_1, _3);

        function _1(ctx) {
          var a;
          a = ctx._i;
          return ctx.yldH(a, _2, _3);
        }

        function _2(ctx) {
          for (ctx._j of b) {
            (j => {
              var _ctx = {};
              _ctx._j = j;
              funs(function iter() {
                var _iter = M.generator();

                _iter._f = ctx;
                _iter._f1 = _ctx;
                return _iter.scopeH(_1, _3);

                function _1(_iter) {
                  return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, _2, _3);
                }

                function _2(_iter) {
                  return _iter.pure();
                }

                function _3(_iter, e) {
                  return _iter.raise(e);
                }
              });
            })(ctx._j);
          }

          return ctx.pure();
        }

        function _3(ctx, e) {
          return ctx.raise(e);
        }
      })(forOfCapt5._i);

      return forOfCapt5.yldStarH(a, _2, _7);
    } else {
      forOfCapt5._fc = _4, forOfCapt5._fe = _5;
      return forOfCapt5.jumpH(void 0, _3, _5);
    }
  }

  function _3(forOfCapt5) {
    if (forOfCapt5._loop.exit) {
      forOfCapt5._loop.exit();
    }

    return forOfCapt5.jumpH(void 0, forOfCapt5._fc, forOfCapt5._fe);
  }

  function _4(forOfCapt5) {
    return forOfCapt5.pure();
  }

  function _5(forOfCapt5, e) {
    return forOfCapt5.raise(e);
  }

  function _6(forOfCapt5) {
    return forOfCapt5.raise(forOfCapt5._err1);
  }

  function _7(forOfCapt5, a) {
    forOfCapt5._fc = _6, forOfCapt5._fe = _5, forOfCapt5._err1 = a;
    return forOfCapt5.jumpH(void 0, _3, _5);
  }
}

function forOfCapt6() {
  var forOfCapt6 = M.generator();
  return forOfCapt6.scopeH(_1, _5);

  function _1(forOfCapt6) {
    forOfCapt6._loop = forOfCapt6.iterator(a);
    return forOfCapt6.jumpH(void 0, _2, _7);
  }

  function _2(forOfCapt6) {
    var a;

    if (!(forOfCapt6._loop = forOfCapt6._loop.step()).done) {
      forOfCapt6._i = forOfCapt6._loop.value;

      a = (i => {
        var ctx = M.generator();
        ctx._i = i;
        return ctx.scopeH(_1, _6);

        function _1(ctx) {
          var a;
          a = ctx._i;
          return ctx.yldH(a, _2, _6);
        }

        function _2(ctx) {
          ctx._loop = ctx.iterator(b);
          return ctx.jumpH(void 0, _3, _8);
        }

        function _3(ctx) {
          var a;

          if (!(ctx._loop = ctx._loop.step()).done) {
            ctx._j = ctx._loop.value;

            a = (j => {
              var _ctx = M.generator();

              _ctx._f = ctx;
              _ctx._j = j;
              return _ctx.scopeH(_1, _3);

              function _1(_ctx) {
                var a;
                a = _ctx._f._i;
                return _ctx.yldH(a, _2, _3);
              }

              function _2(_ctx) {
                funs(function iter() {
                  var _iter = M.generator();

                  _iter._f = ctx;
                  _iter._f1 = _ctx;
                  return _iter.scopeH(_1, _3);

                  function _1(_iter) {
                    return _iter.yldH(`${_iter._f._i} ${_iter._f1._j++}`, _2, _3);
                  }

                  function _2(_iter) {
                    return _iter.pure();
                  }

                  function _3(_iter, e) {
                    return _iter.raise(e);
                  }
                });
                return _ctx.pure();
              }

              function _3(_ctx, e) {
                return _ctx.raise(e);
              }
            })(ctx._j);

            return ctx.yldStarH(a, _3, _8);
          } else {
            ctx._fc = _5, ctx._fe = _6;
            return ctx.jumpH(void 0, _4, _6);
          }
        }

        function _4(ctx) {
          if (ctx._loop.exit) {
            ctx._loop.exit();
          }

          return ctx.jumpH(void 0, ctx._fc, ctx._fe);
        }

        function _5(ctx) {
          return ctx.pure();
        }

        function _6(ctx, e) {
          return ctx.raise(e);
        }

        function _7(ctx) {
          return ctx.raise(ctx._err1);
        }

        function _8(ctx, a) {
          ctx._fc = _7, ctx._fe = _6, ctx._err1 = a;
          return ctx.jumpH(void 0, _4, _6);
        }
      })(forOfCapt6._i);

      return forOfCapt6.yldStarH(a, _2, _7);
    } else {
      forOfCapt6._fc = _4, forOfCapt6._fe = _5;
      return forOfCapt6.jumpH(void 0, _3, _5);
    }
  }

  function _3(forOfCapt6) {
    if (forOfCapt6._loop.exit) {
      forOfCapt6._loop.exit();
    }

    return forOfCapt6.jumpH(void 0, forOfCapt6._fc, forOfCapt6._fe);
  }

  function _4(forOfCapt6) {
    return forOfCapt6.pure();
  }

  function _5(forOfCapt6, e) {
    return forOfCapt6.raise(e);
  }

  function _6(forOfCapt6) {
    return forOfCapt6.raise(forOfCapt6._err1);
  }

  function _7(forOfCapt6, a) {
    forOfCapt6._fc = _6, forOfCapt6._fe = _5, forOfCapt6._err1 = a;
    return forOfCapt6.jumpH(void 0, _3, _5);
  }
}

function forIn() {
  var forIn = M.generator();
  return forIn.scopeH(_1, _3);

  function _1(forIn) {
    forIn._loop = forIn.forInIterator({
      a: 1
    });
    return forIn.jumpH(void 0, _2, _3);
  }

  function _2(forIn) {
    if (!(forIn._loop = forIn._loop.step()).done) {
      forIn._i = forIn._loop.value;
      return forIn.yldH(forIn._i, _2, _3);
    } else {
      return forIn.pure();
    }
  }

  function _3(forIn, e) {
    return forIn.raise(e);
  }
}

function while1() {
  var while1 = M.generator();
  return while1.scopeH(_1, _4);

  function _1(while1) {
    while1._i = 0;
    return while1.jumpH(void 0, _2, _4);
  }

  function _2(while1) {
    var a;
    a = while1._i++;
    return while1.yldH(a, _3, _4);
  }

  function _3(while1, a) {
    var b;

    if (a < 3) {
      b = while1._i++;
      return while1.yldH(b, _2, _4);
    } else {
      while1._i = 0;
      return while1.pure();
    }
  }

  function _4(while1, e) {
    return while1.raise(e);
  }
}

function catchBlock2() {
  var catchBlock2 = M.generator();
  return catchBlock2.scopeH(_1, _8);

  function _1(catchBlock2) {
    catchBlock2._i = 0;
    return catchBlock2.jumpH(void 0, _2, _9);
  }

  function _2(catchBlock2) {
    return catchBlock2.yldH(catchBlock2._i === 3, _3, _9);
  }

  function _3(catchBlock2, a) {
    if (a) {
      throw new Error(`AAAAAAAAA${catchBlock2._i++}`);
    }

    return catchBlock2.yldH(`a${catchBlock2._i}`, _7, _8);
  }

  function _4(catchBlock2) {
    catchBlock2._e = catchBlock2._ex;
    return catchBlock2.yldH(`e${catchBlock2._i}`, _5, _8);
  }

  function _5(catchBlock2) {
    return catchBlock2.yldH(catchBlock2._e, _6, _8);
  }

  function _6(catchBlock2) {
    return catchBlock2.pure(catchBlock2._i);
  }

  function _7(catchBlock2) {
    catchBlock2._i++;
    return catchBlock2.jumpRH(void 0, _2, _9);
  }

  function _8(catchBlock2, e) {
    return catchBlock2.raise(e);
  }

  function _9(catchBlock2, a) {
    catchBlock2._ex = a;
    return catchBlock2.jumpH(void 0, _4, _8);
  }
}

function closure2() {
  var closure2 = M.generator();
  return closure2.scopeH(_1, _4);

  function _1(closure2) {
    closure2._k = 0;
    closure2._j = 1;
    closure2._m = 0;
    return closure2.yldH(closure2._k++ + closure2._j + closure2._m++, _2, _4);
  }

  function _2(closure2) {
    var a;
    a = closure2._m++;
    return closure2.yldH(a, _3, _4);
  }

  function _3(closure2) {
    return closure2.pure(function sub(k) {
      var _sub = M.generator();

      _sub._closure2 = closure2;
      _sub._k = k;
      return _sub.scopeH(_1, _3);

      function _1(_sub) {
        var a;
        a = _sub._k++;
        return _sub.yldH(a, _2, _3);
      }

      function _2(_sub, a) {
        var b;
        b = _sub._closure2._j;
        a, b;
        return _sub.pure();
      }

      function _3(_sub, e) {
        return _sub.raise(e);
      }
    });
  }

  function _4(closure2, e) {
    return closure2.raise(e);
  }
}

function switches() {
  var switches = M.generator();
  return switches.scopeH(_1, _39);

  function _1(switches) {
    if (a) {
      return switches.yldH(1, _2, _39);
    } else {
      return switches.jumpH(void 0, _2, _39);
    }
  }

  function _2(switches) {
    switch (a) {
      case 1:
        return switches.yldH(2, _3, _39);

      case 2:
        {
          console.log(3);
        }

      default:
        return switches.jumpH(void 0, _4, _39);
    }
  }

  function _3(switches) {
    return switches.yldH(3, _4, _39);
  }

  function _4(switches) {
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
    return switches.jumpH(void 0, _5, _39);
  }

  function _5(switches) {
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
        return switches.jumpH(void 0, _7, _48);

      default:
        return switches.yldH(`f2-${switches._i1}`, _6, _39);
    }
  }

  function _6(switches) {
    switches._i1++;
    return switches.jumpRH(void 0, _5, _39);
  }

  function _7(switches) {
    if (!(switches._loop = switches._loop.step()).done) {
      switches._i3 = switches._loop.value;

      switch (switches._i3) {
        case 3:
          return switches.yldH(`l2-${switches._i3}`, _8, _48);

        default:
          return switches.jumpRH(void 0, _7, _48);
      }
    } else {
      switches._fc = _10, switches._fe = _39;
      return switches.jumpH(void 0, _9, _39);
    }
  }

  function _8(switches) {
    switches._fc = _10, switches._fe = _39;
    return switches.jumpH(void 0, _9, _39);
  }

  function _9(switches) {
    if (switches._loop.exit) {
      switches._loop.exit();
    }

    return switches.jumpH(void 0, switches._fc, switches._fe);
  }

  function _10(switches) {
    switches._loop1 = switches.iterator(gen());
    return switches.jumpH(void 0, _11, _49);
  }

  function _11(switches) {
    if (!(switches._loop1 = switches._loop1.step()).done) {
      switches._i4 = switches._loop1.value;

      switch (switches._i4) {
        case 3:
          switches._fc1 = _13, switches._fe1 = _39;
          return switches.jumpH(void 0, _12, _39);

        default:
          return switches.yldH(`l3-${switches._i4}`, _11, _49);
      }
    } else {
      switches._fc1 = _13, switches._fe1 = _39;
      return switches.jumpH(void 0, _12, _39);
    }
  }

  function _12(switches) {
    if (switches._loop1.exit) {
      switches._loop1.exit();
    }

    return switches.jumpH(void 0, switches._fc1, switches._fe1);
  }

  function _13(switches) {
    switches._loop2 = switches.iterator(gen());
    return switches.jumpH(void 0, _14, _50);
  }

  function _14(switches) {
    if (!(switches._loop2 = switches._loop2.step()).done) {
      switches._i5 = switches._loop2.value;

      switch (switches._i5) {
        case 3:
          switches._fc2 = _16, switches._fe2 = _39;
          return switches.jumpH(void 0, _15, _39);

        default:
          return switches.yldH(`l4-${switches._i5}`, _14, _50);
      }
    } else {
      switches._fc2 = _16, switches._fe2 = _39;
      return switches.jumpH(void 0, _15, _39);
    }
  }

  function _15(switches) {
    if (switches._loop2.exit) {
      switches._loop2.exit();
    }

    return switches.jumpH(void 0, switches._fc2, switches._fe2);
  }

  function _16(switches) {
    switches._loop3 = switches.iterator(gen());
    return switches.jumpH(void 0, _17, _51);
  }

  function _17(switches) {
    if (!(switches._loop3 = switches._loop3.step()).done) {
      switches._i6 = switches._loop3.value;
      return switches.yldH(`l5-${switches._i6}`, _18, _51);
    } else {
      switches._fc3 = _20, switches._fe3 = _39;
      return switches.jumpH(void 0, _19, _39);
    }
  }

  function _18(switches) {
    switch (switches._i6) {
      case 3:
        switches._fc3 = _20, switches._fe3 = _39;
        return switches.jumpH(void 0, _19, _39);

      default:
        return switches.jumpRH(void 0, _17, _51);
    }
  }

  function _19(switches) {
    if (switches._loop3.exit) {
      switches._loop3.exit();
    }

    return switches.jumpH(void 0, switches._fc3, switches._fe3);
  }

  function _20(switches) {
    switches._loop4 = switches.iterator(gen());
    return switches.jumpH(void 0, _21, _52);
  }

  function _21(switches) {
    if (!(switches._loop4 = switches._loop4.step()).done) {
      switches._i7 = switches._loop4.value;

      switch (switches._i7) {
        case 3:
          return switches.yldH(`l6-1-${switches._i7}`, _22, _52);

        default:
          return switches.yldH(`l6-2-${switches._i7}`, _21, _52);
      }
    } else {
      switches._fc4 = _24, switches._fe4 = _39;
      return switches.jumpH(void 0, _23, _39);
    }
  }

  function _22(switches) {
    switches._fc4 = _24, switches._fe4 = _39;
    return switches.jumpH(void 0, _23, _39);
  }

  function _23(switches) {
    if (switches._loop4.exit) {
      switches._loop4.exit();
    }

    return switches.jumpH(void 0, switches._fc4, switches._fe4);
  }

  function _24(switches) {
    switches._loop5 = switches.iterator(gen());
    return switches.jumpH(void 0, _25, _53);
  }

  function _25(switches) {
    if (!(switches._loop5 = switches._loop5.step()).done) {
      switches._i8 = switches._loop5.value;

      switch (switches._i8) {
        case 0:
          return switches.jumpRH(void 0, _25, _53);

        case 1:
        case 2:
          return switches.yldH(`l7-1-${switches._i8}`, _25, _53);

        case 3:
          return switches.jumpRH(void 0, _25, _53);

        case 4:
          return switches.yldH(`l7-2-${switches._i8}`, _25, _53);

        case 5:
          return switches.yldH(`l7-3-${switches._i8}`, _27, _53);

        case 6:
          return switches.jumpRH(void 0, _25, _53);

        case 7:
          return switches.yldH(`l7-4-${switches._i8}`, _26, _53);

        default:
          return switches.yldH(`l7-5-${switches._i8}`, _27, _53);
      }
    } else {
      switches._fc5 = _29, switches._fe5 = _39;
      return switches.jumpH(void 0, _28, _39);
    }
  }

  function _26(switches) {
    switches._fc5 = _29, switches._fe5 = _39;
    return switches.jumpH(void 0, _28, _39);
  }

  function _27(switches) {
    return switches.yldH(`l7-6-${switches._i8}`, _25, _53);
  }

  function _28(switches) {
    if (switches._loop5.exit) {
      switches._loop5.exit();
    }

    return switches.jumpH(void 0, switches._fc5, switches._fe5);
  }

  function _29(switches) {
    switches._loop6 = switches.iterator(gen());
    return switches.jumpH(void 0, _30, _54);
  }

  function _30(switches) {
    if (!(switches._loop6 = switches._loop6.step()).done) {
      switches._i9 = switches._loop6.value;
      switches._loop7 = switches.iterator(gen());
      return switches.jumpRH(void 0, _31, _55);
    } else {
      switches._fc7 = _38, switches._fe7 = _39;
      return switches.jumpH(void 0, _37, _39);
    }
  }

  function _31(switches) {
    if (!(switches._loop7 = switches._loop7.step()).done) {
      switches._j = switches._loop7.value;

      switch (switches._i9) {
        case 0:
        case 1:
        case 2:
          return switches.yldH(`s1:${switches._i9},${switches._j}`, _32, _55);

        case 3:
          switch (switches._j) {
            case 2:
            case 3:
              return switches.yldH(`s2:${switches._i9},${switches._j}`, _31, _55);

            case 5:
              return switches.yldH(`s3:${switches._i9},${switches._j}`, _31, _55);

            case 7:
              return switches.yldH(`s4:${switches._i9},${switches._j}`, _31, _55);

            case 8:
              return switches.yldH(`s5:${switches._i9},${switches._j}`, _31, _55);

            case 9:
              return switches.yldH(`s6:${switches._i9},${switches._j}`, _33, _55);

            default:
              return switches.jumpRH(void 0, _31, _55);
          }

        case 4:
          switch (switches._j) {
            case 2:
            case 3:
              return switches.yldH(`s7:${switches._i9},${switches._j}`, _35, _55);

            case 5:
              return switches.yldH(`s8:${switches._i9},${switches._j}`, _31, _55);

            case 6:
              switches._fc6 = _30, switches._fe6 = _54;
              return switches.jumpH(void 0, _36, _54);

            case 7:
              return switches.yldH(`s9:${switches._i9},${switches._j}`, _35, _55);

            case 8:
              return switches.yldH(`s10:${switches._i9},${switches._j}`, _31, _55);

            case 9:
              return switches.yldH(`s11:${switches._i9},${switches._j}`, _34, _55);

            default:
              return switches.yldH(`s12:${switches._i9},${switches._j}`, _35, _55);
          }

        case 5:
          switch (switches._j) {
            case 2:
            case 3:
              switches._fc6 = _37, switches._fe6 = _39, switches._fc7 = _38, switches._fe7 = _39;
              return switches.jumpH(void 0, _36, _54);

            default:
              return switches.jumpRH(void 0, _31, _55);
          }

        default:
          return switches.jumpRH(void 0, _31, _55);
      }
    } else {
      switches._fc6 = _30, switches._fe6 = _54;
      return switches.jumpH(void 0, _36, _54);
    }
  }

  function _32(switches) {
    if (switches._j > 3) {
      switches._fc6 = _30, switches._fe6 = _54;
      return switches.jumpH(void 0, _36, _54);
    } else {
      return switches.jumpRH(void 0, _31, _55);
    }
  }

  function _33(switches) {
    switches._fc6 = _30, switches._fe6 = _54;
    return switches.jumpH(void 0, _36, _54);
  }

  function _34(switches) {
    switches._fc6 = _37, switches._fe6 = _39, switches._fc7 = _38, switches._fe7 = _39;
    return switches.jumpH(void 0, _36, _54);
  }

  function _35(switches) {
    return switches.yldH(`s13:${switches._i9},${switches._j}`, _31, _55);
  }

  function _36(switches) {
    if (switches._loop7.exit) {
      switches._loop7.exit();
    }

    switches._err7 = switches._err8;
    return switches.jumpH(void 0, switches._fc6, switches._fe6);
  }

  function _37(switches) {
    if (switches._loop6.exit) {
      switches._loop6.exit();
    }

    return switches.jumpH(void 0, switches._fc7, switches._fe7);
  }

  function _38(switches) {
    return switches.pure();
  }

  function _39(switches, e) {
    return switches.raise(e);
  }

  function _40(switches) {
    return switches.raise(switches._err1);
  }

  function _41(switches) {
    return switches.raise(switches._err2);
  }

  function _42(switches) {
    return switches.raise(switches._err3);
  }

  function _43(switches) {
    return switches.raise(switches._err4);
  }

  function _44(switches) {
    return switches.raise(switches._err5);
  }

  function _45(switches) {
    return switches.raise(switches._err6);
  }

  function _46(switches) {
    return switches.raise(switches._err7);
  }

  function _47(switches) {
    return switches.raise(switches._err8);
  }

  function _48(switches, a) {
    switches._fc = _40, switches._fe = _39, switches._err1 = a;
    return switches.jumpH(void 0, _9, _39);
  }

  function _49(switches, a) {
    switches._fc1 = _41, switches._fe1 = _39, switches._err2 = a;
    return switches.jumpH(void 0, _12, _39);
  }

  function _50(switches, a) {
    switches._fc2 = _42, switches._fe2 = _39, switches._err3 = a;
    return switches.jumpH(void 0, _15, _39);
  }

  function _51(switches, a) {
    switches._fc3 = _43, switches._fe3 = _39, switches._err4 = a;
    return switches.jumpH(void 0, _19, _39);
  }

  function _52(switches, a) {
    switches._fc4 = _44, switches._fe4 = _39, switches._err5 = a;
    return switches.jumpH(void 0, _23, _39);
  }

  function _53(switches, a) {
    switches._fc5 = _45, switches._fe5 = _39, switches._err6 = a;
    return switches.jumpH(void 0, _28, _39);
  }

  function _54(switches, a) {
    switches._fc7 = _46, switches._fe7 = _39, switches._err7 = a;
    return switches.jumpH(void 0, _37, _39);
  }

  function _55(switches, a) {
    switches._fc6 = _37, switches._fe6 = _39, switches._fc7 = _47, switches._fe7 = _39, switches._err8 = a;
    return switches.jumpH(void 0, _36, _54);
  }
}