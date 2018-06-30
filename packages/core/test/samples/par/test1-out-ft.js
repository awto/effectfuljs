import * as M from "@effectful/core";

function p0(a, b) {
  var p0 = M.context();
  p0._a = a;
  p0._b = b;
  return p0.scope(p0_1);
}

function p1() {
  var p1 = M.context();
  return p1.scope(p1_1);
}

function p2() {
  var p2 = M.context();
  return p2.scope(p2_1);
}

function p3() {
  var p3 = M.context();
  return p3.scope(p3_1);
}

function p4() {
  var p4 = M.context();
  return p4.scope(p4_1);
}

function p5() {
  var p5 = M.context();
  return p5.scope(p5_1);
}

function p6() {
  var p6 = M.context();
  return p6.scope(p6_1);
}

function p7() {
  var p7 = M.context();
  return p7.scope(p7_1);
}

function p8(a, b) {
  var p8 = M.context();
  p8._a = a;
  p8._b = b;
  return p8.scope(p8_1);
}

function p0_1(p0) {
  var f;
  return p0.chain((f = p0.fork(), f.fchain(f_3, p0_5), f.fjump(p0_2), f), p0_3);
}

function p0_2(p0) {
  return p0.chain(f_4, p0_6);
}

function p0_3(p0) {
  var a;
  a = g_1(p0._, p0._3);
  p0._ = null, p0._3 = null;
  return p0.chain(a, p0_4);
}

function p0_4(p0) {
  return p0.pure();
}

function p0_5(p0, a) {
  p0._ = a;
  return p0.join();
}

function p0_6(p0, a) {
  p0._3 = a;
  return p0.join();
}

function p1_1(p1) {
  var f;
  return p1.chain((f = p1.fork(), f.fchain(a_1, p1_2), f.fjump(p1_3), f), p1_4);
}

function p1_2(p1, b) {
  var a;
  a = k_1(b);
  return p1.chain(a, p1_6);
}

function p1_3(p1) {
  return p1.chain(a_2, p1_7);
}

function p1_4(p1) {
  var a;
  a = k_2(p1._5);
  p1._5 = null;
  return p1.chain(a, p1_5);
}

function p1_5(p1) {
  return p1.pure();
}

function p1_6(p1) {
  return p1.join();
}

function p1_7(p1, a) {
  p1._5 = a;
  return p1.join();
}

function p2_1(p2) {
  var f, _f;

  return p2.chain((f = p2.fork(), f.fchain(f_2, p2_9), _f = p2.fork(), _f.fjump(p2_2), _f.fjump(p2_3), f.fchain(_f, p2_4), f), p2_5);
}

function p2_2(p2) {
  return p2.chain(f_3, p2_7);
}

function p2_3(p2) {
  return p2.chain(f_4, p2_8);
}

function p2_4(p2) {
  var a;
  a = g_1(p2._, p2._4);
  p2._ = null, p2._4 = null;
  return p2.chain(a, p2_9);
}

function p2_5(p2) {
  return p2.chain(f_5, p2_6);
}

function p2_6(p2) {
  return p2.pure();
}

function p2_7(p2, a) {
  p2._ = a;
  return p2.join();
}

function p2_8(p2, a) {
  p2._4 = a;
  return p2.join();
}

function p2_9(p2) {
  return p2.join();
}

function p3_1(p3) {
  var f, _f;

  return p3.chain((f = p3.fork(), f.fchain(a_1, p3_2), _f = p3.fork(), _f.fjump(p3_3), _f.fjump(p3_4), f.fchain(_f, p3_5), f), p3_6);
}

function p3_2(p3, b) {
  var a;
  a = f_2(b);
  return p3.chain(a, p3_10);
}

function p3_3(p3) {
  return p3.chain(f_3, p3_8);
}

function p3_4(p3) {
  return p3.chain(f_4, p3_9);
}

function p3_5(p3) {
  var a;
  a = g_1(p3._, p3._6);
  p3._ = null, p3._6 = null;
  return p3.chain(a, p3_10);
}

function p3_6(p3) {
  return p3.chain(f_5, p3_7);
}

function p3_7(p3) {
  return p3.pure();
}

function p3_8(p3, a) {
  p3._ = a;
  return p3.join();
}

function p3_9(p3, a) {
  p3._6 = a;
  return p3.join();
}

function p3_10(p3) {
  return p3.join();
}

function p4_1(p4) {
  return p4.chain(f0, p4_2);
}

function p4_2(p4, a) {
  if (a) {
    return p4.chain(f2, p4_3);
  } else {
    return p4.chain(f1, p4_4);
  }
}

function p4_3(p4, b) {
  var a;
  a = e0(b);
  return p4.chain(a, p4_4);
}

function p4_4(p4) {
  return p4.chain(f_2, p4_5);
}

function p4_5(p4) {
  return p4.pure();
}

function p5_1(p5) {
  var f, _f;

  return p5.chain((f = p5.fork(), f.fchain(f3, p5_10), _f = p5.fork(), _f.fjump(p5_5), _f.fjump(p5_6), f.fchain(_f, p5_7), f), p5_8);
}

function p5_2(p5) {
  return p5.chain(f5, p5_11);
}

function p5_3(p5) {
  var a;
  a = f9(p5._5);
  p5._5 = null;
  return p5.chain(a, p5_4);
}

function p5_4(p5, b) {
  var a;
  a = f8(p5._, b);
  p5._ = null;
  return p5.chain(a, p5_14);
}

function p5_5(p5) {
  return p5.chain(g3, p5_12);
}

function p5_6(p5) {
  return p5.chain(g4, p5_13);
}

function p5_7(p5) {
  var a;
  a = g2(p5._1, p5._9);
  p5._1 = null, p5._9 = null;
  return p5.chain(a, p5_14);
}

function p5_8(p5) {
  return p5.chain(f_3, p5_9);
}

function p5_9(p5) {
  return p5.pure();
}

function p5_10(p5, a) {
  p5._ = a;
  return p5.join();
}

function p5_11(p5, a) {
  p5._5 = a;
  return p5.join();
}

function p5_12(p5, a) {
  p5._1 = a;
  return p5.join();
}

function p5_13(p5, a) {
  p5._9 = a;
  return p5.join();
}

function p5_14(p5) {
  return p5.join();
}

function p6_1(p6) {
  var f, _f;

  return p6.chain((f = p6.fork(), f.fchain(f_3, p6_12), _f = p6.fork(), _f.fjump(p6_2), _f.fjump(p6_3), f.fchain(_f, p6_4), f.fjump(p6_6), f.fjump(p6_7), f), p6_8);
}

function p6_2(p6) {
  return p6.chain(f3, p6_10);
}

function p6_3(p6) {
  return p6.chain(f5, p6_11);
}

function p6_4(p6) {
  var a;
  a = f9(p6._6);
  p6._6 = null;
  return p6.chain(a, p6_5);
}

function p6_5(p6, b) {
  var a;
  a = f8(p6._, b);
  p6._ = null;
  return p6.chain(a, p6_12);
}

function p6_6(p6) {
  return p6.chain(g3, p6_13);
}

function p6_7(p6) {
  return p6.chain(g4, p6_14);
}

function p6_8(p6) {
  var a;
  a = g2(p6._1, p6._10);
  p6._1 = null, p6._10 = null;
  return p6.chain(a, p6_9);
}

function p6_9(p6) {
  return p6.pure();
}

function p6_10(p6, a) {
  p6._ = a;
  return p6.join();
}

function p6_11(p6, a) {
  p6._6 = a;
  return p6.join();
}

function p6_12(p6) {
  return p6.join();
}

function p6_13(p6, a) {
  p6._1 = a;
  return p6.join();
}

function p6_14(p6, a) {
  p6._10 = a;
  return p6.join();
}

function p7_1(p7) {
  return p7.chain(k_0, p7_2);
}

function p7_2(p7) {
  return p7.chain(f0, p7_3);
}

function p7_3(p7, a) {
  if (a) {
    return p7.chain(f2, p7_4);
  } else {
    return p7.chain(f1, p7_5);
  }
}

function p7_4(p7, b) {
  var a;
  a = e0(b);
  return p7.chain(a, p7_5);
}

function p7_5(p7) {
  var f, _f;

  return p7.chain((f = p7.fork(), f.fchain(f_2, p7_17), f.fjump(p7_6), _f = p7.fork(), _f.fjump(p7_7), _f.fjump(p7_8), f.fchain(_f, p7_9), f.fjump(p7_11), f.fjump(p7_12), f), p7_13);
}

function p7_6(p7) {
  return p7.chain(f_3, p7_17);
}

function p7_7(p7) {
  return p7.chain(f3, p7_15);
}

function p7_8(p7) {
  return p7.chain(f5, p7_16);
}

function p7_9(p7) {
  var a;
  a = f9(p7._13);
  p7._13 = null;
  return p7.chain(a, p7_10);
}

function p7_10(p7, b) {
  var a;
  a = f8(p7._1, b);
  p7._1 = null;
  return p7.chain(a, p7_17);
}

function p7_11(p7) {
  return p7.chain(g3, p7_18);
}

function p7_12(p7) {
  return p7.chain(g4, p7_19);
}

function p7_13(p7) {
  var a;
  a = g2(p7._2, p7._17);
  p7._2 = null, p7._17 = null;
  return p7.chain(a, p7_14);
}

function p7_14(p7) {
  return p7.pure();
}

function p7_15(p7, a) {
  p7._1 = a;
  return p7.join();
}

function p7_16(p7, a) {
  p7._13 = a;
  return p7.join();
}

function p7_17(p7) {
  return p7.join();
}

function p7_18(p7, a) {
  p7._2 = a;
  return p7.join();
}

function p7_19(p7, a) {
  p7._17 = a;
  return p7.join();
}

function p8_1(p8) {
  var f;
  return p8.chain((f = p8.fork(), f.fchain(f_3, p8_7), f.fjump(p8_4), f), p8_5);
}

function p8_2(p8) {
  return p8.chain(f_4, p8_8);
}

function p8_3(p8) {
  var a;
  a = g_1(p8._1, p8._5);
  p8._1 = null, p8._5 = null;
  return p8.chain(a, p8_9);
}

function p8_4(p8) {
  return p8.chain(k_1, p8_10);
}

function p8_5(p8) {
  var a;
  a = m_1(p8._, p8._6);
  p8._ = null, p8._6 = null;
  return p8.chain(a, p8_6);
}

function p8_6(p8) {
  return p8.pure();
}

function p8_7(p8, a) {
  p8._1 = a;
  return p8.join();
}

function p8_8(p8, a) {
  p8._5 = a;
  return p8.join();
}

function p8_9(p8, a) {
  p8._ = a;
  return p8.join();
}

function p8_10(p8, a) {
  p8._6 = a;
  return p8.join();
}