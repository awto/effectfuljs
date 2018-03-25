import * as M from "@effectful/core";

function a01() {
  var e;
  console.log("in");
  return M.jump(void 0, _1, _5);

  function _1() {
    console.log("inner");
    return M.chain(eff("inner"), _3);
  }

  function _2(ex) {
    e = ex;
    console.log("exception", e);
    return M.chain(eff("exception", e), _3);
  }

  function _3() {
    console.log("out");
    return M.chain(eff("out"), _4);
  }

  function _4() {}

  function _5(a) {
    return M.jump(void 0, _2, a);
  }
}

function a02() {
  var e;
  console.log("in");
  return M.jump(void 0, _1, _7);

  function _1() {
    return M.chain(eff("inner"), _2, _7);
  }

  function _2() {
    console.log("inner");
    return M.jump(void 0, _5);
  }

  function _3(ex) {
    e = ex;
    return M.chain(eff("exception", e), _4);
  }

  function _4() {
    console.log("exception", e);
    return M.jump(void 0, _5);
  }

  function _5() {
    return M.chain(eff("out"), _6);
  }

  function _6() {
    console.log("out");
  }

  function _7(a) {
    return M.jump(void 0, _3, a);
  }
}

function a03() {
  var i, j, ex, e, a;
  i = void 0;
  j = void 0;
  ex = void 0;
  console.log("in", i++, j += 2);
  a = i++;
  return M.chain(eff(a, j), _1, _7, i, j, ex);

  function _1(i, j, ex) {
    var a;
    a = i++;
    return M.chain(eff("inner", a, j), _2, _7, i, ex);
  }

  function _2(i, ex) {
    console.log("inner");
    return M.jump(void 0, _5, i, ex);
  }

  function _3(_ex) {
    var j, ex, a;
    e = _ex;
    ex = e;
    a = j++;
    return M.chain(eff("exception", e, a), _4, ex);
  }

  function _4(ex) {
    console.log("exception", e);
    return M.jump(void 0, _5, void 0, ex);
  }

  function _5(i, ex) {
    return M.chain(eff("out", ex, i), _6);
  }

  function _6() {
    console.log("out");
  }

  function _7(a) {
    return M.jump(void 0, _3, a);
  }
}

function a04() {
  var i, j, a, b;
  i = 0;
  a = i++;
  b = j = 0;
  return M.chain(eff(1, a, b), _1, i, j);

  function _1(i, j) {
    var a, b;
    a = i++;
    b = j = j + 1;
    return M.chain(eff(2, a, b), _2, i, j);
  }

  function _2(i, j) {
    return M.chain(eff(3, i, j), _3, _26, i, j);
  }

  function _3(i, j) {
    return M.chain(eff(4), _4, _27, i, j);
  }

  function _4(i, j) {
    return M.chain(eff(5, i), _5, _27, i, j);
  }

  function _5(i, j) {
    if (something) {
      return M.jump(void 0, _7, _26, i, j, _15, _26);
    } else {
      if (something2) {
        return M.jump(void 0, _7, _26, [i, j, _16, _21, _19, _21]);
      } else {
        if (something3) {
          return M.jump(void 0, _7, _26, [i, j, _16, _21, _20, _21]);
        } else {
          if (something4) {
            return M.chain(eff(6), _6, _27, i, j);
          } else {
            return M.jump(void 0, _6, _27, i, j);
          }
        }
      }
    }
  }

  function _6(i, j) {
    return M.jump(void 0, _7, _26, [i, j, _16, _21, _20, _21]);
  }

  function _7([i, j, fc, fe, _fc, _fe, err]) {
    return M.chain(eff(7), _8, _29, [i, j, fc, fe, _fc, _fe, err]);
  }

  function _8([i, j, fc, fe, _fc, _fe, err]) {
    if (something5) {
      return M.chain(eff(8, j), _9, _28, [i, j, _13, _26, fc, fe, _fc, _fe, err]);
    } else {
      return M.jump(void 0, _9, _28, [i, j, _16, _21, fc, fe, _19, _21, err]);
    }
  }

  function _9([i, j, fc1, fe1, fc, fe, _fc, _fe, err, _err]) {
    console.log("i");
    return M.jump(void 0, _10, _26, [i, j, fc1, fe1, fc, fe, _fc, _fe, err, _err, _err]);
  }

  function _10([i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]) {
    var a;
    a = j = j + 1;
    return M.chain(eff(9, a), _11, _26, [i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]);
  }

  function _11([i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]) {
    return M.chain(eff(10), _12, _26, [i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]);
  }

  function _12([i, j, fc1, fe1, fc, fe, _fc, _fe, err, err1, _err]) {
    console.log(j);
    return M.jump(void 0, fc1, fe1, [i, fc, fe, _fc, _fe, err1, err, err1, _err]);
  }

  function _13(a, [i, fc, fe, _fc, _fe, err2, err, err1, _err]) {
    return M.chain(eff(11), _14, _26, [i, fc, fe, _fc, _fe, err, err1, _err]);
  }

  function _14([i, fc, fe, _fc, _fe, err, err1, _err]) {
    console.log(11);
    return M.jump(void 0, fc, fe, [i, fc, fe, _fc, _fe, err, err, err1, _err]);
  }

  function _15(a, [i, fc, fe, _fc, _fe, err2, err, err1, _err]) {
    return M.chain(eff(12), _16, [i, void 0, void 0, _18, _21, err2, err, err1, _err]);
  }

  function _16(b, [i, fc, fe, _fc, _fe, err2, err, err1, _err]) {
    var a;
    a = i = i + 1;
    return M.chain(eff(13, a), _17, [i, _fc, _fe, err2, err, err1, _err]);
  }

  function _17([i, _fc, _fe, err2, err, err1, _err]) {
    return M.chain(eff(14), _fc, _fe, i, err2, err, err1, _err);
  }

  function _18(i) {
    return M.chain(eff(15, i), _19);
  }

  function _19() {
    return M.chain(eff(16), _20, _21);
  }

  function _20() {}

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
    return M.jump(void 0, _16, [void 0, void 0, void 0, _22, _21, a]);
  }

  function _27(a) {
    return M.jump(void 0, _7, _26, [void 0, void 0, _16, _21, _23, _21, a]);
  }

  function _28(a) {
    return M.jump(void 0, _10, _26, [void 0, void 0, _16, _21, void 0, void 0, _24, _21, void 0, a]);
  }

  function _29(a) {
    return M.jump(void 0, _9, _28, [void 0, void 0, _16, _21, void 0, void 0, _25, _21, void 0, a]);
  }
}

function a05() {
  return M.chain(eff(1), _1, _9);

  function _1() {
    return M.chain(eff(2), _2, _9);
  }

  function _2() {
    return M.chain(eff(3), _3, _5, _7);
  }

  function _3(fc, fe, err) {
    return M.chain(eff(4), _4, fc, fe, err);
  }

  function _4(fc, fe, err) {
    return M.chain(eff(5), fc, fe, err);
  }

  function _5() {
    return M.chain(eff(6), _6, _7);
  }

  function _6() {}

  function _7(e) {
    return M.raise(e);
  }

  function _8(err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jump(void 0, _3, _8, _7, a);
  }
}

function a06() {
  return M.chain(eff(1), _1, _8);

  function _1() {
    return M.chain(eff(2), _2, _8);
  }

  function _2() {
    return M.chain(eff(3), _3, _5, _6);
  }

  function _3(fc, fe, err) {
    return M.chain(eff(4), _4, fc, fe, err);
  }

  function _4(fc, fe, err) {
    return M.chain(eff(5), fc, fe, err);
  }

  function _5() {
    console.log(6);
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jump(void 0, _3, _7, _6, a);
  }
}

function a07() {
  return M.chain(eff(1), _1, _10);

  function _1() {
    return M.chain(eff(2), _2, _10);
  }

  function _2() {
    return M.chain(eff(3), _3, _10);
  }

  function _3(a) {
    if (a) {
      return M.jump(void 0, _4, _7, _8);
    } else {
      return M.chain(eff(4), _4, _6, _8);
    }
  }

  function _4(a, fc, fe, err) {
    return M.chain(eff(5), _5, fc, fe, err);
  }

  function _5(fc, fe, err) {
    return M.chain(eff(6), fc, fe, err);
  }

  function _6() {
    return M.chain(eff(7), _7);
  }

  function _7() {
    console.log(8);
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(err) {
    return M.raise(err);
  }

  function _10(a) {
    return M.jump(void 0, _4, _9, _8, a);
  }
}

function a08() {
  return M.chain(eff(1), _1, _10);

  function _1() {
    return M.chain(eff(2), _2, _10);
  }

  function _2() {
    return M.chain(eff(3), _3, _10);
  }

  function _3(a) {
    if (a) {
      return M.jump(void 0, _4, _7, _8);
    } else {
      return M.chain(eff(4), _4, _6, _8);
    }
  }

  function _4(a, fc, fe, err) {
    return M.chain(eff(5), _5, fc, fe, err);
  }

  function _5(fc, fe, err) {
    return M.chain(eff(6), fc, fe, err);
  }

  function _6() {
    return M.chain(eff(7), _7);
  }

  function _7() {
    var r;

    if (a) {
      return 10;
    } else {
      console.log(8);
      return r;
    }
  }

  function _8(e) {
    return M.raise(e);
  }

  function _9(err) {
    return M.raise(err);
  }

  function _10(a) {
    return M.jump(void 0, _4, _9, _8, a);
  }
}

function a09() {
  var _a, a1;

  return M.chain(eff(1), _1, _19);

  function _1() {
    return M.chain(eff(2), _2, _19);
  }

  function _2() {
    return M.chain(eff(3), _3, _19);
  }

  function _3(a) {
    _a = a;

    if (_a === 1) {
      return M.jump(void 0, _11, _14, _16);
    } else {
      if (_a === 2) {
        return M.chain(eff(4), _4, _19);
      } else {
        return M.jump(void 0, _5, _20);
      }
    }
  }

  function _4() {
    return M.jump(10, _11, _15, _16);
  }

  function _5() {
    return M.chain(eff(5), _6, _20);
  }

  function _6() {
    return M.chain(eff(6), _7, _20);
  }

  function _7(a) {
    a1 = a;

    if (a1 === 1) {
      return M.jump(void 0, _8, _19, _11, _16, _14, _16);
    } else {
      if (a1 === 2) {
        return M.jump(10, _8, _19, _11, _16, _15, _16);
      } else {
        return M.chain(eff(7), _8, _19, _10, _19);
      }
    }
  }

  function _8(a, [fc, fe, _fc, _fe, r, _err]) {
    return M.chain(eff(8), _9, _19, [fc, fe, _fc, _fe, r, _err]);
  }

  function _9([fc, fe, _fc, _fe, r, _err]) {
    return M.chain(eff(9), fc, fe, _fc, _fe, r, _err, _err);
  }

  function _10(a, fc, fe, r, err, _err) {
    return M.chain(eff(10), _11, _13, _16, r, err, _err);
  }

  function _11(a, _fc, _fe, r, err, _err) {
    return M.chain(eff(11), _12, _fc, _fe, r, err, _err);
  }

  function _12(_fc, _fe, r, err, _err) {
    return M.chain(eff(12), _fc, _fe, r, err, _err);
  }

  function _13() {
    return M.chain(eff(13), _14);
  }

  function _14() {
    return eff(14);
  }

  function _15(r) {
    return r;
  }

  function _16(e) {
    return M.raise(e);
  }

  function _17(r, err) {
    return M.raise(err);
  }

  function _18(r, err, _err) {
    return M.raise(_err);
  }

  function _19(a) {
    return M.jump(void 0, _11, _17, _16, void 0, a);
  }

  function _20(a) {
    return M.jump(void 0, _8, _19, [_11, _16, _18, _16, void 0, a]);
  }
}

function a10() {
  var a;
  return M.jump(void 0, _1, _14);

  function _1() {
    return M.chain(eff(2), _2, _15);
  }

  function _2() {
    return M.chain(eff(5), _3, _15);
  }

  function _3() {
    return M.chain(eff(6), _4, _15);
  }

  function _4(b) {
    a = b;

    if (a) {
      return eff(3);
    } else {
      return M.jump(void 0, _5, _14, _9, _11);
    }
  }

  function _5(fc, fe, _err) {
    return M.chain(eff(8), _6, _14, fc, fe, _err);
  }

  function _6(fc, fe, _err) {
    return M.chain(eff(9), _7, fc, fe, _err, _err);
  }

  function _7(fc, fe, err, _err) {
    return M.chain(eff(11), _8, fc, fe, err, _err);
  }

  function _8(fc, fe, err, _err) {
    return M.chain(eff(12), fc, fe, err, _err);
  }

  function _9() {
    return M.chain(eff(13), _10, _11);
  }

  function _10() {
    var r;
    return r;
  }

  function _11(e) {
    return M.raise(e);
  }

  function _12(err) {
    return M.raise(err);
  }

  function _13(err, _err) {
    return M.raise(_err);
  }

  function _14(a) {
    return M.jump(void 0, _7, _12, _11, a);
  }

  function _15(a) {
    return M.jump(void 0, _5, _14, _13, _11, a);
  }
}

function a11() {
  return M.jump(void 0, _1, _11);

  function _1() {
    return M.chain(eff(1), _2, _10, _3, _10);
  }

  function _2(fc, fe, _fc, _fe, _err) {
    return M.chain(eff(2), fc, fe, _fc, _fe, _err, _err);
  }

  function _3(fc, fe, err, _err) {
    return M.chain(eff("a"), _4, _5, _7, err, _err);
  }

  function _4(_fc, _fe, err, _err) {
    return M.chain(eff(3), _fc, _fe, err, _err);
  }

  function _5() {
    return M.chain(eff(4), _6, _7);
  }

  function _6() {}

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
    return M.jump(void 0, _4, _8, _7, a);
  }

  function _11(a) {
    return M.jump(void 0, _2, _10, _4, _7, _9, _7, a);
  }
}

function a12() {
  return M.jump(void 0, _1, _12);

  function _1() {
    return M.chain(eff(1), _2, _12);
  }

  function _2(a) {
    if (a) {
      return M.jump(10, _3, _11, _5, _8, _7, _8);
    } else {
      return M.jump(void 0, _3, _11, _4, _11);
    }
  }

  function _3([fc, fe, _fc, _fe, r, _err]) {
    return M.chain(eff(2), fc, fe, _fc, _fe, r, _err, _err);
  }

  function _4(fc, fe, r, err, _err) {
    return M.chain(eff("A"), _5, _6, _8, r, err, _err);
  }

  function _5(_fc, _fe, r, err, _err) {
    return M.chain(eff(3), _fc, _fe, r, err, _err);
  }

  function _6(r) {
    return M.chain(eff(4), _7, _8, r);
  }

  function _7(r) {
    return r;
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
    return M.jump(void 0, _5, _9, _8, void 0, a);
  }

  function _12(a) {
    return M.jump(void 0, _3, _11, [_5, _8, _10, _8, void 0, a]);
  }
}

function a13() {
  return M.jump(void 0, _1, _13);

  function _1() {
    return M.chain(eff(1), _2, _13);
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _3, _12, _6, _9, _8, _9);
    } else {
      return M.jump(void 0, _3, _12, _5, _12);
    }
  }

  function _3(fc, fe, _fc, _fe, _err) {
    return M.chain(eff(2), _4, _12, fc, fe, _fc, _fe, _err);
  }

  function _4(fc, fe, _fc, _fe, _err) {
    return M.chain(eff("2"), fc, fe, _fc, _fe, _err, _err);
  }

  function _5(fc, fe, err, _err) {
    return M.chain(eff("A"), _6, _7, _9, err, _err);
  }

  function _6(_fc, _fe, err, _err) {
    return M.chain(eff(3), _fc, _fe, err, _err);
  }

  function _7() {
    return M.chain(eff(4), _8, _9);
  }

  function _8() {}

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
    return M.jump(void 0, _6, _10, _9, a);
  }

  function _13(a) {
    return M.jump(void 0, _3, _12, _6, _9, _11, _9, a);
  }
}

function a14() {
  var a;
  return M.jump(void 0, _1, _14);

  function _1(a, _fc, _fe, r, _err, err) {
    return M.chain(eff(1), _2, _14, _fc, _fe, r, err);
  }

  function _2(b, _fc, _fe, r, err) {
    a = b;

    if (a === 1) {
      return M.jump(void 0, _3, _13, [_6, _10, _8, _10, r, err]);
    } else {
      if (a === 2) {
        return M.jump(void 0, _3, _13, [_1, _14, _fc, _fe, r, err]);
      } else {
        if (a === 3) {
          return M.jump(1, _3, _13, [_6, _10, _9, _10, void 0, err]);
        } else {
          if (a === 4) {
            return M.jump(void 0, _3, _13, [_6, _10, _9, _10, r, err]);
          } else {
            if (a === 5) {
              return eff("REZ");
            } else {
              return M.chain(eff(2), _3, _13, [_5, _13, _fc, _fe, r, err]);
            }
          }
        }
      }
    }
  }

  function _3(a, [fc, fe, _fc, _fe, r, err]) {
    return M.chain(eff(3), _4, _13, [fc, fe, _fc, _fe, r, err]);
  }

  function _4([fc, fe, _fc, _fe, r, err]) {
    return M.chain(eff(4), fc, fe, _fc, _fe, r, err, err);
  }

  function _5(a, _fc, _fe, r, _err, err) {
    return M.chain(eff(5), _1, _14, _fc, _fe, r, void 0, err);
  }

  function _6(a, _fc, _fe, r, _err, err) {
    return M.chain(eff(6), _7, _fc, _fe, r, _err, err);
  }

  function _7(_fc, _fe, r, _err, err) {
    return M.chain(eff(7), _fc, _fe, r, _err, err);
  }

  function _8(r) {
    return M.chain(eff(8), _9, _10, r);
  }

  function _9(r) {
    return r;
  }

  function _10(e) {
    return M.raise(e);
  }

  function _11(r, _err) {
    return M.raise(_err);
  }

  function _12(r, _err, err) {
    return M.raise(err);
  }

  function _13(a) {
    return M.jump(void 0, _6, _11, _10, void 0, a);
  }

  function _14(a) {
    return M.jump(void 0, _3, _13, [_6, _10, _12, _10, void 0, a]);
  }
}

function a15() {
  var _a;

  return M.jump(void 0, _1);

  function _1() {
    console.log("a");
    return M.jump(void 0, _2);
  }

  function _2() {
    return M.chain(eff(1), _3);
  }

  function _3(a) {
    _a = a;

    if (_a === 1) {
      if (a) {
        return M.chain(eff(8), _4);
      } else {
        return M.jump(void 0, _1);
      }
    } else {
      return M.chain(eff(2), _2);
    }
  }

  function _4() {}
}

function a15a() {
  if (a === 1) {} else {
    return M.chain(eff(2), _1);
  }

  function _1() {}
}

function a16() {
  var _a;

  return M.chain(eff(0), _1);

  function _1() {
    console.log("a");
    return M.jump(void 0, _2);
  }

  function _2() {
    return M.chain(eff(1), _3);
  }

  function _3(a) {
    _a = a;

    if (_a === 1) {
      if (a) {
        return M.chain(eff(8), _4);
      } else {
        return M.jump(void 0, _1);
      }
    } else {
      return M.chain(eff(2), _2);
    }
  }

  function _4() {}
}

function a17() {
  var a;
  return M.jump(void 0, _1);

  function _1() {
    return M.chain(eff(1), _2);
  }

  function _2(c) {
    a = c;

    if (a === 1) {
      if (b) {
        return M.chain(eff(8), _3);
      } else {
        return M.jump(void 0, _1);
      }
    } else {
      return M.chain(eff(2), _1);
    }
  }

  function _3() {}
}

function a18() {
  var a;
  return M.jump(void 0, _1, _9);

  function _1(a, err) {
    return M.chain(eff(1), _2, _9, err);
  }

  function _2(b, err) {
    a = b;

    if (a === 1) {
      return M.jump(void 0, _3, _5, _7, err);
    } else {
      return M.chain(eff(2), _3, _1, _9, err);
    }
  }

  function _3(a, fc, fe, err) {
    return M.chain(effF(3), _4, fc, fe, err);
  }

  function _4(fc, fe, err) {
    return M.chain(effF(4), fc, fe, err);
  }

  function _5(a, err) {
    if (b) {
      return M.chain(eff(8), _6, _7);
    } else {
      return M.jump(void 0, _1, _9, err);
    }
  }

  function _6() {}

  function _7(e) {
    return M.raise(e);
  }

  function _8(a, err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jump(void 0, _3, _8, _7, a);
  }
}

function a19() {
  return M.jump(void 0, _1);

  function _1(a, err) {
    return M.chain(eff(1), _2, _6, err);
  }

  function _2(err) {
    return M.chain(eff(2), _3, _1, _4, err);
  }

  function _3(fc, fe, err) {
    return M.chain(effF(3), fc, fe, err);
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(a, err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jump(void 0, _3, _5, _4, a);
  }
}

function a20() {
  return M.jump(void 0, _1, _5);

  function _1(a, err) {
    return M.chain(eff(2), _2, _1, _5, err);
  }

  function _2(fc, fe, err) {
    return M.chain(effF(3), fc, fe, err);
  }

  function _3(e) {
    return M.raise(e);
  }

  function _4(a, err) {
    return M.raise(err);
  }

  function _5(a) {
    return M.jump(void 0, _2, _4, _3, a);
  }
}

function a21() {
  return M.jump(void 0, _1, _8);

  function _1(a, err, _err) {
    return M.chain(eff(2), _2, _9, _1, _8, err, _err);
  }

  function _2(fc, fe, err, _err) {
    if (a1) {
      return M.jump(void 0, _3, _1, _8, err, _err);
    } else {
      if (a2) {
        return M.jump(void 0, _3, _4, _5, err, _err);
      } else {
        if (a3) {
          return M.jump(void 0, _3, _4, _5, err, _err);
        } else {
          return M.chain(effF(3), _3, fc, fe, err, _err);
        }
      }
    }
  }

  function _3(a, fc, fe, err, _err) {
    return M.chain(effFF(4), fc, fe, err, _err);
  }

  function _4() {}

  function _5(e) {
    return M.raise(e);
  }

  function _6(a, err) {
    return M.raise(err);
  }

  function _7(a, err, _err) {
    return M.raise(_err);
  }

  function _8(a) {
    return M.jump(void 0, _2, _9, _6, _5, a);
  }

  function _9(a) {
    return M.jump(void 0, _3, _7, _5, void 0, a);
  }
}

function a22() {
  return M.jump(void 0, _1, _5);

  function _1(a, err) {
    return M.chain(eff(2), _2, _1, _5, err);
  }

  function _2(fc, fe, err) {
    return M.chain(effFF(4), fc, fe, err);
  }

  function _3(e) {
    return M.raise(e);
  }

  function _4(a, err) {
    return M.raise(err);
  }

  function _5(a) {
    return M.jump(void 0, _2, _4, _3, a);
  }
}

function a23() {
  return M.jump(void 0, _1, _10);

  function _1(a, _fc, _fe, _err, err) {
    if (a1) {
      return M.jump(void 0, _2, _9, _3, _6, _4, _6, err);
    } else {
      return M.chain(eff(2), _2, _9, _1, _10, _fc, _fe, err);
    }
  }

  function _2(a, fc, fe, _fc, _fe, err) {
    return M.chain(effFF(4), fc, fe, _fc, _fe, err, err);
  }

  function _3(a, _fc, _fe, _err, err) {
    return M.chain(effFF(5), _fc, _fe, _err, err);
  }

  function _4() {
    return M.chain(eff(6), _5, _6);
  }

  function _5() {}

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
    return M.jump(void 0, _3, _7, _6, a);
  }

  function _10(a) {
    return M.jump(void 0, _2, _9, _3, _6, _8, _6, a);
  }
}

function a24() {
  return M.jump(void 0, _1, _10);

  function _1(a, _fc, _fe, _err, err) {
    if (a1) {
      return M.jump(void 0, _2, _9, _3, _6, _4, _6, err);
    } else {
      return M.chain(eff(2), _2, _9, _1, _10, _fc, _fe, err);
    }
  }

  function _2(a, fc, fe, _fc, _fe, err) {
    return M.chain(effFF(4), fc, fe, _fc, _fe, err, err);
  }

  function _3(a, _fc, _fe, _err, err) {
    return M.jump(void 0, _fc, _fe, _err, err);
  }

  function _4() {
    return M.chain(eff(6), _5, _6);
  }

  function _5() {}

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
    return M.jump(void 0, _3, _7, _6, a);
  }

  function _10(a) {
    return M.jump(void 0, _2, _9, _3, _6, _8, _6, a);
  }
}

function a25() {
  return M.jump(void 0, _1, _7);

  function _1() {
    if (a1) {
      return M.jump(void 0, _2, _8);
    } else {
      return M.chain(eff(2), _2, _8);
    }
  }

  function _2() {
    return M.jump(void 0, _3, _4, _5);
  }

  function _3(fc, fe, err) {
    return M.chain(effFF(4), fc, fe, err);
  }

  function _4() {}

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(void 0, _2, _8);
  }

  function _8(a) {
    return M.jump(void 0, _3, _6, _5, a);
  }
}

function a26() {
  return M.jump(void 0, _1, _7);

  function _1() {
    if (a1) {
      return M.jump(void 0, _2, _8);
    } else {
      return M.chain(eff(2), _2, _8);
    }
  }

  function _2() {
    return M.jump(void 0, _3, _4, _5);
  }

  function _3(fc, fe, err) {
    return M.chain(effFF(4), fc, fe, err);
  }

  function _4() {}

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(void 0, _2, _8);
  }

  function _8(a) {
    return M.jump(void 0, _3, _6, _5, a);
  }
}

function a27() {
  return M.jump(void 0, _1, _8);

  function _1() {
    if (a1) {
      return M.jump(void 0, _2, _9);
    } else {
      return M.chain(eff(2), _2, _9);
    }
  }

  function _2() {
    return M.jump(void 0, _3, _4, _6);
  }

  function _3(fc, fe, err) {
    return M.chain(effFF(4), fc, fe, err);
  }

  function _4() {
    return M.chain(eff(5), _5, _6);
  }

  function _5() {}

  function _6(e) {
    return M.raise(e);
  }

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jump(void 0, _2, _9);
  }

  function _9(a) {
    return M.jump(void 0, _3, _7, _6, a);
  }
}

function a28() {
  return M.jump(void 0, _1, _14);

  function _1() {
    if (a1) {
      return M.jump(void 0, _2, _13, _6, _9, _7, _9);
    } else {
      return M.chain(eff(2), _2, _13, _5, _13);
    }
  }

  function _2(a, fc, fe, _fc, _fe, err) {
    return M.chain(eff(3), _3, _15, fc, fe, _fc, _fe, err);
  }

  function _3(fc, fe, _fc, _fe, err) {
    if (a2) {
      return M.jump(void 0, _4, _13, _5, _13, _fc, _fe, err);
    } else {
      return M.chain(eff(4), _4, _13, fc, fe, _fc, _fe, err);
    }
  }

  function _4(a, [fc, fe, _fc, _fe, err, _err]) {
    return M.chain(eff(5), fc, fe, _fc, _fe, _err, err, _err);
  }

  function _5(fc, fe, err1, err, _err) {
    return M.chain(eff(6), _6, _7, _9, err1, err, _err);
  }

  function _6(_fc, _fe, err1, err, _err) {
    return M.chain(eff(7), _fc, _fe, err1, err, _err);
  }

  function _7() {
    return M.chain(eff(8), _8, _9);
  }

  function _8() {}

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
    return M.jump(void 0, _6, _10, _9, a);
  }

  function _14(a) {
    return M.jump(void 0, _2, _13, _6, _9, _11, _9, a);
  }

  function _15(a) {
    return M.jump(void 0, _4, _13, [_6, _9, _12, _9, void 0, a]);
  }
}

function a29() {
  return M.jump(void 0, _1, _14);

  function _1() {
    return M.jump(void 0, _2, _13, _7, _9);
  }

  function _2(_fc, _fe, err) {
    return M.chain(eff(3), _3, _15, _fc, _fe, err);
  }

  function _3(_fc, _fe, err) {
    return M.jump(void 0, _4, _13, _5, _13, _fc, _fe, err);
  }

  function _4([fc, fe, _fc, _fe, err, _err]) {
    return M.chain(eff(5), fc, fe, _fc, _fe, _err, err, _err);
  }

  function _5(fc, fe, err1, err, _err) {
    return M.chain(eff(6), _6, _7, _9, err1, err, _err);
  }

  function _6(_fc, _fe, err1, err, _err) {
    return M.chain(eff(7), _fc, _fe, err1, err, _err);
  }

  function _7() {
    return M.chain(eff(8), _8, _9);
  }

  function _8() {}

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
    return M.jump(void 0, _6, _10, _9, a);
  }

  function _14(a) {
    return M.jump(void 0, _2, _13, _11, _9, a);
  }

  function _15(a) {
    return M.jump(void 0, _4, _13, [_6, _9, _12, _9, void 0, a]);
  }
}

function a30(a1, a2) {
  return M.jump(void 0, _1, _14);

  function _1() {
    if (a1) {
      return M.jump(void 0, _2, _13, _6, _9, _7, _9);
    } else {
      return M.chain(eff(2), _2, _13, _5, _13);
    }
  }

  function _2(a, fc, fe, _fc, _fe, err) {
    return M.chain(eff(3), _3, _15, fc, fe, _fc, _fe, err);
  }

  function _3(fc, fe, _fc, _fe, err) {
    if (a2) {
      return M.jump(void 0, _4, _13, _5, _13, _fc, _fe, err);
    } else {
      return M.chain(eff(4), _4, _13, fc, fe, _fc, _fe, err);
    }
  }

  function _4(a, [fc, fe, _fc, _fe, err, _err]) {
    return M.chain(eff(5), fc, fe, _fc, _fe, _err, err, _err);
  }

  function _5(fc, fe, err1, err, _err) {
    return M.chain(eff(6), _6, _7, _9, err1, err, _err);
  }

  function _6(_fc, _fe, err1, err, _err) {
    return M.chain(eff(7), _fc, _fe, err1, err, _err);
  }

  function _7() {
    return M.chain(eff(8), _8, _9);
  }

  function _8() {}

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
    return M.jump(void 0, _6, _10, _9, a);
  }

  function _14(a) {
    return M.jump(void 0, _2, _13, _6, _9, _11, _9, a);
  }

  function _15(a) {
    return M.jump(void 0, _4, _13, [_6, _9, _12, _9, void 0, a]);
  }
}

function a31() {
  var e;
  return M.jump(void 0, _1, _6);

  function _1() {
    console.log("hi");
    return M.chain(eff(1), _2, _6);
  }

  function _2() {
    return M.chain(eff(2), _4);
  }

  function _3(ex) {
    e = ex;
    console.log(e);
    return M.chain(eff(3), _4);
  }

  function _4() {
    return M.chain(eff(4), _5);
  }

  function _5() {}

  function _6(a) {
    return M.jump(void 0, _3, a);
  }
}

function a32(a1, a2) {
  var e, ee;
  return M.jump(void 0, _1, _8);

  function _1() {
    console.log("hi");
    return M.chain(eff(1), _2, _8);
  }

  function _2() {
    return M.chain(eff(2), _5);
  }

  function _3(ex) {
    e = ex;
    console.log(e);
    return M.chain(eff(3), _5);
  }

  function _4(ex) {
    ee = ex;
    return M.chain(eff(4), _5);
  }

  function _5() {
    return M.chain(eff(5), _6);
  }

  function _6() {}

  function _7(a) {
    return M.jump(void 0, _4, a);
  }

  function _8(a) {
    return M.jump(void 0, _3, _7, a);
  }
}

function a33() {
  var e;
  return M.jump(void 0, _1, _9);

  function _1() {
    console.log("hi");
    return M.chain(eff(1), _2, _9);
  }

  function _2() {
    return M.chain(eff(2), _4, _5, _7);
  }

  function _3(ex) {
    e = ex;
    console.log(e);
    return M.chain(eff(3), _4, _5, _7);
  }

  function _4(fc, fe, err) {
    return M.chain(eff(4), fc, fe);
  }

  function _5() {
    return M.chain(eff(5), _6, _7);
  }

  function _6() {}

  function _7(e) {
    return M.raise(e);
  }

  function _8(err) {
    return M.raise(err);
  }

  function _9(a) {
    return M.jump(void 0, _3, _10, a);
  }

  function _10(a) {
    return M.jump(void 0, _4, _8, _7, a);
  }
}

function a34() {
  var e;
  return M.jump(void 0, _1, _11);

  function _1() {
    console.log("hi");
    return M.chain(eff(1), _2, _10, _3, _10);
  }

  function _2(fc, fe, err) {
    return M.chain(eff(2), fc, fe, err);
  }

  function _3() {
    return M.chain(eff(3), _5, _6, _8);
  }

  function _4(ex) {
    e = ex;
    return M.chain(eff(e), _5, _6, _8);
  }

  function _5(fc, fe, err) {
    return M.chain(eff(4), fc, fe);
  }

  function _6() {
    return M.chain(eff(5), _7, _8);
  }

  function _7() {}

  function _8(e) {
    return M.raise(e);
  }

  function _9(err) {
    return M.raise(err);
  }

  function _10(a) {
    return M.jump(void 0, _4, _12, a);
  }

  function _11(a) {
    return M.jump(void 0, _2, _10, _4, _12, a);
  }

  function _12(a) {
    return M.jump(void 0, _5, _9, _8, a);
  }
}

function a35() {
  var e;
  return M.jump(void 0, _1, _9);

  function _1() {
    console.log("hi");
    return M.chain(eff("try>try>body"), _2, _8, _3, _8);
  }

  function _2(fc, fe, err) {
    return M.chain(eff("try>try>finally"), fc, fe, err);
  }

  function _3() {
    return M.chain(eff("try>body"), _5);
  }

  function _4(ex) {
    e = ex;
    console.log(e);
    return M.chain(eff("try>catch"), _5);
  }

  function _5() {
    return M.chain(eff("last"), _6, _7);
  }

  function _6() {}

  function _7(e) {
    return M.raise(e);
  }

  function _8(a) {
    return M.jump(void 0, _4, a);
  }

  function _9(a) {
    return M.jump(void 0, _2, _8, _4, _7, a);
  }
}

function a36(a1) {
  return M.jump(void 0, _1, _6);

  function _1() {
    if (a1) {
      return M.jump(void 0, _2, _3, _4);
    } else {
      return M.chain(eff("body"), _2, _3, _4);
    }
  }

  function _2(a, fc, fe, err) {
    return M.chain(eff("finally"), fc, fe, err);
  }

  function _3() {}

  function _4(e) {
    return M.raise(e);
  }

  function _5(err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jump(void 0, _2, _5, _4, a);
  }
}

function a37(a1, a2) {
  return M.jump(void 0, _1, _14);

  function _1() {
    if (a1) {
      return M.jump(void 0, _2, _13, _6, _9, _7, _9);
    } else {
      return M.chain(eff("l1>try-body>l2>try-body"), _2, _13, _5, _13);
    }
  }

  function _2(a, fc, fe, _fc, _fe, err) {
    return M.chain(eff("l1>try-body>l2>try-finally"), _3, _15, fc, fe, _fc, _fe, err);
  }

  function _3(fc, fe, _fc, _fe, err) {
    if (a2) {
      return M.jump(void 0, _4, _13, _5, _13, _fc, _fe, err);
    } else {
      return M.chain(eff("l1>try-body>l2>try-finally>try-body"), _4, _13, fc, fe, _fc, _fe, err);
    }
  }

  function _4(a, [fc, fe, _fc, _fe, err, _err]) {
    return M.chain(eff("l1>try-body>l2>try-finally>try-finally"), fc, fe, _fc, _fe, _err, err, _err);
  }

  function _5(fc, fe, err1, err, _err) {
    return M.chain(eff("l1>try-body"), _6, _7, _9, err1, err, _err);
  }

  function _6(_fc, _fe, err1, err, _err) {
    return M.chain(eff("l1>try-finally"), _fc, _fe, err1, err, _err);
  }

  function _7() {
    return M.chain(eff("end"), _8, _9);
  }

  function _8() {}

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
    return M.jump(void 0, _6, _10, _9, a);
  }

  function _14(a) {
    return M.jump(void 0, _2, _13, _6, _9, _11, _9, a);
  }

  function _15(a) {
    return M.jump(void 0, _4, _13, [_6, _9, _12, _9, void 0, a]);
  }
}

function a38(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.chain(eff("pref", i, j), _1, _6, i, j);

  function _1(i, j) {
    i += 1, j += 2;

    if (i > 10) {
      return M.jump(10, _2, i, _3, _4);
    } else {
      return M.chain(eff("body", i, j), _2, i, _3, _4);
    }
  }

  function _2(a, i, fc, fe, r, err) {
    return M.chain(eff("finally", i), fc, fe, r, err);
  }

  function _3(r) {
    return r;
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5(r, err) {
    return M.raise(err);
  }

  function _6(a) {
    return M.jump(void 0, _2, void 0, _5, _4, void 0, a);
  }
}

function a39(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.chain(eff("pref", i, j), _1, _7, i, j);

  function _1(i, j) {
    i += 1, j += 2;

    if (i > 10) {
      return M.jump(10, _2, i, j, _4, _5);
    } else {
      return M.chain(eff("body", i, j), _2, i, j, _3, _5);
    }
  }

  function _2(a, [i, j, fc, fe, r, err]) {
    return M.chain(eff("finally", i), fc, fe, j, r, err);
  }

  function _3(j, r) {
    return M.chain(eff("exit", j), _4, _5, j, r);
  }

  function _4(j, r) {
    return r;
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(j, r, err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(void 0, _2, [void 0, void 0, _6, _5, void 0, a]);
  }
}

function a40(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.chain(eff("pref", i, j), _1, _11, i, j);

  function _1(i, j) {
    var a;
    a = j++;
    return M.chain(eff("l1", i, a), _2, _12, i, j);
  }

  function _2(i, j) {
    i += 1;

    if (i > 10) {
      return M.jump(10, _3, _11, [i, j, _5, _8, _7, _8]);
    } else {
      if (j > 10) {
        return M.jump(void 0, _3, _11, [i, j, _5, _8, _6, _8]);
      } else {
        return M.chain(eff("l1 > body", i, j), _3, _11, i, j, _4, _11);
      }
    }
  }

  function _3(a, [i, j, fc, fe, _fc, _fe, r, _err]) {
    return M.chain(eff("l1 > finally", i), fc, fe, [i, j, _fc, _fe, r, _err, _err]);
  }

  function _4([i, j, fc, fe, r, err, _err]) {
    return M.chain(eff("l1 > exit", j), _5, [i, j, _6, _8, r, err, _err]);
  }

  function _5([i, j, _fc, _fe, r, err, _err]) {
    return M.chain(eff("body > finally", i), _fc, _fe, j, r, err, _err);
  }

  function _6(j, r) {
    return M.chain(eff("exit", j), _7, _8, j, r);
  }

  function _7(j, r) {
    return r;
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
    return M.jump(void 0, _5, [void 0, void 0, _9, _8, void 0, a]);
  }

  function _12(a) {
    return M.jump(void 0, _3, _11, [void 0, void 0, _5, _8, _10, _8, void 0, a]);
  }
}

function a41(a1) {
  if (a1 === 1) {
    return 10;
  } else {
    if (a1 === 2) {
      return eff(11);
    } else {
      if (a1 === 3) {
        return M.chain(eff(12), _1);
      } else {
        return M.chain(eff("exit"), _1);
      }
    }
  }

  function _1() {
    var r;
    return r;
  }
}

function a42(a1) {
  return M.jump(void 0, _1, _8);

  function _1() {
    if (a1 === 1) {
      return M.jump(10, _3, _5, _6);
    } else {
      if (a1 === 2) {
        return eff(11);
      } else {
        if (a1 === 3) {
          return M.chain(eff(12), _2, _8);
        } else {
          return M.jump(void 0, _3, _4, _6);
        }
      }
    }
  }

  function _2() {
    return M.jump(void 0, _3, _5, _6);
  }

  function _3(fc, fe, r, err) {
    return M.chain(eff("finally"), fc, fe, r, err);
  }

  function _4(r) {
    return M.chain(eff("exit"), _5, _6, r);
  }

  function _5(r) {
    return r;
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7(r, err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jump(void 0, _3, _7, _6, void 0, a);
  }
}

function a43(a1) {
  var i, j;
  i = 0;
  j = 0;
  return M.chain(eff("pref", i, j), _1, _11, i, j);

  function _1(i, j) {
    var a;
    a = j++;
    return M.chain(eff("l1", i, a), _2, _12, i, j);
  }

  function _2(i, j) {
    i += 1;

    if (i > 10) {
      return M.jump(10, _3, _11, [i, j, _5, _8, _7, _8]);
    } else {
      if (j > 10) {
        return M.jump(void 0, _3, _11, [i, j, _5, _8, _6, _8]);
      } else {
        return M.chain(eff("l1 > body", i, j), _3, _11, i, j, _4, _11);
      }
    }
  }

  function _3(a, [i, j, fc, fe, _fc, _fe, r, _err]) {
    return M.chain(eff("l1 > finally", i), fc, fe, [i, j, _fc, _fe, r, _err, _err]);
  }

  function _4([i, j, fc, fe, r, err, _err]) {
    return M.chain(eff("l1 > exit", j), _5, [i, j, _6, _8, r, err, _err]);
  }

  function _5([i, j, _fc, _fe, r, err, _err]) {
    return M.chain(eff("body > finally", i), _fc, _fe, j, r, err, _err);
  }

  function _6(j, r) {
    return M.chain(eff("exit", j), _7, _8, j, r);
  }

  function _7(j, r) {
    return r;
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
    return M.jump(void 0, _5, [void 0, void 0, _9, _8, void 0, a]);
  }

  function _12(a) {
    return M.jump(void 0, _3, _11, [void 0, void 0, _5, _8, _10, _8, void 0, a]);
  }
}