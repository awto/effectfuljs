import * as M from "@effectful/core";

function p0(a, b) {
  var p0 = M.context();
  p0._a = a;
  p0._b = b;
  return p0.scope(_1);

  function _1(p0) {
    var f;
    return p0.chain((f = p0.fork(), f.fchain(f_3, _5), f.fjump(_2), f), _3);
  }

  function _2(p0) {
    return p0.chain(f_4, _6);
  }

  function _3(p0) {
    var a;
    a = g_1(p0._, p0._3);
    return p0.chain(a, _4);
  }

  function _4(p0) {
    return p0.pure();
  }

  function _5(p0, a) {
    p0._ = a;
    return p0.join();
  }

  function _6(p0, a) {
    p0._3 = a;
    return p0.join();
  }
}

function p1() {
  var p1 = M.context();
  return p1.scope(_1);

  function _1(p1) {
    var f;
    return p1.chain((f = p1.fork(), f.fchain(a_1, _2), f.fjump(_3), f), _4);
  }

  function _2(p1, b) {
    var a;
    a = k_1(b);
    return p1.chain(a, _6);
  }

  function _3(p1) {
    return p1.chain(a_2, _7);
  }

  function _4(p1) {
    var a;
    a = k_2(p1._5);
    return p1.chain(a, _5);
  }

  function _5(p1) {
    return p1.pure();
  }

  function _6(p1) {
    return p1.join();
  }

  function _7(p1, a) {
    p1._5 = a;
    return p1.join();
  }
}

function p2() {
  var p2 = M.context();
  return p2.scope(_1);

  function _1(p2) {
    var f, _f;

    return p2.chain((f = p2.fork(), f.fchain(f_2, _9), _f = p2.fork(), _f.fjump(_2), _f.fjump(_3), f.fchain(_f, _4), f), _5);
  }

  function _2(p2) {
    return p2.chain(f_3, _7);
  }

  function _3(p2) {
    return p2.chain(f_4, _8);
  }

  function _4(p2) {
    var a;
    a = g_1(p2._, p2._4);
    return p2.chain(a, _9);
  }

  function _5(p2) {
    return p2.chain(f_5, _6);
  }

  function _6(p2) {
    return p2.pure();
  }

  function _7(p2, a) {
    p2._ = a;
    return p2.join();
  }

  function _8(p2, a) {
    p2._4 = a;
    return p2.join();
  }

  function _9(p2) {
    return p2.join();
  }
}

function p3() {
  var p3 = M.context();
  return p3.scope(_1);

  function _1(p3) {
    var f, _f;

    return p3.chain((f = p3.fork(), f.fchain(a_1, _2), _f = p3.fork(), _f.fjump(_3), _f.fjump(_4), f.fchain(_f, _5), f), _6);
  }

  function _2(p3, b) {
    var a;
    a = f_2(b);
    return p3.chain(a, _10);
  }

  function _3(p3) {
    return p3.chain(f_3, _8);
  }

  function _4(p3) {
    return p3.chain(f_4, _9);
  }

  function _5(p3) {
    var a;
    a = g_1(p3._, p3._6);
    return p3.chain(a, _10);
  }

  function _6(p3) {
    return p3.chain(f_5, _7);
  }

  function _7(p3) {
    return p3.pure();
  }

  function _8(p3, a) {
    p3._ = a;
    return p3.join();
  }

  function _9(p3, a) {
    p3._6 = a;
    return p3.join();
  }

  function _10(p3) {
    return p3.join();
  }
}

function p4() {
  var p4 = M.context();
  return p4.scope(_1);

  function _1(p4) {
    return p4.chain(f0, _2);
  }

  function _2(p4, a) {
    if (a) {
      return p4.chain(f2, _3);
    } else {
      return p4.chain(f1, _4);
    }
  }

  function _3(p4, b) {
    var a;
    a = e0(b);
    return p4.chain(a, _4);
  }

  function _4(p4) {
    return p4.chain(f_2, _5);
  }

  function _5(p4) {
    return p4.pure();
  }
}

function p5() {
  var p5 = M.context();
  return p5.scope(_1);

  function _1(p5) {
    var f, _f;

    return p5.chain((f = p5.fork(), f.fchain(f3, _10), _f = p5.fork(), _f.fjump(_5), _f.fjump(_6), f.fchain(_f, _7), f), _8);
  }

  function _2(p5) {
    return p5.chain(f5, _11);
  }

  function _3(p5) {
    var a;
    a = f9(p5._5);
    return p5.chain(a, _4);
  }

  function _4(p5, b) {
    var a;
    a = f8(p5._, b);
    return p5.chain(a, _14);
  }

  function _5(p5) {
    return p5.chain(g3, _12);
  }

  function _6(p5) {
    return p5.chain(g4, _13);
  }

  function _7(p5) {
    var a;
    a = g2(p5._1, p5._9);
    return p5.chain(a, _14);
  }

  function _8(p5) {
    return p5.chain(f_3, _9);
  }

  function _9(p5) {
    return p5.pure();
  }

  function _10(p5, a) {
    p5._ = a;
    return p5.join();
  }

  function _11(p5, a) {
    p5._5 = a;
    return p5.join();
  }

  function _12(p5, a) {
    p5._1 = a;
    return p5.join();
  }

  function _13(p5, a) {
    p5._9 = a;
    return p5.join();
  }

  function _14(p5) {
    return p5.join();
  }
}

function p6() {
  var p6 = M.context();
  return p6.scope(_1);

  function _1(p6) {
    var f, _f;

    return p6.chain((f = p6.fork(), f.fchain(f_3, _12), _f = p6.fork(), _f.fjump(_2), _f.fjump(_3), f.fchain(_f, _4), f.fjump(_6), f.fjump(_7), f), _8);
  }

  function _2(p6) {
    return p6.chain(f3, _10);
  }

  function _3(p6) {
    return p6.chain(f5, _11);
  }

  function _4(p6) {
    var a;
    a = f9(p6._6);
    return p6.chain(a, _5);
  }

  function _5(p6, b) {
    var a;
    a = f8(p6._, b);
    return p6.chain(a, _12);
  }

  function _6(p6) {
    return p6.chain(g3, _13);
  }

  function _7(p6) {
    return p6.chain(g4, _14);
  }

  function _8(p6) {
    var a;
    a = g2(p6._1, p6._10);
    return p6.chain(a, _9);
  }

  function _9(p6) {
    return p6.pure();
  }

  function _10(p6, a) {
    p6._ = a;
    return p6.join();
  }

  function _11(p6, a) {
    p6._6 = a;
    return p6.join();
  }

  function _12(p6) {
    return p6.join();
  }

  function _13(p6, a) {
    p6._1 = a;
    return p6.join();
  }

  function _14(p6, a) {
    p6._10 = a;
    return p6.join();
  }
}

function p7() {
  var p7 = M.context();
  return p7.scope(_1);

  function _1(p7) {
    return p7.chain(k_0, _2);
  }

  function _2(p7) {
    return p7.chain(f0, _3);
  }

  function _3(p7, a) {
    if (a) {
      return p7.chain(f2, _4);
    } else {
      return p7.chain(f1, _5);
    }
  }

  function _4(p7, b) {
    var a;
    a = e0(b);
    return p7.chain(a, _5);
  }

  function _5(p7) {
    var f, _f;

    return p7.chain((f = p7.fork(), f.fchain(f_2, _17), f.fjump(_6), _f = p7.fork(), _f.fjump(_7), _f.fjump(_8), f.fchain(_f, _9), f.fjump(_11), f.fjump(_12), f), _13);
  }

  function _6(p7) {
    return p7.chain(f_3, _17);
  }

  function _7(p7) {
    return p7.chain(f3, _15);
  }

  function _8(p7) {
    return p7.chain(f5, _16);
  }

  function _9(p7) {
    var a;
    a = f9(p7._13);
    return p7.chain(a, _10);
  }

  function _10(p7, b) {
    var a;
    a = f8(p7._1, b);
    return p7.chain(a, _17);
  }

  function _11(p7) {
    return p7.chain(g3, _18);
  }

  function _12(p7) {
    return p7.chain(g4, _19);
  }

  function _13(p7) {
    var a;
    a = g2(p7._2, p7._17);
    return p7.chain(a, _14);
  }

  function _14(p7) {
    return p7.pure();
  }

  function _15(p7, a) {
    p7._1 = a;
    return p7.join();
  }

  function _16(p7, a) {
    p7._13 = a;
    return p7.join();
  }

  function _17(p7) {
    return p7.join();
  }

  function _18(p7, a) {
    p7._2 = a;
    return p7.join();
  }

  function _19(p7, a) {
    p7._17 = a;
    return p7.join();
  }
}

function p8(a, b) {
  var p8 = M.context();
  p8._a = a;
  p8._b = b;
  return p8.scope(_1);

  function _1(p8) {
    var f;
    return p8.chain((f = p8.fork(), f.fchain(f_3, _7), f.fjump(_4), f), _5);
  }

  function _2(p8) {
    return p8.chain(f_4, _8);
  }

  function _3(p8) {
    var a;
    a = g_1(p8._1, p8._5);
    return p8.chain(a, _9);
  }

  function _4(p8) {
    return p8.chain(k_1, _10);
  }

  function _5(p8) {
    var a;
    a = m_1(p8._, p8._6);
    return p8.chain(a, _6);
  }

  function _6(p8) {
    return p8.pure();
  }

  function _7(p8, a) {
    p8._1 = a;
    return p8.join();
  }

  function _8(p8, a) {
    p8._5 = a;
    return p8.join();
  }

  function _9(p8, a) {
    p8._ = a;
    return p8.join();
  }

  function _10(p8, a) {
    p8._6 = a;
    return p8.join();
  }
}