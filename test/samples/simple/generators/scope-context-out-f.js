function d(i) {
  var j;
  return M.scope(ctx, _1);

  function _1(ctx) {
    var a;
    j = 0;
    a = i++;
    return M.j(ctx, M.yld(a), _2);
  }

  function _2(ctx) {
    var a;
    a = j++;
    return M.j(ctx, M.yld(a), _3);
  }

  function _3(ctx) {
    var a, b;
    b = i += 2;
    a = some(b, j);
    return M.jB(ctx, M.yldStar(a + j), _4);
  }

  function _4(ctx, a) {
    return M.jB(ctx, M.yld(a), _5);
  }

  function _5(ctx, a) {
    if (a) return _6(ctx);else {
      return M.pure(ctx, i);
    }
  }

  function _6(ctx) {
    var a;
    a = i += 3;
    return M.jB(ctx, M.yldStar(a), _7);
  }

  function _7(ctx, a) {
    return M.pure(ctx, a);
  }

  function _8(ctx) {
    return M.j(ctx, M.yld(2), _9);
  }

  function _9(ctx) {
    return M.pure(ctx);
  }
}

function a4() {
  var e;
  return M.scope(_ctx, _1);

  function _1(_ctx) {
    return M.j(_ctx, M.yld(1), _2);
  }

  function _2(_ctx) {
    try {
      return M.jH(_ctx, M.yld(2), _3, _4, undefined);
    } catch (ex) {
      return _4(_ctx, ex, undefined);
    }
  }

  function _3(_ctx, cb) {
    try {
      return M.jH(_ctx, M.yld(3), _6, _4, _8);
    } catch (ex) {
      return _4(_ctx, ex, cb);
    }
  }

  function _4(_ctx, ex, cb) {
    e = ex;
    return M.j(_ctx, M.yld('excep'), _5);
  }

  function _5(_ctx) {
    return M.j(_ctx, M.yld(e), _6, _8);
  }

  function _6(_ctx, cb) {
    return M.j(_ctx, M.yld('f'), _7, cb);
  }

  function _7(_ctx, cb) {
    return M.j(_ctx, M.yld('e'), cb);
  }

  function _8(_ctx) {
    var a;
    a = a2();
    return M.jB(_ctx, M.yldStar(a), _9);
  }

  function _9(_ctx, b) {
    var a;
    a = a3();
    return M.jB(_ctx, M.yldStar(a), _10, b);
  }

  function _10(_ctx, c, b) {
    var a;
    a = a1(b, c);
    return M.j(_ctx, M.yld(a), _11);
  }

  function _11(_ctx) {
    return M.pure(_ctx);
  }
}

function a5() {
  var i;
  return M.scope(ctx1, _1);

  function _1(ctx1) {
    var loop;
    loop = M.iterator(a4());
    return _2(ctx1, loop);
  }

  function _2(ctx1, loop) {
    var a, b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return _3(ctx1, loop);else {
      return M.pure(ctx1);
    }
  }

  function _3(ctx1, loop) {
    i = loop.value;
    return M.jR(ctx1, M.yld(i), _2, loop);
  }
}