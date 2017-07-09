function a() {
  return M.jMB(M.yld(1), _1);

  function _1(a) {
    return M.jM(M.yld(a), _2);
  }

  function _2() {
    var a;
    a = some();
    return M.jMB(M.yldStar(a), _3);
  }

  function _3(a) {
    return M.jMB(M.yld(a), _4);
  }

  function _4(a) {
    if (a) return _5();else return M.pure();
  }

  function _5() {
    return M.yldStar(some);
  }

  function _6() {
    return M.yld(2);
  }
}

function b() {
  return M.yldMB(1, _1);

  function _1(a) {
    return M.yldM(a, _2);
  }

  function _2() {
    var a;
    a = some();
    return M.yldStarMB(a, _3);
  }

  function _3(a) {
    return M.yldMB(a, _4);
  }

  function _4(a) {
    if (a) return _5();else return M.pure();
  }

  function _5() {
    return M.yldStarMB(some, M.pure);
  }

  function _6() {
    return M.yldM(2, M.pure);
  }
}

function c() {
  return M.scope(_1);

  function _1(ctx) {
    return M.yldMB(ctx, 1, _2);
  }

  function _2(ctx, a) {
    return M.yldM(ctx, a, _3);
  }

  function _3(ctx) {
    var a;
    a = some();
    return M.yldStarMB(ctx, a, _4);
  }

  function _4(ctx, a) {
    return M.yldMB(ctx, a, _5);
  }

  function _5(ctx, a) {
    if (a) return _6(ctx);else return M.pure(ctx);
  }

  function _6(ctx) {
    return M.yldStarMB(ctx, some, M.pure);
  }

  function _7(ctx) {
    return M.yldM(ctx, 2, M.pure);
  }
}

function d() {
  return M.scope(_1);

  function _1(ctx) {
    return M.yldMB(ctx, 1, _2);
  }

  function _2(ctx, a) {
    return M.yldM(ctx, a, _3);
  }

  function _3(ctx) {
    var a;
    a = some();
    return M.yldStarMB(ctx, a, _4);
  }

  function _4(ctx, a) {
    return M.yldMB(ctx, a, _5);
  }

  function _5(ctx, a) {
    if (a) return _6(ctx);else return M.pure(ctx);
  }

  function _6(ctx) {
    return M.yldStarMB(ctx, some, M.pure);
  }

  function _7(ctx) {
    return M.yldM(ctx, 2, M.pure);
  }
}

function _d() {
  return M.scope(_1);

  function _1(ctx) {
    return ctx.yldMB(1, _2);
  }

  function _2(ctx, a) {
    return ctx.yldM(a, _3);
  }

  function _3(ctx) {
    var a;
    a = some();
    return ctx.yldStarMB(a, _4);
  }

  function _4(ctx, a) {
    return ctx.yldMB(a, _5);
  }

  function _5(ctx, a) {
    if (a) return _6(ctx);else return ctx.pure();
  }

  function _6(ctx) {
    return ctx.yldStarMB(some, ctx.pure);
  }

  function _7(ctx) {
    return ctx.yldM(2, ctx.pure);
  }
}