function a() {
  var ctx = M.async();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.pure(ctx);
  }
}

function b() {
  var ctx = M.async();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var a;
    a = delay(1);
    return ctx.chainBH(a, _2);
  }

  function _2(ctx) {
    return ctx.pure(ctx);
  }
}

function c() {
  var ctx = M.async();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var a;
    a = delay(1);
    return ctx.chainBH(a, _2);
  }

  function _2(ctx, a) {
    return ctx.chainBH(a, _3);
  }

  function _3(ctx) {
    return ctx.pure(ctx);
  }
}

function d() {
  var ctx = M.async();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var a;
    a = delay(1);
    return ctx.chainBH(a, _2);
  }

  function _2(ctx, a) {
    return ctx.chainBH(a, _3);
  }

  function _3(ctx, a) {
    return ctx.chainBH(a, _4);
  }

  function _4(ctx) {
    return ctx.pure(ctx);
  }
}

function e() {
  var ctx = M.asyncGenerator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    return ctx.yldBH(1, _2);
  }

  function _2(ctx) {
    return ctx.pure(ctx);
  }
}

function f() {
  var ctx = M.asyncGenerator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var a;
    a = delay(1);
    return ctx.chainBH(a, _2);
  }

  function _2(ctx, a) {
    return ctx.yldBH(a, _3);
  }

  function _3(ctx) {
    var a;
    a = delay(2);
    return ctx.chainBH(a, _4);
  }

  function _4(ctx, a) {
    return ctx.yldBH(a, _5);
  }

  function _5(ctx) {
    var a;
    a = delay(3);
    return ctx.chainBH(a, _6);
  }

  function _6(ctx, a) {
    return ctx.yldBH(a, _7);
  }

  function _7(ctx) {
    return ctx.pure(ctx);
  }
}

function g() {
  var i,
      ctx = M.asyncGenerator();
  return ctx.scopeBH(_1);

  function _1(ctx) {
    var loop;
    loop = ctx.iteratorM(f());
    return ctx._loop = loop, _2(ctx);
  }

  function _2(ctx) {
    var loop = ctx._loop;
    return ctx._loop = undefined, ctx.jBH(loop.incrM(), _3);
  }

  function _3(ctx, loop) {
    var a = ctx._1;
    if (!a.done) return ctx._1 = undefined, ctx._loop = loop, _4(ctx);else {
      return ctx.pure(ctx);
    }
  }

  function _4(ctx) {
    var loop = ctx._loop,
        a;
    i = loop.value;
    a = delay(i);
    return ctx.chainBH(a, _5);
  }

  function _5(ctx, a) {
    return ctx.yldBH(a, _6);
  }

  function _6(ctx) {
    return ctx.yldBH(i, _2);
  }
}