function d(i) {
  var j;
  return M.scope(_1);

  function _1() {
    var a;
    j = 0;
    a = i++;
    return M.j(M.yld(a), _2);
  }

  function _2() {
    var a;
    a = j++;
    return M.j(M.yld(a), _3);
  }

  function _3() {
    var a, b;
    b = i += 2;
    a = some(b, j);
    return M.jB(M.yldStar(a + j), _4);
  }

  function _4(a) {
    return M.jB(M.yld(a), _5);
  }

  function _5(a) {
    if (a) return _6();else {
      if (j) return _8();else {
        return M.j(M.yld(2), _9);
      }
    }
  }

  function _6() {
    var a;
    a = i += 3;
    return M.jB(M.yldStar(a), _7);
  }

  function _7(a) {
    return M.pure(a);
  }

  function _8() {
    return M.pure(i);
  }

  function _9() {
    return M.pure();
  }
}

function a4() {
  var e;
  return M.scope(_1);

  function _1() {
    return M.j(M.yld(1), _2);
  }

  function _2() {
    try {
      return M.jH(M.yld(2), _3, _4, undefined);
    } catch (ex) {
      return _4(ex, undefined);
    }
  }

  function _3(cb) {
    try {
      return M.jH(M.yld(3), _6, _4, _8);
    } catch (ex) {
      return _4(ex, cb);
    }
  }

  function _4(ex, cb) {
    e = ex;
    return M.j(M.yld('excep'), _5);
  }

  function _5() {
    return M.j(M.yld(e), _6, _8);
  }

  function _6(cb) {
    return M.j(M.yld('f'), _7, cb);
  }

  function _7(cb) {
    return M.j(M.yld('e'), cb);
  }

  function _8() {
    var a;
    a = a2();
    return M.jB(M.yldStar(a), _9);
  }

  function _9(a) {
    return M.j(M.yld(a), _10);
  }

  function _10() {
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
    return M.jR(M.yld(i), _2, loop);
  }
}

function cfb1() {
  var i, e;
  return M.scope(_1);

  function _1() {
    i = 0;
    return _2(undefined);
  }

  function _c(_ex, ex, cb) {
    return _4(_ex, _6);
  }

  function _2(ex) {
    try {
      return M.jBH(M.yld(i === 3), _3, _c, ex, undefined);
    } catch (_ex) {
      return _c(_ex, ex, undefined);
    }
  }

  function _3(a, ex, cb) {
    try {
      if (a) {
        throw new Error(`AAAAAAAAA${i++}`);
      }

      return M.jH(M.yld(`a${i}`), _4, _c, ex, _5);
    } catch (_ex) {
      return _c(_ex, ex, cb);
    }
  }

  function __c(_ex, ex) {
    return _6(_ex);
  }

  function _4(ex, cb) {
    var a;

    try {
      a = i++;
      return M.jH(M.yld(`f1${a}`), cb, __c, ex);
    } catch (_ex) {
      return __c(_ex, ex);
    }
  }

  function _5(ex) {
    var a;

    try {
      a = i++;
      return M.jH(M.yld(`b${a}`), _9, __c, ex);
    } catch (_ex) {
      return __c(_ex, ex);
    }
  }

  function _6(ex) {
    e = ex;
    return M.j(M.yld(`e${i}`), _7);
  }

  function _7() {
    return M.j(M.yld(e), _8);
  }

  function _8() {
    return M.pure(i);
  }

  function _9(ex) {
    i++;
    return M.jR(_2, ex);
  }

  function _10() {
    return M.pure();
  }
}