/*
function* d(i) {
  var j = 0;
  return yield (yield i++), j++;
}

function* d(i) {
  var j = 0;
  yield (yield i++,j++);
  if (yield (yield* some(i+=2,j) + j)) {
    return (yield* i+=3);
  } else {
    return i
  }
  yield 2;
}
function* a4() {
  yield 1
  try {
    yield 2
    yield 3
  } catch(e) {
    yield "excep"
    yield e
  } finally {
    yield "f"
    yield "e"
  }
  yield a1(yield* a2(), yield* a3())
} 

function* a5() {
  for(const i of a4())
    yield i
}
*/function a6() {
  var ctx = M.context();
  return ctx.scope(_1);

  function _1(ctx) {
    return ctx.yldM(1, _2);
  }

  function _2(ctx) {
    return ctx.yldM(2, _3);
  }

  function _3(ctx) {
    return ctx.yldMB(3, _4);
  }

  function _4(ctx, a) {
    if (a) return _5(ctx);else {
      return ctx._cb = _7, ctx._cb1 = _8, ctx.yldM(4, _6);
    }
  }

  function _5(ctx) {
    return ctx._cb = _7, ctx._cb1 = _9, ctx._r = 10, _6(ctx);
  }

  function _6(ctx) {
    var cb = ctx._cb;
    return ctx._cb = undefined, ctx.yldM('f1', cb);
  }

  function _7(ctx) {
    var cb = ctx._cb1;
    return ctx._cb1 = undefined, ctx.yldM('f2', cb);
  }

  function _8(ctx) {
    return ctx.yldM(5, ctx.pure);
  }

  function _9(ctx) {
    var r = ctx._r;
    return ctx.pure(r);
  }
}