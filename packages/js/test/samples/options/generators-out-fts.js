var _v = M.generatorFunction(v);

var _c = M.generatorFunction(c);

var _d = M.generatorFunction(d);

var e1 = M.generatorFunction(_e);

var _f = M.generatorFunction(f);

var _v1 = M.generatorFunction(v1);

var _c1 = M.generatorFunction(c1);

var _d1 = M.generatorFunction(d1);

var e11 = M.generatorFunction(_e1);

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
  return M.scope(c_1, c_4, c_3);
}

function d() {
  return M.scope(d_1, d_5, d_4);
}

function _e() {
  return M.scope(e_1, e_6, e_5);
}

function f() {
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

function _e1() {
  return M.scope(e1_1, e1_8, e1_7);
}

function aw1(i) {
  return M.scope(aw1_1, aw1_5, aw1_4, i);
}

function ag1(i) {
  var ag1 = M.asyncGenerator(_ag1);
  ag1._i = i;
  return M.scope(ag1_1, ag1_8, ag1_7);
}

function ag2(i) {
  var ag2 = M.asyncGenerator(_ag2);
  return M.scope(ag2_1, ag2_9, ag2_8);
}

function ag3(i) {
  var ag3 = M.asyncGenerator(_ag3);
  return M.scope(ag3_1, ag3_16, ag3_15, i);
}

function ag4() {
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
  var loop;
  loop = M.iterator([1, 2, 3]);
  return M.jump(v_2, v_7, v_6, loop);
}

function v_2(v, loop) {
  if (!(loop = loop.step()).done) {
    v._i = loop.value;
    return M.jump(v_3, v_8, v_6, loop);
  } else {
    return M.yldStar(z, v_5, v_7, v_6);
  }
}

function v_3(v, loop) {
  return M.repeat(v._i + v._j, v_2, v_7, v_6, loop);
}

function v_4(v, loop, ex) {
  e = ex;

  if (loop.exit) {
    loop.exit();
  }

  throw e;
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

function v_8(v, a, loop) {
  return M.jump(v_4, v_7, v_6, loop, a);
}

function c_1() {
  return M.yldStar(z, c_2, c_4, c_3);
}

function c_2() {
  return M.pure();
}

function c_3(r) {
  return M.pure(r);
}

function c_4(e) {
  return M.raise(e);
}

function d_1() {
  return M.yld(z, d_2, d_5, d_4);
}

function d_2() {
  return M.yldStar(x, d_3, d_5, d_4);
}

function d_3() {
  return M.pure(y);
}

function d_4(r) {
  return M.pure(r);
}

function d_5(e) {
  return M.raise(e);
}

function e_1() {
  return M.yld(z, e_2, e_6, e_5);
}

function e_2() {
  return M.yldStar(x, e_3, e_6, e_5);
}

function e_3(b) {
  if (b) {
    return M.pure(y);
  } else {
    return M.yldStar(a, e_4, e_6, e_5);
  }
}

function e_4() {
  var r;
  return M.pure(r);
}

function e_5(r) {
  return M.pure(r);
}

function e_6(e) {
  return M.raise(e);
}

function f_1() {
  var a;
  a = eff(1);
  return M.yld(a, f_2, f_8, f_7);
}

function f_2() {
  var a;
  a = eff(2);
  return M.yld(a, f_3, f_8, f_7);
}

function f_3() {
  var a;
  a = eff(3);
  return M.yldStar(a, f_4, f_8, f_7);
}

function f_4(a) {
  var b;
  b = eff(3);
  return M.yld(b, f_5, f_8, f_7, a);
}

function f_5(b, a) {
  var c;
  console.log(a + b);
  c = eff(eff(4));
  return M.yldStar(c, f_6, f_8, f_7);
}

function f_6() {
  return M.pure(10);
}

function f_7(r) {
  return M.pure(r);
}

function f_8(e) {
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

function e1_1() {
  var a;
  a = eff(1);
  return M.yld(a, e1_2, e1_8, e1_7);
}

function e1_2() {
  var a;
  a = eff(2);
  return M.yld(a, e1_3, e1_8, e1_7);
}

function e1_3() {
  var a;
  a = eff(3);
  return M.yld(a, e1_4, e1_8, e1_7);
}

function e1_4(a) {
  var b, c;
  b = eff(3);
  console.log(a + b);
  c = eff(4);
  return M.yld(c, e1_5, e1_8, e1_7);
}

function e1_5(b) {
  var a;
  a = eff(b);
  return M.yld(a, e1_6, e1_8, e1_7);
}

function e1_6() {
  return M.pure();
}

function e1_7(r) {
  return M.pure(r);
}

function e1_8(e) {
  return M.raise(e);
}

function aw1_1(i) {
  var a;
  a = eff(i);
  return M.chain(a, aw1_2, aw1_5, aw1_4, i);
}

function aw1_2(i) {
  var a;
  i++;
  a = eff(i);
  return M.chain(a, aw1_3, aw1_5, aw1_4);
}

function aw1_3() {
  return M.pure();
}

function aw1_4(r) {
  return M.pure(r);
}

function aw1_5(e) {
  return M.raise(e);
}

function ag1_1(ag1) {
  var loop;
  loop = M.iteratorM(something);
  return M.jump(ag1_2, ag1_8, ag1_7, loop);
}

function ag1_2(ag1, loop) {
  return M.chain(loop.step(), ag1_3, ag1_8, ag1_7);
}

function ag1_3(ag1, c) {
  var loop, a, b;
  b = loop = c;
  a = b.done;

  if (!a) {
    ag1._j = loop.value;
    return M.jump(ag1_4, ag1_9, ag1_7, loop);
  } else {
    return M.pure();
  }
}

function ag1_4(ag1, loop) {
  p('H', ag1._i, ag1._j);
  return M.repeat(ag1_2, ag1_8, ag1_7, loop);
}

function ag1_5(ag1, loop, ex) {
  e = ex;

  if (loop.exit) {
    return M.chain(loop.exit(), ag1_6, ag1_8, ag1_7, loop);
  } else {
    return M.jump(ag1_6, ag1_8, ag1_7, loop);
  }
}

function ag1_6(ag1, loop) {
  throw e;
}

function ag1_7(ag1, r) {
  return M.pure(r);
}

function ag1_8(ag1, e) {
  return M.raise(e);
}

function ag1_9(ag1, a, loop) {
  return M.jump(ag1_5, ag1_8, ag1_7, loop, a);
}

function ag2_1(ag2) {
  var loop;
  loop = M.iteratorM(something);
  return M.jump(ag2_2, ag2_9, ag2_8, loop);
}

function ag2_2(ag2, a, loop) {
  return M.chain(loop.step(), ag2_3, ag2_9, ag2_8);
}

function ag2_3(ag2, c) {
  var loop, a, b;
  b = loop = c;
  a = b.done;

  if (!a) {
    ag2._j = loop.value;
    return M.jump(ag2_4, ag2_10, ag2_8, loop);
  } else {
    return M.pure();
  }
}

function ag2_4(ag2, loop) {
  return M.chain(somethingElse, ag2_5, ag2_10, ag2_8, loop);
}

function ag2_5(ag2, a, loop) {
  var i;
  i = a;
  return M.repeat(ag2_2, ag2_9, ag2_8, loop);
}

function ag2_6(ag2, loop, ex) {
  e = ex;

  if (loop.exit) {
    return M.chain(loop.exit(), ag2_7, ag2_9, ag2_8, loop);
  } else {
    return M.jump(ag2_7, ag2_9, ag2_8, loop);
  }
}

function ag2_7(ag2, loop) {
  throw e;
}

function ag2_8(ag2, r) {
  return M.pure(r);
}

function ag2_9(ag2, e) {
  return M.raise(e);
}

function ag2_10(ag2, a, loop) {
  return M.jump(ag2_6, ag2_9, ag2_8, loop, a);
}

function ag3_1(ag3, i) {
  return M.yld(i, ag3_2, ag3_16, ag3_15, i);
}

function ag3_2(ag3, i) {
  var a;
  a = eff(i);
  return M.chain(a, ag3_3, ag3_16, ag3_15, i);
}

function ag3_3(ag3, a, i) {
  return M.yld(a, ag3_4, ag3_16, ag3_15, i);
}

function ag3_4(ag3, i) {
  var loop;
  loop = M.iteratorM(something());
  return M.jump(ag3_5, ag3_16, ag3_15, i, loop);
}

function ag3_5(ag3, a, i, loop) {
  return M.chain(loop.step(), ag3_6, ag3_16, ag3_15, i);
}

function ag3_6(ag3, c, i) {
  var loop, a, b;
  b = loop = c;
  a = b.done;

  if (!a) {
    ag3._j = loop.value;
    return M.jump(ag3_7, ag3_17, ag3_15, i, loop);
  } else {
    return M.pure(i);
  }
}

function ag3_7(ag3, i, loop) {
  return M.yld(i + ag3._j, ag3_8, ag3_17, ag3_15, i, loop);
}

function ag3_8(ag3, b, i, loop) {
  var a;
  a = eff(ag3._j);
  return M.chain(a, ag3_9, ag3_17, ag3_15, i, loop);
}

function ag3_9(ag3, b, i, loop) {
  var a;
  a = eff(i - b);
  return M.chain(a, ag3_10, ag3_17, ag3_15, i, loop);
}

function ag3_10(ag3, a, i, loop) {
  return M.yld(a, ag3_11, ag3_17, ag3_15, i, loop);
}

function ag3_11(ag3, a, _i, loop) {
  var i, b;
  i = a;
  b = eff(2, ag3._j);
  return M.yldStar(b, ag3_12, ag3_17, ag3_15, i, loop);
}

function ag3_12(ag3, a, _i, loop) {
  var i;
  i = a;
  return M.repeat(ag3_5, ag3_16, ag3_15, i, loop);
}

function ag3_13(ag3, i, loop, ex) {
  e = ex;

  if (loop.exit) {
    return M.chain(loop.exit(), ag3_14, ag3_16, ag3_15, i, loop);
  } else {
    return M.jump(ag3_14, ag3_16, ag3_15, i, loop);
  }
}

function ag3_14(ag3, i, loop) {
  throw e;
}

function ag3_15(ag3, r) {
  return M.pure(r);
}

function ag3_16(ag3, e) {
  return M.raise(e);
}

function ag3_17(ag3, a, i, loop) {
  return M.jump(ag3_13, ag3_16, ag3_15, i, loop, a);
}

function ag4_1() {
  var a;
  a = eff2();
  return M.yld(a, ag4_2, ag4_5, ag4_4);
}

function ag4_2(b) {
  var a;
  a = eff1(b);
  return M.chain(a, ag4_3, ag4_5, ag4_4);
}

function ag4_3() {
  return M.pure();
}

function ag4_4(r) {
  return M.pure(r);
}

function ag4_5(e) {
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
  var a, b;
  a = eff(2, ag7._i);
  b = eff3();
  return M.chain(b, ag7_3, ag7_16, ag7_15, a);
}

function ag7_3(ag7, b, a) {
  var c;
  c = eff4();
  return M.yld(c, ag7_4, ag7_16, ag7_15, a, b);
}

function ag7_4(ag7, c, a, b) {
  var d;
  d = eff5();
  return M.chain(d, ag7_5, ag7_16, ag7_15, a, b, c);
}

function ag7_5(ag7, d, a, b, c) {
  return M.chain(d, ag7_6, ag7_16, ag7_15, a, b, c);
}

function ag7_6(ag7, d, a, b, c) {
  var e;
  e = eff6();
  return M.chain(e, ag7_7, ag7_16, ag7_15, a, b, c, d);
}

function ag7_7(ag7, e, a, b, c, d) {
  return M.yld(e, ag7_8, ag7_16, ag7_15, a, b, c, d);
}

function ag7_8(ag7, e, a, b, c, d) {
  var f;
  f = eff7();
  return M.yld(f, ag7_9, ag7_16, ag7_15, a, b, c, d, e);
}

function ag7_9(ag7, f, a, b, c, d, e) {
  return M.yld(f, ag7_10, ag7_16, ag7_15, a, b, c, d, e);
}

function ag7_10(ag7, f, a, b, c, d, e) {
  var g;
  g = eff8();
  return M.yld(g, ag7_11, ag7_16, ag7_15, [a, b, c, d, e, f]);
}

function ag7_11(ag7, g, [a, b, c, d, e, f]) {
  return M.chain(g, ag7_12, ag7_16, ag7_15, [a, b, c, d, e, f]);
}

function ag7_12(ag7, h, [a, b, c, d, e, f]) {
  var g;
  g = eff1(a, b, c, d, e, f, h);
  return M.chain(g, ag7_13, ag7_16, ag7_15);
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