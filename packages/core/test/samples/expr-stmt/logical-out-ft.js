import * as M from "@effectful/core";

function a1() {
  var a1 = M.context();
  return M.scope(a1_1);
}

function a2() {
  var a2 = M.context();
  return M.scope(a2_1);
}

function a3() {
  var a3 = M.context();
  return M.scope(a3_1);
}

function a4() {
  var a4 = M.context();
  return M.scope(a4_1);
}

function a5() {
  var a5 = M.context();
  return M.scope(a5_1);
}

function a6() {
  var a6 = M.context();
  return M.scope(a6_1);
}

function a7() {
  var a7 = M.context();
  return M.scope(a7_1);
}

function a8() {
  var a8 = M.context();
  return M.scope(a8_1);
}

function a9() {
  var a9 = M.context();
  return M.scope(a9_1);
}

function a10() {
  var a10 = M.context();
  return M.scope(a10_1);
}

function a11() {
  var a11 = M.context();
  return M.scope(a11_1);
}

function a12() {
  var a12 = M.context();
  return M.scope(a12_1);
}

function a13() {
  var a13 = M.context();
  return M.scope(a13_1);
}

function a14() {
  var a14 = M.context();
  return M.scope(_a14_1);
}

function a14_1() {
  var a14_1 = M.context();
  return M.scope(a14_1_1);
}

function a15() {
  var a15 = M.context();
  return M.scope(a15_1);
}

function a16() {
  var a16 = M.context();
  return M.scope(a16_1);
}

function a17() {
  var a17 = M.context();
  return M.scope(a17_1);
}

function a18() {
  var a18 = M.context();
  return M.scope(_a18_1);
}

function a18_1() {
  var a18_1 = M.context();
  return M.scope(a18_1_1);
}

function a19() {
  var a19 = M.context();
  return M.scope(_a19_1);
}

function a19_1() {
  var a19_1 = M.context();
  return M.scope(a19_1_1);
}

function b() {
  var b = M.context();
  return M.scope(b_1);
}

function l1() {
  var l1 = M.context();
  return M.scope(l1_1);
}

function a1() {
  var a1 = M.context();
  return M.scope(_a1_1);
}

function a1_1(a1) {
  return M.chain(eff(1), a1_2);
}

function a1_2(a1, a) {
  if (!a) {
    return M.chain(eff(2), a1_3);
  } else {
    return a;
  }
}

function a1_3(a1) {}

function a2_1(a2) {
  return M.chain(eff(1), a2_2);
}

function a2_2(a2, a) {
  if (a) {
    return M.chain(eff(2), a2_3);
  } else {
    return a;
  }
}

function a2_3(a2) {}

function a3_1(a3) {
  return M.chain(eff(1), a3_2);
}

function a3_2(a3, a) {
  a3._ = a;
  return M.chain(eff(2), a3_3);
}

function a3_3(a3, b) {
  var a;
  a = a3._ || b;

  if (!a) {
    a3._ = null;
    return M.chain(eff(3), a3_4);
  } else {
    return a;
  }
}

function a3_4(a3) {}

function a4_1(a4) {
  return M.chain(eff(1), a4_2);
}

function a4_2(a4, a) {
  a4._ = a;
  return M.chain(eff(2), a4_3);
}

function a4_3(a4, b) {
  var a;
  a = a4._ && b;

  if (a) {
    a4._ = null;
    return M.chain(eff(3), a4_4);
  } else {
    return a;
  }
}

function a4_4(a4) {}

function a5_1(a5) {
  var a;
  a = 1;

  if (!a) {
    return M.chain(eff(2), a5_2);
  } else {
    return a;
  }
}

function a5_2(a5) {}

function a6_1(a6) {
  return M.chain(eff(2), a6_2);
}

function a6_2(a6, a) {
  if (!a) {
    a = 1;
  }
}

function a7_1(a7) {
  var a;
  a = 1 + 1;

  if (!a) {
    return M.chain(eff(2), a7_2);
  } else {
    return a;
  }
}

function a7_2(a7) {}

function a8_1(a8) {
  return M.chain(eff(2), a8_2);
}

function a8_2(a8, a) {
  if (!a) {
    a = 1 + 1;
  }
}

function a9_1(a9) {
  var a;
  a = 1;

  if (a) {
    return M.chain(eff(2), a9_2);
  } else {
    return a;
  }
}

function a9_2(a9) {}

function a10_1(a10) {
  return M.chain(eff(2), a10_2);
}

function a10_2(a10, a) {
  if (a) {
    a = 1;
  }
}

function a11_1(a11) {
  var a;
  a = 1 + 1;

  if (a) {
    return M.chain(eff(2), a11_2);
  } else {
    return a;
  }
}

function a11_2(a11) {}

function a12_1(a12) {
  return M.chain(eff(2), a12_2);
}

function a12_2(a12, a) {
  if (a) {
    a = 1 + 1;
  }
}

function a13_1(a13) {
  return M.chain(eff(1), a13_2);
}

function a13_2(a13, a) {
  if (a) {
    return M.chain(eff(2), a13_3);
  } else {
    return M.chain(eff(3), a13_3);
  }
}

function a13_3(a13) {}

function _a14_1(a14) {
  return M.chain(eff(1), a14_2);
}

function a14_2(a14, a) {
  if (a) {
    return 2;
  } else {
    return M.chain(eff(3), a14_3);
  }
}

function a14_3(a14) {}

function a14_1_1(a14_1) {
  return M.chain(eff(1), a14_1_2);
}

function a14_1_2(a14_1, a) {
  if (a) {
    return M.jump(2, a14_1_3);
  } else {
    return M.chain(eff(3), a14_1_3);
  }
}

function a14_1_3(a14_1, a) {
  return a;
}

function a15_1(a15) {
  return M.chain(eff(1), a15_2);
}

function a15_2(a15, a) {
  if (a) {
    return M.chain(eff(2), a15_3);
  } else {
    return 3;
  }
}

function a15_3(a15) {}

function a16_1(a16) {
  if (1) {
    return M.chain(eff(2), a16_2);
  } else {
    return M.chain(eff(3), a16_2);
  }
}

function a16_2(a16) {}

function a17_1(a17) {
  return M.chain(eff(1), a17_2);
}

function a17_2(a17, a) {
  var b;

  if (a) {
    b = 2;
  } else {
    b = 3;
  }

  console.log(b);
}

function _a18_1(a18) {
  return M.chain(eff(1), a18_2);
}

function a18_2(a18, a) {
  a18._ = a;
  return M.chain(eff(2), a18_3);
}

function a18_3(a18, a) {
  if (a18._ + a) {
    2;
  } else {
    3;
  }
}

function a18_1_1(a18_1) {
  return M.chain(eff(1), a18_1_2);
}

function a18_1_2(a18_1, a) {
  a18_1._ = a;
  return M.chain(eff(2), a18_1_3);
}

function a18_1_3(a18_1, a) {
  var b;

  if (a18_1._ + a) {
    b = 2;
  } else {
    b = 3;
  }

  return b;
}

function _a19_1(a19) {
  return M.chain(eff(1), a19_2);
}

function a19_2(a19, a) {
  if (!a) {
    a19._ = null, a19._1 = null;
    return M.chain(eff(2), a19_3);
  } else {
    a19._ = a;
    a19._1 = null;
    return M.jump(void 0, a19_5);
  }
}

function a19_3(a19, a) {
  a19._1 = a;
  return M.chain(eff(3), a19_4);
}

function a19_4(a19, a) {
  a19._ = (a19._1, a);
  a19._1 = null;
  return M.jump(void 0, a19_5);
}

function a19_5(a19) {
  var a;
  a = a19._, a19._ = null;
  return M.chain(eff(a), a19_6);
}

function a19_6(a19) {}

function a19_1_1(a19_1) {
  return M.chain(eff(1), a19_1_2);
}

function a19_1_2(a19_1, a) {
  if (!a) {
    a19_1._ = null, a19_1._1 = null;
    return M.chain(eff(2), a19_1_3);
  } else {
    a19_1._ = a;
    a19_1._1 = null;
    return M.jump(void 0, a19_1_5);
  }
}

function a19_1_3(a19_1, a) {
  a19_1._1 = a;
  return M.chain(eff(3), a19_1_4);
}

function a19_1_4(a19_1, a) {
  a19_1._ = (a19_1._1, a);
  a19_1._1 = null;
  return M.jump(void 0, a19_1_5);
}

function a19_1_5(a19_1) {
  var a;
  a = a19_1._, a19_1._ = null;
  return M.chain(eff(a), a19_1_6);
}

function a19_1_6(a19_1, a) {
  return a;
}

function b_1(b) {
  return M.chain(eff(1), b_2);
}

function b_2(b, a) {
  if (!a) {
    return M.chain(eff(2), b_3);
  } else {
    return M.jump(a, b_3);
  }
}

function b_3(b) {
  return M.chain(eff(1), b_4);
}

function b_4(b, a) {
  if (a) {
    return M.chain(eff(2), b_5);
  } else {
    return M.jump(a, b_5);
  }
}

function b_5(b) {
  var a;
  a = 1;

  if (!a) {
    return M.chain(eff(2), b_6);
  } else {
    return M.jump(a, b_6);
  }
}

function b_6(b) {
  return M.chain(eff(2), b_7);
}

function b_7(b, a) {
  var c;

  if (!a) {
    a = 1;
  }

  c = 1 + 1;

  if (!c) {
    return M.chain(eff(2), b_8);
  } else {
    return M.jump(c, b_8);
  }
}

function b_8(b) {
  return M.chain(eff(2), b_9);
}

function b_9(b, a) {
  var c;

  if (!a) {
    a = 1 + 1;
  }

  c = 1;

  if (c) {
    return M.chain(eff(2), b_10);
  } else {
    return M.jump(c, b_10);
  }
}

function b_10(b) {
  return M.chain(eff(2), b_11);
}

function b_11(b, a) {
  var c;

  if (a) {
    a = 1;
  }

  c = 1 + 1;

  if (c) {
    return M.chain(eff(2), b_12);
  } else {
    return M.jump(c, b_12);
  }
}

function b_12(b) {
  return M.chain(eff(2), b_13);
}

function b_13(b, a) {
  if (a) {
    a = 1 + 1;
  }

  return M.chain(eff(1), b_14);
}

function b_14(b, a) {
  if (a) {
    return M.chain(eff(2), b_15);
  } else {
    return M.chain(eff(3), b_15);
  }
}

function b_15(b) {
  return M.chain(eff(1), b_16);
}

function b_16(b, a) {
  if (a) {
    return M.jump(2, b_17);
  } else {
    return M.chain(eff(3), b_17);
  }
}

function b_17(b) {
  return M.chain(eff(1), b_18);
}

function b_18(b, a) {
  if (a) {
    return M.chain(eff(2), b_19);
  } else {
    return M.jump(3, b_19);
  }
}

function b_19(b) {
  if (1) {
    return M.chain(eff(2), b_20);
  } else {
    return M.chain(eff(3), b_20);
  }
}

function b_20(b) {
  return M.chain(eff(1), b_21);
}

function b_21(b, a) {
  var c;

  if (a) {
    c = 2;
  } else {
    c = 3;
  }

  return c;
}

function l1_1(l1) {
  var a;
  cond ? l1._a = 1 : something;
  a = l1._a, l1._a = null;
  return M.chain(eff(a), l1_2);
}

function l1_2(l1) {
  cond ? something : l1._b = 1;
  return M.chain(eff(l1._b), l1_3);
}

function l1_3(l1) {
  var c, a;
  cond ? c = 1 : c = 2;
  a = l1._b, l1._b = null;
  return M.chain(eff(a), l1_4);
}

function l1_4(l1) {
  var d;
  d = 3 && something;
  return M.chain(eff(d), l1_5);
}

function l1_5(l1) {
  var a;
  something && (l1._e = 4);
  a = l1._e, l1._e = null;
  return M.chain(eff(a), l1_6);
}

function l1_6(l1) {}

function _a1_1(a1) {
  return M.yldStar(M.yld("a1"), _a1_2);
}

function _a1_2(a1, a) {
  if (a) {
    return M.yldStar(M.yld("a2"), _a1_3);
  } else {
    return M.yldStar(M.yld("a3"), _a1_3);
  }
}

function _a1_3(a1) {
  return M.yldStar(M.yld("b1"), a1_4);
}

function a1_4(a1, a) {
  var b;

  if (a % 2) {
    b = "b2";
  } else {
    b = "b3";
  }

  return M.yldStar(M.yld(b), a1_5);
}

function a1_5(a1) {
  return M.yldStar(M.yld("c1"), a1_6);
}

function a1_6(a1, a) {
  if (a % 2) {
    return M.yldStar(M.yld("c2"), a1_7);
  } else {
    return M.jump("c3", a1_7);
  }
}

function a1_7(a1, a) {
  return M.yldStar(M.yld(a), a1_8);
}

function a1_8(a1) {
  return M.yldStar(M.yld("d1"), a1_9);
}

function a1_9(a1, a) {
  if (a % 2) {
    return M.jump("d2", a1_10);
  } else {
    return M.yldStar(M.yld("d3"), a1_10);
  }
}

function a1_10(a1, a) {
  return M.yldStar(M.yld(a), a1_11);
}

function a1_11(a1) {
  return M.yldStar(M.yld("e1"), a1_12);
}

function a1_12(a1, a) {
  if (a % 2) {
    return M.yldStar(M.yld("e2"), a1_13);
  } else {
    return M.yldStar(M.yld("e3"), a1_13);
  }
}

function a1_13(a1, a) {
  return M.yldStar(M.yld(a), a1_14);
}

function a1_14(a1) {
  var a;
  a = "a1l" && "a1r";
  return M.yldStar(M.yld(a), a1_15);
}

function a1_15(a1) {
  var a;
  a = "a2l" && "a2r";
  return M.yldStar(M.yld(a), a1_16);
}

function a1_16(a1, a) {
  return M.yldStar(M.yld(a), a1_17);
}

function a1_17(a1) {
  var a;
  a = "a3l";

  if (a) {
    return M.yldStar(M.yld("a3r"), a1_18);
  } else {
    return M.jump(a, a1_18);
  }
}

function a1_18(a1, a) {
  return M.yldStar(M.yld(a), a1_19);
}

function a1_19(a1) {
  var a;
  a = "a3l";

  if (a) {
    a1._ = null;
    return M.yldStar(M.yld("a3r"), a1_20);
  } else {
    a1._ = a;
    return M.jump(void 0, a1_21);
  }
}

function a1_20(a1, a) {
  a1._ = !a;
  return M.jump(void 0, a1_21);
}

function a1_21(a1) {
  var a;
  a = a1._, a1._ = null;
  return M.yldStar(M.yld(a), a1_22);
}

function a1_22(a1) {
  var a;
  a = "a4l";

  if (a) {
    return M.yldStar(M.yld("a4r"), a1_23);
  } else {
    return M.jump(a, a1_23);
  }
}

function a1_23(a1, a) {
  return M.yldStar(M.yld(a), a1_24);
}

function a1_24(a1, a) {
  return M.yldStar(M.yld(a), a1_25);
}

function a1_25(a1) {
  var a;
  a = "o1l" || "o1r";
  return M.yldStar(M.yld(a), a1_26);
}

function a1_26(a1) {
  return M.yldStar(M.yld("o2l"), a1_27);
}

function a1_27(a1, a) {
  if (a) {
    a = "o2r";
  }

  return M.yldStar(M.yld(a), a1_28);
}

function a1_28(a1) {
  var a;
  a = "o3l";

  if (a) {
    return M.yldStar(M.yld("o3r"), a1_29);
  } else {
    return M.jump(a, a1_29);
  }
}

function a1_29(a1, a) {
  return M.yldStar(M.yld(a), a1_30);
}

function a1_30(a1) {
  return M.yldStar(M.yld("o4l"), a1_31);
}

function a1_31(a1, a) {
  if (a) {
    return M.yldStar(M.yld("o4r"), a1_32);
  } else {
    return M.jump(a, a1_32);
  }
}

function a1_32(a1, a) {
  return M.pure(a);
}

function a1_33(a1, r) {
  return M.pure(r);
}