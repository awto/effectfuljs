function a1() {
  var a1 = M.async();
  return a1.scopeH(_1, _2);

  function _1(a1) {
    return a1.pure();
  }

  function _2(a1, e) {
    return a1.raise(e);
  }
}

function a2() {
  var a2 = M.async();
  return a2.scopeH(_1, _3);

  function _1(a2) {
    var a;
    a = delay(1);
    return a2.chainH(a, _2, _3);
  }

  function _2(a2) {
    return a2.pure();
  }

  function _3(a2, e) {
    return a2.raise(e);
  }
}

function a3() {
  var a3 = M.async();
  return a3.scopeH(_1, _3);

  function _1(a3) {
    var a;
    a = delay(1);
    return a3.chainH(a, _2, _3);
  }

  function _2(a3, r) {
    return a3.pure(r);
  }

  function _3(a3, e) {
    return a3.raise(e);
  }
}

function g2() {
  var g2 = M.generator();
  return g2.scopeH(_1, _3);

  function _1(g2) {
    var a;
    a = delay(1);
    return g2.yldStarH(a, _2, _3);
  }

  function _2(g2) {
    return g2.pure();
  }

  function _3(g2, e) {
    return g2.raise(e);
  }
}

function g3() {
  var g3 = M.generator();
  return g3.scopeH(_1, _3);

  function _1(g3) {
    var a;
    a = delay(1);
    return g3.yldStarH(a, _2, _3);
  }

  function _2(g3, r) {
    return g3.pure(r);
  }

  function _3(g3, e) {
    return g3.raise(e);
  }
}

function a4() {
  var a4 = M.async();
  return a4.scopeH(_1, _4);

  function _1(a4) {
    var a;
    a = delay(1);
    return a4.chainH(a, _2, _4);
  }

  function _2(a4, a) {
    return a4.chainH(a, _3, _4);
  }

  function _3(a4) {
    return a4.pure();
  }

  function _4(a4, e) {
    return a4.raise(e);
  }
}

function a5() {
  var a5 = M.async();
  return a5.scopeH(_1, _5);

  function _1(a5) {
    var a;
    a = delay(1);
    return a5.chainH(a, _2, _5);
  }

  function _2(a5, a) {
    return a5.chainH(a, _3, _5);
  }

  function _3(a5, a) {
    return a5.chainH(a, _4, _5);
  }

  function _4(a5) {
    return a5.pure();
  }

  function _5(a5, e) {
    return a5.raise(e);
  }
}

function ag1() {
  var ag1 = M.asyncGenerator();
  return ag1.scopeH(_1, _3);

  function _1(ag1) {
    return ag1.yldH(1, _2, _3);
  }

  function _2(ag1) {
    return ag1.pure();
  }

  function _3(ag1, e) {
    return ag1.raise(e);
  }
}

function ag2() {
  var ag2 = M.asyncGenerator();
  return ag2.scopeH(_1, _8);

  function _1(ag2) {
    var a;
    a = delay(1);
    return ag2.chainH(a, _2, _8);
  }

  function _2(ag2, a) {
    return ag2.yldH(a, _3, _8);
  }

  function _3(ag2) {
    var a;
    a = delay(2);
    return ag2.chainH(a, _4, _8);
  }

  function _4(ag2, a) {
    return ag2.yldH(a, _5, _8);
  }

  function _5(ag2) {
    var a;
    a = delay(3);
    return ag2.chainH(a, _6, _8);
  }

  function _6(ag2, a) {
    return ag2.yldH(a, _7, _8);
  }

  function _7(ag2) {
    return ag2.pure();
  }

  function _8(ag2, e) {
    return ag2.raise(e);
  }
}

function ag3() {
  var ag3 = M.asyncGenerator();
  return ag3.scopeH(_1, _9);

  function _1(ag3) {
    ag3._loop = ag3.iteratorM(f());
    return ag3.jumpH(void 0, _2, _9);
  }

  function _2(ag3) {
    return ag3.chainH(ag3._loop.step(), _3, _9);
  }

  function _3(ag3, c) {
    var a, b;
    b = ag3._loop = c;
    a = b.done;

    if (!a) {
      ag3._i = ag3._loop.value;
      return ag3.jumpRH(void 0, _4, _10);
    } else {
      return ag3.pure();
    }
  }

  function _4(ag3) {
    var a;
    a = delay(ag3._i);
    return ag3.chainH(a, _5, _10);
  }

  function _5(ag3, a) {
    return ag3.yldH(a, _6, _10);
  }

  function _6(ag3) {
    return ag3.yldH(ag3._i, _2, _9);
  }

  function _7(ag3) {
    ag3._e = ag3._ex;

    if (ag3._loop.exit) {
      return ag3.chainH(ag3._loop.exit(), _8, _9);
    } else {
      return ag3.jumpRH(void 0, _8, _9);
    }
  }

  function _8(ag3) {
    throw ag3._e;
  }

  function _9(ag3, e) {
    return ag3.raise(e);
  }

  function _10(ag3, a) {
    ag3._ex = a;
    return ag3.jumpH(void 0, _7, _9);
  }
}

function switches() {
  var switches = M.asyncGenerator();
  return switches.scopeH(_1, _62);

  function _1(switches) {
    switches._loop = switches.iteratorM(gen());
    return switches.jumpH(void 0, _2, _62);
  }

  function _2(switches) {
    return switches.chainH(switches._loop.step(), _3, _62);
  }

  function _3(switches, c) {
    var a, b;
    b = switches._loop = c;
    a = b.done;

    if (!a) {
      switches._i = switches._loop.value;
      return switches.jumpRH(void 0, _4, _63);
    } else {
      return switches.jumpH(void 0, _7, _62);
    }
  }

  function _4(switches) {
    switch (switches._i) {
      case 3:
        if (switches._loop.exit) {
          return switches.chainH(switches._loop.exit(), _7, _62);
        } else {
          return switches.jumpH(void 0, _7, _62);
        }

      default:
        return switches.jumpRH(void 0, _2, _62);
    }
  }

  function _5(switches) {
    switches._e = switches._ex;

    if (switches._loop.exit) {
      return switches.chainH(switches._loop.exit(), _6, _62);
    } else {
      return switches.jumpRH(void 0, _6, _62);
    }
  }

  function _6(switches) {
    throw switches._e;
  }

  function _7(switches) {
    switches._loop1 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _8, _62);
  }

  function _8(switches) {
    return switches.chainH(switches._loop1.step(), _9, _62);
  }

  function _9(switches, c) {
    var a, b;
    b = switches._loop1 = c;
    a = b.done;

    if (!a) {
      switches._i1 = switches._loop1.value;
      return switches.jumpRH(void 0, _10, _64);
    } else {
      return switches.jumpH(void 0, _14, _62);
    }
  }

  function _10(switches) {
    switch (switches._i1) {
      case 3:
        return switches.yldH(`l2-${switches._i1}`, _11, _64);

      default:
        return switches.jumpRH(void 0, _8, _62);
    }
  }

  function _11(switches) {
    if (switches._loop1.exit) {
      return switches.chainH(switches._loop1.exit(), _14, _62);
    } else {
      return switches.jumpH(void 0, _14, _62);
    }
  }

  function _12(switches) {
    switches._e1 = switches._ex1;

    if (switches._loop1.exit) {
      return switches.chainH(switches._loop1.exit(), _13, _62);
    } else {
      return switches.jumpRH(void 0, _13, _62);
    }
  }

  function _13(switches) {
    throw switches._e1;
  }

  function _14(switches) {
    switches._loop2 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _15, _62);
  }

  function _15(switches) {
    return switches.chainH(switches._loop2.step(), _16, _62);
  }

  function _16(switches, c) {
    var a, b;
    b = switches._loop2 = c;
    a = b.done;

    if (!a) {
      switches._i2 = switches._loop2.value;
      return switches.jumpRH(void 0, _17, _65);
    } else {
      return switches.jumpH(void 0, _20, _62);
    }
  }

  function _17(switches) {
    switch (switches._i2) {
      case 3:
        if (switches._loop2.exit) {
          return switches.chainH(switches._loop2.exit(), _20, _62);
        } else {
          return switches.jumpH(void 0, _20, _62);
        }

      default:
        return switches.yldH(`l3-${switches._i2}`, _15, _62);
    }
  }

  function _18(switches) {
    switches._e2 = switches._ex2;

    if (switches._loop2.exit) {
      return switches.chainH(switches._loop2.exit(), _19, _62);
    } else {
      return switches.jumpRH(void 0, _19, _62);
    }
  }

  function _19(switches) {
    throw switches._e2;
  }

  function _20(switches) {
    switches._loop3 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _21, _62);
  }

  function _21(switches) {
    return switches.chainH(switches._loop3.step(), _22, _62);
  }

  function _22(switches, c) {
    var a, b;
    b = switches._loop3 = c;
    a = b.done;

    if (!a) {
      switches._i3 = switches._loop3.value;
      return switches.jumpRH(void 0, _23, _66);
    } else {
      return switches.jumpH(void 0, _26, _62);
    }
  }

  function _23(switches) {
    switch (switches._i3) {
      case 3:
        if (switches._loop3.exit) {
          return switches.chainH(switches._loop3.exit(), _26, _62);
        } else {
          return switches.jumpH(void 0, _26, _62);
        }

      default:
        return switches.yldH(`l4-${switches._i3}`, _21, _62);
    }
  }

  function _24(switches) {
    switches._e3 = switches._ex3;

    if (switches._loop3.exit) {
      return switches.chainH(switches._loop3.exit(), _25, _62);
    } else {
      return switches.jumpRH(void 0, _25, _62);
    }
  }

  function _25(switches) {
    throw switches._e3;
  }

  function _26(switches) {
    switches._loop4 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _27, _62);
  }

  function _27(switches) {
    return switches.chainH(switches._loop4.step(), _28, _62);
  }

  function _28(switches, c) {
    var a, b;
    b = switches._loop4 = c;
    a = b.done;

    if (!a) {
      switches._i4 = switches._loop4.value;
      return switches.jumpRH(void 0, _29, _67);
    } else {
      return switches.jumpH(void 0, _33, _62);
    }
  }

  function _29(switches) {
    return switches.yldH(`l5-${switches._i4}`, _30, _67);
  }

  function _30(switches) {
    switch (switches._i4) {
      case 3:
        if (switches._loop4.exit) {
          return switches.chainH(switches._loop4.exit(), _33, _62);
        } else {
          return switches.jumpH(void 0, _33, _62);
        }

      default:
        return switches.jumpRH(void 0, _27, _62);
    }
  }

  function _31(switches) {
    switches._e4 = switches._ex4;

    if (switches._loop4.exit) {
      return switches.chainH(switches._loop4.exit(), _32, _62);
    } else {
      return switches.jumpRH(void 0, _32, _62);
    }
  }

  function _32(switches) {
    throw switches._e4;
  }

  function _33(switches) {
    switches._loop5 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _34, _62);
  }

  function _34(switches) {
    return switches.chainH(switches._loop5.step(), _35, _62);
  }

  function _35(switches, c) {
    var a, b;
    b = switches._loop5 = c;
    a = b.done;

    if (!a) {
      switches._i5 = switches._loop5.value;
      return switches.jumpRH(void 0, _36, _68);
    } else {
      return switches.jumpH(void 0, _40, _62);
    }
  }

  function _36(switches) {
    switch (switches._i5) {
      case 3:
        return switches.yldH(`l6-1-${switches._i5}`, _37, _68);

      default:
        return switches.yldH(`l6-2-${switches._i5}`, _34, _62);
    }
  }

  function _37(switches) {
    if (switches._loop5.exit) {
      return switches.chainH(switches._loop5.exit(), _40, _62);
    } else {
      return switches.jumpH(void 0, _40, _62);
    }
  }

  function _38(switches) {
    switches._e5 = switches._ex5;

    if (switches._loop5.exit) {
      return switches.chainH(switches._loop5.exit(), _39, _62);
    } else {
      return switches.jumpRH(void 0, _39, _62);
    }
  }

  function _39(switches) {
    throw switches._e5;
  }

  function _40(switches) {
    switches._loop6 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _41, _62);
  }

  function _41(switches) {
    return switches.chainH(switches._loop6.step(), _42, _62);
  }

  function _42(switches, c) {
    var a, b;
    b = switches._loop6 = c;
    a = b.done;

    if (!a) {
      switches._i6 = switches._loop6.value;
      return switches.jumpRH(void 0, _43, _69);
    } else {
      return switches.jumpH(void 0, _48, _62);
    }
  }

  function _43(switches) {
    switch (switches._i6) {
      case 0:
        return switches.jumpRH(void 0, _41, _62);

      case 1:
      case 2:
        return switches.yldH(`l7-1-${switches._i6}`, _41, _62);

      case 3:
        return switches.jumpRH(void 0, _41, _62);

      case 4:
        return switches.yldH(`l7-2-${switches._i6}`, _41, _62);

      case 5:
        return switches.yldH(`l7-3-${switches._i6}`, _45, _69);

      case 6:
        return switches.jumpRH(void 0, _41, _62);

      case 7:
        return switches.yldH(`l7-4-${switches._i6}`, _44, _69);

      default:
        return switches.yldH(`l7-5-${switches._i6}`, _45, _69);
    }
  }

  function _44(switches) {
    if (switches._loop6.exit) {
      return switches.chainH(switches._loop6.exit(), _48, _62);
    } else {
      return switches.jumpH(void 0, _48, _62);
    }
  }

  function _45(switches) {
    return switches.yldH(`l7-6-${switches._i6}`, _41, _62);
  }

  function _46(switches) {
    switches._e6 = switches._ex6;

    if (switches._loop6.exit) {
      return switches.chainH(switches._loop6.exit(), _47, _62);
    } else {
      return switches.jumpRH(void 0, _47, _62);
    }
  }

  function _47(switches) {
    throw switches._e6;
  }

  function _48(switches) {
    switches._loop7 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _49, _62);
  }

  function _49(switches) {
    return switches.chainH(switches._loop7.step(), _50, _62);
  }

  function _50(switches, c) {
    var a, b;
    b = switches._loop7 = c;
    a = b.done;

    if (!a) {
      switches._i7 = switches._loop7.value;
      return switches.jumpRH(void 0, _51, _70);
    } else {
      return switches.pure();
    }
  }

  function _51(switches) {
    switches._loop8 = switches.iterator(gen());
    return switches.jumpRH(void 0, _52, _70);
  }

  function _52(switches) {
    if (!(switches._loop8 = switches._loop8.step()).done) {
      switches._j = switches._loop8.value;
      return switches.jumpRH(void 0, _53, _71);
    } else {
      return switches.jumpH(void 0, _49, _62);
    }
  }

  function _53(switches) {
    switch (switches._i7) {
      case 0:
      case 1:
      case 2:
        return switches.yldH(`s1:${switches._i7},${switches._j}`, _54, _71);

      case 3:
        switch (switches._j) {
          case 2:
          case 3:
            return switches.yldH(`s2:${switches._i7},${switches._j}`, _52, _70);

          case 5:
            return switches.yldH(`s3:${switches._i7},${switches._j}`, _52, _70);

          case 7:
            return switches.yldH(`s4:${switches._i7},${switches._j}`, _52, _70);

          case 8:
            return switches.yldH(`s5:${switches._i7},${switches._j}`, _52, _70);

          case 9:
            return switches.yldH(`s6:${switches._i7},${switches._j}`, _55, _71);

          default:
            return switches.jumpRH(void 0, _52, _70);
        }

      case 4:
        switch (switches._j) {
          case 2:
          case 3:
            return switches.yldH(`s7:${switches._i7},${switches._j}`, _57, _71);

          case 5:
            return switches.yldH(`s8:${switches._i7},${switches._j}`, _52, _70);

          case 6:
            if (switches._loop8.exit) {
              switches._loop8.exit();
            }

            return switches.jumpH(void 0, _49, _62);

          case 7:
            return switches.yldH(`s9:${switches._i7},${switches._j}`, _57, _71);

          case 8:
            return switches.yldH(`s10:${switches._i7},${switches._j}`, _52, _70);

          case 9:
            return switches.yldH(`s11:${switches._i7},${switches._j}`, _56, _71);

          default:
            return switches.yldH(`s12:${switches._i7},${switches._j}`, _57, _71);
        }

      case 5:
        switch (switches._j) {
          case 2:
          case 3:
            if (switches._loop8.exit) {
              switches._loop8.exit();
            }

            if (switches._loop7.exit) {
              return switches.chainH(switches._loop7.exit(), _61, _62);
            } else {
              return switches.pure();
            }

          default:
            return switches.jumpRH(void 0, _52, _70);
        }

      default:
        return switches.jumpRH(void 0, _52, _70);
    }
  }

  function _54(switches) {
    if (switches._j > 3) {
      if (switches._loop8.exit) {
        switches._loop8.exit();
      }

      return switches.jumpH(void 0, _49, _62);
    } else {
      return switches.jumpRH(void 0, _52, _70);
    }
  }

  function _55(switches) {
    if (switches._loop8.exit) {
      switches._loop8.exit();
    }

    return switches.jumpH(void 0, _49, _62);
  }

  function _56(switches) {
    if (switches._loop8.exit) {
      switches._loop8.exit();
    }

    if (switches._loop7.exit) {
      return switches.chainH(switches._loop7.exit(), _61, _62);
    } else {
      return switches.pure();
    }
  }

  function _57(switches) {
    return switches.yldH(`s13:${switches._i7},${switches._j}`, _52, _70);
  }

  function _58(switches) {
    switches._e7 = switches._ex7;

    if (switches._loop8.exit) {
      switches._loop8.exit();
    }

    throw switches._e7;
  }

  function _59(switches) {
    switches._e8 = switches._ex8;

    if (switches._loop7.exit) {
      return switches.chainH(switches._loop7.exit(), _60, _62);
    } else {
      return switches.jumpRH(void 0, _60, _62);
    }
  }

  function _60(switches) {
    throw switches._e8;
  }

  function _61(switches) {
    return switches.pure();
  }

  function _62(switches, e) {
    return switches.raise(e);
  }

  function _63(switches, a) {
    switches._ex = a;
    return switches.jumpH(void 0, _5, _62);
  }

  function _64(switches, a) {
    switches._ex1 = a;
    return switches.jumpH(void 0, _12, _62);
  }

  function _65(switches, a) {
    switches._ex2 = a;
    return switches.jumpH(void 0, _18, _62);
  }

  function _66(switches, a) {
    switches._ex3 = a;
    return switches.jumpH(void 0, _24, _62);
  }

  function _67(switches, a) {
    switches._ex4 = a;
    return switches.jumpH(void 0, _31, _62);
  }

  function _68(switches, a) {
    switches._ex5 = a;
    return switches.jumpH(void 0, _38, _62);
  }

  function _69(switches, a) {
    switches._ex6 = a;
    return switches.jumpH(void 0, _46, _62);
  }

  function _70(switches, a) {
    switches._ex8 = a;
    return switches.jumpH(void 0, _59, _62);
  }

  function _71(switches, a) {
    switches._ex7 = a;
    return switches.jumpH(void 0, _58, _70);
  }
}

function c() {
  var c = M.asyncGenerator();
  return c.scopeH(_1, _15);

  function _1(c) {
    return c.yldH(1, _2, _15);
  }

  function _2(c) {
    c._loop = c.iterator(somethng);
    return c.jumpH(void 0, _3, _15);
  }

  function _3(c) {
    if (!(c._loop = c._loop.step()).done) {
      c._i = c._loop.value;
      return c.jumpRH(void 0, _4, _16);
    } else {
      return c.pure(c._r);
    }
  }

  function _4(c) {
    c._loop1 = c.iteratorM(somethingElse);
    return c.jumpRH(void 0, _5, _16);
  }

  function _5(c) {
    return c.chainH(c._loop1.step(), _6, _16);
  }

  function _6(c, d) {
    var a, b;
    b = c._loop1 = d;
    a = b.done;

    if (!a) {
      c._j = c._loop1.value;
      return c.jumpRH(void 0, _7, _17);
    } else {
      return c.jumpH(void 0, _3, _15);
    }
  }

  function _7(c) {
    return c.yldH(c._i, _8, _17);
  }

  function _8(c, a) {
    switch (a) {
      case 1:
        if (c._loop1.exit) {
          return c.chainH(c._loop1.exit(), _9, _17);
        } else {
          return c.jumpRH(void 0, _9, _17);
        }

      case 2:
        return c.jumpRH(void 0, _11, _17);

      case 3:
        return c.jumpRH(void 0, _5, _16);

      case 5:
        if (c._loop1.exit) {
          return c.chainH(c._loop1.exit(), _3, _15);
        } else {
          return c.jumpH(void 0, _3, _15);
        }

      case 6:
        if (c._loop1.exit) {
          return c.chainH(c._loop1.exit(), _10, _17);
        } else {
          return c.jumpRH(void 0, _10, _17);
        }

      default:
        return c.jumpRH(void 0, _11, _17);
    }
  }

  function _9(c) {
    if (c._loop.exit) {
      c._loop.exit();
    }

    return c.pure(10);
  }

  function _10(c) {
    if (c._loop.exit) {
      c._loop.exit();
    }

    return c.pure(c._r);
  }

  function _11(c) {
    if (c._loop1.exit) {
      return c.chainH(c._loop1.exit(), _3, _15);
    } else {
      return c.jumpH(void 0, _3, _15);
    }
  }

  function _12(c) {
    c._e = c._ex;

    if (c._loop1.exit) {
      return c.chainH(c._loop1.exit(), _13, _16);
    } else {
      return c.jumpRH(void 0, _13, _16);
    }
  }

  function _13(c) {
    throw c._e;
  }

  function _14(c) {
    c._e1 = c._ex1;

    if (c._loop.exit) {
      c._loop.exit();
    }

    throw c._e1;
  }

  function _15(c, e) {
    return c.raise(e);
  }

  function _16(c, a) {
    c._ex1 = a;
    return c.jumpH(void 0, _14, _15);
  }

  function _17(c, a) {
    c._ex = a;
    return c.jumpH(void 0, _12, _16);
  }
}

class A {
  method() {
    var ctx = M.async();
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      return ctx.chainH(something, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
  }

  static method() {
    var ctx = M.async();
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      return ctx.chainH(somethingElse, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
  }

}

var b = new class {
  method() {
    var ctx = M.async();
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      return ctx.chainH(something, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
  }

  static m1() {
    var ctx = M.async();
    ctx._A = class A {
      m2() {
        var ctx = M.async();
        return ctx.scopeH(_1, _3);

        function _1(ctx) {
          return ctx.chainH(something, _2, _3);
        }

        function _2(ctx) {
          return ctx.pure();
        }

        function _3(ctx, e) {
          return ctx.raise(e);
        }
      }

    };
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      return ctx.chainH(somethingElse, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
  }

}();
var c = new class C {
  [getName()]() {
    var ctx = M.async();
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      return ctx.chainH(something, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
  }

  static [Symbol.iterator]() {
    var ctx = M.async();
    return ctx.scopeH(_1, _3);

    function _1(ctx) {
      return ctx.chainH(somethingElse, _2, _3);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, e) {
      return ctx.raise(e);
    }
  }

}()(i => {
  var ctx = M.async();
  ctx._i = i;
  return ctx.scopeH(_1, _3);

  function _1(ctx) {
    return ctx.chainH(ctx._i, _2, _3);
  }

  function _2(ctx, r) {
    return ctx.pure(r);
  }

  function _3(ctx, e) {
    return ctx.raise(e);
  }
})(10);

(function (i) {
  var ctx = M.async();
  ctx._i = i;
  return ctx.scopeH(_1, _3);

  function _1(ctx) {
    return ctx.chainH(ctx._i, _2, _3);
  }

  function _2(ctx, a) {
    ctx._f = a;
    return ctx.pure();
  }

  function _3(ctx, e) {
    return ctx.raise(e);
  }
})(10);

(function zz(i) {
  var _zz = M.async();

  _zz._i = i;
  return _zz.scopeH(_1, _3);

  function _1(_zz) {
    return _zz.chainH(_zz._i, _2, _3);
  }

  function _2(_zz) {
    return _zz.pure();
  }

  function _3(_zz, e) {
    return _zz.raise(e);
  }
})(10);