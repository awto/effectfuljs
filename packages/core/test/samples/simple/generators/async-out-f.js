import * as M from "@effectful/core";

function a1() {
  var a1 = M.context();
  return a1.scope(_1);

  function _1(a1) {
    return a1.pure();
  }

  function _2(a1, r) {
    return a1.pure(r);
  }
}

function a2() {
  var a2 = M.context();
  return a2.scope(_1);

  function _1(a2) {
    var a;
    a = delay(1);
    return a2.chain(a, _2);
  }

  function _2(a2) {
    return a2.pure();
  }

  function _3(a2, r) {
    return a2.pure(r);
  }
}

function a3() {
  var a3 = M.context();
  return a3.scope(_1);

  function _1(a3) {
    var a;
    a = delay(1);
    return a3.chain(a, _2);
  }

  function _2(a3, a) {
    return a3.pure(a);
  }

  function _3(a3, r) {
    return a3.pure(r);
  }
}

function g2() {
  var g2 = M.context();
  return g2.scope(_1);

  function _1(g2) {
    var a;
    a = delay(1);
    return g2.yldStar(a, _2);
  }

  function _2(g2) {
    return g2.pure();
  }

  function _3(g2, r) {
    return g2.pure(r);
  }
}

function g3() {
  var g3 = M.context();
  return g3.scope(_1);

  function _1(g3) {
    var a;
    a = delay(1);
    return g3.yldStar(a, _2);
  }

  function _2(g3, a) {
    return g3.pure(a);
  }

  function _3(g3, r) {
    return g3.pure(r);
  }
}

function a4() {
  var a4 = M.context();
  return a4.scope(_1);

  function _1(a4) {
    var a;
    a = delay(1);
    return a4.chain(a, _2);
  }

  function _2(a4, a) {
    return a4.chain(a, _3);
  }

  function _3(a4) {
    return a4.pure();
  }

  function _4(a4, r) {
    return a4.pure(r);
  }
}

function a5() {
  var a5 = M.context();
  return a5.scope(_1);

  function _1(a5) {
    var a;
    a = delay(1);
    return a5.chain(a, _2);
  }

  function _2(a5, a) {
    return a5.chain(a, _3);
  }

  function _3(a5, a) {
    return a5.chain(a, _4);
  }

  function _4(a5) {
    return a5.pure();
  }

  function _5(a5, r) {
    return a5.pure(r);
  }
}

function ag1() {
  var ag1 = M.context();
  return ag1.scope(_1);

  function _1(ag1) {
    return ag1.yld(1, _2);
  }

  function _2(ag1) {
    return ag1.pure();
  }

  function _3(ag1, r) {
    return ag1.pure(r);
  }
}

function ag2() {
  var ag2 = M.context();
  return ag2.scope(_1);

  function _1(ag2) {
    var a;
    a = delay(1);
    return ag2.chain(a, _2);
  }

  function _2(ag2, a) {
    return ag2.yld(a, _3);
  }

  function _3(ag2) {
    var a;
    a = delay(2);
    return ag2.chain(a, _4);
  }

  function _4(ag2, a) {
    return ag2.yld(a, _5);
  }

  function _5(ag2) {
    var a;
    a = delay(3);
    return ag2.chain(a, _6);
  }

  function _6(ag2, a) {
    return ag2.yld(a, _7);
  }

  function _7(ag2) {
    return ag2.pure();
  }

  function _8(ag2, r) {
    return ag2.pure(r);
  }
}

function ag3() {
  var ag3 = M.context();
  return ag3.scope(_1);

  function _1(ag3) {
    ag3._loop = ag3.iteratorM(f());
    return ag3.jump(void 0, _2, _11);
  }

  function _2(ag3) {
    return ag3.chain(ag3._loop.step(), _3, _11);
  }

  function _3(ag3, c) {
    var a, b, d;
    b = ag3._loop = c;
    a = b.done;

    if (!a) {
      ag3._i = ag3._loop.value;
      d = delay(ag3._i);
      return ag3.chain(d, _4, _11);
    } else {
      ag3._fc = _7, ag3._fe = _9;
      return ag3.jump(void 0, _6);
    }
  }

  function _4(ag3, a) {
    return ag3.yld(a, _5, _11);
  }

  function _5(ag3) {
    return ag3.yld(ag3._i, _2, _11);
  }

  function _6(ag3) {
    if (ag3._loop.exit) {
      return ag3.chain(ag3._loop.exit(), ag3._fc, ag3._fe);
    } else {
      return ag3.jump(void 0, ag3._fc, ag3._fe);
    }
  }

  function _7(ag3) {
    return ag3.pure();
  }

  function _8(ag3, r) {
    return ag3.pure(r);
  }

  function _9(ag3, e) {
    return ag3.raise(e);
  }

  function _10(ag3) {
    return ag3.raise(ag3._err1);
  }

  function _11(ag3, a) {
    ag3._fc = _10, ag3._fe = _9, ag3._err1 = a;
    return ag3.jump(void 0, _6);
  }
}

function switches() {
  var switches = M.context();
  return switches.scope(_1);

  function _1(switches) {
    switches._loop = switches.iteratorM(gen());
    return switches.jump(void 0, _2, _56);
  }

  function _2(switches) {
    return switches.chain(switches._loop.step(), _3, _56);
  }

  function _3(switches, c) {
    var a, b;
    b = switches._loop = c;
    a = b.done;

    if (!a) {
      switches._i = switches._loop.value;

      switch (switches._i) {
        case 3:
          switches._fc = _5, switches._fe = _46;
          return switches.jump(void 0, _4);

        default:
          return switches.jump(void 0, _2, _56);
      }
    } else {
      switches._fc = _5, switches._fe = _46;
      return switches.jump(void 0, _4);
    }
  }

  function _4(switches) {
    if (switches._loop.exit) {
      return switches.chain(switches._loop.exit(), switches._fc, switches._fe);
    } else {
      return switches.jump(void 0, switches._fc, switches._fe);
    }
  }

  function _5(switches) {
    switches._loop1 = switches.iteratorM(gen());
    return switches.jump(void 0, _6, _57);
  }

  function _6(switches) {
    return switches.chain(switches._loop1.step(), _7, _57);
  }

  function _7(switches, c) {
    var a, b;
    b = switches._loop1 = c;
    a = b.done;

    if (!a) {
      switches._i1 = switches._loop1.value;

      switch (switches._i1) {
        case 3:
          return switches.yld(`l2-${switches._i1}`, _8, _57);

        default:
          return switches.jump(void 0, _6, _57);
      }
    } else {
      switches._fc1 = _10, switches._fe1 = _46;
      return switches.jump(void 0, _9);
    }
  }

  function _8(switches) {
    switches._fc1 = _10, switches._fe1 = _46;
    return switches.jump(void 0, _9);
  }

  function _9(switches) {
    if (switches._loop1.exit) {
      return switches.chain(switches._loop1.exit(), switches._fc1, switches._fe1);
    } else {
      return switches.jump(void 0, switches._fc1, switches._fe1);
    }
  }

  function _10(switches) {
    switches._loop2 = switches.iteratorM(gen());
    return switches.jump(void 0, _11, _58);
  }

  function _11(switches) {
    return switches.chain(switches._loop2.step(), _12, _58);
  }

  function _12(switches, c) {
    var a, b;
    b = switches._loop2 = c;
    a = b.done;

    if (!a) {
      switches._i2 = switches._loop2.value;

      switch (switches._i2) {
        case 3:
          switches._fc2 = _14, switches._fe2 = _46;
          return switches.jump(void 0, _13);

        default:
          return switches.yld(`l3-${switches._i2}`, _11, _58);
      }
    } else {
      switches._fc2 = _14, switches._fe2 = _46;
      return switches.jump(void 0, _13);
    }
  }

  function _13(switches) {
    if (switches._loop2.exit) {
      return switches.chain(switches._loop2.exit(), switches._fc2, switches._fe2);
    } else {
      return switches.jump(void 0, switches._fc2, switches._fe2);
    }
  }

  function _14(switches) {
    switches._loop3 = switches.iteratorM(gen());
    return switches.jump(void 0, _15, _59);
  }

  function _15(switches) {
    return switches.chain(switches._loop3.step(), _16, _59);
  }

  function _16(switches, c) {
    var a, b;
    b = switches._loop3 = c;
    a = b.done;

    if (!a) {
      switches._i3 = switches._loop3.value;

      switch (switches._i3) {
        case 3:
          switches._fc3 = _18, switches._fe3 = _46;
          return switches.jump(void 0, _17);

        default:
          return switches.yld(`l4-${switches._i3}`, _15, _59);
      }
    } else {
      switches._fc3 = _18, switches._fe3 = _46;
      return switches.jump(void 0, _17);
    }
  }

  function _17(switches) {
    if (switches._loop3.exit) {
      return switches.chain(switches._loop3.exit(), switches._fc3, switches._fe3);
    } else {
      return switches.jump(void 0, switches._fc3, switches._fe3);
    }
  }

  function _18(switches) {
    switches._loop4 = switches.iteratorM(gen());
    return switches.jump(void 0, _19, _60);
  }

  function _19(switches) {
    return switches.chain(switches._loop4.step(), _20, _60);
  }

  function _20(switches, c) {
    var a, b;
    b = switches._loop4 = c;
    a = b.done;

    if (!a) {
      switches._i4 = switches._loop4.value;
      return switches.yld(`l5-${switches._i4}`, _21, _60);
    } else {
      switches._fc4 = _23, switches._fe4 = _46;
      return switches.jump(void 0, _22);
    }
  }

  function _21(switches) {
    switch (switches._i4) {
      case 3:
        switches._fc4 = _23, switches._fe4 = _46;
        return switches.jump(void 0, _22);

      default:
        return switches.jump(void 0, _19, _60);
    }
  }

  function _22(switches) {
    if (switches._loop4.exit) {
      return switches.chain(switches._loop4.exit(), switches._fc4, switches._fe4);
    } else {
      return switches.jump(void 0, switches._fc4, switches._fe4);
    }
  }

  function _23(switches) {
    switches._loop5 = switches.iteratorM(gen());
    return switches.jump(void 0, _24, _61);
  }

  function _24(switches) {
    return switches.chain(switches._loop5.step(), _25, _61);
  }

  function _25(switches, c) {
    var a, b;
    b = switches._loop5 = c;
    a = b.done;

    if (!a) {
      switches._i5 = switches._loop5.value;

      switch (switches._i5) {
        case 3:
          return switches.yld(`l6-1-${switches._i5}`, _26, _61);

        default:
          return switches.yld(`l6-2-${switches._i5}`, _24, _61);
      }
    } else {
      switches._fc5 = _28, switches._fe5 = _46;
      return switches.jump(void 0, _27);
    }
  }

  function _26(switches) {
    switches._fc5 = _28, switches._fe5 = _46;
    return switches.jump(void 0, _27);
  }

  function _27(switches) {
    if (switches._loop5.exit) {
      return switches.chain(switches._loop5.exit(), switches._fc5, switches._fe5);
    } else {
      return switches.jump(void 0, switches._fc5, switches._fe5);
    }
  }

  function _28(switches) {
    switches._loop6 = switches.iteratorM(gen());
    return switches.jump(void 0, _29, _62);
  }

  function _29(switches) {
    return switches.chain(switches._loop6.step(), _30, _62);
  }

  function _30(switches, c) {
    var a, b;
    b = switches._loop6 = c;
    a = b.done;

    if (!a) {
      switches._i6 = switches._loop6.value;

      switch (switches._i6) {
        case 0:
          return switches.jump(void 0, _29, _62);

        case 1:
        case 2:
          return switches.yld(`l7-1-${switches._i6}`, _29, _62);

        case 3:
          return switches.jump(void 0, _29, _62);

        case 4:
          return switches.yld(`l7-2-${switches._i6}`, _29, _62);

        case 5:
          return switches.yld(`l7-3-${switches._i6}`, _32, _62);

        case 6:
          return switches.jump(void 0, _29, _62);

        case 7:
          return switches.yld(`l7-4-${switches._i6}`, _31, _62);

        default:
          return switches.yld(`l7-5-${switches._i6}`, _32, _62);
      }
    } else {
      switches._fc6 = _34, switches._fe6 = _46;
      return switches.jump(void 0, _33);
    }
  }

  function _31(switches) {
    switches._fc6 = _34, switches._fe6 = _46;
    return switches.jump(void 0, _33);
  }

  function _32(switches) {
    return switches.yld(`l7-6-${switches._i6}`, _29, _62);
  }

  function _33(switches) {
    if (switches._loop6.exit) {
      return switches.chain(switches._loop6.exit(), switches._fc6, switches._fe6);
    } else {
      return switches.jump(void 0, switches._fc6, switches._fe6);
    }
  }

  function _34(switches) {
    switches._loop7 = switches.iteratorM(gen());
    return switches.jump(void 0, _35, _63);
  }

  function _35(switches) {
    return switches.chain(switches._loop7.step(), _36, _63);
  }

  function _36(switches, c) {
    var a, b;
    b = switches._loop7 = c;
    a = b.done;

    if (!a) {
      switches._i7 = switches._loop7.value;
      switches._loop8 = switches.iterator(gen());
      return switches.jump(void 0, _37, _64);
    } else {
      switches._fc8 = _44, switches._fe8 = _46;
      return switches.jump(void 0, _43);
    }
  }

  function _37(switches) {
    if (!(switches._loop8 = switches._loop8.step()).done) {
      switches._j = switches._loop8.value;

      switch (switches._i7) {
        case 0:
        case 1:
        case 2:
          return switches.yld(`s1:${switches._i7},${switches._j}`, _38, _64);

        case 3:
          switch (switches._j) {
            case 2:
            case 3:
              return switches.yld(`s2:${switches._i7},${switches._j}`, _37, _64);

            case 5:
              return switches.yld(`s3:${switches._i7},${switches._j}`, _37, _64);

            case 7:
              return switches.yld(`s4:${switches._i7},${switches._j}`, _37, _64);

            case 8:
              return switches.yld(`s5:${switches._i7},${switches._j}`, _37, _64);

            case 9:
              return switches.yld(`s6:${switches._i7},${switches._j}`, _39, _64);

            default:
              return switches.jump(void 0, _37, _64);
          }

        case 4:
          switch (switches._j) {
            case 2:
            case 3:
              return switches.yld(`s7:${switches._i7},${switches._j}`, _41, _64);

            case 5:
              return switches.yld(`s8:${switches._i7},${switches._j}`, _37, _64);

            case 6:
              switches._fc7 = _35, switches._fe7 = _63;
              return switches.jump(void 0, _42, _65);

            case 7:
              return switches.yld(`s9:${switches._i7},${switches._j}`, _41, _64);

            case 8:
              return switches.yld(`s10:${switches._i7},${switches._j}`, _37, _64);

            case 9:
              return switches.yld(`s11:${switches._i7},${switches._j}`, _40, _64);

            default:
              return switches.yld(`s12:${switches._i7},${switches._j}`, _41, _64);
          }

        case 5:
          switch (switches._j) {
            case 2:
            case 3:
              switches._fc7 = _43, switches._fe7 = _46, switches._fc8 = _44, switches._fe8 = _46;
              return switches.jump(void 0, _42, _65);

            default:
              return switches.jump(void 0, _37, _64);
          }

        default:
          return switches.jump(void 0, _37, _64);
      }
    } else {
      switches._fc7 = _35, switches._fe7 = _63;
      return switches.jump(void 0, _42, _65);
    }
  }

  function _38(switches) {
    if (switches._j > 3) {
      switches._fc7 = _35, switches._fe7 = _63;
      return switches.jump(void 0, _42, _65);
    } else {
      return switches.jump(void 0, _37, _64);
    }
  }

  function _39(switches) {
    switches._fc7 = _35, switches._fe7 = _63;
    return switches.jump(void 0, _42, _65);
  }

  function _40(switches) {
    switches._fc7 = _43, switches._fe7 = _46, switches._fc8 = _44, switches._fe8 = _46;
    return switches.jump(void 0, _42, _65);
  }

  function _41(switches) {
    return switches.yld(`s13:${switches._i7},${switches._j}`, _37, _64);
  }

  function _42(switches) {
    if (switches._loop8.exit) {
      switches._loop8.exit();
    }

    switches._err8 = switches._err9;
    return switches.jump(void 0, switches._fc7, switches._fe7);
  }

  function _43(switches) {
    if (switches._loop7.exit) {
      return switches.chain(switches._loop7.exit(), switches._fc8, switches._fe8);
    } else {
      return switches.jump(void 0, switches._fc8, switches._fe8);
    }
  }

  function _44(switches) {
    return switches.pure();
  }

  function _45(switches, r) {
    return switches.pure(r);
  }

  function _46(switches, e) {
    return switches.raise(e);
  }

  function _47(switches) {
    return switches.raise(switches._err1);
  }

  function _48(switches) {
    return switches.raise(switches._err2);
  }

  function _49(switches) {
    return switches.raise(switches._err3);
  }

  function _50(switches) {
    return switches.raise(switches._err4);
  }

  function _51(switches) {
    return switches.raise(switches._err5);
  }

  function _52(switches) {
    return switches.raise(switches._err6);
  }

  function _53(switches) {
    return switches.raise(switches._err7);
  }

  function _54(switches) {
    return switches.raise(switches._err8);
  }

  function _55(switches) {
    return switches.raise(switches._err9);
  }

  function _56(switches, a) {
    switches._fc = _47, switches._fe = _46, switches._err1 = a;
    return switches.jump(void 0, _4);
  }

  function _57(switches, a) {
    switches._fc1 = _48, switches._fe1 = _46, switches._err2 = a;
    return switches.jump(void 0, _9);
  }

  function _58(switches, a) {
    switches._fc2 = _49, switches._fe2 = _46, switches._err3 = a;
    return switches.jump(void 0, _13);
  }

  function _59(switches, a) {
    switches._fc3 = _50, switches._fe3 = _46, switches._err4 = a;
    return switches.jump(void 0, _17);
  }

  function _60(switches, a) {
    switches._fc4 = _51, switches._fe4 = _46, switches._err5 = a;
    return switches.jump(void 0, _22);
  }

  function _61(switches, a) {
    switches._fc5 = _52, switches._fe5 = _46, switches._err6 = a;
    return switches.jump(void 0, _27);
  }

  function _62(switches, a) {
    switches._fc6 = _53, switches._fe6 = _46, switches._err7 = a;
    return switches.jump(void 0, _33);
  }

  function _63(switches, a) {
    switches._fc8 = _54, switches._fe8 = _46, switches._err8 = a;
    return switches.jump(void 0, _43);
  }

  function _64(switches, a) {
    switches._fc7 = _43, switches._fe7 = _46, switches._fc8 = _55, switches._fe8 = _46, switches._err9 = a;
    return switches.jump(void 0, _42, _65);
  }

  function _65(switches, a) {
    switches._fc8 = _54, switches._fe8 = _46, switches._err8 = a;
    return switches.jump(void 0, _43);
  }
}

function c() {
  var c = M.context();
  return c.scope(_1);

  function _1(c) {
    return c.yld(1, _2);
  }

  function _2(c) {
    c._loop = c.iterator(somethng);
    return c.jump(void 0, _3, _16);
  }

  function _3(c) {
    if (!(c._loop = c._loop.step()).done) {
      c._i = c._loop.value;
      c._loop1 = c.iteratorM(somethingElse);
      return c.jump(void 0, _4, _17);
    } else {
      c._fc1 = _10, c._fe1 = _12;
      return c.jump(void 0, _9);
    }
  }

  function _4(c) {
    return c.chain(c._loop1.step(), _5, _17);
  }

  function _5(c, d) {
    var j, a, b;
    b = c._loop1 = d;
    a = b.done;

    if (!a) {
      j = c._loop1.value;
      return c.yld(c._i, _6, _17);
    } else {
      c._fc = _3, c._fe = _16;
      return c.jump(void 0, _8, _18);
    }
  }

  function _6(c, a) {
    switch (a) {
      case 1:
        c._fc = _9, c._fe = _12, c._fc1 = _13, c._fe1 = _12, c._r = 10;
        return c.jump(void 0, _8, _18);

      case 2:
        return c.jump(void 0, _7, _17);

      case 3:
        return c.jump(void 0, _4, _17);

      case 5:
        c._fc = _3, c._fe = _16;
        return c.jump(void 0, _8, _18);

      case 6:
        c._fc = _9, c._fe = _12, c._fc1 = _10, c._fe1 = _12;
        return c.jump(void 0, _8, _18);

      default:
        return c.jump(void 0, _7, _17);
    }
  }

  function _7(c) {
    c._fc = _3, c._fe = _16;
    return c.jump(void 0, _8, _18);
  }

  function _8(c) {
    if (c._loop1.exit) {
      c._err1 = c._err2;
      return c.chain(c._loop1.exit(), c._fc, c._fe);
    } else {
      c._err1 = c._err2;
      return c.jump(void 0, c._fc, c._fe);
    }
  }

  function _9(c) {
    if (c._loop.exit) {
      c._loop.exit();
    }

    return c.jump(void 0, c._fc1, c._fe1);
  }

  function _10(c) {
    return c.pure();
  }

  function _11(c, r) {
    return c.pure(r);
  }

  function _12(c, e) {
    return c.raise(e);
  }

  function _13(c) {
    return c.jump(c._r, _11);
  }

  function _14(c) {
    return c.raise(c._err1);
  }

  function _15(c) {
    return c.raise(c._err2);
  }

  function _16(c, a) {
    c._fc1 = _14, c._fe1 = _12, c._err1 = a;
    return c.jump(void 0, _9);
  }

  function _17(c, a) {
    c._fc = _9, c._fe = _12, c._fc1 = _15, c._fe1 = _12, c._err2 = a;
    return c.jump(void 0, _8, _18);
  }

  function _18(c, a) {
    c._fc1 = _14, c._fe1 = _12, c._err1 = a;
    return c.jump(void 0, _9);
  }
}

class A {
  method() {
    var ctx = M.context();
    return ctx.scope(_1);

    function _1(ctx) {
      return ctx.chain(something, _2);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, r) {
      return ctx.pure(r);
    }
  }

  static method() {
    var ctx = M.context();
    return ctx.scope(_1);

    function _1(ctx) {
      return ctx.chain(somethingElse, _2);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, r) {
      return ctx.pure(r);
    }
  }

}

var b = new class {
  method() {
    var ctx = M.context();
    return ctx.scope(_1);

    function _1(ctx) {
      return ctx.chain(something, _2);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, r) {
      return ctx.pure(r);
    }
  }

  static m1() {
    var ctx = M.context();
    ctx._A = class A {
      m2() {
        var ctx = M.context();
        return ctx.scope(_1);

        function _1(ctx) {
          return ctx.chain(something, _2);
        }

        function _2(ctx) {
          return ctx.pure();
        }

        function _3(ctx, r) {
          return ctx.pure(r);
        }
      }

    };
    return ctx.scope(_1);

    function _1(ctx) {
      return ctx.chain(somethingElse, _2);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, r) {
      return ctx.pure(r);
    }
  }

}();
var c1 = new class C {
  [getName()]() {
    var ctx = M.context();
    return ctx.scope(_1);

    function _1(ctx) {
      return ctx.chain(something, _2);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, r) {
      return ctx.pure(r);
    }
  }

  static [Symbol.iterator]() {
    var ctx = M.context();
    return ctx.scope(_1);

    function _1(ctx) {
      return ctx.chain(somethingElse, _2);
    }

    function _2(ctx) {
      return ctx.pure();
    }

    function _3(ctx, r) {
      return ctx.pure(r);
    }
  }

}()(i => {
  var ctx = M.context();
  ctx._i = i;
  return ctx.scope(_1);

  function _1(ctx) {
    return ctx.chain(ctx._i, _2);
  }

  function _2(ctx, a) {
    return ctx.pure(a);
  }

  function _3(ctx, r) {
    return ctx.pure(r);
  }
})(10);

(function (i) {
  var ctx = M.context();
  ctx._i = i;
  return ctx.scope(_1);

  function _1(ctx) {
    return ctx.chain(ctx._i, _2);
  }

  function _2(ctx, a) {
    var f;
    f = a;
    return ctx.pure();
  }

  function _3(ctx, r) {
    return ctx.pure(r);
  }
})(10);

(function zz(i) {
  var _zz = M.context();

  _zz._i = i;
  return _zz.scope(_1);

  function _1(_zz) {
    return _zz.chain(_zz._i, _2);
  }

  function _2(_zz) {
    return _zz.pure();
  }

  function _3(_zz, r) {
    return _zz.pure(r);
  }
})(10);