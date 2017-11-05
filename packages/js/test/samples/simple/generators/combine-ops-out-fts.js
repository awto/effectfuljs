function d(i) {
  return M.scope(d_1, d_7, i);
}

function a4() {
  var a4 = M.generator();
  return M.scope(a4_1, a4_12);
}

function a5() {
  var a5 = M.generator();
  return M.scope(a5_1, a5_5);
}

function d_1(i) {
  var j, a;
  j = 0;
  a = i++;
  return M.yld(a, d_2, d_7, i, j);
}

function d_2(a, i, j) {
  var b;
  b = j++;
  return M.yld((a, b), d_3, d_7, i, j);
}

function d_3(i, j) {
  return M.yldStar(some(i += 2, j) + j, d_4, d_7, i);
}

function d_4(a, i) {
  return M.yld(a, d_5, d_7, i);
}

function d_5(a, i) {
  var b;

  if (a) {
    b = i += 3;
    return M.yldStar(b, d_6, d_7);
  } else {
    return M.pure(i);
  }
}

function d_6(r) {
  return M.pure(r);
}

function d_7(e) {
  return M.raise(e);
}

function a4_1(a4) {
  return M.yld(1, a4_2, a4_14);
}

function a4_2(a4) {
  return M.yld(2, a4_3, a4_14);
}

function a4_3(a4) {
  return M.yld(3, a4_6, a4_12, a4_8, a4_12);
}

function a4_4(a4, ex) {
  a4._e = ex;
  return M.yld('excep', a4_5, a4_15);
}

function a4_5(a4) {
  return M.yld(a4._e, a4_6, a4_12, a4_8, a4_12);
}

function a4_6(a4, fc, fe, err) {
  return M.yld('f', a4_7, a4_12, fc, fe, err);
}

function a4_7(a4, fc, fe, err) {
  var fr;
  return M.yld('e', fc, fe, fr);
}

function a4_8(a4) {
  var a;
  a = a2();
  return M.yldStar(a, a4_9, a4_12);
}

function a4_9(a4, a) {
  var b;
  b = a3();
  return M.yldStar(b, a4_10, a4_12, a);
}

function a4_10(a4, c, a) {
  var b;
  b = a1(a, c);
  return M.yld(b, a4_11, a4_12);
}

function a4_11(a4) {
  return M.pure();
}

function a4_12(a4, e) {
  return M.raise(e);
}

function a4_13(a4, err) {
  return M.raise(err);
}

function a4_14(a4, a) {
  return M.jump(a4_4, a4_15, a);
}

function a4_15(a4, a) {
  return M.jump(a4_6, a4_12, a4_13, a4_12, a);
}

function a5_1(a5) {
  var loop;
  loop = M.iterator(a4());
  return M.jump(a5_2, a5_5, loop);
}

function a5_2(a5, loop) {
  if (!(loop = loop.step()).done) {
    a5._i = loop.value;
    return M.jump(a5_3, a5_6, loop);
  } else {
    return M.pure();
  }
}

function a5_3(a5, loop) {
  return M.repeat(a5._i, a5_2, a5_5, loop);
}

function a5_4(a5, ex) {
  e = ex;

  if (loop.exit) {
    loop.exit();
  }

  throw e;
}

function a5_5(a5, e) {
  return M.raise(e);
}

function a5_6(a5, a) {
  return M.jump(a5_4, a5_5, a);
}