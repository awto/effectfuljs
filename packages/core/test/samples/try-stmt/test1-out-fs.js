function a01() {
  var e;
  console.log('in');
  return M.jumpH(_1, _6);

  function _1() {
    console.log('inner');
    return M.chainBH(eff('inner'), _3, _5);
  }

  function _2(ex) {
    e = ex;
    console.log('exception', e);
    return M.chainBH(eff('exception', e), _3, _5);
  }

  function _3() {
    console.log('out');
    return M.chainBH(eff('out'), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    return M.jumpH(_2, _5, a);
  }
}

function a02() {
  var e;
  console.log('in');
  return M.jumpH(_1, _8);

  function _1() {
    return M.chainBH(eff('inner'), _2, _8);
  }

  function _2() {
    console.log('inner');
    return M.jumpH(_5, _7);
  }

  function _3(ex) {
    e = ex;
    return M.chainBH(eff('exception', e), _4, _7);
  }

  function _4() {
    console.log('exception', e);
    return M.jumpH(_5, _7);
  }

  function _5() {
    return M.chainBH(eff('out'), _6, _7);
  }

  function _6() {
    console.log('out');
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(a) {
    return M.jumpH(_3, _7, a);
  }
}

function a03() {
  var i, j, ex, e, a;
  i = void 0;
  j = void 0;
  ex = void 0;
  console.log('in', i++, j += 2);
  a = i++;
  return M.chainBH(eff(a, j), _1, _8, i, j, ex);

  function _1(i, j, ex) {
    var a;
    a = i++;
    return M.chainBH(eff('inner', a, j), _2, _8, i, ex);
  }

  function _2(i, ex) {
    console.log('inner');
    return M.jumpH(_5, _7, i, ex);
  }

  function _3(_ex) {
    var j, ex, a;
    e = _ex;
    ex = e;
    a = j++;
    return M.chainBH(eff('exception', e, a), _4, _7, ex);
  }

  function _4(ex) {
    console.log('exception', e);
    return M.jumpH(_5, _7, void 0, ex);
  }

  function _5(i, ex) {
    return M.chainBH(eff('out', ex, i), _6, _7);
  }

  function _6() {
    console.log('out');
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(a) {
    return M.jumpH(_3, _7, a);
  }
}

function a04() {
  var i, j, a, b;
  i = 0;
  a = i++;
  b = j = 0;
  return M.chainBH(eff(1, a, b), _1, _21, i, j);

  function _1(i, j) {
    var a, b;
    a = i++;
    b = j = j + 1;
    return M.chainBH(eff(2, a, b), _2, _21, i, j);
  }

  function _2(i, j) {
    return M.chainBH(eff(3, i, j), _3, _26, i, j);
  }

  function _3(i, j) {
    return M.chainBH(eff(4), _4, _27, i, j);
  }

  function _4(i, j) {
    return M.chainBH(eff(5, i), _5, _27, i, j);
  }

  function _5(i, j) {
    if (something) {
      return M.jumpH(_7, _26, i, j, _15, _26);
    } else {
      if (something2) {
        return M.jumpH(_7, _26, [i, j, _16, _21, _19, _21]);
      } else {
        if (something3) {
          return M.jumpH(_7, _26, [i, j, _16, _21, _20, _21]);
        } else {
          if (something4) {
            return M.chainBH(eff(6), _6, _27, i, j);
          } else {
            return M.jumpH(_6, _27, i, j);
          }
        }
      }
    }
  }

  function _6(i, j) {
    return M.jumpH(_7, _26, [i, j, _16, _21, _20, _21]);
  }

  function _7([i, j, fc, fe, _fc, _fe, err]) {
    return M.chainBH(eff(7), _8, _29, [i, j, fc, fe, _fc, _fe, err]);
  }

  function _8([i, j, fc, fe, _fc, _fe, err]) {
    if (something5) {
      return M.chainBH(eff(8, j), _9, _28, [i, j, _13, _26, fc, fe, _fc, _fe, err]);
    } else {
      return M.jumpH(_9, _28, [i, j, _16, _21, fc, fe, _19, _21, err]);
    }
  }

  function _9([i, j, fc1, fe1, fc, fe, _fc, _fe, err, _err]) {
    console.log('i');
    return M.jumpH(_10, _26, [i, j, fc1, fe1, fc, fe, _fc, _fe, err, _err, _err]);
  }

  function _10([i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]) {
    var a;
    a = j = j + 1;
    return M.chainBH(eff(9, a), _11, _26, [i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]);
  }

  function _11([i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]) {
    return M.chainBH(eff(10), _12, _26, [i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]);
  }

  function _12([i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]) {
    console.log(j);
    return M.jumpH(fc1, fe1, [i, fc, fe, _fc, _fe, err1, err, err1, _err]);
  }

  function _13([i, fc, fe, _fc, _fe, err2, err, err1, _err]) {
    return M.chainBH(eff(11), _14, _26, [i, fc, fe, _fc, _fe, err, err1, _err]);
  }

  function _14([i, fc, fe, _fc, _fe, err, err1, _err]) {
    console.log(11);
    return M.jumpH(fc, fe, [i, fc, fe, _fc, _fe, err, err, err1, _err]);
  }

  function _15([i, fc, fe, _fc, _fe, err2, err, err1, _err]) {
    return M.chainBH(eff(12), _16, _21, [i, void 0, void 0, _18, _21, err2, err, err1, _err]);
  }

  function _16([i, fc, fe, _fc, _fe, err2, err, err1, _err]) {
    var a;
    a = i = i + 1;
    return M.chainBH(eff(13, a), _17, _21, [i, _fc, _fe, err2, err, err1, _err]);
  }

  function _17([i, _fc, _fe, err2, err, err1, _err]) {
    return M.chainBH(eff(14), _fc, _fe, i, err2, err, err1, _err);
  }

  function _18(i) {
    return M.chainBH(eff(15, i), _19, _21);
  }

  function _19() {
    return M.chainBH(eff(16), _20, _21);
  }

  function _20() {
    return M.pure();
  }

  function _21(e) {
    return M.raise(e);
  }

  function _22(i, err2) {
    return M.raise(err2);
  }

  function _23(i, _err, err) {
    return M.raise(err);
  }

  function _24(i, err, _err, err1) {
    return M.raise(err1);
  }

  function _25(i, err, err1, err2, _err) {
    return M.raise(_err);
  }

  function _26(a) {
    return M.jumpH(_16, _21, [void 0, void 0, void 0, _22, _21, a]);
  }

  function _27(a) {
    return M.jumpH(_7, _26, [void 0, void 0, _16, _21, _23, _21, a]);
  }

  function _28(a) {
    return M.jumpH(_10, _26, [void 0, void 0, _16, _21, void 0, void 0, _24, _21, void 0, a]);
  }

  function _29(a) {
    return M.jumpH(_9, _28, [void 0, void 0, _16, _21, void 0, void 0, _25, _21, void 0, a]);
  }
}

function a05() {
  return M.chainBH(eff(1), _1, _9);

  function _1() {
    return M.chainBH(eff(2), _2, _9);
  }

  function _2() {
    return M.chainBH(eff(3), _3, _7, _5, _7);
  }

  function _3(fc, fe, err) {
    return M.chainBH(eff(4), _4, _7, fc, fe, err);
  }

  function _4(fc, fe, err) {
    return M.chainBH(eff(5), fc, fe, err);
  }

  function _5() {
    return M.chainBH(eff(6), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jumpH(_3, _7, _8, _7, a);
  }
}

function a06() {
  return M.chainBH(eff(1), _1, _8);

  function _1() {
    return M.chainBH(eff(2), _2, _8);
  }

  function _2() {
    return M.chainBH(eff(3), _3, _6, _5, _6);
  }

  function _3(fc, fe, err) {
    return M.chainBH(eff(4), _4, _6, fc, fe, err);
  }

  function _4(fc, fe, err) {
    return M.chainBH(eff(5), fc, fe, err);
  }

  function _5() {
    console.log(6);
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jumpH(_3, _6, _7, _6, a);
  }
}

function a07() {
  return M.chainBH(eff(1), _1, _10);

  function _1() {
    return M.chainBH(eff(2), _2, _10);
  }

  function _2() {
    return M.chainBH(eff(3), _3, _10);
  }

  function _3(a) {
    if (a) {
      return M.jumpH(_4, _8, _7, _8);
    } else {
      return M.chainBH(eff(4), _4, _8, _6, _8);
    }
  }

  function _4(fc, fe, err) {
    return M.chainBH(eff(5), _5, _8, fc, fe, err);
  }

  function _5(fc, fe, err) {
    return M.chainBH(eff(6), fc, fe, err);
  }

  function _6() {
    return M.chainBH(eff(7), _7, _8);
  }

  function _7() {
    console.log(8);
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(err) {
    return M.raise(err);
  }

  function _10(a) {
    return M.jumpH(_4, _8, _9, _8, a);
  }
}

function a08() {
  return M.chainBH(eff(1), _1, _10);

  function _1() {
    return M.chainBH(eff(2), _2, _10);
  }

  function _2() {
    return M.chainBH(eff(3), _3, _10);
  }

  function _3(a) {
    if (a) {
      return M.jumpH(_4, _8, _7, _8);
    } else {
      return M.chainBH(eff(4), _4, _8, _6, _8);
    }
  }

  function _4(fc, fe, err) {
    return M.chainBH(eff(5), _5, _8, fc, fe, err);
  }

  function _5(fc, fe, err) {
    return M.chainBH(eff(6), fc, fe, err);
  }

  function _6() {
    return M.chainBH(eff(7), _7, _8);
  }

  function _7() {
    var r;

    if (a) {
      return M.pure(10);
    } else {
      console.log(8);
      return M.pure(r);
    }
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(err) {
    return M.raise(err);
  }

  function _10(a) {
    return M.jumpH(_4, _8, _9, _8, a);
  }
}

function a09() {
  var _a, a1;

  return M.chainBH(eff(1), _1, _20);

  function _1() {
    return M.chainBH(eff(2), _2, _20);
  }

  function _2() {
    return M.chainBH(eff(3), _3, _20);
  }

  function _3(a) {
    _a = a;

    if (_a === 1) {
      return M.jumpH(_11, _17, _14, _17);
    } else {
      if (_a === 2) {
        return M.chainBH(eff(4), _4, _20);
      } else {
        return M.jumpH(_5, _21);
      }
    }
  }

  function _4() {
    return M.jumpBH(10, _11, _17, _15, _17);
  }

  function _5() {
    return M.chainBH(eff(5), _6, _21);
  }

  function _6() {
    return M.chainBH(eff(6), _7, _21);
  }

  function _7(a) {
    a1 = a;

    if (a1 === 1) {
      return M.jumpH(_8, _20, _11, _17, _14, _17);
    } else {
      if (a1 === 2) {
        return M.jumpBH(10, _8, _20, _11, _17, _15, _17);
      } else {
        return M.chainBH(eff(7), _8, _20, _10, _20);
      }
    }
  }

  function _8([fc, fe, _fc, _fe, r, _err]) {
    return M.chainBH(eff(8), _9, _20, [fc, fe, _fc, _fe, r, _err]);
  }

  function _9([fc, fe, _fc, _fe, r, _err]) {
    return M.chainBH(eff(9), fc, fe, _fc, _fe, r, _err, _err);
  }

  function _10(fc, fe, r, err, _err) {
    return M.chainBH(eff(10), _11, _17, _13, _17, r, err, _err);
  }

  function _11(_fc, _fe, r, err, _err) {
    return M.chainBH(eff(11), _12, _17, _fc, _fe, r, err, _err);
  }

  function _12(_fc, _fe, r, err, _err) {
    return M.chainBH(eff(12), _fc, _fe, r, err, _err);
  }

  function _13() {
    return M.chainBH(eff(13), _14, _17);
  }

  function _14() {
    return M.chainBH(eff(14), _16, _17);
  }

  function _15(r) {
    return M.pure(r);
  }

  function _16(r) {
    return M.pure(r);
  }

  function _17(e) {
    return M.raise(e);
  }

  function _18(r, err) {
    return M.raise(err);
  }

  function _19(r, err, _err) {
    return M.raise(_err);
  }

  function _20(a) {
    return M.jumpH(_11, _17, _18, _17, void 0, a);
  }

  function _21(a) {
    return M.jumpH(_8, _20, [_11, _17, _19, _17, void 0, a]);
  }
}

function a10() {
  var a;
  return M.jumpH(_1, _15);

  function _1() {
    return M.chainBH(eff(2), _2, _16);
  }

  function _2() {
    return M.chainBH(eff(5), _3, _16);
  }

  function _3() {
    return M.chainBH(eff(6), _4, _16);
  }

  function _4(b) {
    a = b;

    if (a) {
      return M.chainBH(eff(3), _11, _12);
    } else {
      return M.jumpH(_5, _15, _9, _12);
    }
  }

  function _5(fc, fe, _err) {
    return M.chainBH(eff(8), _6, _15, fc, fe, _err);
  }

  function _6(fc, fe, _err) {
    return M.chainBH(eff(9), _7, _12, fc, fe, _err, _err);
  }

  function _7(fc, fe, err, _err) {
    return M.chainBH(eff(11), _8, _12, fc, fe, err, _err);
  }

  function _8(fc, fe, err, _err) {
    return M.chainBH(eff(12), fc, fe, err, _err);
  }

  function _9() {
    return M.chainBH(eff(13), _10, _12);
  }

  function _10() {
    var r;
    return M.pure(r);
  }

  function _11(r) {
    return M.pure(r);
  }

  function _12(e) {
    return M.raise(e);
  }

  function _13(err) {
    return M.raise(err);
  }

  function _14(err, _err) {
    return M.raise(_err);
  }

  function _15(a) {
    return M.jumpH(_7, _12, _13, _12, a);
  }

  function _16(a) {
    return M.jumpH(_5, _15, _14, _12, a);
  }
}

function a11() {
  return M.jumpH(_1, _11);

  function _1() {
    return M.chainBH(eff(1), _2, _10, _3, _10);
  }

  function _2(fc, fe, _fc, _fe, _err) {
    return M.chainBH(eff(2), fc, fe, _fc, _fe, _err, _err);
  }

  function _3(fc, fe, err, _err) {
    return M.chainBH(eff('a'), _4, _7, _5, _7, err, _err);
  }

  function _4(_fc, _fe, err, _err) {
    return M.chainBH(eff(3), _fc, _fe, err, _err);
  }

  function _5() {
    return M.chainBH(eff(4), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(err) {
    return M.raise(err);
  }

  function _9(err, _err) {
    return M.raise(_err);
  }

  function _10(a) {
    return M.jumpH(_4, _7, _8, _7, a);
  }

  function _11(a) {
    return M.jumpH(_2, _10, _4, _7, _9, _7, a);
  }
}

function a12() {
  return M.jumpH(_1, _12);

  function _1() {
    return M.chainBH(eff(1), _2, _12);
  }

  function _2(a) {
    if (a) {
      return M.jumpBH(10, _3, _11, _5, _8, _7, _8);
    } else {
      return M.jumpH(_3, _11, _4, _11);
    }
  }

  function _3([fc, fe, _fc, _fe, r, _err]) {
    return M.chainBH(eff(2), fc, fe, _fc, _fe, r, _err, _err);
  }

  function _4(fc, fe, r, err, _err) {
    return M.chainBH(eff('A'), _5, _8, _6, _8, r, err, _err);
  }

  function _5(_fc, _fe, r, err, _err) {
    return M.chainBH(eff(3), _fc, _fe, r, err, _err);
  }

  function _6(r) {
    return M.chainBH(eff(4), _7, _8, r);
  }

  function _7(r) {
    return M.pure(r);
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(r, err) {
    return M.raise(err);
  }

  function _10(r, err, _err) {
    return M.raise(_err);
  }

  function _11(a) {
    return M.jumpH(_5, _8, _9, _8, void 0, a);
  }

  function _12(a) {
    return M.jumpH(_3, _11, [_5, _8, _10, _8, void 0, a]);
  }
}

function a13() {
  return M.jumpH(_1, _13);

  function _1() {
    return M.chainBH(eff(1), _2, _13);
  }

  function _2(a) {
    if (a) {
      return M.jumpH(_3, _12, _6, _9, _8, _9);
    } else {
      return M.jumpH(_3, _12, _5, _12);
    }
  }

  function _3(fc, fe, _fc, _fe, _err) {
    return M.chainBH(eff(2), _4, _12, fc, fe, _fc, _fe, _err);
  }

  function _4(fc, fe, _fc, _fe, _err) {
    return M.chainBH(eff('2'), fc, fe, _fc, _fe, _err, _err);
  }

  function _5(fc, fe, err, _err) {
    return M.chainBH(eff('A'), _6, _9, _7, _9, err, _err);
  }

  function _6(_fc, _fe, err, _err) {
    return M.chainBH(eff(3), _fc, _fe, err, _err);
  }

  function _7() {
    return M.chainBH(eff(4), _8, _9);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }

  function _10(err) {
    return M.raise(err);
  }

  function _11(err, _err) {
    return M.raise(_err);
  }

  function _12(a) {
    return M.jumpH(_6, _9, _10, _9, a);
  }

  function _13(a) {
    return M.jumpH(_3, _12, _6, _9, _11, _9, a);
  }
}

function a14() {
  var a;
  return M.jumpH(_1, _15);

  function _1(_fc, _fe, r, _err, err) {
    return M.chainBH(eff(1), _2, _15, _fc, _fe, r, err);
  }

  function _2(b, _fc, _fe, r, err) {
    a = b;

    if (a === 1) {
      return M.jumpRH(_3, _14, [_6, _11, _8, _11, r, err]);
    } else {
      if (a === 2) {
        return M.jumpRH(_3, _14, [_1, _15, _fc, _fe, r, err]);
      } else {
        if (a === 3) {
          return M.jumpBRH(1, _3, _14, [_6, _11, _9, _11, void 0, err]);
        } else {
          if (a === 4) {
            return M.jumpRH(_3, _14, [_6, _11, _9, _11, r, err]);
          } else {
            if (a === 5) {
              return M.chainBH(eff('REZ'), _10, _11);
            } else {
              return M.chainBH(eff(2), _3, _14, [_5, _14, _fc, _fe, r, err]);
            }
          }
        }
      }
    }
  }

  function _3([fc, fe, _fc, _fe, r, err]) {
    return M.chainBH(eff(3), _4, _14, [fc, fe, _fc, _fe, r, err]);
  }

  function _4([fc, fe, _fc, _fe, r, err]) {
    return M.chainBH(eff(4), fc, fe, _fc, _fe, r, err, err);
  }

  function _5(_fc, _fe, r, _err, err) {
    return M.chainBH(eff(5), _1, _15, _fc, _fe, r, void 0, err);
  }

  function _6(_fc, _fe, r, _err, err) {
    return M.chainBH(eff(6), _7, _11, _fc, _fe, r, _err, err);
  }

  function _7(_fc, _fe, r, _err, err) {
    return M.chainBH(eff(7), _fc, _fe, r, _err, err);
  }

  function _8(r) {
    return M.chainBH(eff(8), _9, _11, r);
  }

  function _9(r) {
    return M.pure(r);
  }

  function _10(r) {
    return M.pure(r);
  }

  function _11(e) {
    return M.raise(e);
  }

  function _12(r, _err) {
    return M.raise(_err);
  }

  function _13(r, _err, err) {
    return M.raise(err);
  }

  function _14(a) {
    return M.jumpH(_6, _11, _12, _11, void 0, a);
  }

  function _15(a) {
    return M.jumpH(_3, _14, [_6, _11, _13, _11, void 0, a]);
  }
}

function a15() {
  var _a;

  return M.jumpH(_1, _5);

  function _1() {
    console.log('a');
    return M.jumpRH(_2, _5);
  }

  function _2() {
    return M.chainBH(eff(1), _3, _5);
  }

  function _3(a) {
    _a = a;

    if (_a === 1) {
      if (a) {
        return M.chainBH(eff(8), _4, _5);
      } else {
        return M.jumpH(_1, _5);
      }
    } else {
      return M.chainBH(eff(2), _2, _5);
    }
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function a15a() {
  if (a === 1) {
    return M.pure();
  } else {
    return M.chainBH(eff(2), _1, _2);
  }

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function a16() {
  var _a;

  return M.chainBH(eff(0), _1, _5);

  function _1() {
    console.log('a');
    return M.jumpRH(_2, _5);
  }

  function _2() {
    return M.chainBH(eff(1), _3, _5);
  }

  function _3(a) {
    _a = a;

    if (_a === 1) {
      if (a) {
        return M.chainBH(eff(8), _4, _5);
      } else {
        return M.jumpH(_1, _5);
      }
    } else {
      return M.chainBH(eff(2), _2, _5);
    }
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function a17() {
  var a;
  return M.jumpH(_1, _4);

  function _1() {
    return M.chainBH(eff(1), _2, _4);
  }

  function _2(c) {
    a = c;

    if (a === 1) {
      if (b) {
        return M.chainBH(eff(8), _3, _4);
      } else {
        return M.jumpRH(_1, _4);
      }
    } else {
      return M.chainBH(eff(2), _1, _4);
    }
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function a18() {
  var a;
  return M.jumpH(_1, _9);

  function _1(err) {
    return M.chainBH(eff(1), _2, _9, err);
  }

  function _2(b, err) {
    a = b;

    if (a === 1) {
      return M.jumpRH(_3, _7, _5, _7, err);
    } else {
      return M.chainBH(eff(2), _3, _7, _1, _9, err);
    }
  }

  function _3(fc, fe, err) {
    return M.chainBH(effF(3), _4, _7, fc, fe, err);
  }

  function _4(fc, fe, err) {
    return M.chainBH(effF(4), fc, fe, err);
  }

  function _5(err) {
    if (b) {
      return M.chainBH(eff(8), _6, _7);
    } else {
      return M.jumpRH(_1, _9, err);
    }
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jumpH(_3, _7, _8, _7, a);
  }
}

function a19() {
  return M.jumpH(_1, _4);

  function _1(err) {
    return M.chainBH(eff(1), _2, _6, err);
  }

  function _2(err) {
    return M.chainBH(eff(2), _3, _4, _1, _4, err);
  }

  function _3(fc, fe, err) {
    return M.chainBH(effF(3), fc, fe, err);
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jumpH(_3, _4, _5, _4, a);
  }
}

function a20() {
  return M.jumpH(_1, _5);

  function _1(err) {
    return M.chainBH(eff(2), _2, _3, _1, _5, err);
  }

  function _2(fc, fe, err) {
    return M.chainBH(effF(3), fc, fe, err);
  }

  function _3(e) {
    return M.raise(e);
  }

  function _4(err) {
    return M.raise(err);
  }

  function _5(a) {
    return M.jumpH(_2, _3, _4, _3, a);
  }
}

function a21() {
  return M.jumpH(_1, _8);

  function _1(err, _err) {
    return M.chainBH(eff(2), _2, _9, _1, _8, err, _err);
  }

  function _2(fc, fe, err, _err) {
    if (a1) {
      return M.jumpRH(_3, _5, _1, _8, err, _err);
    } else {
      if (a2) {
        return M.jumpRH(_3, _5, _4, _5, err, _err);
      } else {
        if (a3) {
          return M.jumpRH(_3, _5, _4, _5, err, _err);
        } else {
          return M.chainBH(effF(3), _3, _5, fc, fe, err, _err);
        }
      }
    }
  }

  function _3(fc, fe, err, _err) {
    return M.chainBH(effFF(4), fc, fe, err, _err);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(err, _err) {
    return M.raise(_err);
  }

  function _8(a) {
    return M.jumpH(_2, _9, _6, _5, a);
  }

  function _9(a) {
    return M.jumpH(_3, _5, _7, _5, void 0, a);
  }
}

function a22() {
  return M.jumpH(_1, _5);

  function _1(err) {
    return M.chainBH(eff(2), _2, _3, _1, _5, err);
  }

  function _2(fc, fe, err) {
    return M.chainBH(effFF(4), fc, fe, err);
  }

  function _3(e) {
    return M.raise(e);
  }

  function _4(err) {
    return M.raise(err);
  }

  function _5(a) {
    return M.jumpH(_2, _3, _4, _3, a);
  }
}

function a23() {
  return M.jumpH(_1, _10);

  function _1(_fc, _fe, _err, err) {
    if (a1) {
      return M.jumpRH(_2, _9, _3, _6, _4, _6, err);
    } else {
      return M.chainBH(eff(2), _2, _9, _1, _10, _fc, _fe, err);
    }
  }

  function _2(fc, fe, _fc, _fe, err) {
    return M.chainBH(effFF(4), fc, fe, _fc, _fe, err, err);
  }

  function _3(_fc, _fe, _err, err) {
    return M.chainBH(effFF(5), _fc, _fe, _err, err);
  }

  function _4() {
    return M.chainBH(eff(6), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(_err) {
    return M.raise(_err);
  }

  function _8(_err, err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jumpH(_3, _6, _7, _6, a);
  }

  function _10(a) {
    return M.jumpH(_2, _9, _3, _6, _8, _6, a);
  }
}

function a24() {
  return M.jumpH(_1, _10);

  function _1(_fc, _fe, _err, err) {
    if (a1) {
      return M.jumpRH(_2, _9, _3, _6, _4, _6, err);
    } else {
      return M.chainBH(eff(2), _2, _9, _1, _10, _fc, _fe, err);
    }
  }

  function _2(fc, fe, _fc, _fe, err) {
    return M.chainBH(effFF(4), fc, fe, _fc, _fe, err, err);
  }

  function _3(_fc, _fe, _err, err) {
    return M.jumpH(_fc, _fe, _err, err);
  }

  function _4() {
    return M.chainBH(eff(6), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(_err) {
    return M.raise(_err);
  }

  function _8(_err, err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jumpH(_3, _6, _7, _6, a);
  }

  function _10(a) {
    return M.jumpH(_2, _9, _3, _6, _8, _6, a);
  }
}

function a25() {
  return M.jumpH(_1, _7);

  function _1() {
    if (a1) {
      return M.jumpRH(_2, _8);
    } else {
      return M.chainBH(eff(2), _2, _8);
    }
  }

  function _2() {
    return M.jumpRH(_3, _5, _4, _5);
  }

  function _3(fc, fe, err) {
    return M.chainBH(effFF(4), fc, fe, err);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jumpH(_2, _8);
  }

  function _8(a) {
    return M.jumpH(_3, _5, _6, _5, a);
  }
}

function a26() {
  return M.jumpH(_1, _7);

  function _1() {
    if (a1) {
      return M.jumpRH(_2, _8);
    } else {
      return M.chainBH(eff(2), _2, _8);
    }
  }

  function _2() {
    return M.jumpRH(_3, _5, _4, _5);
  }

  function _3(fc, fe, err) {
    return M.chainBH(effFF(4), fc, fe, err);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jumpH(_2, _8);
  }

  function _8(a) {
    return M.jumpH(_3, _5, _6, _5, a);
  }
}

function a27() {
  return M.jumpH(_1, _8);

  function _1() {
    if (a1) {
      return M.jumpRH(_2, _9);
    } else {
      return M.chainBH(eff(2), _2, _9);
    }
  }

  function _2() {
    return M.jumpRH(_3, _6, _4, _6);
  }

  function _3(fc, fe, err) {
    return M.chainBH(effFF(4), fc, fe, err);
  }

  function _4() {
    return M.chainBH(eff(5), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jumpH(_2, _9);
  }

  function _9(a) {
    return M.jumpH(_3, _6, _7, _6, a);
  }
}

function a28() {
  return M.jumpH(_1, _14);

  function _1() {
    if (a1) {
      return M.jumpH(_2, _13, _6, _9, _7, _9);
    } else {
      return M.chainBH(eff(2), _2, _13, _5, _13);
    }
  }

  function _2(fc, fe, _fc, _fe, err) {
    return M.chainBH(eff(3), _3, _15, fc, fe, _fc, _fe, err);
  }

  function _3(fc, fe, _fc, _fe, err) {
    if (a2) {
      return M.jumpH(_4, _13, _5, _13, _fc, _fe, err);
    } else {
      return M.chainBH(eff(4), _4, _13, fc, fe, _fc, _fe, err);
    }
  }

  function _4([fc, fe, _fc, _fe, err, _err]) {
    return M.chainBH(eff(5), fc, fe, _fc, _fe, _err, err, _err);
  }

  function _5(fc, fe, err1, err, _err) {
    return M.chainBH(eff(6), _6, _9, _7, _9, err1, err, _err);
  }

  function _6(_fc, _fe, err1, err, _err) {
    return M.chainBH(eff(7), _fc, _fe, err1, err, _err);
  }

  function _7() {
    return M.chainBH(eff(8), _8, _9);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }

  function _10(err1) {
    return M.raise(err1);
  }

  function _11(_err, err) {
    return M.raise(err);
  }

  function _12(err, err1, _err) {
    return M.raise(_err);
  }

  function _13(a) {
    return M.jumpH(_6, _9, _10, _9, a);
  }

  function _14(a) {
    return M.jumpH(_2, _13, _6, _9, _11, _9, a);
  }

  function _15(a) {
    return M.jumpH(_4, _13, [_6, _9, _12, _9, void 0, a]);
  }
}

function a29() {
  return M.jumpH(_1, _14);

  function _1() {
    return M.jumpH(_2, _13, _7, _9);
  }

  function _2(_fc, _fe, err) {
    return M.chainBH(eff(3), _3, _15, _fc, _fe, err);
  }

  function _3(_fc, _fe, err) {
    return M.jumpH(_4, _13, _5, _13, _fc, _fe, err);
  }

  function _4([fc, fe, _fc, _fe, err, _err]) {
    return M.chainBH(eff(5), fc, fe, _fc, _fe, _err, err, _err);
  }

  function _5(fc, fe, err1, err, _err) {
    return M.chainBH(eff(6), _6, _9, _7, _9, err1, err, _err);
  }

  function _6(_fc, _fe, err1, err, _err) {
    return M.chainBH(eff(7), _fc, _fe, err1, err, _err);
  }

  function _7() {
    return M.chainBH(eff(8), _8, _9);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }

  function _10(err1) {
    return M.raise(err1);
  }

  function _11(_err, err) {
    return M.raise(err);
  }

  function _12(err, err1, _err) {
    return M.raise(_err);
  }

  function _13(a) {
    return M.jumpH(_6, _9, _10, _9, a);
  }

  function _14(a) {
    return M.jumpH(_2, _13, _11, _9, a);
  }

  function _15(a) {
    return M.jumpH(_4, _13, [_6, _9, _12, _9, void 0, a]);
  }
}

function a30(a1, a2) {
  return M.jumpH(_1, _14);

  function _1() {
    if (a1) {
      return M.jumpH(_2, _13, _6, _9, _7, _9);
    } else {
      return M.chainBH(eff(2), _2, _13, _5, _13);
    }
  }

  function _2(fc, fe, _fc, _fe, err) {
    return M.chainBH(eff(3), _3, _15, fc, fe, _fc, _fe, err);
  }

  function _3(fc, fe, _fc, _fe, err) {
    if (a2) {
      return M.jumpH(_4, _13, _5, _13, _fc, _fe, err);
    } else {
      return M.chainBH(eff(4), _4, _13, fc, fe, _fc, _fe, err);
    }
  }

  function _4([fc, fe, _fc, _fe, err, _err]) {
    return M.chainBH(eff(5), fc, fe, _fc, _fe, _err, err, _err);
  }

  function _5(fc, fe, err1, err, _err) {
    return M.chainBH(eff(6), _6, _9, _7, _9, err1, err, _err);
  }

  function _6(_fc, _fe, err1, err, _err) {
    return M.chainBH(eff(7), _fc, _fe, err1, err, _err);
  }

  function _7() {
    return M.chainBH(eff(8), _8, _9);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }

  function _10(err1) {
    return M.raise(err1);
  }

  function _11(_err, err) {
    return M.raise(err);
  }

  function _12(err, err1, _err) {
    return M.raise(_err);
  }

  function _13(a) {
    return M.jumpH(_6, _9, _10, _9, a);
  }

  function _14(a) {
    return M.jumpH(_2, _13, _6, _9, _11, _9, a);
  }

  function _15(a) {
    return M.jumpH(_4, _13, [_6, _9, _12, _9, void 0, a]);
  }
}

function a31() {
  var e;
  return M.jumpH(_1, _7);

  function _1() {
    console.log('hi');
    return M.chainBH(eff(1), _2, _7);
  }

  function _2() {
    return M.chainBH(eff(2), _4, _6);
  }

  function _3(ex) {
    e = ex;
    console.log(e);
    return M.chainBH(eff(3), _4, _6);
  }

  function _4() {
    return M.chainBH(eff(4), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(a) {
    return M.jumpH(_3, _6, a);
  }
}

function a32(a1, a2) {
  var e, ee;
  return M.jumpH(_1, _9);

  function _1() {
    console.log('hi');
    return M.chainBH(eff(1), _2, _9);
  }

  function _2() {
    return M.chainBH(eff(2), _5, _7);
  }

  function _3(ex) {
    e = ex;
    console.log(e);
    return M.chainBH(eff(3), _5, _7);
  }

  function _4(ex) {
    ee = ex;
    return M.chainBH(eff(4), _5, _7);
  }

  function _5() {
    return M.chainBH(eff(5), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(a) {
    return M.jumpH(_4, _7, a);
  }

  function _9(a) {
    return M.jumpH(_3, _8, a);
  }
}

function a33() {
  var e;
  return M.jumpH(_1, _9);

  function _1() {
    console.log('hi');
    return M.chainBH(eff(1), _2, _9);
  }

  function _2() {
    return M.chainBH(eff(2), _4, _7, _5, _7);
  }

  function _3(ex) {
    e = ex;
    console.log(e);
    return M.chainBH(eff(3), _4, _7, _5, _7);
  }

  function _4(fc, fe, err) {
    return M.chainBH(eff(4), fc, fe);
  }

  function _5() {
    return M.chainBH(eff(5), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jumpH(_3, _10, a);
  }

  function _10(a) {
    return M.jumpH(_4, _7, _8, _7, a);
  }
}

function a34() {
  var e;
  return M.jumpH(_1, _11);

  function _1() {
    console.log('hi');
    return M.chainBH(eff(1), _2, _10, _3, _10);
  }

  function _2(fc, fe, err) {
    return M.chainBH(eff(2), fc, fe, err);
  }

  function _3() {
    return M.chainBH(eff(3), _5, _8, _6, _8);
  }

  function _4(ex) {
    e = ex;
    return M.chainBH(eff(e), _5, _8, _6, _8);
  }

  function _5(fc, fe, err) {
    return M.chainBH(eff(4), fc, fe);
  }

  function _6() {
    return M.chainBH(eff(5), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(err) {
    return M.raise(err);
  }

  function _10(a) {
    return M.jumpH(_4, _12, a);
  }

  function _11(a) {
    return M.jumpH(_2, _10, _4, _12, a);
  }

  function _12(a) {
    return M.jumpH(_5, _8, _9, _8, a);
  }
}

function a35() {
  var e;
  return M.jumpH(_1, _9);

  function _1() {
    console.log('hi');
    return M.chainBH(eff('try>try>body'), _2, _8, _3, _8);
  }

  function _2(fc, fe, err) {
    return M.chainBH(eff('try>try>finally'), fc, fe, err);
  }

  function _3() {
    return M.chainBH(eff('try>body'), _5, _7);
  }

  function _4(ex) {
    e = ex;
    console.log(e);
    return M.chainBH(eff('try>catch'), _5, _7);
  }

  function _5() {
    return M.chainBH(eff('last'), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(a) {
    return M.jumpH(_4, _7, a);
  }

  function _9(a) {
    return M.jumpH(_2, _8, _4, _7, a);
  }
}

function a36(a1) {
  return M.jumpH(_1, _6);

  function _1() {
    if (a1) {
      return M.jumpH(_2, _4, _3, _4);
    } else {
      return M.chainBH(eff('body'), _2, _4, _3, _4);
    }
  }

  function _2(fc, fe, err) {
    return M.chainBH(eff('finally'), fc, fe, err);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jumpH(_2, _4, _5, _4, a);
  }
}

function a37(a1, a2) {
  return M.jumpH(_1, _14);

  function _1() {
    if (a1) {
      return M.jumpH(_2, _13, _6, _9, _7, _9);
    } else {
      return M.chainBH(eff('l1>try-body>l2>try-body'), _2, _13, _5, _13);
    }
  }

  function _2(fc, fe, _fc, _fe, err) {
    return M.chainBH(eff('l1>try-body>l2>try-finally'), _3, _15, fc, fe, _fc, _fe, err);
  }

  function _3(fc, fe, _fc, _fe, err) {
    if (a2) {
      return M.jumpH(_4, _13, _5, _13, _fc, _fe, err);
    } else {
      return M.chainBH(eff('l1>try-body>l2>try-finally>try-body'), _4, _13, fc, fe, _fc, _fe, err);
    }
  }

  function _4([fc, fe, _fc, _fe, err, _err]) {
    return M.chainBH(eff('l1>try-body>l2>try-finally>try-finally'), fc, fe, _fc, _fe, _err, err, _err);
  }

  function _5(fc, fe, err1, err, _err) {
    return M.chainBH(eff('l1>try-body'), _6, _9, _7, _9, err1, err, _err);
  }

  function _6(_fc, _fe, err1, err, _err) {
    return M.chainBH(eff('l1>try-finally'), _fc, _fe, err1, err, _err);
  }

  function _7() {
    return M.chainBH(eff('end'), _8, _9);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }

  function _10(err1) {
    return M.raise(err1);
  }

  function _11(_err, err) {
    return M.raise(err);
  }

  function _12(err, err1, _err) {
    return M.raise(_err);
  }

  function _13(a) {
    return M.jumpH(_6, _9, _10, _9, a);
  }

  function _14(a) {
    return M.jumpH(_2, _13, _6, _9, _11, _9, a);
  }

  function _15(a) {
    return M.jumpH(_4, _13, [_6, _9, _12, _9, void 0, a]);
  }
}

function a38(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.chainBH(eff('pref', i, j), _1, _6, i, j);

  function _1(i, j) {
    i += 1, j += 2;

    if (i > 10) {
      return M.jumpBH(10, _2, _4, i, _3, _4);
    } else {
      return M.chainBH(eff('body', i, j), _2, _4, i, _3, _4);
    }
  }

  function _2(i, fc, fe, r, err) {
    return M.chainBH(eff('finally', i), fc, fe, r, err);
  }

  function _3(r) {
    return M.pure(r);
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(r, err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jumpH(_2, _4, void 0, _5, _4, void 0, a);
  }
}

function a39(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.chainBH(eff('pref', i, j), _1, _7, i, j);

  function _1(i, j) {
    i += 1, j += 2;

    if (i > 10) {
      return M.jumpBH(10, _2, _5, i, j, _4, _5);
    } else {
      return M.chainBH(eff('body', i, j), _2, _5, i, j, _3, _5);
    }
  }

  function _2([i, j, fc, fe, r, err]) {
    return M.chainBH(eff('finally', i), fc, fe, j, r, err);
  }

  function _3(j, r) {
    return M.chainBH(eff('exit', j), _4, _5, j, r);
  }

  function _4(j, r) {
    return M.pure(r);
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(j, r, err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jumpH(_2, _5, [void 0, void 0, _6, _5, void 0, a]);
  }
}

function a40(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.chainBH(eff('pref', i, j), _1, _11, i, j);

  function _1(i, j) {
    var a;
    a = j++;
    return M.chainBH(eff('l1', i, a), _2, _12, i, j);
  }

  function _2(i, j) {
    i += 1;

    if (i > 10) {
      return M.jumpBH(10, _3, _11, [i, j, _5, _8, _7, _8]);
    } else {
      if (j > 10) {
        return M.jumpH(_3, _11, [i, j, _5, _8, _6, _8]);
      } else {
        return M.chainBH(eff('l1 > body', i, j), _3, _11, i, j, _4, _11);
      }
    }
  }

  function _3([i, j, fc, fe, _fc, _fe, r, _err]) {
    return M.chainBH(eff('l1 > finally', i), fc, fe, [i, j, _fc, _fe, r, _err, _err]);
  }

  function _4([i, j, fc, fe, r, err, _err]) {
    return M.chainBH(eff('l1 > exit', j), _5, _8, [i, j, _6, _8, r, err, _err]);
  }

  function _5([i, j, _fc, _fe, r, err, _err]) {
    return M.chainBH(eff('body > finally', i), _fc, _fe, j, r, err, _err);
  }

  function _6(j, r) {
    return M.chainBH(eff('exit', j), _7, _8, j, r);
  }

  function _7(j, r) {
    return M.pure(r);
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(j, r, err) {
    return M.raise(err);
  }

  function _10(j, r, err, _err) {
    return M.raise(_err);
  }

  function _11(a) {
    return M.jumpH(_5, _8, [void 0, void 0, _9, _8, void 0, a]);
  }

  function _12(a) {
    return M.jumpH(_3, _11, [void 0, void 0, _5, _8, _10, _8, void 0, a]);
  }
}

function a41(a1) {
  if (a1 === 1) {
    return M.pure(10);
  } else {
    if (a1 === 2) {
      return M.chainBH(eff(11), _2, _3);
    } else {
      if (a1 === 3) {
        return M.chainBH(eff(12), _1, _3);
      } else {
        return M.chainBH(eff('exit'), _1, _3);
      }
    }
  }

  function _1() {
    var r;
    return M.pure(r);
  }

  function _2(r) {
    return M.pure(r);
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a42(a1) {
  return M.jumpH(_1, _9);

  function _1() {
    if (a1 === 1) {
      return M.jumpBH(10, _3, _7, _5, _7);
    } else {
      if (a1 === 2) {
        return M.chainBH(eff(11), _6, _7);
      } else {
        if (a1 === 3) {
          return M.chainBH(eff(12), _2, _9);
        } else {
          return M.jumpH(_3, _7, _4, _7);
        }
      }
    }
  }

  function _2() {
    return M.jumpH(_3, _7, _5, _7);
  }

  function _3(fc, fe, r, err) {
    return M.chainBH(eff('finally'), fc, fe, r, err);
  }

  function _4(r) {
    return M.chainBH(eff('exit'), _5, _7, r);
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(r) {
    return M.pure(r);
  }

  function _7(e) {
    return M.raise(e);
  }

  function _8(r, err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jumpH(_3, _7, _8, _7, void 0, a);
  }
}

function a43(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.chainBH(eff('pref', i, j), _1, _11, i, j);

  function _1(i, j) {
    var a;
    a = j++;
    return M.chainBH(eff('l1', i, a), _2, _12, i, j);
  }

  function _2(i, j) {
    i += 1;

    if (i > 10) {
      return M.jumpBH(10, _3, _11, [i, j, _5, _8, _7, _8]);
    } else {
      if (j > 10) {
        return M.jumpH(_3, _11, [i, j, _5, _8, _6, _8]);
      } else {
        return M.chainBH(eff('l1 > body', i, j), _3, _11, i, j, _4, _11);
      }
    }
  }

  function _3([i, j, fc, fe, _fc, _fe, r, _err]) {
    return M.chainBH(eff('l1 > finally', i), fc, fe, [i, j, _fc, _fe, r, _err, _err]);
  }

  function _4([i, j, fc, fe, r, err, _err]) {
    return M.chainBH(eff('l1 > exit', j), _5, _8, [i, j, _6, _8, r, err, _err]);
  }

  function _5([i, j, _fc, _fe, r, err, _err]) {
    return M.chainBH(eff('body > finally', i), _fc, _fe, j, r, err, _err);
  }

  function _6(j, r) {
    return M.chainBH(eff('exit', j), _7, _8, j, r);
  }

  function _7(j, r) {
    return M.pure(r);
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(j, r, err) {
    return M.raise(err);
  }

  function _10(j, r, err, _err) {
    return M.raise(_err);
  }

  function _11(a) {
    return M.jumpH(_5, _8, [void 0, void 0, _9, _8, void 0, a]);
  }

  function _12(a) {
    return M.jumpH(_3, _11, [void 0, void 0, _5, _8, _10, _8, void 0, a]);
  }
}