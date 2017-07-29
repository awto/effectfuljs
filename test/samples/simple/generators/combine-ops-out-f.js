function d(i) {
  var j, a;
  j = 0;
  a = i++;
  return M.yldM(a, _1);

  function _1() {
    var a;
    a = j++;
    return M.yldM(a, _2);
  }

  function _2() {
    var a, b;
    b = i += 2;
    a = some(b, j);
    return M.yldStarMB(a + j, _3);
  }

  function _3(a) {
    return M.yldMB(a, _4);
  }

  function _4(a) {
    if (a) return _5();else {
      return M.pure(i);
    }
  }

  function _5() {
    var a;
    a = i += 3;
    return M.yldStarMB(a, M.pure);
  }

  function _6() {
    return M.yldM(2, M.pure);
  }
}

function a4() {
  var e;
  return M.yldM(1, _1);

  function _1() {
    try {
      return M.yldME(2, _2, _3);
    } catch (e) {
      return _3();
    }
  }

  function _2() {
    try {
      return M.yldME(3, _5, _7, _3);
    } catch (e) {
      return _3();
    }
  }

  function _3() {
    e = ex;
    return M.yldM('excep', _4);
  }

  function _4() {
    return M.yldM(e, _5, _7);
  }

  function _5(cb) {
    return M.yldM('f', _6, cb);
  }

  function _6(cb) {
    return M.yldM('e', cb);
  }

  function _7() {
    var a;
    a = a2();
    return M.yldStarMB(a, _8);
  }

  function _8(b) {
    var a;
    a = a3();
    return M.yldStarMB(a, _9, b);
  }

  function _9(c, b) {
    var a;
    a = a1(b, c);
    return M.yldM(a, M.pure);
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
    return M.yldM(i, _1, loop);
  }
}