function d(i) {
  var j, a;
  j = 0;
  a = i++;
  return M.jM(M.yld(a), _1);

  function _1() {
    var a;
    a = j++;
    return M.jM(M.yld(a), _2);
  }

  function _2() {
    var a, b;
    b = i += 2;
    a = some(b, j);
    return M.jMB(M.yldStar(a + j), _3);
  }

  function _3(a) {
    return M.jMB(M.yld(a), _4);
  }

  function _4(a) {
    if (a) return _5();else {
      if (j) return _6();else {
        return M.yld(2);
      }
    }
  }

  function _5() {
    var a;
    a = i += 3;
    return M.yldStar(a);
  }

  function _6() {
    return M.pure(i);
  }
}

function a4() {
  var e;
  return M.jM(M.yld(1), _1);

  function _1() {
    try {
      return M.jME(M.yld(2), _2, _3);
    } catch (e) {
      return _3();
    }
  }

  function _2() {
    try {
      return M.jME(M.yld(3), _5, _7, _3);
    } catch (e) {
      return _3();
    }
  }

  function _3() {
    e = ex;
    return M.jM(M.yld('excep'), _4);
  }

  function _4() {
    return M.jM(M.yld(e), _5, _7);
  }

  function _5(cb) {
    return M.jM(M.yld('f'), _6, cb);
  }

  function _6(cb) {
    return M.jM(M.yld('e'), cb);
  }

  function _7() {
    var a;
    a = a2();
    return M.jMB(M.yldStar(a), _8);
  }

  function _8(a) {
    return M.yld(a);
  }
}

function a5() {
  var i, loop;
  loop = M.iterator(a4());
  return _1(loop);

  function _1(loop) {
    var a, b;
    b = loop.step();
    a = loop = b;
    if (!a.done) return _2(loop);else return M.pure();
  }

  function _2(loop) {
    i = loop.value;
    return M.jRM(M.yld(i), _1, loop);
  }
}