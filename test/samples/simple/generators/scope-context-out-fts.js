function d(i) {
  return M.scope(ctx, d_1, i);
}

function a4() {
  var a4_v = {
    e: undefined
  };
  return M.scope(_ctx, a4_1, a4_v);
}

function a5() {
  var a5_v = {
    i: undefined
  };
  return M.scope(ctx1, a5_1, a5_v);
}

function d_1(ctx, i) {
  var j, a;
  j = 0;
  a = i++;
  return M.j(ctx, M.yld(a), d_2, i, j);
}

function d_2(ctx, i, j) {
  var a;
  a = j++;
  return M.j(ctx, M.yld(a), d_3, i, j);
}

function d_3(ctx, i, j) {
  var a, b;
  b = i += 2;
  a = some(b, j);
  return M.jB(ctx, M.yldStar(a + j), d_4, i);
}

function d_4(ctx, a, i) {
  return M.jB(ctx, M.yld(a), d_5, i);
}

function d_5(ctx, a, i) {
  if (a) return d_6(ctx, i);else {
    return M.pure(ctx, i);
  }
}

function d_6(ctx, i) {
  var a;
  a = i += 3;
  return M.jB(ctx, M.yldStar(a), d_7);
}

function d_7(ctx, a) {
  return M.pure(ctx, a);
}

function d_8(ctx) {
  return M.j(ctx, M.yld(2), d_9);
}

function d_9(ctx) {
  return M.pure(ctx);
}

function a4_1(_ctx, a4_v) {
  return M.j(_ctx, M.yld(1), a4_2, a4_v);
}

function a4_2(_ctx, a4_v) {
  try {
    return M.jH(_ctx, M.yld(2), a4_3, a4_4, a4_v, undefined);
  } catch (ex) {
    return a4_4(_ctx, ex, a4_v, undefined);
  }
}

function a4_3(_ctx, a4_v, cb) {
  try {
    return M.jH(_ctx, M.yld(3), a4_6, a4_4, a4_v, a4_8);
  } catch (ex) {
    return a4_4(_ctx, ex, a4_v, cb);
  }
}

function a4_4(_ctx, ex, a4_v, cb) {
  a4_v.e = ex;
  return M.j(_ctx, M.yld('excep'), a4_5, a4_v);
}

function a4_5(_ctx, a4_v) {
  return M.j(_ctx, M.yld(a4_v.e), a4_6, a4_v, a4_8);
}

function a4_6(_ctx, a4_v, cb) {
  return M.j(_ctx, M.yld('f'), a4_7, cb);
}

function a4_7(_ctx, cb) {
  return M.j(_ctx, M.yld('e'), cb);
}

function a4_8(_ctx) {
  var a;
  a = a2();
  return M.jB(_ctx, M.yldStar(a), a4_9);
}

function a4_9(_ctx, b) {
  var a;
  a = a3();
  return M.jB(_ctx, M.yldStar(a), a4_10, b);
}

function a4_10(_ctx, c, b) {
  var a;
  a = a1(b, c);
  return M.j(_ctx, M.yld(a), a4_11);
}

function a4_11(_ctx) {
  return M.pure(_ctx);
}

function a5_1(ctx1, a5_v) {
  var loop;
  loop = M.iterator(a4());
  return a5_2(ctx1, a5_v, loop);
}

function a5_2(ctx1, a5_v, loop) {
  var a, b;
  b = loop.incr();
  a = loop = b;
  if (!a.done) return a5_3(ctx1, a5_v, loop);else {
    return M.pure(ctx1);
  }
}

function a5_3(ctx1, a5_v, loop) {
  a5_v.i = loop.value;
  return M.jR(ctx1, M.yld(a5_v.i), a5_2, a5_v, loop);
}