import * as M from "@effectful/core";
function d(i) {
  var d = M.context();
  d._i = i;
  return M.scope(d_1);
}
function a4() {
  var a4 = M.context();
  return M.scope(a4_1);
}
function a5() {
  var a5 = M.context();
  return M.scope(a5_1);
}
function d_1(d) {
  var a;
  d._j = 0;
  a = d._i++;
  return M.yldStar(M.yld(a), d_2);
}
function d_2(d, a) {
  var b;
  b = d._j++;
  return M.yldStar(M.yld((a, b)), d_3);
}
function d_3(d) {
  var a;
  a = d._j, d._j = null;
  return M.yldStar(M.yldStar(some(d._i += 2, a) + a), d_4);
}
function d_4(d, a) {
  return M.yldStar(M.yld(a), d_5);
}
function d_5(d, a) {
  var b;
  if (a) {
    b = d._i += 3;
    d._i = null;
    return M.yldStar(M.yldStar(b), d_6);
  } else {
    return M.pure(d._i);
  }
}
function d_6(d, a) {
  return M.pure(a);
}
function d_7(d, r) {
  return M.pure(r);
}
function a4_1(a4) {
  return M.yldStar(M.yld(1), a4_2, a4_15);
}
function a4_2(a4) {
  return M.yldStar(M.yld(2), a4_3, a4_15);
}
function a4_3(a4) {
  a4._fc = a4_8, a4._fe = a4_13;
  return M.yldStar(M.yld(3), a4_6);
}
function a4_4(a4) {
  a4._e = a4._ex;
  a4._ex = null;
  return M.yldStar(M.yld("excep"), a4_5, a4_16);
}
function a4_5(a4) {
  var a;
  a4._fc = a4_8, a4._fe = a4_13, a = a4._e, a4._e = null;
  return M.yldStar(M.yld(a), a4_6);
}
function a4_6(a4) {
  return M.yldStar(M.yld("f"), a4_7);
}
function a4_7(a4) {
  var a, b;
  a = a4._fc, b = a4._fe, a4._fc = null, a4._fe = null;
  return M.yldStar(M.yld("e"), a, b);
}
function a4_8(a4) {
  var a;
  a = a2();
  return M.yldStar(M.yldStar(a), a4_9);
}
function a4_9(a4, b) {
  var a;
  a4._1 = b;
  a = a3();
  return M.yldStar(M.yldStar(a), a4_10);
}
function a4_10(a4, b) {
  var a;
  a = a1(a4._1, b);
  a4._1 = null;
  return M.yldStar(M.yld(a), a4_11);
}
function a4_11(a4) {
  return M.pure();
}
function a4_12(a4, r) {
  return M.pure(r);
}
function a4_13(a4, e) {
  return M.raise(e);
}
function a4_14(a4) {
  return M.raise(a4._err1);
}
function a4_15(a4, a) {
  a4._ex = a;
  return M.jump(void 0, a4_4, a4_16);
}
function a4_16(a4, a) {
  a4._fc = a4_14, a4._fe = a4_13, a4._err1 = a;
  return M.jump(void 0, a4_6);
}
function a5_1(a5) {
  a5._loop = M.iterator(a4());
  return M.jump(void 0, a5_2, a5_8);
}
function a5_2(a5) {
  if (!(a5._loop = a5._loop.step()).done) {
    a5._i = a5._loop.value;
    return M.yldStar(M.yld(a5._i), a5_2, a5_8);
  } else {
    a5._fc = a5_4, a5._fe = a5_6, a5._i = null;
    return M.jump(void 0, a5_3);
  }
}
function a5_3(a5) {
  var a, b;
  if (a5._loop.exit) {
    a5._loop.exit();
  }
  a = a5._fc, b = a5._fe, a5._loop = null, a5._fc = null, a5._fe = null;
  return M.jump(void 0, a, b);
}
function a5_4(a5) {
  return M.pure();
}
function a5_5(a5, r) {
  return M.pure(r);
}
function a5_6(a5, e) {
  return M.raise(e);
}
function a5_7(a5) {
  return M.raise(a5._err1);
}
function a5_8(a5, a) {
  a5._fc = a5_7, a5._fe = a5_6, a5._err1 = a;
  return M.jump(void 0, a5_3);
}