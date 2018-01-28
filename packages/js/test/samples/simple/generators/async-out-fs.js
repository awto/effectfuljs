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
  return ag3.scopeH(_1, _8);

  function _1(ag3) {
    ag3._loop = ag3.iteratorM(f());
    return ag3.jumpH(void 0, _2, _10);
  }

  function _2(ag3) {
    return ag3.chainH(ag3._loop.step(), _3, _10);
  }

  function _3(ag3, c) {
    var a, b, d;
    b = ag3._loop = c;
    a = b.done;

    if (!a) {
      ag3._i = ag3._loop.value;
      d = delay(ag3._i);
      return ag3.chainH(d, _4, _10);
    } else {
      ag3._fc = _7, ag3._fe = _8;
      return ag3.jumpH(void 0, _6, _8);
    }
  }

  function _4(ag3, a) {
    return ag3.yldH(a, _5, _10);
  }

  function _5(ag3) {
    return ag3.yldH(ag3._i, _2, _10);
  }

  function _6(ag3) {
    if (ag3._loop.exit) {
      return ag3.chainH(ag3._loop.exit(), ag3._fc, ag3._fe);
    } else {
      return ag3.jumpH(void 0, ag3._fc, ag3._fe);
    }
  }

  function _7(ag3) {
    return ag3.pure();
  }

  function _8(ag3, e) {
    return ag3.raise(e);
  }

  function _9(ag3) {
    return ag3.raise(ag3._err1);
  }

  function _10(ag3, a) {
    ag3._fc = _9, ag3._fe = _8, ag3._err1 = a;
    return ag3.jumpH(void 0, _6, _8);
  }
}

function switches() {
  var switches = M.asyncGenerator();
  return switches.scopeH(_1, _45);

  function _1(switches) {
    switches._loop = switches.iteratorM(gen());
    return switches.jumpH(void 0, _2, _55);
  }

  function _2(switches) {
    return switches.chainH(switches._loop.step(), _3, _55);
  }

  function _3(switches, c) {
    var a, b;
    b = switches._loop = c;
    a = b.done;

    if (!a) {
      switches._i = switches._loop.value;

      switch (switches._i) {
        case 3:
          switches._fc = _5, switches._fe = _45;
          return switches.jumpH(void 0, _4, _45);

        default:
          return switches.jumpRH(void 0, _2, _55);
      }
    } else {
      switches._fc = _5, switches._fe = _45;
      return switches.jumpH(void 0, _4, _45);
    }
  }

  function _4(switches) {
    if (switches._loop.exit) {
      return switches.chainH(switches._loop.exit(), switches._fc, switches._fe);
    } else {
      return switches.jumpH(void 0, switches._fc, switches._fe);
    }
  }

  function _5(switches) {
    switches._loop1 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _6, _56);
  }

  function _6(switches) {
    return switches.chainH(switches._loop1.step(), _7, _56);
  }

  function _7(switches, c) {
    var a, b;
    b = switches._loop1 = c;
    a = b.done;

    if (!a) {
      switches._i1 = switches._loop1.value;

      switch (switches._i1) {
        case 3:
          return switches.yldH(`l2-${switches._i1}`, _8, _56);

        default:
          return switches.jumpRH(void 0, _6, _56);
      }
    } else {
      switches._fc1 = _10, switches._fe1 = _45;
      return switches.jumpH(void 0, _9, _45);
    }
  }

  function _8(switches) {
    switches._fc1 = _10, switches._fe1 = _45;
    return switches.jumpH(void 0, _9, _45);
  }

  function _9(switches) {
    if (switches._loop1.exit) {
      return switches.chainH(switches._loop1.exit(), switches._fc1, switches._fe1);
    } else {
      return switches.jumpH(void 0, switches._fc1, switches._fe1);
    }
  }

  function _10(switches) {
    switches._loop2 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _11, _57);
  }

  function _11(switches) {
    return switches.chainH(switches._loop2.step(), _12, _57);
  }

  function _12(switches, c) {
    var a, b;
    b = switches._loop2 = c;
    a = b.done;

    if (!a) {
      switches._i2 = switches._loop2.value;

      switch (switches._i2) {
        case 3:
          switches._fc2 = _14, switches._fe2 = _45;
          return switches.jumpH(void 0, _13, _45);

        default:
          return switches.yldH(`l3-${switches._i2}`, _11, _57);
      }
    } else {
      switches._fc2 = _14, switches._fe2 = _45;
      return switches.jumpH(void 0, _13, _45);
    }
  }

  function _13(switches) {
    if (switches._loop2.exit) {
      return switches.chainH(switches._loop2.exit(), switches._fc2, switches._fe2);
    } else {
      return switches.jumpH(void 0, switches._fc2, switches._fe2);
    }
  }

  function _14(switches) {
    switches._loop3 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _15, _58);
  }

  function _15(switches) {
    return switches.chainH(switches._loop3.step(), _16, _58);
  }

  function _16(switches, c) {
    var a, b;
    b = switches._loop3 = c;
    a = b.done;

    if (!a) {
      switches._i3 = switches._loop3.value;

      switch (switches._i3) {
        case 3:
          switches._fc3 = _18, switches._fe3 = _45;
          return switches.jumpH(void 0, _17, _45);

        default:
          return switches.yldH(`l4-${switches._i3}`, _15, _58);
      }
    } else {
      switches._fc3 = _18, switches._fe3 = _45;
      return switches.jumpH(void 0, _17, _45);
    }
  }

  function _17(switches) {
    if (switches._loop3.exit) {
      return switches.chainH(switches._loop3.exit(), switches._fc3, switches._fe3);
    } else {
      return switches.jumpH(void 0, switches._fc3, switches._fe3);
    }
  }

  function _18(switches) {
    switches._loop4 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _19, _59);
  }

  function _19(switches) {
    return switches.chainH(switches._loop4.step(), _20, _59);
  }

  function _20(switches, c) {
    var a, b;
    b = switches._loop4 = c;
    a = b.done;

    if (!a) {
      switches._i4 = switches._loop4.value;
      return switches.yldH(`l5-${switches._i4}`, _21, _59);
    } else {
      switches._fc4 = _23, switches._fe4 = _45;
      return switches.jumpH(void 0, _22, _45);
    }
  }

  function _21(switches) {
    switch (switches._i4) {
      case 3:
        switches._fc4 = _23, switches._fe4 = _45;
        return switches.jumpH(void 0, _22, _45);

      default:
        return switches.jumpRH(void 0, _19, _59);
    }
  }

  function _22(switches) {
    if (switches._loop4.exit) {
      return switches.chainH(switches._loop4.exit(), switches._fc4, switches._fe4);
    } else {
      return switches.jumpH(void 0, switches._fc4, switches._fe4);
    }
  }

  function _23(switches) {
    switches._loop5 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _24, _60);
  }

  function _24(switches) {
    return switches.chainH(switches._loop5.step(), _25, _60);
  }

  function _25(switches, c) {
    var a, b;
    b = switches._loop5 = c;
    a = b.done;

    if (!a) {
      switches._i5 = switches._loop5.value;

      switch (switches._i5) {
        case 3:
          return switches.yldH(`l6-1-${switches._i5}`, _26, _60);

        default:
          return switches.yldH(`l6-2-${switches._i5}`, _24, _60);
      }
    } else {
      switches._fc5 = _28, switches._fe5 = _45;
      return switches.jumpH(void 0, _27, _45);
    }
  }

  function _26(switches) {
    switches._fc5 = _28, switches._fe5 = _45;
    return switches.jumpH(void 0, _27, _45);
  }

  function _27(switches) {
    if (switches._loop5.exit) {
      return switches.chainH(switches._loop5.exit(), switches._fc5, switches._fe5);
    } else {
      return switches.jumpH(void 0, switches._fc5, switches._fe5);
    }
  }

  function _28(switches) {
    switches._loop6 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _29, _61);
  }

  function _29(switches) {
    return switches.chainH(switches._loop6.step(), _30, _61);
  }

  function _30(switches, c) {
    var a, b;
    b = switches._loop6 = c;
    a = b.done;

    if (!a) {
      switches._i6 = switches._loop6.value;

      switch (switches._i6) {
        case 0:
          return switches.jumpRH(void 0, _29, _61);

        case 1:
        case 2:
          return switches.yldH(`l7-1-${switches._i6}`, _29, _61);

        case 3:
          return switches.jumpRH(void 0, _29, _61);

        case 4:
          return switches.yldH(`l7-2-${switches._i6}`, _29, _61);

        case 5:
          return switches.yldH(`l7-3-${switches._i6}`, _32, _61);

        case 6:
          return switches.jumpRH(void 0, _29, _61);

        case 7:
          return switches.yldH(`l7-4-${switches._i6}`, _31, _61);

        default:
          return switches.yldH(`l7-5-${switches._i6}`, _32, _61);
      }
    } else {
      switches._fc6 = _34, switches._fe6 = _45;
      return switches.jumpH(void 0, _33, _45);
    }
  }

  function _31(switches) {
    switches._fc6 = _34, switches._fe6 = _45;
    return switches.jumpH(void 0, _33, _45);
  }

  function _32(switches) {
    return switches.yldH(`l7-6-${switches._i6}`, _29, _61);
  }

  function _33(switches) {
    if (switches._loop6.exit) {
      return switches.chainH(switches._loop6.exit(), switches._fc6, switches._fe6);
    } else {
      return switches.jumpH(void 0, switches._fc6, switches._fe6);
    }
  }

  function _34(switches) {
    switches._loop7 = switches.iteratorM(gen());
    return switches.jumpH(void 0, _35, _62);
  }

  function _35(switches) {
    return switches.chainH(switches._loop7.step(), _36, _62);
  }

  function _36(switches, c) {
    var a, b;
    b = switches._loop7 = c;
    a = b.done;

    if (!a) {
      switches._i7 = switches._loop7.value;
      switches._loop8 = switches.iterator(gen());
      return switches.jumpRH(void 0, _37, _63);
    } else {
      switches._fc8 = _44, switches._fe8 = _45;
      return switches.jumpH(void 0, _43, _45);
    }
  }

  function _37(switches) {
    if (!(switches._loop8 = switches._loop8.step()).done) {
      switches._j = switches._loop8.value;

      switch (switches._i7) {
        case 0:
        case 1:
        case 2:
          return switches.yldH(`s1:${switches._i7},${switches._j}`, _38, _63);

        case 3:
          switch (switches._j) {
            case 2:
            case 3:
              return switches.yldH(`s2:${switches._i7},${switches._j}`, _37, _63);

            case 5:
              return switches.yldH(`s3:${switches._i7},${switches._j}`, _37, _63);

            case 7:
              return switches.yldH(`s4:${switches._i7},${switches._j}`, _37, _63);

            case 8:
              return switches.yldH(`s5:${switches._i7},${switches._j}`, _37, _63);

            case 9:
              return switches.yldH(`s6:${switches._i7},${switches._j}`, _39, _63);

            default:
              return switches.jumpRH(void 0, _37, _63);
          }

        case 4:
          switch (switches._j) {
            case 2:
            case 3:
              return switches.yldH(`s7:${switches._i7},${switches._j}`, _41, _63);

            case 5:
              return switches.yldH(`s8:${switches._i7},${switches._j}`, _37, _63);

            case 6:
              switches._fc7 = _35, switches._fe7 = _62;
              return switches.jumpH(void 0, _42, _62);

            case 7:
              return switches.yldH(`s9:${switches._i7},${switches._j}`, _41, _63);

            case 8:
              return switches.yldH(`s10:${switches._i7},${switches._j}`, _37, _63);

            case 9:
              return switches.yldH(`s11:${switches._i7},${switches._j}`, _40, _63);

            default:
              return switches.yldH(`s12:${switches._i7},${switches._j}`, _41, _63);
          }

        case 5:
          switch (switches._j) {
            case 2:
            case 3:
              switches._fc7 = _43, switches._fe7 = _45, switches._fc8 = _44, switches._fe8 = _45;
              return switches.jumpH(void 0, _42, _62);

            default:
              return switches.jumpRH(void 0, _37, _63);
          }

        default:
          return switches.jumpRH(void 0, _37, _63);
      }
    } else {
      switches._fc7 = _35, switches._fe7 = _62;
      return switches.jumpH(void 0, _42, _62);
    }
  }

  function _38(switches) {
    if (switches._j > 3) {
      switches._fc7 = _35, switches._fe7 = _62;
      return switches.jumpH(void 0, _42, _62);
    } else {
      return switches.jumpRH(void 0, _37, _63);
    }
  }

  function _39(switches) {
    switches._fc7 = _35, switches._fe7 = _62;
    return switches.jumpH(void 0, _42, _62);
  }

  function _40(switches) {
    switches._fc7 = _43, switches._fe7 = _45, switches._fc8 = _44, switches._fe8 = _45;
    return switches.jumpH(void 0, _42, _62);
  }

  function _41(switches) {
    return switches.yldH(`s13:${switches._i7},${switches._j}`, _37, _63);
  }

  function _42(switches) {
    if (switches._loop8.exit) {
      switches._loop8.exit();
    }

    switches._err8 = switches._err9;
    return switches.jumpH(void 0, switches._fc7, switches._fe7);
  }

  function _43(switches) {
    if (switches._loop7.exit) {
      return switches.chainH(switches._loop7.exit(), switches._fc8, switches._fe8);
    } else {
      return switches.jumpH(void 0, switches._fc8, switches._fe8);
    }
  }

  function _44(switches) {
    return switches.pure();
  }

  function _45(switches, e) {
    return switches.raise(e);
  }

  function _46(switches) {
    return switches.raise(switches._err1);
  }

  function _47(switches) {
    return switches.raise(switches._err2);
  }

  function _48(switches) {
    return switches.raise(switches._err3);
  }

  function _49(switches) {
    return switches.raise(switches._err4);
  }

  function _50(switches) {
    return switches.raise(switches._err5);
  }

  function _51(switches) {
    return switches.raise(switches._err6);
  }

  function _52(switches) {
    return switches.raise(switches._err7);
  }

  function _53(switches) {
    return switches.raise(switches._err8);
  }

  function _54(switches) {
    return switches.raise(switches._err9);
  }

  function _55(switches, a) {
    switches._fc = _46, switches._fe = _45, switches._err1 = a;
    return switches.jumpH(void 0, _4, _45);
  }

  function _56(switches, a) {
    switches._fc1 = _47, switches._fe1 = _45, switches._err2 = a;
    return switches.jumpH(void 0, _9, _45);
  }

  function _57(switches, a) {
    switches._fc2 = _48, switches._fe2 = _45, switches._err3 = a;
    return switches.jumpH(void 0, _13, _45);
  }

  function _58(switches, a) {
    switches._fc3 = _49, switches._fe3 = _45, switches._err4 = a;
    return switches.jumpH(void 0, _17, _45);
  }

  function _59(switches, a) {
    switches._fc4 = _50, switches._fe4 = _45, switches._err5 = a;
    return switches.jumpH(void 0, _22, _45);
  }

  function _60(switches, a) {
    switches._fc5 = _51, switches._fe5 = _45, switches._err6 = a;
    return switches.jumpH(void 0, _27, _45);
  }

  function _61(switches, a) {
    switches._fc6 = _52, switches._fe6 = _45, switches._err7 = a;
    return switches.jumpH(void 0, _33, _45);
  }

  function _62(switches, a) {
    switches._fc8 = _53, switches._fe8 = _45, switches._err8 = a;
    return switches.jumpH(void 0, _43, _45);
  }

  function _63(switches, a) {
    switches._fc7 = _43, switches._fe7 = _45, switches._fc8 = _54, switches._fe8 = _45, switches._err9 = a;
    return switches.jumpH(void 0, _42, _62);
  }
}

function c() {
  var c = M.asyncGenerator();
  return c.scopeH(_1, _11);

  function _1(c) {
    return c.yldH(1, _2, _11);
  }

  function _2(c) {
    c._loop = c.iterator(somethng);
    return c.jumpH(void 0, _3, _14);
  }

  function _3(c) {
    if (!(c._loop = c._loop.step()).done) {
      c._i = c._loop.value;
      c._loop1 = c.iteratorM(somethingElse);
      return c.jumpRH(void 0, _4, _15);
    } else {
      c._fc1 = _10, c._fe1 = _11;
      return c.jumpH(void 0, _9, _11);
    }
  }

  function _4(c) {
    return c.chainH(c._loop1.step(), _5, _15);
  }

  function _5(c, d) {
    var a, b;
    b = c._loop1 = d;
    a = b.done;

    if (!a) {
      c._j = c._loop1.value;
      return c.yldH(c._i, _6, _15);
    } else {
      c._fc = _3, c._fe = _14;
      return c.jumpH(void 0, _8, _14);
    }
  }

  function _6(c, a) {
    switch (a) {
      case 1:
        c._fc = _9, c._fe = _11, c._fc1 = _10, c._fe1 = _11, c._r = 10;
        return c.jumpH(void 0, _8, _14);

      case 2:
        return c.jumpRH(void 0, _7, _15);

      case 3:
        return c.jumpRH(void 0, _4, _15);

      case 5:
        c._fc = _3, c._fe = _14;
        return c.jumpH(void 0, _8, _14);

      case 6:
        c._fc = _9, c._fe = _11, c._fc1 = _10, c._fe1 = _11;
        return c.jumpH(void 0, _8, _14);

      default:
        return c.jumpRH(void 0, _7, _15);
    }
  }

  function _7(c) {
    c._fc = _3, c._fe = _14;
    return c.jumpH(void 0, _8, _14);
  }

  function _8(c) {
    if (c._loop1.exit) {
      c._err1 = c._err2;
      return c.chainH(c._loop1.exit(), c._fc, c._fe);
    } else {
      c._err1 = c._err2;
      return c.jumpH(void 0, c._fc, c._fe);
    }
  }

  function _9(c) {
    if (c._loop.exit) {
      c._loop.exit();
    }

    return c.jumpH(void 0, c._fc1, c._fe1);
  }

  function _10(c) {
    return c.pure(c._r);
  }

  function _11(c, e) {
    return c.raise(e);
  }

  function _12(c) {
    return c.raise(c._err1);
  }

  function _13(c) {
    return c.raise(c._err2);
  }

  function _14(c, a) {
    c._fc1 = _12, c._fe1 = _11, c._err1 = a;
    return c.jumpH(void 0, _9, _11);
  }

  function _15(c, a) {
    c._fc = _9, c._fe = _11, c._fc1 = _13, c._fe1 = _11, c._err2 = a;
    return c.jumpH(void 0, _8, _14);
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