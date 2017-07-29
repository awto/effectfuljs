function d_1(ctx, d_v) {
  var a;
  d_v.j = 0;
  a = d_v.i++;
  return M.jM(ctx, M.yld(a), d_2, d_v);
}

function d_2(ctx, d_v) {
  var a;
  a = d_v.j++;
  return M.jM(ctx, M.yld(a), d_3, d_v);
}

function d_3(ctx, d_v) {
  var a, b;
  b = d_v.i += 2;
  a = some(b, d_v.j);
  return M.jMB(ctx, M.yldStar(a + d_v.j), d_4, d_v);
}

function d_4(ctx, a, d_v) {
  return M.jMB(ctx, M.yld(a), d_5, d_v);
}

function d_5(ctx, a, d_v) {
  if (a) return d_6(ctx, d_v);else {
    return M.pure(ctx, d_v.i);
  }
}

function d_6(ctx, d_v) {
  var a;
  a = d_v.i += 3;
  return M.yldStar(a);
}

function d_7(ctx) {
  return M.yld(2);
}

function a4_1(ctx, a4_v) {
  return M.jM(ctx, M.yld(1), a4_2, a4_v);
}

function a4_2(ctx, a4_v) {
  try {
    return M.jME(ctx, M.yld(2), a4_3, a4_v, a4_4);
  } catch (e) {
    return a4_4(ctx, a4_v);
  }
}

function a4_3(ctx, a4_v) {
  try {
    return M.jME(ctx, M.yld(3), a4_6, a4_8, a4_4);
  } catch (e) {
    return a4_4(ctx, a4_v);
  }
}

function a4_4(ctx, a4_v) {
  a4_v.e = ex;
  return M.jM(ctx, M.yld('excep'), a4_5, a4_v);
}

function a4_5(ctx, a4_v) {
  return M.jM(ctx, M.yld(a4_v.e), a4_6, a4_8);
}

function a4_6(ctx, cb) {
  return M.jM(ctx, M.yld('f'), a4_7, cb);
}

function a4_7(ctx, cb) {
  return M.jM(ctx, M.yld('e'), cb);
}

function a4_8(ctx) {
  var a;
  a = a2();
  return M.jMB(ctx, M.yldStar(a), a4_9);
}

function a4_9(ctx, b) {
  var a;
  a = a3();
  return M.jMB(ctx, M.yldStar(a), a4_10, b);
}

function a4_10(ctx, c, b) {
  var a;
  a = a1(b, c);
  return M.yld(a);
}

function a5_1(ctx, a5_v) {
  var loop;
  loop = M.iterator(a4());
  return a5_2(ctx, a5_v, loop);
}

function a5_2(ctx, a5_v, loop) {
  var a5_v = {
    i: undefined
  },
      a,
      b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a5_3(ctx, a5_v, loop);else return M.pure(ctx);
}

function a5_3(ctx, a5_v, loop) {
  a5_v.i = loop.value;
  return M.jRM(ctx, M.yld(a5_v.i), a5_2, a5_v, loop);
}

function d(i) {
  var d_v = {
    i,
    j: undefined
  };
  return M.scope(d_1, d_v);
}

function a4() {
  var a4_v = {
    e: undefined
  };
  return M.scope(a4_1, a4_v);
}

function a5() {
  return M.scope(a5_1, a5_v);
}