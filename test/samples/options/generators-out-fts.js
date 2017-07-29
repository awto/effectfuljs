// *- DEFAULT
import * as G from '@effectful/es';

function v_1(j) {
  var loop;
  loop = G.iterator([1, 2, 3]);
  return v_2(j, loop);
}

function v_2(j, loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return v_3(j, loop);else {
    return G.yldStarMB(z, v_4);
  }
}

function v_3(j, loop) {
  var i;
  i = loop.value;
  return G.yldM(i + j, v_2, j, loop);
}

function v_4(a) {
  console.log(a);
  return G.pure();
}

function c_1() {
  return G.yldStarM(z, G.pure);
}

function d_1() {
  return G.yldM(z, d_2);
}

function d_2() {
  return G.yldStarM(x, d_3);
}

function d_3() {
  return G.pure(y);
}

function e_1() {
  return G.yldM(z, e_2);
}

function e_2() {
  return G.yldStarMB(x, e_3);
}

function e_3(a) {
  if (a) {
    return G.pure(y);
  }
}

function e_4() {
  return G.yldStarM(a, G.pure);
}

function f_1() {
  var a;
  a = eff(1);
  return G.yldM(a, f_2);
}

function f_2() {
  var a;
  a = eff(2);
  return G.yldM(a, f_3);
}

function f_3() {
  var a;
  a = eff(3);
  return G.yldStarMB(a, f_4);
}

function f_4(a) {
  var b;
  b = eff(3);
  return G.yldMB(b, f_5, a);
}

function f_5(b, a) {
  var c, d;
  console.log(a + b);
  d = eff(4);
  c = eff(d);
  return G.yldStarM(c, f_6);
}

function f_6() {
  return G.pure(10);
}

function v1_1(z) {
  return G.yldMB(z, v1_2);
}

function v1_2(a) {
  console.log(a);
  return G.pure();
}

function c1_1(z) {
  return G.yldM(z, G.pure);
}

function d1_1(z, x) {
  return G.yldM(z, d1_2, x);
}

function d1_2(x) {
  return G.yldM(x, G.pure);
}

function e1_1() {
  var a;
  a = eff(1);
  return G.yldM(a, e1_2);
}

function e1_2() {
  var a;
  a = eff(2);
  return G.yldM(a, e1_3);
}

function e1_3() {
  var a;
  a = eff(3);
  return G.yldMB(a, e1_4);
}

function e1_4(a) {
  var b, c;
  b = eff(3);
  console.log(a + b);
  c = eff(4);
  return G.yldMB(c, e1_5);
}

function e1_5(b) {
  var a;
  a = eff(b);
  return G.yldM(a, G.pure);
}

function aw1_1(i) {
  var a;
  a = eff(i);
  return G.jM(a, aw1_2, i);
}

function aw1_2(i) {
  var a;
  i++;
  a = eff(i);
  return a;
}

function ag1_1(i) {
  var loop;
  loop = G.iteratorM(something);
  return ag1_2(i, loop);
}

function ag1_2(i, loop) {
  return G.jMB(loop.step(), ag1_3, i);
}

function ag1_3(loop, i) {
  var a;
  if (!a.done) return ag1_4(i, loop);else return G.pure();
}

function ag1_4(i, loop) {
  var j;
  j = loop.value;
  p('H', i, j);
  return G.jR(ag1_2, i, loop);
}

function ag2_1() {
  var loop;
  loop = G.iteratorM(something);
  return ag2_2(loop);
}

function ag2_2(loop) {
  return G.jMB(loop.step(), ag2_3);
}

function ag2_3(loop) {
  var a;
  if (!a.done) return ag2_4(loop);else return G.pure();
}

function ag2_4(loop) {
  var j;
  j = loop.value;
  return G.jMB(somethingElse, ag2_5, loop);
}

function ag2_5(i, loop) {
  return G.jR(ag2_2, loop);
}

function ag3_1(i) {
  return G.yldM(i, ag3_2, i);
}

function ag3_2(i) {
  var a;
  a = eff(i);
  return G.jMB(a, ag3_3, i);
}

function ag3_3(a, i) {
  return G.yldM(a, ag3_4, i);
}

function ag3_4(i) {
  var loop;
  loop = G.iteratorM(something());
  return ag3_5(i, loop);
}

function ag3_5(i, loop) {
  return G.jMB(loop.step(), ag3_6, i);
}

function ag3_6(loop, i) {
  var a;
  if (!a.done) return ag3_7(i, loop);else {
    return G.pure(i);
  }
}

function ag3_7(i, loop) {
  var j;
  j = loop.value;
  return G.yldM(i + j, ag3_8, i, j, loop);
}

function ag3_8(i, j, loop) {
  var a;
  a = eff(j);
  return G.jMB(a, ag3_9, i, j, loop);
}

function ag3_9(b, i, j, loop) {
  var a;
  a = eff(i - b);
  return G.jMB(a, ag3_10, j, loop);
}

function ag3_10(a, j, loop) {
  return G.yldMB(a, ag3_11, j, loop);
}

function ag3_11(i, j, loop) {
  var a;
  a = eff(2, j);
  return G.yldStarMB(a, ag3_12, loop);
}

function ag3_12(i, loop) {
  return G.jR(ag3_5, i, loop);
}

function ag4_1() {
  var a;
  a = eff2();
  return G.yldMB(a, ag4_2);
}

function ag4_2(b) {
  var a;
  a = eff1(b);
  return a;
}

function ag5_1(i) {
  return G.jMB(i, ag5_2);
}

function ag5_2(a) {
  return a;
}

function ag6_1(i) {
  return G.jMB(i, ag6_2);
}

function ag6_2(a) {
  return G.jMB(a, ag6_3);
}

function ag6_3(a) {
  return a;
}

function ag7_1(i) {
  var a;
  a = eff1(i);
  return G.yldM(a, ag7_2, i);
}

function ag7_2(i) {
  var b, a;
  b = eff(2, i);
  a = eff3();
  return G.jMB(a, ag7_3, b);
}

function ag7_3(c, b) {
  var a;
  a = eff4();
  return G.yldMB(a, ag7_4, b, c);
}

function ag7_4(d, b, c) {
  var a;
  a = eff5();
  return G.jMB(a, ag7_5, b, c, d);
}

function ag7_5(a, b, c, d) {
  return G.jMB(a, ag7_6, b, c, d);
}

function ag7_6(e, b, c, d) {
  var a;
  a = eff6();
  return G.jMB(a, ag7_7, b, c, d, e);
}

function ag7_7(a, b, c, d, e) {
  return G.yldMB(a, ag7_8, b, c, d, e);
}

function ag7_8(f, b, c, d, e) {
  var a;
  a = eff7();
  return G.yldMB(a, ag7_9, b, c, d, e, f);
}

function ag7_9(a, b, c, d, e, f) {
  return G.yldMB(a, ag7_10, b, c, d, e, f);
}

function ag7_10(g, b, c, d, e, f) {
  var a;
  a = eff8();
  return G.yldMB(a, ag7_11, [b, c, d, e, f, g]);
}

function ag7_11(a, [b, c, d, e, f, g]) {
  return G.jMB(a, ag7_12, [b, c, d, e, f, g]);
}

function ag7_12(h, [b, c, d, e, f, g]) {
  var a;
  a = eff1(b, c, d, e, f, g, h);
  return G.jMB(a, ag7_13);
}

function ag7_13(a) {
  return G.yldM(a, G.pure);
}

function v(j) {
  return G.scope(v_1, j);
}

function c() {
  return G.scope(c_1);
}

function d() {
  return G.scope(d_1);
}

function e() {
  return G.scope(e_1);
}

function f() {
  return G.scope(f_1);
}

function v1(z) {
  return G.scope(v1_1, z);
}

function c1(z) {
  return G.scope(c1_1, z);
}

function d1(z, x) {
  return G.scope(d1_1, z, x);
}

function e1() {
  return G.scope(e1_1);
}

function aw1(i) {
  return G.scope(aw1_1, i);
}

function ag1(i) {
  return G.scope(ag1_1, i);
}

function ag2(i) {
  return G.scope(ag2_1);
}

function ag3(i) {
  return G.scope(ag3_1, i);
}

function ag4() {
  return G.scope(ag4_1);
}

function ag5(i) {
  return G.scope(ag5_1, i);
}

function ag6(i) {
  return G.scope(ag6_1, i);
}

function ag7(i) {
  return G.scope(ag7_1, i);
}