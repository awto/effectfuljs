function a01() {
  var e;
  console.log('in');
  console.log('inner');
  return M.jM(eff('inner'), _2);

  function _1() {
    e = ex;
    console.log('exception', e);
    return M.jM(eff('exception', e), _2);
  }

  function _2() {
    console.log('out');
    return eff('out');
  }
}

function a02() {
  var e;
  console.log('in');
  return M.jM(eff('inner'), _1);

  function _1() {
    try {
      console.log('inner');
      return _4();
    } catch (e) {
      return _2();
    }
  }

  function _2() {
    e = _ex;
    return M.jM(eff('exception', e), _3);
  }

  function _3() {
    console.log('exception', e);
    return _4();
  }

  function _4() {
    return M.jM(eff('out'), _5);
  }

  function _5() {
    console.log('out');
    return M.pure();
  }
}

function a03() {
  var i, j, ex, e, a;
  console.log('in', i++, j += 2);
  a = i++;
  return M.jM(eff(a, j), _1);

  function _1() {
    var a;

    try {
      a = i++;
      return M.jME(eff('inner', a, j), _2, _3);
    } catch (e) {
      return _3();
    }
  }

  function _2() {
    try {
      console.log('inner');
      return _5();
    } catch (e) {
      return _3();
    }
  }

  function _3() {
    var a;
    e = ex1;
    ex = e;
    a = j++;
    return M.jM(eff('exception', e, a), _4);
  }

  function _4() {
    console.log('exception', e);
    return _5();
  }

  function _5() {
    return M.jM(eff('out', ex, i), _6);
  }

  function _6() {
    console.log('out');
    return M.pure();
  }
}

function a04() {
  var i, j, a, b;
  i = 0;
  a = i++;
  b = j = 0;
  return M.jM(eff(1, a, b), _1);

  function _1() {
    var a, b;
    a = i++;
    b = j = j + 1;
    return M.jM(eff(2, a, b), _2);
  }

  function _2() {
    return M.jM(eff(3, i, j), _3);
  }

  function _3() {
    return M.jM(eff(4), _4);
  }

  function _4() {
    return M.jM(eff(5, i), _5);
  }

  function _5() {
    if (something) return _7(_16, undefined);else {
      if (something2) return _7(_17, _20);else {
        if (something3) return _7(_17, M.pure);else {
          if (something4) return _6();else return _7(_17, M.pure);
        }
      }
    }
  }

  function _6() {
    return M.jM(eff(6), _7, _17, M.pure);
  }

  function _7(cb1, cb2) {
    return M.jM(eff(7), _8, cb1, cb2);
  }

  function _8(cb1, cb2) {
    if (something5) return _9(cb1, cb2);else return _10(_11, _17, cb1, _20);
  }

  function _9(cb1, cb2) {
    return M.jM(eff(8, j), _10, _11, _14, cb1, cb2);
  }

  function _10(cb, _cb, cb1, cb2) {
    console.log('i');
    return cb(_cb, cb1, cb2);
  }

  function _11(_cb, cb1, cb2) {
    var a;
    a = j = j + 1;
    return M.jM(eff(9, a), _12, _cb, cb1, cb2);
  }

  function _12(_cb, cb1, cb2) {
    return M.jM(eff(10), _13, _cb, cb1, cb2);
  }

  function _13(_cb, cb1, cb2) {
    console.log(j);
    return _cb(cb1, cb2);
  }

  function _14(cb1, cb2) {
    return M.jM(eff(11), _15, cb1, cb2);
  }

  function _15(cb1, cb2) {
    console.log(11);
    return cb1(cb2);
  }

  function _16(cb2) {
    return M.jM(eff(12), _17, undefined, _19);
  }

  function _17(cb1, cb2) {
    var a;
    a = i = i + 1;
    return M.jM(eff(13, a), _18, cb2);
  }

  function _18(cb2) {
    return M.jM(eff(14), cb2);
  }

  function _19() {
    return M.jM(eff(15, i), _20);
  }

  function _20() {
    return eff(16);
  }
}

function a05() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(eff(2), _2);
  }

  function _2() {
    return M.jM(eff(3), _3, _5);
  }

  function _3(cb) {
    return M.jM(eff(4), _4, cb);
  }

  function _4(cb) {
    return M.jM(eff(5), cb);
  }

  function _5() {
    return eff(6);
  }
}

function a06() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(eff(2), _2);
  }

  function _2() {
    return M.jM(eff(3), _3, _5);
  }

  function _3(cb) {
    return M.jM(eff(4), _4, cb);
  }

  function _4(cb) {
    return M.jM(eff(5), cb);
  }

  function _5() {
    console.log(6);
    return M.pure();
  }
}

function a07() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(eff(2), _2);
  }

  function _2() {
    return M.jMB(eff(3), _3);
  }

  function _3(a) {
    if (a) return _4(_7);else {
      return M.jM(eff(4), _4, _6);
    }
  }

  function _4(cb) {
    return M.jM(eff(5), _5, cb);
  }

  function _5(cb) {
    return M.jM(eff(6), cb);
  }

  function _6() {
    return M.jM(eff(7), _7);
  }

  function _7() {
    console.log(8);
    return M.pure();
  }
}

function a08() {
  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(eff(2), _2);
  }

  function _2() {
    return M.jMB(eff(3), _3);
  }

  function _3(a) {
    if (a) return _4(_7);else {
      return M.jM(eff(4), _4, _6);
    }
  }

  function _4(cb) {
    return M.jM(eff(5), _5, cb);
  }

  function _5(cb) {
    return M.jM(eff(6), cb);
  }

  function _6() {
    return M.jM(eff(7), _7);
  }

  function _7() {
    if (a) return _8();else {
      console.log(8);
      return M.pure();
    }
  }

  function _8() {
    return M.pure(10);
  }
}

function a09() {
  var a, _a;

  return M.jM(eff(1), _1);

  function _1() {
    return M.jM(eff(2), _2);
  }

  function _2() {
    return M.jMB(eff(3), _3);
  }

  function _3(b) {
    a = b;
    if (a === 1) return _12(_15, undefined);else {
      if (a === 2) return _4();else {
        return M.jM(eff(5), _6);
      }
    }
  }

  function _4() {
    return M.jM(eff(4), _5);
  }

  function _5() {
    return _12(_16, 10);
  }

  function _6() {
    return M.jMB(eff(6), _7);
  }

  function _7(b) {
    _a = b;
    if (_a === 1) return _9(_12, _15, undefined);else {
      if (_a === 2) return _8();else {
        return M.jM(eff(7), _9, _11, undefined, undefined);
      }
    }
  }

  function _8() {
    return _9(_12, _16, 10);
  }

  function _9(cb, _cb, r) {
    return M.jM(eff(8), _10, cb, _cb, r);
  }

  function _10(cb, _cb, r) {
    return M.jM(eff(9), cb, _cb, r);
  }

  function _11(_cb, r) {
    return M.jM(eff(10), _12, _14, r);
  }

  function _12(_cb, r) {
    return M.jM(eff(11), _13, _cb, r);
  }

  function _13(_cb, r) {
    return M.jM(eff(12), _cb, r);
  }

  function _14(r) {
    return M.jM(eff(13), _15, r);
  }

  function _15(r) {
    return eff(14);
  }

  function _16(r) {
    return M.pure(r);
  }
}

function a10() {
  var a;
  return M.jM(eff(2), _1);

  function _1() {
    return M.jM(eff(5), _2);
  }

  function _2() {
    return M.jMB(eff(6), _3);
  }

  function _3(b) {
    a = b;
    if (a) return _4();else return _5(_7, _9);
  }

  function _4() {
    return M.jMB(eff(3), _5, _7, M.pure);
  }

  function _5(cb, _cb) {
    return M.jM(eff(8), _6, cb, _cb);
  }

  function _6(cb, _cb) {
    return M.jM(eff(9), cb, _cb);
  }

  function _7(_cb) {
    return M.jM(eff(11), _8, _cb);
  }

  function _8(_cb) {
    return M.jM(eff(12), _cb);
  }

  function _9() {
    return eff(13);
  }
}

function a11() {
  return M.jM(eff(1), _1, _2);

  function _1(cb) {
    return M.jM(eff(2), cb);
  }

  function _2() {
    return M.jM(eff('a'), _3, _4);
  }

  function _3(cb) {
    return M.jM(eff(3), cb);
  }

  function _4() {
    return eff(4);
  }
}

function a12() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    if (a) return _2();else return _3(_4, undefined, undefined);
  }

  function _2() {
    return _3(_5, _7, 10);
  }

  function _3(cb, _cb, r) {
    return M.jM(eff(2), cb, _cb, r);
  }

  function _4(_cb, r) {
    return M.jM(eff('A'), _5, _6, r);
  }

  function _5(_cb, r) {
    return M.jM(eff(3), _cb, r);
  }

  function _6(r) {
    return eff(4);
  }

  function _7(r) {
    return M.pure(r);
  }
}

function a13() {
  return M.jMB(eff(1), _1);

  function _1(a) {
    if (a) return _2(_5, M.pure);else return _2(_4, undefined);
  }

  function _2(cb, _cb) {
    return M.jM(eff(2), _3, cb, _cb);
  }

  function _3(cb, _cb) {
    return M.jM(eff('2'), cb, _cb);
  }

  function _4(_cb) {
    return M.jM(eff('A'), _5, _6);
  }

  function _5(_cb) {
    return M.jM(eff(3), _cb);
  }

  function _6() {
    return eff(4);
  }
}

function a14() {
  var a;
  return _1();

  function _1(_cb, r) {
    return M.jMB(eff(1), _2, _cb, r);
  }

  function _2(b, _cb, r) {
    a = b;
    if (a === 1) return _5(_8, _10, r);else {
      if (a === 2) return _5(_1, _cb, r);else {
        if (a === 3) return _3();else {
          if (a === 4) return _5(_8, M.pure, r);else {
            if (a === 5) return _4(r);else {
              return M.jM(eff(2), _5, _7, _cb, r);
            }
          }
        }
      }
    }
  }

  function _3() {
    return _5(_8, _11, 1);
  }

  function _4(r) {
    return M.jMB(eff('REZ'), _5, _8, M.pure, r);
  }

  function _5(cb, _cb, r) {
    return M.jM(eff(3), _6, cb, _cb, r);
  }

  function _6(cb, _cb, r) {
    return M.jM(eff(4), cb, _cb, r);
  }

  function _7(_cb, r) {
    return M.jRM(eff(5), _1, _cb, r);
  }

  function _8(_cb, r) {
    return M.jM(eff(6), _9, _cb, r);
  }

  function _9(_cb, r) {
    return M.jM(eff(7), _cb, r);
  }

  function _10(r) {
    return eff(8);
  }

  function _11(r) {
    return M.pure(r);
  }
}

function a15() {
  var _a;

  return _1();

  function _1() {
    return M.jMB(eff(1), _2);
  }

  function _2(b) {
    _a = b;

    if (_a === 1) {
      if (a) {
        return eff(8);
      } else {
        console.log('a');
        return _1();
      }
    } else {
      return M.jRM(eff(2), _1);
    }
  }
}

function a15a() {
  if (a === 1) return M.pure();else {
    return eff(2);
  }
}

function a16() {
  var _a;

  return M.jM(eff(0), _1);

  function _1() {
    console.log('a');
    return _2();
  }

  function _2() {
    return M.jMB(eff(1), _3);
  }

  function _3(b) {
    _a = b;

    if (_a === 1) {
      if (a) {
        return eff(8);
      } else return _1();
    } else {
      return M.jRM(eff(2), _2);
    }
  }
}

function a17() {
  var a;
  return _1();

  function _1() {
    return M.jMB(eff(1), _2);
  }

  function _2(c) {
    a = c;

    if (a === 1) {
      if (b) {
        return eff(8);
      } else return _1();
    } else {
      return M.jRM(eff(2), _1);
    }
  }
}

function a18() {
  var a;
  return _1();

  function _1() {
    return M.jMB(eff(1), _2);
  }

  function _2(b) {
    a = b;
    if (a === 1) return _3(_5);else {
      return M.jRM(eff(2), _3, _1);
    }
  }

  function _3(cb) {
    return M.jM(effF(3), _4, cb);
  }

  function _4(cb) {
    return M.jM(effF(4), cb);
  }

  function _5() {
    if (b) {
      return eff(8);
    } else return _1();
  }
}

function a19() {
  return _1();

  function _1() {
    return M.jM(eff(1), _2);
  }

  function _2() {
    return M.jRM(eff(2), _3, _1);
  }

  function _3(cb) {
    return M.jM(effF(3), cb);
  }
}

function a20() {
  return _1();

  function _1() {
    return M.jRM(eff(2), _2, _1);
  }

  function _2(cb) {
    return M.jM(effF(3), cb);
  }
}

function a21() {
  return _1();

  function _1() {
    return M.jRM(eff(2), _2, _1);
  }

  function _2(cb) {
    if (a1) return _3(_1);else {
      if (a2) return _3(M.pure);else {
        if (a3) return _3(M.pure);else {
          return M.jM(effF(3), _3, cb);
        }
      }
    }
  }

  function _3(cb) {
    return M.jM(effFF(4), cb);
  }
}

function a22() {
  return _1();

  function _1() {
    return M.jRM(eff(2), _2, _1);
  }

  function _2(cb) {
    return M.jM(effFF(4), cb);
  }
}

function a23() {
  return _1();

  function _1(_cb) {
    if (a1) return _2(_3, _4);else {
      return M.jRM(eff(2), _2, _1, _cb);
    }
  }

  function _2(cb, _cb) {
    return M.jM(effFF(4), cb, _cb);
  }

  function _3(_cb) {
    return M.jM(effFF(5), _cb);
  }

  function _4() {
    return eff(6);
  }
}

function a24() {
  return _1();

  function _1() {
    if (a1) return _2(_3);else {
      return M.jRM(eff(2), _2, _1);
    }
  }

  function _2(cb) {
    return M.jM(effFF(4), cb);
  }

  function _3() {
    return eff(6);
  }
}

function a25() {
  if (a1) return _1(M.pure);else {
    return M.jRM(eff(2), _1, M.pure);
  }

  function _1(cb) {
    return effFF(4);
  }
}

function a26() {
  if (a1) return _1(M.pure);else {
    return M.jRM(eff(2), _1, M.pure);
  }

  function _1(cb) {
    return effFF(4);
  }
}

function a27() {
  return _1();

  function _1() {
    if (a1) return _2(_3);else {
      return M.jRM(eff(2), _2, _3);
    }
  }

  function _2(cb) {
    return M.jM(effFF(4), cb);
  }

  function _3() {
    return eff(5);
  }
}

function a28() {
  if (a1) return _1(_5, _6);else {
    return M.jM(eff(2), _1, _4, undefined);
  }

  function _1(cb, _cb) {
    return M.jM(eff(3), _2, cb, _cb);
  }

  function _2(cb, _cb) {
    if (a2) return _3(_4, _cb);else {
      return M.jM(eff(4), _3, cb, _cb);
    }
  }

  function _3(cb, _cb) {
    return M.jM(eff(5), cb, _cb);
  }

  function _4(_cb) {
    return M.jM(eff(6), _5, _6);
  }

  function _5(_cb) {
    return M.jM(eff(7), _cb);
  }

  function _6() {
    return eff(8);
  }
}

function a29() {
  return M.jM(eff(2), _1);

  function _1() {
    return M.jM(eff(3), _3, _4);
  }

  function _2() {
    var cb;
    return M.jM(eff(4), _3, cb);
  }

  function _3(cb) {
    return M.jM(eff(5), cb);
  }

  function _4() {
    return M.jM(eff(6), _5, _6);
  }

  function _5(cb) {
    return M.jM(eff(7), cb);
  }

  function _6() {
    return eff(8);
  }
}

function a30(a1, a2) {
  if (a1) return _1(_5, _6);else {
    return M.jM(eff(2), _1, _4, undefined);
  }

  function _1(cb, _cb) {
    return M.jM(eff(3), _2, cb, _cb);
  }

  function _2(cb, _cb) {
    if (a2) return _3(_4, _cb);else {
      return M.jM(eff(4), _3, cb, _cb);
    }
  }

  function _3(cb, _cb) {
    return M.jM(eff(5), cb, _cb);
  }

  function _4(_cb) {
    return M.jM(eff(6), _5, _6);
  }

  function _5(_cb) {
    return M.jM(eff(7), _cb);
  }

  function _6() {
    return eff(8);
  }
}

function a31() {
  var e;
  return _1();

  function _1() {
    try {
      console.log('hi');
      return M.jME(eff(1), _2, _3);
    } catch (e) {
      return _3();
    }
  }

  function _2() {
    try {
      return M.jME(eff(2), _4, _3);
    } catch (e) {
      return _3();
    }
  }

  function _3() {
    e = ex2;
    console.log(e);
    return M.jM(eff(3), _4);
  }

  function _4() {
    return eff(4);
  }
}

function a32(a1, a2) {
  var e, ee;
  return _1();

  function _1() {
    try {
      console.log('hi');
      return M.jME(eff(1), _2, _3);
    } catch (e) {
      return _3();
    }
  }

  function _2() {
    try {
      return M.jME(eff(2), _5, _3);
    } catch (e) {
      return _3();
    }
  }

  function _3() {
    try {
      e = ex3;
      console.log(e);
      return M.jME(eff(3), _5, _4);
    } catch (e) {
      return _4();
    }
  }

  function _4() {
    ee = ex4;
    return M.jM(eff(4), _5);
  }

  function _5() {
    return eff(5);
  }
}

function a33() {
  var e;
  return _1();

  function _1() {
    try {
      console.log('hi');
      return M.jME(eff(1), _2, _3);
    } catch (e) {
      return _3();
    }
  }

  function _2() {
    try {
      return M.jME(eff(2), _4, _5, _3);
    } catch (e) {
      return _3();
    }
  }

  function _3() {
    e = ex5;
    console.log(e);
    return M.jM(eff(3), _4, _5);
  }

  function _4(cb) {
    return M.jM(eff(4), cb);
  }

  function _5() {
    return eff(5);
  }
}

function a34() {
  var e;
  return _1();

  function _1() {
    try {
      console.log('hi');
      return M.jME(eff(1), _2, _3, _2);
    } catch (e) {
      return _2(_4);
    }
  }

  function _2(cb) {
    try {
      return M.jME(eff(2), cb, _4);
    } catch (e) {
      return _4();
    }
  }

  function _3() {
    try {
      return M.jME(eff(3), _5, _6, _4);
    } catch (e) {
      return _4();
    }
  }

  function _4() {
    e = ex6;
    return M.jM(eff(e), _5, _6);
  }

  function _5(cb) {
    return M.jM(eff(4), cb);
  }

  function _6() {
    return eff(5);
  }
}

function a35() {
  var e;
  return _1();

  function _1() {
    try {
      console.log('hi');
      return M.jME(eff('try>try>body'), _2, _3, _2);
    } catch (e) {
      return _2(_4);
    }
  }

  function _2(cb) {
    try {
      return M.jME(eff('try>try>finally'), cb, _4);
    } catch (e) {
      return _4();
    }
  }

  function _3() {
    try {
      return M.jME(eff('try>body'), _5, _4);
    } catch (e) {
      return _4();
    }
  }

  function _4() {
    e = ex7;
    console.log(e);
    return M.jM(eff('try>catch'), _5);
  }

  function _5() {
    return eff('last');
  }
}

function a36(a1) {
  if (a1) return _1(M.pure);else {
    return M.jM(eff('body'), _1, M.pure);
  }

  function _1(cb) {
    return eff('finally');
  }
}

function a37(a1, a2) {
  if (a1) return _1(_5, _6);else {
    return M.jM(eff('l1>try-body>l2>try-body'), _1, _4, undefined);
  }

  function _1(cb, _cb) {
    return M.jM(eff('l1>try-body>l2>try-finally'), _2, cb, _cb);
  }

  function _2(cb, _cb) {
    if (a2) return _3(_4, _cb);else {
      return M.jM(eff('l1>try-body>l2>try-finally>try-body'), _3, cb, _cb);
    }
  }

  function _3(cb, _cb) {
    return M.jM(eff('l1>try-body>l2>try-finally>try-finally'), cb, _cb);
  }

  function _4(_cb) {
    return M.jM(eff('l1>try-body'), _5, _6);
  }

  function _5(_cb) {
    return M.jM(eff('l1>try-finally'), _cb);
  }

  function _6() {
    return eff('end');
  }
}

function a38(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff('pref', i, j), _1);

  function _1() {
    i += 1, j += 2;
    if (i > 10) return _2();else {
      return M.jM(eff('body', i, j), _3, M.pure, undefined);
    }
  }

  function _2() {
    return _3(_4, 10);
  }

  function _3(cb, r) {
    return M.jM(eff('finally', i), cb, r);
  }

  function _4(r) {
    return M.pure(r);
  }
}

function a39(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff('pref', i, j), _1);

  function _1() {
    i += 1, j += 2;
    if (i > 10) return _2();else {
      return M.jM(eff('body', i, j), _3, _4, undefined);
    }
  }

  function _2() {
    return _3(_5, 10);
  }

  function _3(cb, r) {
    return M.jM(eff('finally', i), cb, r);
  }

  function _4(r) {
    return eff('exit', j);
  }

  function _5(r) {
    return M.pure(r);
  }
}

function a40(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff('pref', i, j), _1);

  function _1() {
    var a;
    a = j++;
    return M.jM(eff('l1', i, a), _2);
  }

  function _2() {
    i += 1;
    if (i > 10) return _3();else {
      if (j > 10) return _4(_6, _7, undefined);else {
        return M.jM(eff('l1 > body', i, j), _4, _5, undefined, undefined);
      }
    }
  }

  function _3() {
    return _4(_6, _8, 10);
  }

  function _4(cb, _cb, r) {
    return M.jM(eff('l1 > finally', i), cb, _cb, r);
  }

  function _5(_cb, r) {
    return M.jM(eff('l1 > exit', j), _6, _7, r);
  }

  function _6(_cb, r) {
    return M.jM(eff('body > finally', i), _cb, r);
  }

  function _7(r) {
    return eff('exit', j);
  }

  function _8(r) {
    return M.pure(r);
  }
}

function a41(a1) {
  if (a1 === 1) return _1();else {
    if (a1 === 2) return _2();else {
      if (a1 === 3) return _3();else {
        return eff('exit');
      }
    }
  }

  function _1() {
    return M.pure(10);
  }

  function _2() {
    return eff(11);
  }

  function _3() {
    return eff(12);
  }
}

function a42(a1) {
  if (a1 === 1) return _1();else {
    if (a1 === 2) return _2();else {
      if (a1 === 3) return _3();else return _4(_5, undefined);
    }
  }

  function _1() {
    return _4(_6, 10);
  }

  function _2() {
    return M.jMB(eff(11), _4, M.pure, undefined);
  }

  function _3() {
    return M.jM(eff(12), _4, M.pure, undefined);
  }

  function _4(cb, r) {
    return M.jM(eff('finally'), cb, r);
  }

  function _5(r) {
    return eff('exit');
  }

  function _6(r) {
    return M.pure(r);
  }
}

function a43(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.jM(eff('pref', i, j), _1);

  function _1() {
    var a;
    a = j++;
    return M.jM(eff('l1', i, a), _2);
  }

  function _2() {
    i += 1;
    if (i > 10) return _3();else {
      if (j > 10) return _4(_6, _7, undefined);else {
        return M.jM(eff('l1 > body', i, j), _4, _5, undefined, undefined);
      }
    }
  }

  function _3() {
    return _4(_6, _8, 10);
  }

  function _4(cb, _cb, r) {
    return M.jM(eff('l1 > finally', i), cb, _cb, r);
  }

  function _5(_cb, r) {
    return M.jM(eff('l1 > exit', j), _6, _7, r);
  }

  function _6(_cb, r) {
    return M.jM(eff('body > finally', i), _cb, r);
  }

  function _7(r) {
    return eff('exit', j);
  }

  function _8(r) {
    return M.pure(r);
  }
}