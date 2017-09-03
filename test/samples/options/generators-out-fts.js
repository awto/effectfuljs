// *- DEFAULT
import * as G from '@effectful/es';

function v(j) {
  var v_v = {
    j,
    i: undefined
  };
  return M.scope(v_1, v_v);
}

function c() {
  return M.scope(c_1);
}

function d() {
  return M.scope(d_1);
}

function e() {
  return M.scope(e_1);
}

function f() {
  return M.scope(f_1);
}

function v1(z) {
  var v1_v = {
    z
  };
  return M.scope(v1_1, v1_v);
}

function c1(z) {
  var c1_v = {
    z
  };
  return M.scope(c1_1, c1_v);
}

function d1(z, x) {
  var d1_v = {
    z,
    x
  };
  return M.scope(d1_1, d1_v);
}

function e1() {
  return M.scope(e1_1);
}

function aw1(i) {
  return M.scope(aw1_1, i);
}

function ag1(i) {
  var ag1_v = {
    i,
    j: undefined
  };
  return M.scope(ag1_1, ag1_v);
}

function ag2(i) {
  var ag2_v = {
    j: undefined
  };
  return M.scope(ag2_1, ag2_v);
}

function ag3(i) {
  var ag3_v = {
    j: undefined
  };
  return M.scope(ag3_1, i, ag3_v);
}

function ag4() {
  return M.scope(ag4_1);
}

function ag5(i) {
  var ag5_v = {
    i
  };
  return M.scope(ag5_1, ag5_v);
}

function ag6(i) {
  var ag6_v = {
    i
  };
  return M.scope(ag6_1, ag6_v);
}

function ag7(i) {
  var ag7_v = {
    i
  };
  return M.scope(ag7_1, ag7_v);
}

function v_1(v_v) {
  var loop;
  loop = M.iterator([1, 2, 3]);
  return v_2(v_v, loop);
}

function v_2(v_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return v_3(v_v, loop);else {
    return M.yldStarB(z, v_4);
  }
}

function v_3(v_v, loop) {
  v_v.i = loop.value;
  return M.yld(v_v.i + v_v.j, v_2, v_v, loop);
}

function v_4(a) {
  console.log(a);
  return M.pure();
}

function c_1() {
  return M.yldStar(z, c_2);
}

function c_2() {
  return M.pure();
}

function d_1() {
  return M.yld(z, d_2);
}

function d_2() {
  return M.yldStar(x, d_3);
}

function d_3() {
  return M.pure(y);
}

function e_1() {
  return M.yld(z, e_2);
}

function e_2() {
  return M.yldStarB(x, e_3);
}

function e_3(b) {
  if (b) return e_4();else {
    return M.yldStar(a, e_5);
  }
}

function e_4() {
  return M.pure(y);
}

function e_5() {
  return M.pure();
}

function f_1() {
  var a;
  a = eff(1);
  return M.yld(a, f_2);
}

function f_2() {
  var a;
  a = eff(2);
  return M.yld(a, f_3);
}

function f_3() {
  var a;
  a = eff(3);
  return M.yldStarB(a, f_4);
}

function f_4(a) {
  var b;
  b = eff(3);
  return M.yldB(b, f_5, a);
}

function f_5(b, a) {
  var c, d;
  console.log(a + b);
  d = eff(4);
  c = eff(d);
  return M.yldStar(c, f_6);
}

function f_6() {
  return M.pure(10);
}

function v1_1(v1_v) {
  return M.yldB(v1_v.z, v1_2);
}

function v1_2(a) {
  console.log(a);
  return M.pure();
}

function c1_1(c1_v) {
  return M.yld(c1_v.z, c1_2);
}

function c1_2() {
  return M.pure();
}

function d1_1(d1_v) {
  return M.yld(d1_v.z, d1_2, d1_v);
}

function d1_2(d1_v) {
  return M.yld(d1_v.x, d1_3);
}

function d1_3() {
  return M.pure();
}

function e1_1() {
  var a;
  a = eff(1);
  return M.yld(a, e1_2);
}

function e1_2() {
  var a;
  a = eff(2);
  return M.yld(a, e1_3);
}

function e1_3() {
  var a;
  a = eff(3);
  return M.yldB(a, e1_4);
}

function e1_4(a) {
  var b, c;
  b = eff(3);
  console.log(a + b);
  c = eff(4);
  return M.yldB(c, e1_5);
}

function e1_5(b) {
  var a;
  a = eff(b);
  return M.yld(a, e1_6);
}

function e1_6() {
  return M.pure();
}

function aw1_1(i) {
  var a;
  a = eff(i);
  return M.chain(a, aw1_2, i);
}

function aw1_2(i) {
  var a;
  i++;
  a = eff(i);
  return M.chain(a, aw1_3);
}

function aw1_3() {
  return M.pure();
}

function ag1_1(ag1_v) {
  var loop;
  loop = M.iteratorM(something);
  return ag1_2(ag1_v, loop);
}

function ag1_2(ag1_v, loop) {
  return M.chainB(loop.incrM(), ag1_3, ag1_v);
}

function ag1_3(loop, ag1_v) {
  var a;
  if (!a.done) return ag1_4(ag1_v, loop);else {
    return M.pure();
  }
}

function ag1_4(ag1_v, loop) {
  ag1_v.j = loop.value;
  p('H', ag1_v.i, ag1_v.j);
  return M.jR(ag1_2, ag1_v, loop);
}

function ag2_1(ag2_v) {
  var loop;
  loop = M.iteratorM(something);
  return ag2_2(ag2_v, loop);
}

function ag2_2(ag2_v, loop) {
  return M.chainB(loop.incrM(), ag2_3, ag2_v);
}

function ag2_3(loop, ag2_v) {
  var a;
  if (!a.done) return ag2_4(ag2_v, loop);else {
    return M.pure();
  }
}

function ag2_4(ag2_v, loop) {
  ag2_v.j = loop.value;
  return M.chainB(somethingElse, ag2_5, ag2_v, loop);
}

function ag2_5(i, ag2_v, loop) {
  return M.jR(ag2_2, ag2_v, loop);
}

function ag3_1(i, ag3_v) {
  return M.yld(i, ag3_2, i, ag3_v);
}

function ag3_2(i, ag3_v) {
  var a;
  a = eff(i);
  return M.chainB(a, ag3_3, i, ag3_v);
}

function ag3_3(a, i, ag3_v) {
  return M.yld(a, ag3_4, i, ag3_v);
}

function ag3_4(i, ag3_v) {
  var loop;
  loop = M.iteratorM(something());
  return ag3_5(i, ag3_v, loop);
}

function ag3_5(i, ag3_v, loop) {
  return M.chainB(loop.incrM(), ag3_6, i, ag3_v);
}

function ag3_6(loop, i, ag3_v) {
  var a;
  if (!a.done) return ag3_7(i, ag3_v, loop);else {
    return M.pure(i);
  }
}

function ag3_7(i, ag3_v, loop) {
  ag3_v.j = loop.value;
  return M.yld(i + ag3_v.j, ag3_8, i, ag3_v, loop);
}

function ag3_8(i, ag3_v, loop) {
  var a;
  a = eff(ag3_v.j);
  return M.chainB(a, ag3_9, i, ag3_v, loop);
}

function ag3_9(b, i, ag3_v, loop) {
  var a;
  a = eff(i - b);
  return M.chainB(a, ag3_10, ag3_v, loop);
}

function ag3_10(a, ag3_v, loop) {
  return M.yldB(a, ag3_11, ag3_v, loop);
}

function ag3_11(i, ag3_v, loop) {
  var a;
  a = eff(2, ag3_v.j);
  return M.yldStarB(a, ag3_12, ag3_v, loop);
}

function ag3_12(i, ag3_v, loop) {
  return M.jR(ag3_5, i, ag3_v, loop);
}

function ag4_1() {
  var a;
  a = eff2();
  return M.yldB(a, ag4_2);
}

function ag4_2(b) {
  var a;
  a = eff1(b);
  return M.chain(a, ag4_3);
}

function ag4_3() {
  return M.pure();
}

function ag5_1(ag5_v) {
  return M.chainB(ag5_v.i, ag5_2);
}

function ag5_2(a) {
  return M.chain(a, ag5_3);
}

function ag5_3() {
  return M.pure();
}

function ag6_1(ag6_v) {
  return M.chainB(ag6_v.i, ag6_2);
}

function ag6_2(a) {
  return M.chainB(a, ag6_3);
}

function ag6_3(a) {
  return M.chain(a, ag6_4);
}

function ag6_4() {
  return M.pure();
}

function ag7_1(ag7_v) {
  var a;
  a = eff1(ag7_v.i);
  return M.yld(a, ag7_2, ag7_v);
}

function ag7_2(ag7_v) {
  var b, a;
  b = eff(2, ag7_v.i);
  a = eff3();
  return M.chainB(a, ag7_3, b);
}

function ag7_3(c, b) {
  var a;
  a = eff4();
  return M.yldB(a, ag7_4, b, c);
}

function ag7_4(d, b, c) {
  var a;
  a = eff5();
  return M.chainB(a, ag7_5, b, c, d);
}

function ag7_5(a, b, c, d) {
  return M.chainB(a, ag7_6, b, c, d);
}

function ag7_6(e, b, c, d) {
  var a;
  a = eff6();
  return M.chainB(a, ag7_7, b, c, d, e);
}

function ag7_7(a, b, c, d, e) {
  return M.yldB(a, ag7_8, b, c, d, e);
}

function ag7_8(f, b, c, d, e) {
  var a;
  a = eff7();
  return M.yldB(a, ag7_9, b, c, d, e, f);
}

function ag7_9([a, b, c, d, e, f]) {
  return M.yldB(a, ag7_10, b, c, d, e, f);
}

function ag7_10([g, b, c, d, e, f]) {
  var a;
  a = eff8();
  return M.yldB(a, ag7_11, [b, c, d, e, f, g]);
}

function ag7_11([a, b, c, d, e, f, g]) {
  return M.chainB(a, ag7_12, [b, c, d, e, f, g]);
}

function ag7_12([h, b, c, d, e, f, g]) {
  var a;
  a = eff1(b, c, d, e, f, g, h);
  return M.chainB(a, ag7_13);
}

function ag7_13(a) {
  return M.yld(a, ag7_14);
}

function ag7_14() {
  return M.pure();
}