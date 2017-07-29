function d_1(ctx, i) {
  var j, a;
  j = 0;
  a = i++;
  return M.jM(ctx, M.yld(a), d_2, i, j);
}

function d_2(ctx, i, j) {
  var a;
  a = j++;
  return M.jM(ctx, M.yld(a), d_3, i, j);
}

function d_3(ctx, i, j) {
  var a, b;
  b = i += 2;
  a = some(b, j);
  return M.jMB(ctx, M.yldStar(a + j), d_4, i);
}

function d_4(ctx, a, i) {
  return M.jMB(ctx, M.yld(a), d_5, i);
}

function d_5(ctx, a, i) {
  if (a) return d_6(ctx, i);else {
    return M.pure(ctx, i);
  }
}

function d_6(ctx, i) {
  var a;
  a = i += 3;
  return M.yldStar(a);
}

function d_7(ctx) {
  return M.yld(2);
}

function a4_1(ctx) {
  return M.jM(ctx, M.yld(1), a4_2);
}

function a4_2(ctx) {
  try {
    return M.jME(ctx, M.yld(2), a4_3, a4_4);
  } catch (e) {
    return a4_4(ctx);
  }
}

function a4_3(ctx) {
  try {
    return M.jME(ctx, M.yld(3), a4_6, a4_8, a4_4);
  } catch (e) {
    return a4_4(ctx);
  }
}

function a4_4(ctx) {
  var e;
  e = ex;
  return M.jM(ctx, M.yld('excep'), a4_5, e);
}

function a4_5(ctx, e) {
  return M.jM(ctx, M.yld(e), a4_6, a4_8);
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

function a5_1(ctx) {
  var loop;
  loop = M.iterator(a4());
  return a5_2(ctx, loop);
}

function a5_2(ctx, loop) {
  var a, b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a5_3(ctx, loop);else return M.pure(ctx);
}

function a5_3(ctx, loop) {
  var i;
  i = loop.value;
  return M.jRM(ctx, M.yld(i), a5_2, loop);
}

function d(i) {
  return M.scope(d_1, i);
}

function a4() {
  return M.scope(a4_1);
}

function a5() {
  return M.scope(a5_1);
}