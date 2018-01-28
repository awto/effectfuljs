function d(i) {
  var d = M.generator();
  d._i = i;
  return M.scopeH(d_1, d_7);
}

function a4() {
  var a4 = M.generator();
  return M.scopeH(a4_1, a4_12);
}

function a5() {
  var a5 = M.generator();
  return M.scopeH(a5_1, a5_5);
}

function d_1(d) {
  var a;
  d._j = 0;
  a = d._i++;
  return M.yldStarBH(M.yld(a), d_2, d_7);
}

function d_2(d, a) {
  var b;
  b = d._j++;
  return M.yldStarBH(M.yld((a, b)), d_3, d_7);
}

function d_3(d) {
  return M.yldStarBH(M.yldStar(some(d._i += 2, d._j) + d._j), d_4, d_7);
}

function d_4(d, a) {
  return M.yldStarBH(M.yld(a), d_5, d_7);
}

function d_5(d, a) {
  var b;

  if (a) {
    b = d._i += 3;
    return M.yldStarBH(M.yldStar(b), d_6, d_7);
  } else {
    return M.pure(d._i);
  }
}

function d_6(d, r) {
  return M.pure(r);
}

function d_7(d, e) {
  return M.raise(e);
}

function a4_1(a4) {
  return M.yldStarBH(M.yld(1), a4_2, a4_14);
}

function a4_2(a4) {
  return M.yldStarBH(M.yld(2), a4_3, a4_14);
}

function a4_3(a4) {
  a4._fc = a4_8, a4._fe = a4_12;
  return M.yldStarBH(M.yld(3), a4_6, a4_12);
}

function a4_4(a4) {
  a4._e = a4._ex;
  return M.yldStarBH(M.yld('excep'), a4_5, a4_15);
}

function a4_5(a4) {
  a4._fc = a4_8, a4._fe = a4_12;
  return M.yldStarBH(M.yld(a4._e), a4_6, a4_12);
}

function a4_6(a4) {
  return M.yldStarBH(M.yld('f'), a4_7, a4_12);
}

function a4_7(a4) {
  return M.yldStarBH(M.yld('e'), a4._fc, a4._fe);
}

function a4_8(a4) {
  var a;
  a = a2();
  return M.yldStarBH(M.yldStar(a), a4_9, a4_12);
}

function a4_9(a4, b) {
  var a;
  a4._1 = b;
  a = a3();
  return M.yldStarBH(M.yldStar(a), a4_10, a4_12);
}

function a4_10(a4, b) {
  var a;
  a = a1(a4._1, b);
  return M.yldStarBH(M.yld(a), a4_11, a4_12);
}

function a4_11(a4) {
  return M.pure();
}

function a4_12(a4, e) {
  return M.raise(e);
}

function a4_13(a4) {
  return M.raise(a4._err1);
}

function a4_14(a4, a) {
  a4._ex = a;
  return M.jumpH(a4_4, a4_15);
}

function a4_15(a4, a) {
  a4._fc = a4_13, a4._fe = a4_12, a4._err1 = a;
  return M.jumpH(a4_6, a4_12);
}

function a5_1(a5) {
  a5._loop = M.iterator(a4());
  return M.jumpH(a5_2, a5_7);
}

function a5_2(a5) {
  if (!(a5._loop = a5._loop.step()).done) {
    a5._i = a5._loop.value;
    return M.yldStarBH(M.yld(a5._i), a5_2, a5_7);
  } else {
    a5._fc = a5_4, a5._fe = a5_5;
    return M.jumpH(a5_3, a5_5);
  }
}

function a5_3(a5) {
  if (a5._loop.exit) {
    a5._loop.exit();
  }

  return M.jumpH(a5._fc, a5._fe);
}

function a5_4(a5) {
  return M.pure();
}

function a5_5(a5, e) {
  return M.raise(e);
}

function a5_6(a5) {
  return M.raise(a5._err1);
}

function a5_7(a5, a) {
  a5._fc = a5_6, a5._fe = a5_5, a5._err1 = a;
  return M.jumpH(a5_3, a5_5);
}