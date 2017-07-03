// *- DEFAULT
import * as G from '@effectful/es';

function v_1(v_v) {
  v_v.loop = G.iterator([1, 2, 3]);
  return v_2(v_v);
}

function v_2(v_v) {
  if (v_v.loop = v_v.loop()) return v_3(v_v);else {
    return G.yldStarMB(z, v_4);
  }
}

function v_3(v_v) {
  v_v.i = v_v.loop.value;
  return G.yldM1R(v_v.i, v_2, v_v);
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
  const a = eff(3);
  return G.yldStarMB(a, f_4);
}

function f_4(a) {
  var b;
  const b = eff(3);
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
  return G.yldMB(z, v1_2);
}

function v1_2(a) {
  console.log(a);
  return G.pure();
}

function c1_1() {
  return G.yldM(z, G.pure);
}

function d1_1() {
  return G.yldM(z, d1_2);
}

function d1_2() {
  return G.yldM(x, G.pure);
}

function e1_1() {
  return G.yldM(eff(1), e1_2);
}

function e1_2() {
  return G.yldM(eff(2), e1_3);
}

function e1_3() {
  var a;
  const a = eff(3);
  return G.yldMB(a, e1_4);
}

function e1_4(a) {
  var b;
  console.log(a + eff(3));
  const b = eff(4);
  return G.yldMB(b, e1_5);
}

function e1_5(a) {
  return G.yldM(eff(a), G.pure);
}

function v() {
  return G.scope(v_1);
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

function v1() {
  return G.scope(v1_1);
}

function c1() {
  return G.scope(c1_1);
}

function d1() {
  return G.scope(d1_1);
}

function e1() {
  return G.scope(e1_1);
}