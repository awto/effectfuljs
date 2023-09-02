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
function z1() {
  var z1 = M.context();
  return M.scope(z1_1);
}
function z2() {
  var z2 = M.context();
  return M.scope(z2_1);
}
function a1_1(a1) {
  return M.chain(eff(1), a1_2);
}
function a1_2(a1, b) {
  var a;
  a = b;
  if (!a) {
    return M.chain(eff(2), a1_3);
  } else {
    return a;
  }
}
function a1_3(a1, a) {
  a;
}
function a2_1(a2) {
  return M.chain(eff(1), a2_2);
}
function a2_2(a2, b) {
  var a;
  a = b;
  if (a) {
    return M.chain(eff(2), a2_3);
  } else {
    return a;
  }
}
function a2_3(a2, a) {
  a;
}
function a3_1(a3) {
  return M.chain(eff(1), a3_2);
}
function a3_2(a3, b) {
  var a;
  a = b;
  if (!a) {
    return M.chain(eff(2), a3_3);
  } else {
    return M.jump(a, a3_4);
  }
}
function a3_3(a3, a) {
  a3._ = a;
  return M.jump(void 0, a3_4);
}
function a3_4(a3) {
  var a;
  a = a3._;
  if (!a) {
    a3._ = null;
    return M.chain(eff(3), a3_5);
  } else {
    return a;
  }
}
function a3_5(a3, a) {
  a;
}
function a4_1(a4) {
  return M.chain(eff(1), a4_2);
}
function a4_2(a4, b) {
  var a;
  a = b;
  if (a) {
    return M.chain(eff(2), a4_3);
  } else {
    return M.jump(a, a4_4);
  }
}
function a4_3(a4, a) {
  a4._ = a;
  return M.jump(void 0, a4_4);
}
function a4_4(a4) {
  var a;
  a = a4._;
  if (a) {
    a4._ = null;
    return M.chain(eff(3), a4_5);
  } else {
    return a;
  }
}
function a4_5(a4, a) {
  a;
}
function a5_1(a5) {
  var a;
  a = 1;
  if (!a) {
    return M.chain(eff(2), a5_2);
  } else {
    return a;
  }
}
function a5_2(a5, a) {
  a;
}
function a6_1(a6) {
  return M.chain(eff(2), a6_2);
}
function a6_2(a6, b) {
  var a;
  a = b;
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
function a7_2(a7, a) {
  a;
}
function a8_1(a8) {
  return M.chain(eff(2), a8_2);
}
function a8_2(a8, b) {
  var a;
  a = b;
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
function a9_2(a9, a) {
  a;
}
function a10_1(a10) {
  return M.chain(eff(2), a10_2);
}
function a10_2(a10, b) {
  var a;
  a = b;
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
function a11_2(a11, a) {
  a;
}
function a12_1(a12) {
  return M.chain(eff(2), a12_2);
}
function a12_2(a12, b) {
  var a;
  a = b;
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
    return M.chain(eff(3), a13_4);
  }
}
function a13_3(a13, a) {
  a;
}
function a13_4(a13, a) {
  a;
}
function _a14_1(a14) {
  return M.chain(eff(1), a14_2);
}
function a14_2(a14, a) {
  if (a) {
    2;
  } else {
    return M.chain(eff(3), a14_3);
  }
}
function a14_3(a14, a) {
  a;
}
function a14_1_1(a14_1) {
  return M.chain(eff(1), a14_1_2);
}
function a14_1_2(a14_1, a) {
  if (a) {
    a14_1._ = 2;
    return M.jump(void 0, a14_1_4);
  } else {
    a14_1._ = null;
    return M.chain(eff(3), a14_1_3);
  }
}
function a14_1_3(a14_1, a) {
  a14_1._ = a;
  return M.jump(void 0, a14_1_4);
}
function a14_1_4(a14_1) {
  return a14_1._;
}
function a15_1(a15) {
  return M.chain(eff(1), a15_2);
}
function a15_2(a15, a) {
  if (a) {
    return M.chain(eff(2), a15_3);
  } else {
    3;
  }
}
function a15_3(a15, a) {
  a;
}
function a16_1(a16) {
  if (1) {
    return M.chain(eff(2), a16_2);
  } else {
    return M.chain(eff(3), a16_3);
  }
}
function a16_2(a16, a) {
  a;
}
function a16_3(a16, a) {
  a;
}
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
function a19_2(a19, b) {
  var a;
  a = b;
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
function a19_1_2(a19_1, b) {
  var a;
  a = b;
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
function b_2(b, c) {
  var a;
  a = c;
  if (!a) {
    return M.chain(eff(2), b_3);
  } else {
    return M.jump(a, b_4);
  }
}
function b_3(b, a) {
  a;
  return M.jump(void 0, b_4);
}
function b_4(b) {
  return M.chain(eff(1), b_5);
}
function b_5(b, c) {
  var a;
  a = c;
  if (a) {
    return M.chain(eff(2), b_6);
  } else {
    return M.jump(a, b_7);
  }
}
function b_6(b, a) {
  a;
  return M.jump(void 0, b_7);
}
function b_7(b) {
  var a;
  a = 1;
  if (!a) {
    return M.chain(eff(2), b_8);
  } else {
    return M.jump(a, b_9);
  }
}
function b_8(b, a) {
  a;
  return M.jump(void 0, b_9);
}
function b_9(b) {
  return M.chain(eff(2), b_10);
}
function b_10(b, c) {
  var a, d;
  a = c;
  if (!a) {
    a = 1;
  }
  d = 1 + 1;
  if (!d) {
    return M.chain(eff(2), b_11);
  } else {
    return M.jump(d, b_12);
  }
}
function b_11(b, a) {
  a;
  return M.jump(void 0, b_12);
}
function b_12(b) {
  return M.chain(eff(2), b_13);
}
function b_13(b, c) {
  var a, d;
  a = c;
  if (!a) {
    a = 1 + 1;
  }
  d = 1;
  if (d) {
    return M.chain(eff(2), b_14);
  } else {
    return M.jump(d, b_15);
  }
}
function b_14(b, a) {
  a;
  return M.jump(void 0, b_15);
}
function b_15(b) {
  return M.chain(eff(2), b_16);
}
function b_16(b, c) {
  var a, d;
  a = c;
  if (a) {
    a = 1;
  }
  d = 1 + 1;
  if (d) {
    return M.chain(eff(2), b_17);
  } else {
    return M.jump(d, b_18);
  }
}
function b_17(b, a) {
  a;
  return M.jump(void 0, b_18);
}
function b_18(b) {
  return M.chain(eff(2), b_19);
}
function b_19(b, c) {
  var a;
  a = c;
  if (a) {
    a = 1 + 1;
  }
  return M.chain(eff(1), b_20);
}
function b_20(b, a) {
  if (a) {
    return M.chain(eff(2), b_21);
  } else {
    return M.chain(eff(3), b_22);
  }
}
function b_21(b, a) {
  a;
  return M.jump(void 0, b_23);
}
function b_22(b, a) {
  a;
  return M.jump(void 0, b_23);
}
function b_23(b) {
  return M.chain(eff(1), b_24);
}
function b_24(b, a) {
  if (a) {
    2;
    return M.jump(void 0, b_26);
  } else {
    return M.chain(eff(3), b_25);
  }
}
function b_25(b, a) {
  a;
  return M.jump(void 0, b_26);
}
function b_26(b) {
  return M.chain(eff(1), b_27);
}
function b_27(b, a) {
  if (a) {
    return M.chain(eff(2), b_28);
  } else {
    3;
    return M.jump(void 0, b_29);
  }
}
function b_28(b, a) {
  a;
  return M.jump(void 0, b_29);
}
function b_29(b) {
  if (1) {
    return M.chain(eff(2), b_30);
  } else {
    return M.chain(eff(3), b_31);
  }
}
function b_30(b, a) {
  a;
  return M.jump(void 0, b_32);
}
function b_31(b, a) {
  a;
  return M.jump(void 0, b_32);
}
function b_32(b) {
  return M.chain(eff(1), b_33);
}
function b_33(b, a) {
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
function z1_1(z1) {
  return M.yldStar(M.yld("a1"), z1_2);
}
function z1_2(z1, a) {
  if (a) {
    return M.yldStar(M.yld("a2"), z1_3);
  } else {
    return M.yldStar(M.yld("a3"), z1_4);
  }
}
function z1_3(z1, a) {
  a;
  return M.jump(void 0, z1_5);
}
function z1_4(z1, a) {
  a;
  return M.jump(void 0, z1_5);
}
function z1_5(z1) {
  return M.yldStar(M.yld("b1"), z1_6);
}
function z1_6(z1, a) {
  var b;
  if (a % 2) {
    b = "b2";
  } else {
    b = "b3";
  }
  return M.yldStar(M.yld(b), z1_7);
}
function z1_7(z1) {
  return M.yldStar(M.yld("c1"), z1_8);
}
function z1_8(z1, a) {
  if (a % 2) {
    z1._ = null;
    return M.yldStar(M.yld("c2"), z1_9);
  } else {
    z1._ = "c3";
    return M.jump(void 0, z1_10);
  }
}
function z1_9(z1, a) {
  z1._ = a;
  return M.jump(void 0, z1_10);
}
function z1_10(z1) {
  var a;
  a = z1._, z1._ = null;
  return M.yldStar(M.yld(a), z1_11);
}
function z1_11(z1) {
  return M.yldStar(M.yld("d1"), z1_12);
}
function z1_12(z1, a) {
  if (a % 2) {
    z1._1 = "d2";
    return M.jump(void 0, z1_14);
  } else {
    z1._1 = null;
    return M.yldStar(M.yld("d3"), z1_13);
  }
}
function z1_13(z1, a) {
  z1._1 = a;
  return M.jump(void 0, z1_14);
}
function z1_14(z1) {
  var a;
  a = z1._1, z1._1 = null;
  return M.yldStar(M.yld(a), z1_15);
}
function z1_15(z1) {
  return M.yldStar(M.yld("e1"), z1_16);
}
function z1_16(z1, a) {
  if (a % 2) {
    return M.yldStar(M.yld("e2"), z1_17);
  } else {
    return M.yldStar(M.yld("e3"), z1_18);
  }
}
function z1_17(z1, a) {
  z1._2 = a;
  return M.jump(void 0, z1_19);
}
function z1_18(z1, a) {
  z1._2 = a;
  return M.jump(void 0, z1_19);
}
function z1_19(z1) {
  var a;
  a = z1._2, z1._2 = null;
  return M.yldStar(M.yld(a), z1_20);
}
function z1_20(z1) {
  var a;
  a = "a1l" && "a1r";
  return M.yldStar(M.yld(a), z1_21);
}
function z1_21(z1) {
  var a;
  a = "a2l" && "a2r";
  return M.yldStar(M.yld(a), z1_22);
}
function z1_22(z1, a) {
  return M.yldStar(M.yld(a), z1_23);
}
function z1_23(z1) {
  var a;
  a = "a3l";
  if (a) {
    return M.yldStar(M.yld("a3r"), z1_24);
  } else {
    return M.jump(a, z1_25);
  }
}
function z1_24(z1, a) {
  z1._3 = a;
  return M.jump(void 0, z1_25);
}
function z1_25(z1) {
  var a;
  a = z1._3, z1._3 = null;
  return M.yldStar(M.yld(a), z1_26);
}
function z1_26(z1) {
  var a;
  a = "a3l";
  if (a) {
    z1._4 = null;
    return M.yldStar(M.yld("a3r"), z1_27);
  } else {
    z1._4 = a;
    return M.jump(void 0, z1_28);
  }
}
function z1_27(z1, a) {
  z1._4 = !a;
  return M.jump(void 0, z1_28);
}
function z1_28(z1) {
  var a;
  a = z1._4, z1._4 = null;
  return M.yldStar(M.yld(a), z1_29);
}
function z1_29(z1) {
  var a;
  a = "a4l";
  if (a) {
    return M.yldStar(M.yld("a4r"), z1_30);
  } else {
    return M.jump(a, z1_31);
  }
}
function z1_30(z1, a) {
  z1._5 = a;
  return M.jump(void 0, z1_31);
}
function z1_31(z1) {
  var a;
  a = z1._5, z1._5 = null;
  return M.yldStar(M.yld(a), z1_32);
}
function z1_32(z1, a) {
  return M.yldStar(M.yld(a), z1_33);
}
function z1_33(z1) {
  var a;
  a = "o1l" || "o1r";
  return M.yldStar(M.yld(a), z1_34);
}
function z1_34(z1) {
  return M.yldStar(M.yld("o2l"), z1_35);
}
function z1_35(z1, b) {
  var a;
  a = b;
  if (a) {
    a = "o2r";
  }
  return M.yldStar(M.yld(a), z1_36);
}
function z1_36(z1) {
  var a;
  a = "o3l";
  if (a) {
    return M.yldStar(M.yld("o3r"), z1_37);
  } else {
    return M.jump(a, z1_38);
  }
}
function z1_37(z1, a) {
  z1._6 = a;
  return M.jump(void 0, z1_38);
}
function z1_38(z1) {
  var a;
  a = z1._6, z1._6 = null;
  return M.yldStar(M.yld(a), z1_39);
}
function z1_39(z1) {
  return M.yldStar(M.yld("o4l"), z1_40);
}
function z1_40(z1, b) {
  var a;
  a = b;
  if (a) {
    return M.yldStar(M.yld("o4r"), z1_41);
  } else {
    return M.jump(a, z1_42);
  }
}
function z1_41(z1, a) {
  z1._7 = a;
  return M.jump(void 0, z1_42);
}
function z1_42(z1) {
  return M.pure(z1._7);
}
function z1_43(z1, r) {
  return M.pure(r);
}
function z2_1(z2) {
  if (check_1) {
    if (check_2) {
      z2._1 = null;
      return M.chain(eff2(), z2_2);
    } else {
      if (check_3) {
        z2._1 = null;
        return M.chain(efff_1(1), z2_3);
      } else {
        z2._1 = pure_4;
        return M.jump(void 0, z2_4);
      }
    }
  } else {
    z2._1 = null;
    return M.chain(eff_5(), z2_6);
  }
}
function z2_2(z2, a) {
  z2._ = a;
  return M.jump(void 0, z2_5);
}
function z2_3(z2, a) {
  z2._1 = a;
  return M.jump(void 0, z2_4);
}
function z2_4(z2) {
  z2._ = z2._1;
  z2._1 = null;
  return M.jump(void 0, z2_5);
}
function z2_5(z2) {
  z2._;
  z2._ = null;
  return M.jump(void 0, z2_7);
}
function z2_6(z2, a) {
  a;
  return M.jump(void 0, z2_7);
}
function z2_7(z2) {
  return M.chain(ef_1(), z2_8);
}
function z2_8(z2, b) {
  var a;
  a = b;
  if (!a) {
    return M.chain(ef_2(), z2_9);
  } else {
    return M.jump(a, z2_10);
  }
}
function z2_9(z2, a) {
  z2._2 = a;
  return M.jump(void 0, z2_10);
}
function z2_10(z2) {
  var a;
  a = z2._2;
  if (!a) {
    z2._2 = null;
    return M.chain(ef_3(), z2_11);
  } else {
    return a;
  }
}
function z2_11(z2, a) {
  a;
}