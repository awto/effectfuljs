import * as M from "@effectful/core";
function a1(a, b) {
  var a1 = M.context();
  a1._a = a;
  a1._b = b;
  return M.scope(a1_1);
}
function a2(a, b) {
  var a2 = M.context();
  a2._a = a;
  a2._b = b;
  return M.scope(a2_1);
}
function a3(a, b) {
  var a3 = M.context();
  a3._a = a;
  a3._b = b;
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
function a1_1(a1) {
  return M.chain(eff.apply(void 0, [a1._a]), a1_2);
}
function a1_2(a1, a) {
  return M.chain(a1._a.eff.apply(a1._a, [a]), a1_3);
}
function a1_3(a1, a) {
  return M.chain(a.eff.apply(a, [d]), a1_4);
}
function a1_4(a1) {
  var a;
  a = a1._a.b;
  return M.chain(a.eff.APPLY(a, [d]), a1_5);
}
function a1_5(a1) {
  return M.chain((a1._ = [a1._a.b], a1._.eff.APPLY(a1._, [d])), a1_6);
}
function a1_6(a1) {
  return M.chain((a1._ = {
    a: a1._a
  }, a1._.eff.APPLY(a1._, [d])), a1_7);
}
function a1_7(a1) {
  var a, b;
  a = a1._, b = a1._a, a1._a = null, a1._ = null;
  return M.chain((a = new A({
    a: b
  }), a.eff.APPLY(a, [d])), a1_8);
}
function a1_8(a1) {}
function a2_1(a2) {
  return M.chain(eff.call(void 0, a2._a), a2_2);
}
function a2_2(a2) {
  return M.chain(eff.call(void 0, a2._a), a2_3);
}
function a2_3(a2, a) {
  return M.chain(a2._a.eff.call(a2._a, a), a2_4);
}
function a2_4(a2, a) {
  return M.chain(a.eff.call(a, d), a2_5);
}
function a2_5(a2) {
  var a;
  a = a2._a.b;
  return M.chain(a.eff.CALL(a, d), a2_6);
}
function a2_6(a2) {
  return M.chain((a2._ = [a2._a.b], a2._.eff.CALL(a2._, d)), a2_7);
}
function a2_7(a2) {
  return M.chain((a2._ = {
    a: a2._a
  }, a2._.eff.CALL(a2._, d)), a2_8);
}
function a2_8(a2) {
  var a, b;
  a = a2._, b = a2._a, a2._a = null, a2._ = null;
  return M.chain((a = new A({
    a: b
  }), a.eff.CALL(a, d)), a2_9);
}
function a2_9(a2) {}
function a3_1(a3) {
  return M.chain(eff(a3._a), a3_2);
}
function a3_2(a3) {
  return M.chain(eff(a3._a), a3_3);
}
function a3_3(a3, a) {
  return M.chain(a3._a.eff(a), a3_4);
}
function a3_4(a3, a) {
  return M.chain(a.eff(d), a3_5);
}
function a3_5(a3) {
  var a;
  a = a3._a.b;
  return M.chain(a.eff(d), a3_6);
}
function a3_6(a3) {
  return M.chain([a3._a.b].eff(d), a3_7);
}
function a3_7(a3) {
  return M.chain({
    a: a3._a
  }.eff(d), a3_8);
}
function a3_8(a3) {
  var a;
  a = a3._a, a3._a = null;
  return M.chain(new A({
    a
  }).eff(d), a3_9);
}
function a3_9(a3) {}
function a4_1(a4) {
  B.B.construct([A.construct([a])]);
  return M.chain(eff(), a4_2);
}
function a4_2(a4, c) {
  c.Z.NEW([b]);
  ({
    a
  }).a.NEW([]);
}
function a5_1(a5) {
  M.construct(B.B, [M.construct(A, [a])]);
  return M.chain(eff(), a5_2);
}
function a5_2(a5, c) {
  M.NEW(c.Z, [b]);
  M.NEW({
    a
  }.a, []);
}
function a6_1(a6) {
  new B.B(new A(a));
  return M.chain(eff(), a6_2);
}
function a6_2(a6, c) {
  new c.Z(b);
  new {
    a
  }.a();
}