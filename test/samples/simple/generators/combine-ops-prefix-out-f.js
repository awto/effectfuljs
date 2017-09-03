function d(i) {
  var j;
  return M.scope(_1);

  function _1() {
    var a;
    j = 0;
    a = i++;
    return M.yld(a, _2);
  }

  function _2() {
    var a;
    a = j++;
    return M.yld(a, _3);
  }

  function _3() {
    var a, b;
    b = i += 2;
    a = some(b, j);
    return M.yldStarB(a + j, _4);
  }

  function _4(a) {
    return M.yldB(a, _5);
  }

  function _5(a) {
    if (a) return _6();else {
      return M.pure(i);
    }
  }

  function _6() {
    var a;
    a = i += 3;
    return M.yldStarB(a, _7);
  }

  function _7(a) {
    return M.pure(a);
  }

  function _8() {
    return M.yld(2, _9);
  }

  function _9() {
    return M.pure();
  }
}

function a4() {
  var e;
  return M.scope(_1);

  function _1() {
    return M.yld(1, _2);
  }

  function _2() {
    try {
      return M.yldH(2, _3, _4, undefined);
    } catch (ex) {
      return _4(ex, undefined);
    }
  }

  function _3(cb) {
    try {
      return M.yldH(3, _6, _4, _8);
    } catch (ex) {
      return _4(ex, cb);
    }
  }

  function _4(ex, cb) {
    e = ex;
    return M.yld('excep', _5);
  }

  function _5() {
    return M.yld(e, _6, _8);
  }

  function _6(cb) {
    return M.yld('f', _7, cb);
  }

  function _7(cb) {
    return M.yld('e', cb);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStarB(a, _9);
  }

  function _9(b) {
    var a;
    a = a3();
    return M.yldStarB(a, _10, b);
  }

  function _10(c, b) {
    var a;
    a = a1(b, c);
    return M.yld(a, _11);
  }

  function _11() {
    return M.pure();
  }
}

function a5() {
  var i;
  return M.scope(_1);

  function _1() {
    var loop;
    loop = M.iterator(a4());
    return _2(loop);
  }

  function _2(loop) {
    var a, b;
    b = loop.incr();
    a = loop = b;
    if (!a.done) return _3(loop);else {
      return M.pure();
    }
  }

  function _3(loop) {
    i = loop.value;
    return M.yld(i, _2, loop);
  }
}