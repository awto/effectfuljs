function d(i) {
  return M.scope(_1, i);

  function _1(ctx, i) {
    var j, a;
    j = 0;
    a = i++;
    return M.jM(ctx, M.yld(a), _2, i, j);
  }

  function _2(ctx, i, j) {
    var a;
    a = j++;
    return M.jM(ctx, M.yld(a), _3, i, j);
  }

  function _3(ctx, i, j) {
    var a, b;
    b = i += 2;
    a = some(b, j);
    return M.jMB(ctx, M.yldStar(a + j), _4, i);
  }

  function _4(ctx, a, i) {
    return M.jMB(ctx, M.yld(a), _5, i);
  }

  function _5(ctx, a, i) {
    if (a) return _6(ctx, i);else {
      return M.pure(ctx, i);
    }
  }

  function _6(ctx, i) {
    var a;
    a = i += 3;
    return M.yldStar(a);
  }

  function _7(ctx) {
    return M.yld(2);
  }
}

function a4() {
  var e;
  return M.scope(_1);

  function _1(ctx) {
    return M.jM(ctx, M.yld(1), _2);
  }

  function _2(ctx) {
    try {
      return M.jME(ctx, M.yld(2), _3, _4);
    } catch (e) {
      return _4(ctx);
    }
  }

  function _3(ctx) {
    try {
      return M.jME(ctx, M.yld(3), _6, _8, _4);
    } catch (e) {
      return _4(ctx);
    }
  }

  function _4(ctx) {
    e = ex;
    return M.jM(ctx, M.yld('excep'), _5);
  }

  function _5(ctx) {
    return M.jM(ctx, M.yld(e), _6, _8);
  }

  function _6(ctx, cb) {
    return M.jM(ctx, M.yld('f'), _7, cb);
  }

  function _7(ctx, cb) {
    return M.jM(ctx, M.yld('e'), cb);
  }

  function _8(ctx) {
    var a;
    a = a2();
    return M.jMB(ctx, M.yldStar(a), _9);
  }

  function _9(ctx, b) {
    var a;
    a = a3();
    return M.jMB(ctx, M.yldStar(a), _10, b);
  }

  function _10(ctx, c, b) {
    var a;
    a = a1(b, c);
    return M.yld(a);
  }
}

function a5() {
  var i;
  return M.scope(_1);

  function _1(ctx) {
    var loop;
    loop = M.iterator(a4());
    return _2(ctx, loop);
  }

  function _2(ctx, loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _3(ctx, loop);else return M.pure(ctx);
  }

  function _3(ctx, loop) {
    i = loop.value;
    return M.jRM(ctx, M.yld(i), _2, loop);
  }
}