import * as M from "@effectful/core";
function a1() {
  return M.chain(eff(1), _1);
  function _1(b) {
    var a;
    a = b;
    if (!a) {
      return M.chain(eff(2), _2);
    } else {
      return a;
    }
  }
  function _2(a) {
    a;
  }
}
function a2() {
  return M.chain(eff(1), _1);
  function _1(b) {
    var a;
    a = b;
    if (a) {
      return M.chain(eff(2), _2);
    } else {
      return a;
    }
  }
  function _2(a) {
    a;
  }
}
function a3() {
  var a;
  return M.chain(eff(1), _1);
  function _1(b) {
    var a;
    a = b;
    if (!a) {
      return M.chain(eff(2), _2);
    } else {
      return M.jump(a, _3);
    }
  }
  function _2(b) {
    a = b;
    return M.jump(void 0, _3);
  }
  function _3() {
    var b;
    b = a;
    if (!b) {
      return M.chain(eff(3), _4);
    } else {
      return b;
    }
  }
  function _4(a) {
    a;
  }
}
function a4() {
  var a;
  return M.chain(eff(1), _1);
  function _1(b) {
    var a;
    a = b;
    if (a) {
      return M.chain(eff(2), _2);
    } else {
      return M.jump(a, _3);
    }
  }
  function _2(b) {
    a = b;
    return M.jump(void 0, _3);
  }
  function _3() {
    var b;
    b = a;
    if (b) {
      return M.chain(eff(3), _4);
    } else {
      return b;
    }
  }
  function _4(a) {
    a;
  }
}
function a5() {
  var a;
  a = 1;
  if (!a) {
    return M.chain(eff(2), _1);
  } else {
    return a;
  }
  function _1(a) {
    a;
  }
}
function a6() {
  return M.chain(eff(2), _1);
  function _1(b) {
    var a;
    a = b;
    if (!a) {
      a = 1;
    }
  }
}
function a7() {
  var a;
  a = 1 + 1;
  if (!a) {
    return M.chain(eff(2), _1);
  } else {
    return a;
  }
  function _1(a) {
    a;
  }
}
function a8() {
  return M.chain(eff(2), _1);
  function _1(b) {
    var a;
    a = b;
    if (!a) {
      a = 1 + 1;
    }
  }
}
function a9() {
  var a;
  a = 1;
  if (a) {
    return M.chain(eff(2), _1);
  } else {
    return a;
  }
  function _1(a) {
    a;
  }
}
function a10() {
  return M.chain(eff(2), _1);
  function _1(b) {
    var a;
    a = b;
    if (a) {
      a = 1;
    }
  }
}
function a11() {
  var a;
  a = 1 + 1;
  if (a) {
    return M.chain(eff(2), _1);
  } else {
    return a;
  }
  function _1(a) {
    a;
  }
}
function a12() {
  return M.chain(eff(2), _1);
  function _1(b) {
    var a;
    a = b;
    if (a) {
      a = 1 + 1;
    }
  }
}
function a13() {
  return M.chain(eff(1), _1);
  function _1(a) {
    if (a) {
      return M.chain(eff(2), _2);
    } else {
      return M.chain(eff(3), _3);
    }
  }
  function _2(a) {
    a;
  }
  function _3(a) {
    a;
  }
}
function a14() {
  return M.chain(eff(1), _1);
  function _1(a) {
    if (a) {
      2;
    } else {
      return M.chain(eff(3), _2);
    }
  }
  function _2(a) {
    a;
  }
}
function a14_1() {
  var a, r;
  return M.chain(eff(1), _1);
  function _1(b) {
    if (b) {
      a = 2;
      return M.jump(void 0, _3);
    } else {
      return M.chain(eff(3), _2);
    }
  }
  function _2(b) {
    a = b;
    return M.jump(void 0, _3);
  }
  function _3() {
    return a;
  }
}
function a15() {
  return M.chain(eff(1), _1);
  function _1(a) {
    if (a) {
      return M.chain(eff(2), _2);
    } else {
      3;
    }
  }
  function _2(a) {
    a;
  }
}
function a16() {
  if (1) {
    return M.chain(eff(2), _1);
  } else {
    return M.chain(eff(3), _2);
  }
  function _1(a) {
    a;
  }
  function _2(a) {
    a;
  }
}
function a17() {
  return M.chain(eff(1), _1);
  function _1(a) {
    var b;
    if (a) {
      b = 2;
    } else {
      b = 3;
    }
    console.log(b);
  }
}
function a18() {
  var a;
  return M.chain(eff(1), _1);
  function _1(b) {
    a = b;
    return M.chain(eff(2), _2);
  }
  function _2(b) {
    if (a + b) {
      2;
    } else {
      3;
    }
  }
}
function a18_1() {
  var a, r;
  return M.chain(eff(1), _1);
  function _1(b) {
    a = b;
    return M.chain(eff(2), _2);
  }
  function _2(b) {
    var c;
    if (a + b) {
      c = 2;
    } else {
      c = 3;
    }
    return c;
  }
}
function a19() {
  var a, b;
  return M.chain(eff(1), _1);
  function _1(c) {
    var b;
    b = c;
    if (!b) {
      return M.chain(eff(2), _2);
    } else {
      a = b;
      return M.jump(void 0, _4);
    }
  }
  function _2(a) {
    b = a;
    return M.chain(eff(3), _3);
  }
  function _3(c) {
    a = (b, c);
    return M.jump(void 0, _4);
  }
  function _4() {
    return M.chain(eff(a), _5);
  }
  function _5() {}
}
function a19_1() {
  var a, b, r;
  return M.chain(eff(1), _1);
  function _1(c) {
    var b;
    b = c;
    if (!b) {
      return M.chain(eff(2), _2);
    } else {
      a = b;
      return M.jump(void 0, _4);
    }
  }
  function _2(a) {
    b = a;
    return M.chain(eff(3), _3);
  }
  function _3(c) {
    a = (b, c);
    return M.jump(void 0, _4);
  }
  function _4() {
    return M.chain(eff(a), _5);
  }
  function _5(a) {
    return a;
  }
}
function b() {
  var r;
  return M.chain(eff(1), _1);
  function _1(b) {
    var a;
    a = b;
    if (!a) {
      return M.chain(eff(2), _2);
    } else {
      return M.jump(a, _3);
    }
  }
  function _2(a) {
    a;
    return M.jump(void 0, _3);
  }
  function _3() {
    return M.chain(eff(1), _4);
  }
  function _4(b) {
    var a;
    a = b;
    if (a) {
      return M.chain(eff(2), _5);
    } else {
      return M.jump(a, _6);
    }
  }
  function _5(a) {
    a;
    return M.jump(void 0, _6);
  }
  function _6() {
    var a;
    a = 1;
    if (!a) {
      return M.chain(eff(2), _7);
    } else {
      return M.jump(a, _8);
    }
  }
  function _7(a) {
    a;
    return M.jump(void 0, _8);
  }
  function _8() {
    return M.chain(eff(2), _9);
  }
  function _9(b) {
    var a, c;
    a = b;
    if (!a) {
      a = 1;
    }
    c = 1 + 1;
    if (!c) {
      return M.chain(eff(2), _10);
    } else {
      return M.jump(c, _11);
    }
  }
  function _10(a) {
    a;
    return M.jump(void 0, _11);
  }
  function _11() {
    return M.chain(eff(2), _12);
  }
  function _12(b) {
    var a, c;
    a = b;
    if (!a) {
      a = 1 + 1;
    }
    c = 1;
    if (c) {
      return M.chain(eff(2), _13);
    } else {
      return M.jump(c, _14);
    }
  }
  function _13(a) {
    a;
    return M.jump(void 0, _14);
  }
  function _14() {
    return M.chain(eff(2), _15);
  }
  function _15(b) {
    var a, c;
    a = b;
    if (a) {
      a = 1;
    }
    c = 1 + 1;
    if (c) {
      return M.chain(eff(2), _16);
    } else {
      return M.jump(c, _17);
    }
  }
  function _16(a) {
    a;
    return M.jump(void 0, _17);
  }
  function _17() {
    return M.chain(eff(2), _18);
  }
  function _18(b) {
    var a;
    a = b;
    if (a) {
      a = 1 + 1;
    }
    return M.chain(eff(1), _19);
  }
  function _19(a) {
    if (a) {
      return M.chain(eff(2), _20);
    } else {
      return M.chain(eff(3), _21);
    }
  }
  function _20(a) {
    a;
    return M.jump(void 0, _22);
  }
  function _21(a) {
    a;
    return M.jump(void 0, _22);
  }
  function _22() {
    return M.chain(eff(1), _23);
  }
  function _23(a) {
    if (a) {
      2;
      return M.jump(void 0, _25);
    } else {
      return M.chain(eff(3), _24);
    }
  }
  function _24(a) {
    a;
    return M.jump(void 0, _25);
  }
  function _25() {
    return M.chain(eff(1), _26);
  }
  function _26(a) {
    if (a) {
      return M.chain(eff(2), _27);
    } else {
      3;
      return M.jump(void 0, _28);
    }
  }
  function _27(a) {
    a;
    return M.jump(void 0, _28);
  }
  function _28() {
    if (1) {
      return M.chain(eff(2), _29);
    } else {
      return M.chain(eff(3), _30);
    }
  }
  function _29(a) {
    a;
    return M.jump(void 0, _31);
  }
  function _30(a) {
    a;
    return M.jump(void 0, _31);
  }
  function _31() {
    return M.chain(eff(1), _32);
  }
  function _32(a) {
    var b;
    if (a) {
      b = 2;
    } else {
      b = 3;
    }
    return b;
  }
}
function l1() {
  var a, b, c, d, e;
  cond ? a = 1 : something;
  return M.chain(eff(a), _1);
  function _1() {
    cond ? something : b = 1;
    return M.chain(eff(b), _2);
  }
  function _2() {
    cond ? c = 1 : c = 2;
    return M.chain(eff(b), _3);
  }
  function _3() {
    d = 3 && something;
    return M.chain(eff(d), _4);
  }
  function _4() {
    something && (e = 4);
    return M.chain(eff(e), _5);
  }
  function _5() {}
}
function z1() {
  var i, a, b, c, d, e, f, g, h, r;
  return M.scope(_1);
  function _1() {
    return M.yldStar(M.yld("a1"), _2);
  }
  function _2(a) {
    if (a) {
      return M.yldStar(M.yld("a2"), _3);
    } else {
      return M.yldStar(M.yld("a3"), _4);
    }
  }
  function _3(a) {
    a;
    return M.jump(void 0, _5);
  }
  function _4(a) {
    a;
    return M.jump(void 0, _5);
  }
  function _5() {
    return M.yldStar(M.yld("b1"), _6);
  }
  function _6(a) {
    var b;
    if (a % 2) {
      b = "b2";
    } else {
      b = "b3";
    }
    return M.yldStar(M.yld(b), _7);
  }
  function _7() {
    return M.yldStar(M.yld("c1"), _8);
  }
  function _8(b) {
    if (b % 2) {
      return M.yldStar(M.yld("c2"), _9);
    } else {
      a = "c3";
      return M.jump(void 0, _10);
    }
  }
  function _9(b) {
    a = b;
    return M.jump(void 0, _10);
  }
  function _10() {
    return M.yldStar(M.yld(a), _11);
  }
  function _11() {
    return M.yldStar(M.yld("d1"), _12);
  }
  function _12(a) {
    if (a % 2) {
      b = "d2";
      return M.jump(void 0, _14);
    } else {
      return M.yldStar(M.yld("d3"), _13);
    }
  }
  function _13(a) {
    b = a;
    return M.jump(void 0, _14);
  }
  function _14() {
    return M.yldStar(M.yld(b), _15);
  }
  function _15() {
    return M.yldStar(M.yld("e1"), _16);
  }
  function _16(a) {
    if (a % 2) {
      return M.yldStar(M.yld("e2"), _17);
    } else {
      return M.yldStar(M.yld("e3"), _18);
    }
  }
  function _17(a) {
    c = a;
    return M.jump(void 0, _19);
  }
  function _18(a) {
    c = a;
    return M.jump(void 0, _19);
  }
  function _19() {
    return M.yldStar(M.yld(c), _20);
  }
  function _20() {
    var a;
    a = "a1l" && "a1r";
    return M.yldStar(M.yld(a), _21);
  }
  function _21() {
    var a;
    a = "a2l" && "a2r";
    return M.yldStar(M.yld(a), _22);
  }
  function _22(a) {
    return M.yldStar(M.yld(a), _23);
  }
  function _23() {
    var a;
    a = "a3l";
    if (a) {
      return M.yldStar(M.yld("a3r"), _24);
    } else {
      return M.jump(a, _25);
    }
  }
  function _24(a) {
    d = a;
    return M.jump(void 0, _25);
  }
  function _25() {
    return M.yldStar(M.yld(d), _26);
  }
  function _26() {
    var a;
    a = "a3l";
    if (a) {
      return M.yldStar(M.yld("a3r"), _27);
    } else {
      e = a;
      return M.jump(void 0, _28);
    }
  }
  function _27(a) {
    e = !a;
    return M.jump(void 0, _28);
  }
  function _28() {
    return M.yldStar(M.yld(e), _29);
  }
  function _29() {
    var a;
    a = "a4l";
    if (a) {
      return M.yldStar(M.yld("a4r"), _30);
    } else {
      return M.jump(a, _31);
    }
  }
  function _30(a) {
    f = a;
    return M.jump(void 0, _31);
  }
  function _31() {
    return M.yldStar(M.yld(f), _32);
  }
  function _32(a) {
    return M.yldStar(M.yld(a), _33);
  }
  function _33() {
    var a;
    a = "o1l" || "o1r";
    return M.yldStar(M.yld(a), _34);
  }
  function _34() {
    return M.yldStar(M.yld("o2l"), _35);
  }
  function _35(b) {
    var a;
    a = b;
    if (a) {
      a = "o2r";
    }
    return M.yldStar(M.yld(a), _36);
  }
  function _36() {
    var a;
    a = "o3l";
    if (a) {
      return M.yldStar(M.yld("o3r"), _37);
    } else {
      return M.jump(a, _38);
    }
  }
  function _37(a) {
    g = a;
    return M.jump(void 0, _38);
  }
  function _38() {
    return M.yldStar(M.yld(g), _39);
  }
  function _39() {
    return M.yldStar(M.yld("o4l"), _40);
  }
  function _40(b) {
    var a;
    a = b;
    if (a) {
      return M.yldStar(M.yld("o4r"), _41);
    } else {
      return M.jump(a, _42);
    }
  }
  function _41(a) {
    h = a;
    return M.jump(void 0, _42);
  }
  function _42() {
    return M.pure(h);
  }
  function _43(r) {
    return M.pure(r);
  }
}
function z2() {
  var a, b, c;
  if (check_1) {
    if (check_2) {
      return M.chain(eff2(), _1);
    } else {
      if (check_3) {
        return M.chain(efff_1(1), _2);
      } else {
        b = pure_4;
        return M.jump(void 0, _3);
      }
    }
  } else {
    return M.chain(eff_5(), _5);
  }
  function _1(b) {
    a = b;
    return M.jump(void 0, _4);
  }
  function _2(a) {
    b = a;
    return M.jump(void 0, _3);
  }
  function _3() {
    a = b;
    return M.jump(void 0, _4);
  }
  function _4() {
    a;
    return M.jump(void 0, _6);
  }
  function _5(a) {
    a;
    return M.jump(void 0, _6);
  }
  function _6() {
    return M.chain(ef_1(), _7);
  }
  function _7(b) {
    var a;
    a = b;
    if (!a) {
      return M.chain(ef_2(), _8);
    } else {
      return M.jump(a, _9);
    }
  }
  function _8(a) {
    c = a;
    return M.jump(void 0, _9);
  }
  function _9() {
    var a;
    a = c;
    if (!a) {
      return M.chain(ef_3(), _10);
    } else {
      return a;
    }
  }
  function _10(a) {
    a;
  }
}