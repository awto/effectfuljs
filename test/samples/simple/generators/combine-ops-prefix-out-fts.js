function d(i) {
  return M.scope(d_1, i);
}

function a4() {
  var a4_v = {
    e: undefined
  };
  return M.scope(a4_1, a4_v);
}

function a5() {
  var a5_v = {
    i: undefined
  };
  return M.scope(a5_1, a5_v);
}

function d_1(i) {
  var j, a;
  j = 0;
  a = i++;
  return M.yld(a, d_2, i, j);
}

function d_2(i, j) {
  var a;
  a = j++;
  return M.yld(a, d_3, i, j);
}

function d_3(i, j) {
  var a, b;
  b = i += 2;
  a = some(b, j);
  return M.yldStarB(a + j, d_4, i);
}

function d_4(a, i) {
  return M.yldB(a, d_5, i);
}

function d_5(a, i) {
  if (a) return d_6(i);else {
    return M.pure(i);
  }
}

function d_6(i) {
  var a;
  a = i += 3;
  return M.yldStarB(a, d_7);
}

function d_7(a) {
  return M.pure(a);
}

function d_8() {
  return M.yld(2, d_9);
}

function d_9() {
  return M.pure();
}

function a4_1(a4_v) {
  return M.yld(1, a4_2, a4_v);
}

function a4_2(a4_v) {
  try {
    return M.yldH(2, a4_3, a4_4, a4_v, undefined);
  } catch (ex) {
    return a4_4(ex, a4_v, undefined);
  }
}

function a4_3(a4_v, cb) {
  try {
    return M.yldH(3, a4_6, a4_4, a4_v, a4_8);
  } catch (ex) {
    return a4_4(ex, a4_v, cb);
  }
}

function a4_4(ex, a4_v, cb) {
  a4_v.e = ex;
  return M.yld('excep', a4_5, a4_v);
}

function a4_5(a4_v) {
  return M.yld(a4_v.e, a4_6, a4_v, a4_8);
}

function a4_6(a4_v, cb) {
  return M.yld('f', a4_7, cb);
}

function a4_7(cb) {
  return M.yld('e', cb);
}

function a4_8() {
  var a;
  a = a2();
  return M.yldStarB(a, a4_9);
}

function a4_9(b) {
  var a;
  a = a3();
  return M.yldStarB(a, a4_10, b);
}

function a4_10(c, b) {
  var a;
  a = a1(b, c);
  return M.yld(a, a4_11);
}

function a4_11() {
  return M.pure();
}

function a5_1(a5_v) {
  var loop;
  loop = M.iterator(a4());
  return a5_2(a5_v, loop);
}

function a5_2(a5_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return a5_3(a5_v, loop);else {
    return M.pure();
  }
}

function a5_3(a5_v, loop) {
  a5_v.i = loop.value;
  return M.yld(a5_v.i, a5_2, a5_v, loop);
}