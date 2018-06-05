import * as M from "@effectful/core";

function a1() {
  var a1 = M.context();
  return a1.scope(a1_1);
}

function a2() {
  var a2 = M.context();
  return a2.scope(a2_1);
}

function a3() {
  var a3 = M.context();
  return a3.scope(a3_1);
}

function g2() {
  var g2 = M.context();
  return g2.scope(g2_1);
}

function g3() {
  var g3 = M.context();
  return g3.scope(g3_1);
}

function a4() {
  var a4 = M.context();
  return a4.scope(a4_1);
}

function a5() {
  var a5 = M.context();
  return a5.scope(a5_1);
}

function ag1() {
  var ag1 = M.context();
  return ag1.scope(ag1_1);
}

function ag2() {
  var ag2 = M.context();
  return ag2.scope(ag2_1);
}

function ag3() {
  var ag3 = M.context();
  return ag3.scope(ag3_1);
}

function switches() {
  var switches = M.context();
  return switches.scope(switches_1);
}

function c() {
  var c = M.context();
  return c.scope(c_1);
}

class A {
  method() {
    var ctx = M.context();
    return ctx.scope(method_1);
  }

  static method() {
    var ctx = M.context();
    return ctx.scope(_method_1);
  }

}

var b = new class {
  method() {
    var ctx = M.context();
    return ctx.scope(method_11);
  }

  static m1() {
    var ctx = M.context();
    ctx._A = class A {
      m2() {
        var ctx = M.context();
        return ctx.scope(m2_1);
      }

    };
    return ctx.scope(m1_1);
  }

}();
var c = new class C {
  [getName()]() {
    var ctx = M.context();
    return ctx.scope(f_1);
  }

  static [Symbol.iterator]() {
    var ctx = M.context();
    return ctx.scope(_f_1);
  }

}()(i => {
  var ctx = M.context();
  ctx._i = i;
  return ctx.scope(f_11);
})(10);

(function (i) {
  var ctx = M.context();
  ctx._i = i;
  return ctx.scope(f_12);
})(10);

(function zz(i) {
  var _zz = M.context();

  _zz._i = i;
  return _zz.scope(zz_1);
})(10);

function a1_1(a1) {
  return a1.pure();
}

function a2_1(a2) {
  var a;
  a = delay(1);
  return a2.chain(a, a2_2);
}

function a2_2(a2) {
  return a2.pure();
}

function a3_1(a3) {
  var a;
  a = delay(1);
  return a;
}

function g2_1(g2) {
  var a;
  a = delay(1);
  return g2.yldStar(a, g2_2);
}

function g2_2(g2) {
  return g2.pure();
}

function g3_1(g3) {
  var a;
  a = delay(1);
  return a;
}

function a4_1(a4) {
  var a;
  a = delay(1);
  return a4.chain(a, a4_2);
}

function a4_2(a4, a) {
  return a4.chain(a, a4_3);
}

function a4_3(a4) {
  return a4.pure();
}

function a5_1(a5) {
  var a;
  a = delay(1);
  return a5.chain(a, a5_2);
}

function a5_2(a5, a) {
  return a5.chain(a, a5_3);
}

function a5_3(a5, a) {
  return a5.chain(a, a5_4);
}

function a5_4(a5) {
  return a5.pure();
}

function ag1_1(ag1) {
  return ag1.yld(1, ag1_2);
}

function ag1_2(ag1) {
  return ag1.pure();
}

function ag2_1(ag2) {
  var a;
  a = delay(1);
  return ag2.chain(a, ag2_2);
}

function ag2_2(ag2, a) {
  return ag2.yld(a, ag2_3);
}

function ag2_3(ag2) {
  var a;
  a = delay(2);
  return ag2.chain(a, ag2_4);
}

function ag2_4(ag2, a) {
  return ag2.yld(a, ag2_5);
}

function ag2_5(ag2) {
  var a;
  a = delay(3);
  return ag2.chain(a, ag2_6);
}

function ag2_6(ag2, a) {
  return ag2.yld(a, ag2_7);
}

function ag2_7(ag2) {
  return ag2.pure();
}

function ag3_1(ag3) {
  ag3._loop = ag3.iteratorM(f());
  return ag3.jump(void 0, ag3_2, ag3_10);
}

function ag3_2(ag3) {
  var a;
  a = ag3._loop, ag3._loop = null;
  return ag3.chain(a.step(), ag3_3, ag3_10);
}

function ag3_3(ag3, c) {
  var a, b, d;
  b = ag3._loop = c;
  a = b.done;

  if (!a) {
    ag3._i = ag3._loop.value;
    d = delay(ag3._i);
    return ag3.chain(d, ag3_4, ag3_10);
  } else {
    ag3._fc = ag3_7, ag3._fe = ag3_8, ag3._i = null;
    return ag3.jump(void 0, ag3_6);
  }
}

function ag3_4(ag3, a) {
  return ag3.yld(a, ag3_5, ag3_10);
}

function ag3_5(ag3) {
  var a;
  a = ag3._i, ag3._i = null;
  return ag3.yld(a, ag3_2, ag3_10);
}

function ag3_6(ag3) {
  var a, b, c;

  if (ag3._loop.exit) {
    a = ag3._loop, b = ag3._fc, c = ag3._fe, ag3._loop = null, ag3._fc = null, ag3._fe = null;
    return ag3.chain(a.exit(), b, c);
  } else {
    a = ag3._fc, b = ag3._fe, ag3._loop = null, ag3._fc = null, ag3._fe = null;
    return ag3.jump(void 0, a, b);
  }
}

function ag3_7(ag3) {
  return ag3.pure();
}

function ag3_8(ag3, e) {
  return ag3.raise(e);
}

function ag3_9(ag3) {
  return ag3.raise(ag3._err1);
}

function ag3_10(ag3, a) {
  ag3._fc = ag3_9, ag3._fe = ag3_8, ag3._err1 = a;
  return ag3.jump(void 0, ag3_6);
}

function switches_1(switches) {
  switches._loop = switches.iteratorM(gen());
  return switches.jump(void 0, switches_2, switches_55);
}

function switches_2(switches) {
  var a;
  a = switches._loop, switches._loop = null;
  return switches.chain(a.step(), switches_3, switches_55);
}

function switches_3(switches, c) {
  var i, a, b;
  b = switches._loop = c;
  a = b.done;

  if (!a) {
    i = switches._loop.value;

    switch (i) {
      case 3:
        switches._fc = switches_5, switches._fe = switches_45;
        return switches.jump(void 0, switches_4);

      default:
        return switches.jump(void 0, switches_2, switches_55);
    }
  } else {
    switches._fc = switches_5, switches._fe = switches_45;
    return switches.jump(void 0, switches_4);
  }
}

function switches_4(switches) {
  var a, b, c;

  if (switches._loop.exit) {
    a = switches._loop, b = switches._fc, c = switches._fe, switches._loop = null, switches._fc = null, switches._fe = null;
    return switches.chain(a.exit(), b, c);
  } else {
    a = switches._fc, b = switches._fe, switches._loop = null, switches._fc = null, switches._fe = null;
    return switches.jump(void 0, a, b);
  }
}

function switches_5(switches) {
  switches._loop1 = switches.iteratorM(gen());
  return switches.jump(void 0, switches_6, switches_56);
}

function switches_6(switches) {
  var a;
  a = switches._loop1, switches._loop1 = null;
  return switches.chain(a.step(), switches_7, switches_56);
}

function switches_7(switches, c) {
  var i, a, b;
  b = switches._loop1 = c;
  a = b.done;

  if (!a) {
    i = switches._loop1.value;

    switch (i) {
      case 3:
        return switches.yld(`l2-${i}`, switches_8, switches_56);

      default:
        return switches.jump(void 0, switches_6, switches_56);
    }
  } else {
    switches._fc1 = switches_10, switches._fe1 = switches_45;
    return switches.jump(void 0, switches_9);
  }
}

function switches_8(switches) {
  switches._fc1 = switches_10, switches._fe1 = switches_45;
  return switches.jump(void 0, switches_9);
}

function switches_9(switches) {
  var a, b, c;

  if (switches._loop1.exit) {
    a = switches._loop1, b = switches._fc1, c = switches._fe1, switches._loop1 = null, switches._fc1 = null, switches._fe1 = null;
    return switches.chain(a.exit(), b, c);
  } else {
    a = switches._fc1, b = switches._fe1, switches._loop1 = null, switches._fc1 = null, switches._fe1 = null;
    return switches.jump(void 0, a, b);
  }
}

function switches_10(switches) {
  switches._loop2 = switches.iteratorM(gen());
  return switches.jump(void 0, switches_11, switches_57);
}

function switches_11(switches) {
  var a;
  a = switches._loop2, switches._loop2 = null;
  return switches.chain(a.step(), switches_12, switches_57);
}

function switches_12(switches, c) {
  var i, a, b;
  b = switches._loop2 = c;
  a = b.done;

  if (!a) {
    i = switches._loop2.value;

    switch (i) {
      case 3:
        switches._fc2 = switches_14, switches._fe2 = switches_45;
        return switches.jump(void 0, switches_13);

      default:
        return switches.yld(`l3-${i}`, switches_11, switches_57);
    }
  } else {
    switches._fc2 = switches_14, switches._fe2 = switches_45;
    return switches.jump(void 0, switches_13);
  }
}

function switches_13(switches) {
  var a, b, c;

  if (switches._loop2.exit) {
    a = switches._loop2, b = switches._fc2, c = switches._fe2, switches._loop2 = null, switches._fc2 = null, switches._fe2 = null;
    return switches.chain(a.exit(), b, c);
  } else {
    a = switches._fc2, b = switches._fe2, switches._loop2 = null, switches._fc2 = null, switches._fe2 = null;
    return switches.jump(void 0, a, b);
  }
}

function switches_14(switches) {
  switches._loop3 = switches.iteratorM(gen());
  return switches.jump(void 0, switches_15, switches_58);
}

function switches_15(switches) {
  var a;
  a = switches._loop3, switches._loop3 = null;
  return switches.chain(a.step(), switches_16, switches_58);
}

function switches_16(switches, c) {
  var i, a, b;
  b = switches._loop3 = c;
  a = b.done;

  if (!a) {
    i = switches._loop3.value;

    switch (i) {
      case 3:
        switches._fc3 = switches_18, switches._fe3 = switches_45;
        return switches.jump(void 0, switches_17);

      default:
        return switches.yld(`l4-${i}`, switches_15, switches_58);
    }
  } else {
    switches._fc3 = switches_18, switches._fe3 = switches_45;
    return switches.jump(void 0, switches_17);
  }
}

function switches_17(switches) {
  var a, b, c;

  if (switches._loop3.exit) {
    a = switches._loop3, b = switches._fc3, c = switches._fe3, switches._loop3 = null, switches._fc3 = null, switches._fe3 = null;
    return switches.chain(a.exit(), b, c);
  } else {
    a = switches._fc3, b = switches._fe3, switches._loop3 = null, switches._fc3 = null, switches._fe3 = null;
    return switches.jump(void 0, a, b);
  }
}

function switches_18(switches) {
  switches._loop4 = switches.iteratorM(gen());
  return switches.jump(void 0, switches_19, switches_59);
}

function switches_19(switches) {
  var a;
  a = switches._loop4, switches._loop4 = null;
  return switches.chain(a.step(), switches_20, switches_59);
}

function switches_20(switches, c) {
  var a, b;
  b = switches._loop4 = c;
  a = b.done;

  if (!a) {
    switches._i = switches._loop4.value;
    return switches.yld(`l5-${switches._i}`, switches_21, switches_59);
  } else {
    switches._fc4 = switches_23, switches._fe4 = switches_45, switches._i = null;
    return switches.jump(void 0, switches_22);
  }
}

function switches_21(switches) {
  switch (switches._i) {
    case 3:
      switches._fc4 = switches_23, switches._fe4 = switches_45, switches._i = null;
      return switches.jump(void 0, switches_22);

    default:
      switches._i = null;
      return switches.jump(void 0, switches_19, switches_59);
  }
}

function switches_22(switches) {
  var a, b, c;

  if (switches._loop4.exit) {
    a = switches._loop4, b = switches._fc4, c = switches._fe4, switches._loop4 = null, switches._fc4 = null, switches._fe4 = null;
    return switches.chain(a.exit(), b, c);
  } else {
    a = switches._fc4, b = switches._fe4, switches._loop4 = null, switches._fc4 = null, switches._fe4 = null;
    return switches.jump(void 0, a, b);
  }
}

function switches_23(switches) {
  switches._loop5 = switches.iteratorM(gen());
  return switches.jump(void 0, switches_24, switches_60);
}

function switches_24(switches) {
  var a;
  a = switches._loop5, switches._loop5 = null;
  return switches.chain(a.step(), switches_25, switches_60);
}

function switches_25(switches, c) {
  var i, a, b;
  b = switches._loop5 = c;
  a = b.done;

  if (!a) {
    i = switches._loop5.value;

    switch (i) {
      case 3:
        return switches.yld(`l6-1-${i}`, switches_26, switches_60);

      default:
        return switches.yld(`l6-2-${i}`, switches_24, switches_60);
    }
  } else {
    switches._fc5 = switches_28, switches._fe5 = switches_45;
    return switches.jump(void 0, switches_27);
  }
}

function switches_26(switches) {
  switches._fc5 = switches_28, switches._fe5 = switches_45;
  return switches.jump(void 0, switches_27);
}

function switches_27(switches) {
  var a, b, c;

  if (switches._loop5.exit) {
    a = switches._loop5, b = switches._fc5, c = switches._fe5, switches._loop5 = null, switches._fc5 = null, switches._fe5 = null;
    return switches.chain(a.exit(), b, c);
  } else {
    a = switches._fc5, b = switches._fe5, switches._loop5 = null, switches._fc5 = null, switches._fe5 = null;
    return switches.jump(void 0, a, b);
  }
}

function switches_28(switches) {
  switches._loop6 = switches.iteratorM(gen());
  return switches.jump(void 0, switches_29, switches_61);
}

function switches_29(switches) {
  var a;
  a = switches._loop6, switches._loop6 = null;
  return switches.chain(a.step(), switches_30, switches_61);
}

function switches_30(switches, c) {
  var a, b, d;
  b = switches._loop6 = c;
  a = b.done;

  if (!a) {
    switches._i1 = switches._loop6.value;

    switch (switches._i1) {
      case 0:
        switches._i1 = null;
        return switches.jump(void 0, switches_29, switches_61);

      case 1:
      case 2:
        d = switches._i1, switches._i1 = null;
        return switches.yld(`l7-1-${d}`, switches_29, switches_61);

      case 3:
        switches._i1 = null;
        return switches.jump(void 0, switches_29, switches_61);

      case 4:
        d = switches._i1, switches._i1 = null;
        return switches.yld(`l7-2-${d}`, switches_29, switches_61);

      case 5:
        return switches.yld(`l7-3-${switches._i1}`, switches_32, switches_61);

      case 6:
        switches._i1 = null;
        return switches.jump(void 0, switches_29, switches_61);

      case 7:
        d = switches._i1, switches._i1 = null;
        return switches.yld(`l7-4-${d}`, switches_31, switches_61);

      default:
        return switches.yld(`l7-5-${switches._i1}`, switches_32, switches_61);
    }
  } else {
    switches._fc6 = switches_34, switches._fe6 = switches_45, switches._i1 = null;
    return switches.jump(void 0, switches_33);
  }
}

function switches_31(switches) {
  switches._fc6 = switches_34, switches._fe6 = switches_45;
  return switches.jump(void 0, switches_33);
}

function switches_32(switches) {
  var a;
  a = switches._i1, switches._i1 = null;
  return switches.yld(`l7-6-${a}`, switches_29, switches_61);
}

function switches_33(switches) {
  var a, b, c;

  if (switches._loop6.exit) {
    a = switches._loop6, b = switches._fc6, c = switches._fe6, switches._loop6 = null, switches._fc6 = null, switches._fe6 = null;
    return switches.chain(a.exit(), b, c);
  } else {
    a = switches._fc6, b = switches._fe6, switches._loop6 = null, switches._fc6 = null, switches._fe6 = null;
    return switches.jump(void 0, a, b);
  }
}

function switches_34(switches) {
  switches._loop7 = switches.iteratorM(gen());
  return switches.jump(void 0, switches_35, switches_62);
}

function switches_35(switches) {
  var a;
  a = switches._loop7, switches._loop7 = null;
  return switches.chain(a.step(), switches_36, switches_62);
}

function switches_36(switches, c) {
  var a, b;
  b = switches._loop7 = c;
  a = b.done;

  if (!a) {
    switches._i2 = switches._loop7.value;
    switches._loop8 = switches.iterator(gen());
    return switches.jump(void 0, switches_37, switches_63);
  } else {
    switches._fc8 = switches_44, switches._fe8 = switches_45, switches._i2 = null, switches._loop8 = null;
    return switches.jump(void 0, switches_43);
  }
}

function switches_37(switches) {
  var a, b;

  if (!(switches._loop8 = switches._loop8.step()).done) {
    switches._j = switches._loop8.value;

    switch (switches._i2) {
      case 0:
      case 1:
      case 2:
        return switches.yld(`s1:${switches._i2},${switches._j}`, switches_38, switches_63);

      case 3:
        switch (switches._j) {
          case 2:
          case 3:
            a = switches._j, switches._j = null;
            return switches.yld(`s2:${switches._i2},${a}`, switches_37, switches_63);

          case 5:
            a = switches._j, switches._j = null;
            return switches.yld(`s3:${switches._i2},${a}`, switches_37, switches_63);

          case 7:
            a = switches._j, switches._j = null;
            return switches.yld(`s4:${switches._i2},${a}`, switches_37, switches_63);

          case 8:
            a = switches._j, switches._j = null;
            return switches.yld(`s5:${switches._i2},${a}`, switches_37, switches_63);

          case 9:
            a = switches._i2, b = switches._j, switches._i2 = null, switches._j = null;
            return switches.yld(`s6:${a},${b}`, switches_39, switches_63);

          default:
            switches._j = null;
            return switches.jump(void 0, switches_37, switches_63);
        }

      case 4:
        switch (switches._j) {
          case 2:
          case 3:
            return switches.yld(`s7:${switches._i2},${switches._j}`, switches_41, switches_63);

          case 5:
            a = switches._j, switches._j = null;
            return switches.yld(`s8:${switches._i2},${a}`, switches_37, switches_63);

          case 6:
            switches._fc7 = switches_35, switches._fe7 = switches_62, switches._i2 = null, switches._j = null;
            return switches.jump(void 0, switches_42, switches_62);

          case 7:
            return switches.yld(`s9:${switches._i2},${switches._j}`, switches_41, switches_63);

          case 8:
            a = switches._j, switches._j = null;
            return switches.yld(`s10:${switches._i2},${a}`, switches_37, switches_63);

          case 9:
            a = switches._i2, b = switches._j, switches._i2 = null, switches._j = null;
            return switches.yld(`s11:${a},${b}`, switches_40, switches_63);

          default:
            return switches.yld(`s12:${switches._i2},${switches._j}`, switches_41, switches_63);
        }

      case 5:
        switch (switches._j) {
          case 2:
          case 3:
            switches._fc7 = switches_43, switches._fe7 = switches_45, switches._fc8 = switches_44, switches._fe8 = switches_45, switches._i2 = null, switches._j = null;
            return switches.jump(void 0, switches_42, switches_62);

          default:
            switches._j = null;
            return switches.jump(void 0, switches_37, switches_63);
        }

      default:
        switches._j = null;
        return switches.jump(void 0, switches_37, switches_63);
    }
  } else {
    switches._fc7 = switches_35, switches._fe7 = switches_62, switches._i2 = null, switches._j = null;
    return switches.jump(void 0, switches_42, switches_62);
  }
}

function switches_38(switches) {
  if (switches._j > 3) {
    switches._fc7 = switches_35, switches._fe7 = switches_62, switches._j = null;
    return switches.jump(void 0, switches_42, switches_62);
  } else {
    switches._j = null;
    return switches.jump(void 0, switches_37, switches_63);
  }
}

function switches_39(switches) {
  switches._fc7 = switches_35, switches._fe7 = switches_62;
  return switches.jump(void 0, switches_42, switches_62);
}

function switches_40(switches) {
  switches._fc7 = switches_43, switches._fe7 = switches_45, switches._fc8 = switches_44, switches._fe8 = switches_45;
  return switches.jump(void 0, switches_42, switches_62);
}

function switches_41(switches) {
  var a;
  a = switches._j, switches._j = null;
  return switches.yld(`s13:${switches._i2},${a}`, switches_37, switches_63);
}

function switches_42(switches) {
  var a, b;

  if (switches._loop8.exit) {
    switches._loop8.exit();
  }

  switches._err8 = switches._err9, a = switches._fc7, b = switches._fe7, switches._loop8 = null, switches._fc7 = null, switches._fe7 = null;
  return switches.jump(void 0, a, b);
}

function switches_43(switches) {
  var a, b, c;

  if (switches._loop7.exit) {
    a = switches._loop7, b = switches._fc8, c = switches._fe8, switches._loop7 = null, switches._fc8 = null, switches._fe8 = null;
    return switches.chain(a.exit(), b, c);
  } else {
    a = switches._fc8, b = switches._fe8, switches._loop7 = null, switches._fc8 = null, switches._fe8 = null;
    return switches.jump(void 0, a, b);
  }
}

function switches_44(switches) {
  return switches.pure();
}

function switches_45(switches, e) {
  return switches.raise(e);
}

function switches_46(switches) {
  return switches.raise(switches._err1);
}

function switches_47(switches) {
  return switches.raise(switches._err2);
}

function switches_48(switches) {
  return switches.raise(switches._err3);
}

function switches_49(switches) {
  return switches.raise(switches._err4);
}

function switches_50(switches) {
  return switches.raise(switches._err5);
}

function switches_51(switches) {
  return switches.raise(switches._err6);
}

function switches_52(switches) {
  return switches.raise(switches._err7);
}

function switches_53(switches) {
  return switches.raise(switches._err8);
}

function switches_54(switches) {
  return switches.raise(switches._err9);
}

function switches_55(switches, a) {
  switches._fc = switches_46, switches._fe = switches_45, switches._err1 = a;
  return switches.jump(void 0, switches_4);
}

function switches_56(switches, a) {
  switches._fc1 = switches_47, switches._fe1 = switches_45, switches._err2 = a;
  return switches.jump(void 0, switches_9);
}

function switches_57(switches, a) {
  switches._fc2 = switches_48, switches._fe2 = switches_45, switches._err3 = a;
  return switches.jump(void 0, switches_13);
}

function switches_58(switches, a) {
  switches._fc3 = switches_49, switches._fe3 = switches_45, switches._err4 = a;
  return switches.jump(void 0, switches_17);
}

function switches_59(switches, a) {
  switches._fc4 = switches_50, switches._fe4 = switches_45, switches._err5 = a;
  return switches.jump(void 0, switches_22);
}

function switches_60(switches, a) {
  switches._fc5 = switches_51, switches._fe5 = switches_45, switches._err6 = a;
  return switches.jump(void 0, switches_27);
}

function switches_61(switches, a) {
  switches._fc6 = switches_52, switches._fe6 = switches_45, switches._err7 = a;
  return switches.jump(void 0, switches_33);
}

function switches_62(switches, a) {
  switches._fc8 = switches_53, switches._fe8 = switches_45, switches._err8 = a;
  return switches.jump(void 0, switches_43);
}

function switches_63(switches, a) {
  switches._fc7 = switches_43, switches._fe7 = switches_45, switches._fc8 = switches_54, switches._fe8 = switches_45, switches._err9 = a;
  return switches.jump(void 0, switches_42, switches_62);
}

function c_1(c) {
  return c.yld(1, c_2);
}

function c_2(c) {
  c._loop = c.iterator(somethng);
  return c.jump(void 0, c_3, c_14);
}

function c_3(c) {
  if (!(c._loop = c._loop.step()).done) {
    c._i = c._loop.value;
    c._loop1 = c.iteratorM(somethingElse);
    return c.jump(void 0, c_4, c_15);
  } else {
    c._fc1 = c_10, c._fe1 = c_11, c._i = null, c._loop1 = null;
    return c.jump(void 0, c_9);
  }
}

function c_4(c) {
  var a;
  a = c._loop1, c._loop1 = null;
  return c.chain(a.step(), c_5, c_15);
}

function c_5(c, d) {
  var j, a, b;
  b = c._loop1 = d;
  a = b.done;

  if (!a) {
    j = c._loop1.value;
    return c.yld(c._i, c_6, c_15);
  } else {
    c._fc = c_3, c._fe = c_14, c._i = null;
    return c.jump(void 0, c_8, c_14);
  }
}

function c_6(c, a) {
  switch (a) {
    case 1:
      c._fc = c_9, c._fe = c_11, c._fc1 = c_10, c._fe1 = c_11, c._r = 10;
      return c.jump(void 0, c_8, c_14);

    case 2:
      return c.jump(void 0, c_7, c_15);

    case 3:
      return c.jump(void 0, c_4, c_15);

    case 5:
      c._fc = c_3, c._fe = c_14;
      return c.jump(void 0, c_8, c_14);

    case 6:
      c._fc = c_9, c._fe = c_11, c._fc1 = c_10, c._fe1 = c_11;
      return c.jump(void 0, c_8, c_14);

    default:
      return c.jump(void 0, c_7, c_15);
  }
}

function c_7(c) {
  c._fc = c_3, c._fe = c_14;
  return c.jump(void 0, c_8, c_14);
}

function c_8(c) {
  var a, b, d;

  if (c._loop1.exit) {
    c._err1 = c._err2, a = c._loop1, b = c._fc, d = c._fe, c._loop1 = null, c._fc = null, c._fe = null;
    return c.chain(a.exit(), b, d);
  } else {
    c._err1 = c._err2, a = c._fc, b = c._fe, c._loop1 = null, c._fc = null, c._fe = null;
    return c.jump(void 0, a, b);
  }
}

function c_9(c) {
  var a, b;

  if (c._loop.exit) {
    c._loop.exit();
  }

  a = c._fc1, b = c._fe1, c._loop = null, c._fc1 = null, c._fe1 = null;
  return c.jump(void 0, a, b);
}

function c_10(c) {
  return c.pure(c._r);
}

function c_11(c, e) {
  return c.raise(e);
}

function c_12(c) {
  return c.raise(c._err1);
}

function c_13(c) {
  return c.raise(c._err2);
}

function c_14(c, a) {
  c._fc1 = c_12, c._fe1 = c_11, c._err1 = a;
  return c.jump(void 0, c_9);
}

function c_15(c, a) {
  c._fc = c_9, c._fe = c_11, c._fc1 = c_13, c._fe1 = c_11, c._err2 = a;
  return c.jump(void 0, c_8, c_14);
}

function method_1(ctx) {
  return ctx.chain(something, method_2);
}

function method_2(ctx) {
  return ctx.pure();
}

function _method_1(ctx) {
  return ctx.chain(somethingElse, _method_2);
}

function _method_2(ctx) {
  return ctx.pure();
}

function method_11(ctx) {
  return ctx.chain(something, method_21);
}

function method_21(ctx) {
  return ctx.pure();
}

function m2_1(ctx) {
  return ctx.chain(something, m2_2);
}

function m2_2(ctx) {
  return ctx.pure();
}

function m1_1(ctx) {
  return ctx.chain(somethingElse, m1_2);
}

function m1_2(ctx) {
  return ctx.pure();
}

function f_1(ctx) {
  return ctx.chain(something, f_2);
}

function f_2(ctx) {
  return ctx.pure();
}

function _f_1(ctx) {
  return ctx.chain(somethingElse, _f_2);
}

function _f_2(ctx) {
  return ctx.pure();
}

function f_11(ctx) {
  return ctx._i;
}

function f_12(ctx) {
  var a;
  a = ctx._i, ctx._i = null;
  return ctx.chain(a, f_21);
}

function f_21(ctx, a) {
  var f;
  f = a;
  return ctx.pure();
}

function zz_1(_zz) {
  var a;
  a = _zz._i, _zz._i = null;
  return _zz.chain(a, zz_2);
}

function zz_2(_zz) {
  return _zz.pure();
}