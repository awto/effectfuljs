var _v = M.generatorFunction(v);

var _c = M.generatorFunction(c);

var _d = M.generatorFunction(d);

var _e = M.generatorFunction(e);

var _f = M.generatorFunction(f);

var _v1 = M.generatorFunction(v1);

var _c1 = M.generatorFunction(c1);

var _d1 = M.generatorFunction(d1);

var _e1 = M.generatorFunction(e1);

var _aw1 = M.asyncGeneratorFunction(aw1);

var _ag1 = M.asyncGeneratorFunction(ag1);

var _ag2 = M.asyncGeneratorFunction(ag2);

var _ag3 = M.asyncGeneratorFunction(ag3);

var _ag4 = M.asyncGeneratorFunction(ag4);

var _ag5 = M.asyncGeneratorFunction(ag5);

var _ag6 = M.asyncFunction(ag6);

var _ag7 = M.asyncGeneratorFunction(ag7);

// *- DEFAULT
import * as G from '@effectful/es';

function v(j) {
  var v = M.generator(_v);
  v._j = j;
  return M.scope(v_1, v_7, v_6);
}

function c() {
  var c = M.generator(_c);
  return M.scope(c_1, c_4, c_3);
}

function d() {
  var d = M.generator(_d);
  return M.scope(d_1, d_5, d_4);
}

function e() {
  var e = M.generator(_e);
  return M.scope(e_1, e_6, e_5);
}

function f() {
  var f = M.generator(_f);
  return M.scope(f_1, f_8, f_7);
}

function v1(z) {
  var v1 = M.generator(_v1);
  v1._z = z;
  return M.scope(v1_1, v1_4, v1_3);
}

function c1(z) {
  var c1 = M.generator(_c1);
  c1._z = z;
  return M.scope(c1_1, c1_4, c1_3);
}

function d1(z, x) {
  var d1 = M.generator(_d1);
  d1._z = z;
  d1._x = x;
  return M.scope(d1_1, d1_5, d1_4);
}

function e1() {
  var e1 = M.generator(_e1);
  return M.scope(e1_1, e1_8, e1_7);
}

function aw1(i) {
  var aw1 = M.asyncGenerator(_aw1);
  aw1._i = i;
  return M.scope(aw1_1, aw1_5, aw1_4);
}

function ag1(i) {
  var ag1 = M.asyncGenerator(_ag1);
  ag1._i = i;
  return M.scope(ag1_1, ag1_8, ag1_7);
}

function ag2(i) {
  var ag2 = M.asyncGenerator(_ag2);
  ag2._i = i;
  return M.scope(ag2_1, ag2_9, ag2_8);
}

function ag3(i) {
  var ag3 = M.asyncGenerator(_ag3);
  ag3._i = i;
  return M.scope(ag3_1, ag3_16, ag3_15);
}

function ag4() {
  var ag4 = M.asyncGenerator(_ag4);
  return M.scope(ag4_1, ag4_5, ag4_4);
}

function ag5(i) {
  var ag5 = M.asyncGenerator(_ag5);
  ag5._i = i;
  return M.scope(ag5_1, ag5_5, ag5_4);
}

function ag6(i) {
  var ag6 = M.async(_ag6);
  ag6._i = i;
  return M.scope(ag6_1, ag6_5);
}

function ag7(i) {
  var ag7 = M.asyncGenerator(_ag7);
  ag7._i = i;
  return M.scope(ag7_1, ag7_16, ag7_15);
}

function v_1(v) {
  v._loop = M.iterator([1, 2, 3]);
  return M.jump(v_2, v_7, v_6);
}

function v_2(v) {
  if (!(v._loop = v._loop.step()).done) {
    v._i = v._loop.value;
    return M.jump(v_3, v_8, v_6);
  } else {
    return M.yldStar(z, v_5, v_7, v_6);
  }
}

function v_3(v) {
  return M.repeat(v._i + v._j, v_2, v_7, v_6);
}

function v_4(v) {
  v._e = v._ex;

  if (v._loop.exit) {
    v._loop.exit();
  }

  throw v._e;
}

function v_5(v, a) {
  console.log(a);
  return M.pure();
}

function v_6(v, r) {
  return M.pure(r);
}

function v_7(v, e) {
  return M.raise(e);
}

function v_8(v, a) {
  v._ex = a;
  return M.jump(v_4, v_7, v_6);
}

function c_1(c) {
  return M.yldStar(z, c_2, c_4, c_3);
}

function c_2(c) {
  return M.pure();
}

function c_3(c, r) {
  return M.pure(r);
}

function c_4(c, e) {
  return M.raise(e);
}

function d_1(d) {
  return M.yld(z, d_2, d_5, d_4);
}

function d_2(d) {
  return M.yldStar(x, d_3, d_5, d_4);
}

function d_3(d) {
  return M.pure(y);
}

function d_4(d, r) {
  return M.pure(r);
}

function d_5(d, e) {
  return M.raise(e);
}

function e_1(e) {
  return M.yld(z, e_2, e_6, e_5);
}

function e_2(e) {
  return M.yldStar(x, e_3, e_6, e_5);
}

function e_3(e, b) {
  if (b) {
    return M.pure(y);
  } else {
    return M.yldStar(a, e_4, e_6, e_5);
  }
}

function e_4(e) {
  return M.pure(e._r);
}

function e_5(e, r) {
  return M.pure(r);
}

function e_6(e, _e) {
  return M.raise(_e);
}

function f_1(f) {
  var a;
  a = eff(1);
  return M.yld(a, f_2, f_8, f_7);
}

function f_2(f) {
  var a;
  a = eff(2);
  return M.yld(a, f_3, f_8, f_7);
}

function f_3(f) {
  var a;
  a = eff(3);
  return M.yldStar(a, f_4, f_8, f_7);
}

function f_4(f, b) {
  var a;
  f._ = b;
  a = eff(3);
  return M.yld(a, f_5, f_8, f_7);
}

function f_5(f, a) {
  var b;
  console.log(f._ + a);
  b = eff(eff(4));
  return M.yldStar(b, f_6, f_8, f_7);
}

function f_6(f) {
  return M.pure(10);
}

function f_7(f, r) {
  return M.pure(r);
}

function f_8(f, e) {
  return M.raise(e);
}

function v1_1(v1) {
  return M.yld(v1._z, v1_2, v1_4, v1_3);
}

function v1_2(v1, a) {
  console.log(a);
  return M.pure();
}

function v1_3(v1, r) {
  return M.pure(r);
}

function v1_4(v1, e) {
  return M.raise(e);
}

function c1_1(c1) {
  return M.yld(c1._z, c1_2, c1_4, c1_3);
}

function c1_2(c1) {
  return M.pure();
}

function c1_3(c1, r) {
  return M.pure(r);
}

function c1_4(c1, e) {
  return M.raise(e);
}

function d1_1(d1) {
  return M.yld(d1._z, d1_2, d1_5, d1_4);
}

function d1_2(d1) {
  return M.yld(d1._x, d1_3, d1_5, d1_4);
}

function d1_3(d1) {
  return M.pure();
}

function d1_4(d1, r) {
  return M.pure(r);
}

function d1_5(d1, e) {
  return M.raise(e);
}

function e1_1(e1) {
  var a;
  a = eff(1);
  return M.yld(a, e1_2, e1_8, e1_7);
}

function e1_2(e1) {
  var a;
  a = eff(2);
  return M.yld(a, e1_3, e1_8, e1_7);
}

function e1_3(e1) {
  var a;
  a = eff(3);
  return M.yld(a, e1_4, e1_8, e1_7);
}

function e1_4(e1, a) {
  var b, c;
  b = eff(3);
  console.log(a + b);
  c = eff(4);
  return M.yld(c, e1_5, e1_8, e1_7);
}

function e1_5(e1, b) {
  var a;
  a = eff(b);
  return M.yld(a, e1_6, e1_8, e1_7);
}

function e1_6(e1) {
  return M.pure();
}

function e1_7(e1, r) {
  return M.pure(r);
}

function e1_8(e1, e) {
  return M.raise(e);
}

function aw1_1(aw1) {
  var a;
  a = eff(aw1._i);
  return M.chain(a, aw1_2, aw1_5, aw1_4);
}

function aw1_2(aw1) {
  var a;
  aw1._i++;
  a = eff(aw1._i);
  return M.chain(a, aw1_3, aw1_5, aw1_4);
}

function aw1_3(aw1) {
  return M.pure();
}

function aw1_4(aw1, r) {
  return M.pure(r);
}

function aw1_5(aw1, e) {
  return M.raise(e);
}

function ag1_1(ag1) {
  ag1._loop = M.iteratorM(something);
  return M.jump(ag1_2, ag1_8, ag1_7);
}

function ag1_2(ag1) {
  return M.chain(ag1._loop.step(), ag1_3, ag1_8, ag1_7);
}

function ag1_3(ag1, c) {
  var a, b;
  b = ag1._loop = c;
  a = b.done;

  if (!a) {
    ag1._j = ag1._loop.value;
    return M.jump(ag1_4, ag1_9, ag1_7);
  } else {
    return M.pure();
  }
}

function ag1_4(ag1) {
  p('H', ag1._i, ag1._j);
  return M.repeat(ag1_2, ag1_8, ag1_7);
}

function ag1_5(ag1) {
  ag1._e = ag1._ex;

  if (ag1._loop.exit) {
    return M.chain(ag1._loop.exit(), ag1_6, ag1_8, ag1_7);
  } else {
    return M.jump(ag1_6, ag1_8, ag1_7);
  }
}

function ag1_6(ag1) {
  throw ag1._e;
}

function ag1_7(ag1, r) {
  return M.pure(r);
}

function ag1_8(ag1, e) {
  return M.raise(e);
}

function ag1_9(ag1, a) {
  ag1._ex = a;
  return M.jump(ag1_5, ag1_8, ag1_7);
}

function ag2_1(ag2) {
  ag2._loop = M.iteratorM(something);
  return M.jump(ag2_2, ag2_9, ag2_8);
}

function ag2_2(ag2, a) {
  return M.chain(ag2._loop.step(), ag2_3, ag2_9, ag2_8);
}

function ag2_3(ag2, c) {
  var a, b;
  b = ag2._loop = c;
  a = b.done;

  if (!a) {
    ag2._j = ag2._loop.value;
    return M.jump(ag2_4, ag2_10, ag2_8);
  } else {
    return M.pure();
  }
}

function ag2_4(ag2) {
  return M.chain(somethingElse, ag2_5, ag2_10, ag2_8);
}

function ag2_5(ag2, a) {
  ag2._i = a;
  return M.repeat(ag2_2, ag2_9, ag2_8);
}

function ag2_6(ag2) {
  ag2._e = ag2._ex;

  if (ag2._loop.exit) {
    return M.chain(ag2._loop.exit(), ag2_7, ag2_9, ag2_8);
  } else {
    return M.jump(ag2_7, ag2_9, ag2_8);
  }
}

function ag2_7(ag2) {
  throw ag2._e;
}

function ag2_8(ag2, r) {
  return M.pure(r);
}

function ag2_9(ag2, e) {
  return M.raise(e);
}

function ag2_10(ag2, a) {
  ag2._ex = a;
  return M.jump(ag2_6, ag2_9, ag2_8);
}

function ag3_1(ag3) {
  return M.yld(ag3._i, ag3_2, ag3_16, ag3_15);
}

function ag3_2(ag3) {
  var a;
  a = eff(ag3._i);
  return M.chain(a, ag3_3, ag3_16, ag3_15);
}

function ag3_3(ag3, a) {
  return M.yld(a, ag3_4, ag3_16, ag3_15);
}

function ag3_4(ag3) {
  ag3._loop = M.iteratorM(something());
  return M.jump(ag3_5, ag3_16, ag3_15);
}

function ag3_5(ag3, a) {
  return M.chain(ag3._loop.step(), ag3_6, ag3_16, ag3_15);
}

function ag3_6(ag3, c) {
  var a, b;
  b = ag3._loop = c;
  a = b.done;

  if (!a) {
    ag3._j = ag3._loop.value;
    return M.jump(ag3_7, ag3_17, ag3_15);
  } else {
    return M.pure(ag3._i);
  }
}

function ag3_7(ag3) {
  return M.yld(ag3._i + ag3._j, ag3_8, ag3_17, ag3_15);
}

function ag3_8(ag3, b) {
  var a;
  a = eff(ag3._j);
  return M.chain(a, ag3_9, ag3_17, ag3_15);
}

function ag3_9(ag3, b) {
  var a;
  a = eff(ag3._i - b);
  return M.chain(a, ag3_10, ag3_17, ag3_15);
}

function ag3_10(ag3, a) {
  return M.yld(a, ag3_11, ag3_17, ag3_15);
}

function ag3_11(ag3, a) {
  var b;
  ag3._i = a;
  b = eff(2, ag3._j);
  return M.yldStar(b, ag3_12, ag3_17, ag3_15);
}

function ag3_12(ag3, a) {
  ag3._i = a;
  return M.repeat(ag3_5, ag3_16, ag3_15);
}

function ag3_13(ag3) {
  ag3._e = ag3._ex;

  if (ag3._loop.exit) {
    return M.chain(ag3._loop.exit(), ag3_14, ag3_16, ag3_15);
  } else {
    return M.jump(ag3_14, ag3_16, ag3_15);
  }
}

function ag3_14(ag3) {
  throw ag3._e;
}

function ag3_15(ag3, r) {
  return M.pure(r);
}

function ag3_16(ag3, e) {
  return M.raise(e);
}

function ag3_17(ag3, a) {
  ag3._ex = a;
  return M.jump(ag3_13, ag3_16, ag3_15);
}

function ag4_1(ag4) {
  var a;
  a = eff2();
  return M.yld(a, ag4_2, ag4_5, ag4_4);
}

function ag4_2(ag4, b) {
  var a;
  a = eff1(b);
  return M.chain(a, ag4_3, ag4_5, ag4_4);
}

function ag4_3(ag4) {
  return M.pure();
}

function ag4_4(ag4, r) {
  return M.pure(r);
}

function ag4_5(ag4, e) {
  return M.raise(e);
}

function ag5_1(ag5) {
  return M.chain(ag5._i, ag5_2, ag5_5, ag5_4);
}

function ag5_2(ag5, a) {
  return M.chain(a, ag5_3, ag5_5, ag5_4);
}

function ag5_3(ag5) {
  return M.pure();
}

function ag5_4(ag5, r) {
  return M.pure(r);
}

function ag5_5(ag5, e) {
  return M.raise(e);
}

function ag6_1(ag6) {
  return M.chain(ag6._i, ag6_2, ag6_5);
}

function ag6_2(ag6, a) {
  return M.chain(a, ag6_3, ag6_5);
}

function ag6_3(ag6, a) {
  return M.chain(a, ag6_4, ag6_5);
}

function ag6_4(ag6) {
  return M.pure();
}

function ag6_5(ag6, e) {
  return M.raise(e);
}

function ag7_1(ag7) {
  var a;
  a = eff1(ag7._i);
  return M.yld(a, ag7_2, ag7_16, ag7_15);
}

function ag7_2(ag7) {
  var a;
  ag7._ = eff(2, ag7._i);
  a = eff3();
  return M.chain(a, ag7_3, ag7_16, ag7_15);
}

function ag7_3(ag7, b) {
  var a;
  ag7._1 = b;
  a = eff4();
  return M.yld(a, ag7_4, ag7_16, ag7_15);
}

function ag7_4(ag7, b) {
  var a;
  ag7._2 = b;
  a = eff5();
  return M.chain(a, ag7_5, ag7_16, ag7_15);
}

function ag7_5(ag7, a) {
  return M.chain(a, ag7_6, ag7_16, ag7_15);
}

function ag7_6(ag7, b) {
  var a;
  ag7._3 = b;
  a = eff6();
  return M.chain(a, ag7_7, ag7_16, ag7_15);
}

function ag7_7(ag7, a) {
  return M.yld(a, ag7_8, ag7_16, ag7_15);
}

function ag7_8(ag7, b) {
  var a;
  ag7._4 = b;
  a = eff7();
  return M.yld(a, ag7_9, ag7_16, ag7_15);
}

function ag7_9(ag7, a) {
  return M.yld(a, ag7_10, ag7_16, ag7_15);
}

function ag7_10(ag7, b) {
  var a;
  ag7._5 = b;
  a = eff8();
  return M.yld(a, ag7_11, ag7_16, ag7_15);
}

function ag7_11(ag7, a) {
  return M.chain(a, ag7_12, ag7_16, ag7_15);
}

function ag7_12(ag7, b) {
  var a;
  a = eff1(ag7._, ag7._1, ag7._2, ag7._3, ag7._4, ag7._5, b);
  return M.chain(a, ag7_13, ag7_16, ag7_15);
}

function ag7_13(ag7, a) {
  return M.yld(a, ag7_14, ag7_16, ag7_15);
}

function ag7_14(ag7) {
  return M.pure();
}

function ag7_15(ag7, r) {
  return M.pure(r);
}

function ag7_16(ag7, e) {
  return M.raise(e);
}