// *- DEFAULT
import * as G from '@effectful/es';

function v_1(_v_v) {
  var v_v;
  v_v = {
    j
  };
  _v_v.loop = G.iterator([1, 2, 3]);
  return v_2(v_v);
}

function v_2(v_v) {
  var _v_v;

  _v_v = {
    i: undefined,
    loop: undefined
  };
  if (_v_v.loop = _v_v.loop()) return v_3(v_v, _v_v);else {
    return G.yldStarMB(z, v_4);
  }
}

function v_3(v_v, _v_v) {
  _v_v.i = _v_v.loop.value;
  return G.yldM1(_v_v.i + v_v.j, v_2, v_v);
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
  return G.yldM(eff(1), f_2);
}

function f_2() {
  return G.yldM(eff(2), f_3);
}

function f_3() {
  var a;
  a = eff(3);
  return G.yldStarMB(a, f_4);
}

function f_4(a) {
  var b;
  b = eff(3);
  return G.yldMB1(b, f_5, a);
}

function f_5(b, a) {
  console.log(a + b);
  return G.yldStarM(eff(eff(4)), f_6);
}

function f_6() {
  return G.pure(10);
}

function v1_1() {
  var v1_v;
  v1_v = {
    z: _z
  };
  return G.yldMB(v1_v.z, v1_2);
}

function v1_2(a) {
  console.log(a);
  return G.pure();
}

function c1_1() {
  var c1_v;
  c1_v = {
    z: z1
  };
  return G.yldM(c1_v.z, G.pure);
}

function d1_1() {
  var d1_v;
  d1_v = {
    z: z2,
    x: _x
  };
  return G.yldM1(d1_v.z, d1_2, d1_v);
}

function d1_2(d1_v) {
  return G.yldM(d1_v.x, G.pure);
}

function e1_1() {
  return G.yldM(eff(1), e1_2);
}

function e1_2() {
  return G.yldM(eff(2), e1_3);
}

function e1_3() {
  var a;
  a = eff(3);
  return G.yldMB(a, e1_4);
}

function e1_4(a) {
  var b;
  console.log(a + eff(3));
  b = eff(4);
  return G.yldMB(b, e1_5);
}

function e1_5(a) {
  return G.yldM(eff(a), G.pure);
}

function aw1_1() {
  var aw1_v;
  aw1_v = {
    i
  };
  return G.jM1(eff(aw1_v.i), aw1_2, aw1_v);
}

function aw1_2(aw1_v) {
  aw1_v.i++;
  return eff(aw1_v.i);
}

function ag1_1(_ag1_v) {
  var ag1_v;
  ag1_v = {
    i: _i
  };
  _ag1_v.loop = G.iteratorM(something);
  return ag1_2(ag1_v);
}

function ag1_2(ag1_v) {
  var _ag1_v;

  _ag1_v = {
    j: undefined,
    loop: undefined
  };
  return G.jMB2(_ag1_v.loop(), ag1_3, ag1_v, _ag1_v);
}

function ag1_3(a, ag1_v, _ag1_v) {
  if (_ag1_v.loop = a) return ag1_4(ag1_v, _ag1_v);else return G.pure();
}

function ag1_4(ag1_v, _ag1_v) {
  _ag1_v.j = _ag1_v.loop.value;
  p('H', ag1_v.i, _ag1_v.j);
  return G.jR1(ag1_2, ag1_v);
}

function ag2_1(_ag2_v) {
  var ag2_v;
  ag2_v = {
    i: i1
  };
  _ag2_v.loop = G.iteratorM(something);
  return ag2_2(ag2_v);
}

function ag2_2(ag2_v) {
  var _ag2_v;

  _ag2_v = {
    j: undefined,
    loop: undefined
  };
  return G.jMB2(_ag2_v.loop(), ag2_3, ag2_v, _ag2_v);
}

function ag2_3(a, ag2_v, _ag2_v) {
  if (_ag2_v.loop = a) return ag2_4(ag2_v, _ag2_v);else return G.pure();
}

function ag2_4(ag2_v, _ag2_v) {
  _ag2_v.j = _ag2_v.loop.value;
  return G.jMB1(somethingElse, ag2_5, ag2_v);
}

function ag2_5(a, ag2_v) {
  ag2_v.i = a;
  return G.jR1(ag2_2, ag2_v);
}

function ag3_1(_ag3_v) {
  var ag3_v;
  ag3_v = {
    i: i2
  };
  return G.yldM2(ag3_v.i, ag3_2, ag3_v, _ag3_v);
}

function ag3_2(ag3_v, _ag3_v) {
  var a;
  a = eff(ag3_v.i);
  return G.jMB2(a, ag3_3, ag3_v, _ag3_v);
}

function ag3_3(a, ag3_v, _ag3_v) {
  return G.yldM2(a, ag3_4, ag3_v, _ag3_v);
}

function ag3_4(ag3_v, _ag3_v) {
  _ag3_v.loop = G.iteratorM(something());
  return ag3_5(ag3_v);
}

function ag3_5(ag3_v) {
  var _ag3_v;

  _ag3_v = {
    j: undefined,
    loop: undefined
  };
  return G.jMB2(_ag3_v.loop(), ag3_6, ag3_v, _ag3_v);
}

function ag3_6(a, ag3_v, _ag3_v) {
  if (_ag3_v.loop = a) return ag3_7(ag3_v, _ag3_v);else {
    return G.pure(ag3_v.i);
  }
}

function ag3_7(ag3_v, _ag3_v) {
  _ag3_v.j = _ag3_v.loop.value;
  return G.yldM2(ag3_v.i + _ag3_v.j, ag3_8, ag3_v, _ag3_v);
}

function ag3_8(ag3_v, _ag3_v) {
  var a;
  a = eff(_ag3_v.j);
  return G.jMB2(a, ag3_9, ag3_v, _ag3_v);
}

function ag3_9(b, ag3_v, _ag3_v) {
  var a;
  a = eff(ag3_v.i - b);
  return G.jMB2(a, ag3_10, ag3_v, _ag3_v);
}

function ag3_10(a, ag3_v, _ag3_v) {
  return G.yldMB2(a, ag3_11, ag3_v, _ag3_v);
}

function ag3_11(a, ag3_v, _ag3_v) {
  var b;
  ag3_v.i = a;
  b = eff(2, _ag3_v.j);
  return G.yldStarMB1(b, ag3_12, ag3_v);
}

function ag3_12(a, ag3_v) {
  ag3_v.i = a;
  return G.jR1(ag3_5, ag3_v);
}

function ag4_1() {
  var a;
  a = eff2();
  return G.yldMB(a, ag4_2);
}

function ag4_2(a) {
  return eff1(a);
}

function ag5_1() {
  var ag5_v;
  ag5_v = {
    i: i3
  };
  return G.jMB(ag5_v.i, ag5_2);
}

function ag5_2(a) {
  return a;
}

function ag6_1() {
  var ag6_v;
  ag6_v = {
    i: i4
  };
  return G.jMB(ag6_v.i, ag6_2);
}

function ag6_2(a) {
  return G.jMB(a, ag6_3);
}

function ag6_3(a) {
  return a;
}

function ag7_1() {
  var ag7_v;
  ag7_v = {
    i: i5
  };
  return G.yldM1(eff1(ag7_v.i), ag7_2, ag7_v);
}

function ag7_2(ag7_v) {
  var b, a;
  b = eff(2, ag7_v.i);
  a = eff3();
  return G.jMB1(a, ag7_3, b);
}

function ag7_3(c, b) {
  var a;
  a = eff4();
  return G.yldMB2(a, ag7_4, b, c);
}

function ag7_4(d, b, c) {
  var a;
  a = eff5();
  return G.jMB3(a, ag7_5, b, c, d);
}

function ag7_5(a, b, c, d) {
  return G.jMB3(a, ag7_6, b, c, d);
}

function ag7_6(e, b, c, d) {
  var a;
  a = eff6();
  return G.jMB4(a, ag7_7, b, c, d, e);
}

function ag7_7(a, b, c, d, e) {
  return G.yldMB4(a, ag7_8, b, c, d, e);
}

function ag7_8(f, b, c, d, e) {
  var a;
  a = eff7();
  return G.yldMB5(a, ag7_9, b, c, d, e, f);
}

function ag7_9(a, b, c, d, e, f) {
  return G.yldMB5(a, ag7_10, b, c, d, e, f);
}

function ag7_10(g, b, c, d, e, f) {
  var a;
  a = eff8();
  return G.yldMBN(a, ag7_11, [b, c, d, e, f, g]);
}

function ag7_11(a, [b, c, d, e, f, g]) {
  return G.jMBN(a, ag7_12, [b, c, d, e, f, g]);
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
  return G.scope1(v_1, _v_v);
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

function v1(_z) {
  return G.scope(v1_1);
}

function c1(z1) {
  return G.scope(c1_1);
}

function d1(z2, _x) {
  return G.scope(d1_1);
}

function e1() {
  return G.scope(e1_1);
}

function aw1(i) {
  return G.scope(aw1_1);
}

function ag1(_i) {
  return G.scope1(ag1_1, _ag1_v);
}

function ag2(i1) {
  return G.scope1(ag2_1, _ag2_v);
}

function ag3(i2) {
  return G.scope1(ag3_1, _ag3_v);
}

function ag4() {
  return G.scope(ag4_1);
}

function ag5(i3) {
  return G.scope(ag5_1);
}

function ag6(i4) {
  return G.scope(ag6_1);
}

function ag7(i5) {
  return G.scope(ag7_1);
}