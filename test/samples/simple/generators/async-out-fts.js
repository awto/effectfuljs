function a() {
  var ctx = M.async();
  return ctx.scopeBH(a_1);
}

function b() {
  var ctx = M.async();
  return ctx.scopeBH(b_1);
}

function c() {
  var ctx = M.async();
  return ctx.scopeBH(c_1);
}

function d() {
  var ctx = M.async();
  return ctx.scopeBH(d_1);
}

function e() {
  var ctx = M.asyncGenerator();
  return ctx.scopeBH(e_1);
}

function f() {
  var ctx = M.asyncGenerator();
  return ctx.scopeBH(f_1);
}

function g() {
  var ctx = M.asyncGenerator();
  return ctx.scopeBH(g_1);
}

function a_1(ctx) {
  return ctx.pure(ctx);
}

function b_1(ctx) {
  var a;
  a = delay(1);
  return ctx.chainBH(a, b_2);
}

function b_2(ctx) {
  return ctx.pure(ctx);
}

function c_1(ctx) {
  var a;
  a = delay(1);
  return ctx.chainBH(a, c_2);
}

function c_2(ctx, a) {
  return ctx.chainBH(a, c_3);
}

function c_3(ctx) {
  return ctx.pure(ctx);
}

function d_1(ctx) {
  var a;
  a = delay(1);
  return ctx.chainBH(a, d_2);
}

function d_2(ctx, a) {
  return ctx.chainBH(a, d_3);
}

function d_3(ctx, a) {
  return ctx.chainBH(a, d_4);
}

function d_4(ctx) {
  return ctx.pure(ctx);
}

function e_1(ctx) {
  return ctx.yldBH(1, e_2);
}

function e_2(ctx) {
  return ctx.pure(ctx);
}

function f_1(ctx) {
  var a;
  a = delay(1);
  return ctx.chainBH(a, f_2);
}

function f_2(ctx, a) {
  return ctx.yldBH(a, f_3);
}

function f_3(ctx) {
  var a;
  a = delay(2);
  return ctx.chainBH(a, f_4);
}

function f_4(ctx, a) {
  return ctx.yldBH(a, f_5);
}

function f_5(ctx) {
  var a;
  a = delay(3);
  return ctx.chainBH(a, f_6);
}

function f_6(ctx, a) {
  return ctx.yldBH(a, f_7);
}

function f_7(ctx) {
  return ctx.pure(ctx);
}

function g_1(ctx) {
  var loop;
  loop = ctx.iteratorM(f());
  return ctx._loop = loop, g_2(ctx);
}

function g_2(ctx) {
  var loop = ctx._loop;
  return ctx._loop = undefined, ctx.jBH(loop.incrM(), g_3);
}

function g_3(ctx, loop) {
  var a = ctx._1;
  if (!a.done) return ctx._1 = undefined, ctx._loop = loop, g_4(ctx);else {
    return ctx.pure(ctx);
  }
}

function g_4(ctx) {
  var i,
      loop = ctx._loop,
      a;
  i = loop.value;
  a = delay(i);
  return ctx._i = i, ctx.chainBH(a, g_5);
}

function g_5(ctx, a) {
  return ctx.yldBH(a, g_6);
}

function g_6(ctx) {
  var i = ctx._i;
  return ctx._i = undefined, ctx.yldBH(i, g_2);
}