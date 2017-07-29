function d(i) {
  return M.scope(_1, i);

  function _1(i) {
    var j, a;
    j = 0;
    a = i++;
    return M.yldM(a, _2, i, j);
  }

  function _2(i, j) {
    var a;
    a = j++;
    return M.yldM(a, _3, i, j);
  }

  function _3(i, j) {
    var a, b;
    b = i += 2;
    a = some(b, j);
    return M.yldStarMB(a + j, _4, i);
  }

  function _4(a, i) {
    return M.yldMB(a, _5, i);
  }

  function _5(a, i) {
    if (a) return _6(i);else {
      return M.pure(i);
    }
  }

  function _6(i) {
    var a;
    a = i += 3;
    return M.yldStarMB(a, M.pure);
  }

  function _7() {
    return M.yldM(2, M.pure);
  }
}

function a4() {
  var e;
  return M.scope(_1);

  function _1() {
    return M.yldM(1, _2);
  }

  function _2() {
    try {
      return M.yldME(2, _3, _4);
    } catch (e) {
      return _4();
    }
  }

  function _3() {
    try {
      return M.yldME(3, _6, _8, _4);
    } catch (e) {
      return _4();
    }
  }

  function _4() {
    e = ex;
    return M.yldM('excep', _5);
  }

  function _5() {
    return M.yldM(e, _6, _8);
  }

  function _6(cb) {
    return M.yldM('f', _7, cb);
  }

  function _7(cb) {
    return M.yldM('e', cb);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStarMB(a, _9);
  }

  function _9(b) {
    var a;
    a = a3();
    return M.yldStarMB(a, _10, b);
  }

  function _10(c, b) {
    var a;
    a = a1(b, c);
    return M.yldM(a, M.pure);
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
    b = loop.step();
    a = loop = b;
    if (!a.done) return _3(loop);else return M.pure();
  }

  function _3(loop) {
    i = loop.value;
    return M.yldM(i, _2, loop);
  }
}