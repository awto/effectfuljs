function d(i) {
  return M.scope(_1, _7, i);

  function _1(i) {
    var j, a;
    j = 0;
    a = i++;
    return M.yld(a, _2, _7, i, j);
  }

  function _2(a, i, j) {
    var b;
    b = j++;
    return M.yld((a, b), _3, _7, i, j);
  }

  function _3(i, j) {
    return M.yldStar(some(i += 2, j) + j, _4, _7, i);
  }

  function _4(a, i) {
    return M.yld(a, _5, _7, i);
  }

  function _5(a, i) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStar(b, _6, _7);
    } else {
      return M.pure(i);
    }
  }

  function _6(r) {
    return M.pure(r);
  }

  function _7(e) {
    return M.raise(e);
  }
}

function a4() {
  var e;
  return M.scope(_1, _12);

  function _1() {
    return M.yld(1, _2, _14);
  }

  function _2() {
    return M.yld(2, _3, _14);
  }

  function _3() {
    return M.yld(3, _6, _12, _8, _12);
  }

  function _4(ex) {
    e = ex;
    return M.yld('excep', _5, _15);
  }

  function _5() {
    return M.yld(e, _6, _12, _8, _12);
  }

  function _6(fc, fe, err) {
    return M.yld('f', _7, _12, fc, fe, err);
  }

  function _7(fc, fe, err) {
    var fr;
    return M.yld('e', fc, fe, fr);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStar(a, _9, _12);
  }

  function _9(a) {
    var b;
    b = a3();
    return M.yldStar(b, _10, _12, a);
  }

  function _10(c, a) {
    var b;
    b = a1(a, c);
    return M.yld(b, _11, _12);
  }

  function _11() {
    return M.pure();
  }

  function _12(e) {
    return M.raise(e);
  }

  function _13(err) {
    return M.raise(err);
  }

  function _14(a) {
    return M.jump(_4, _15, a);
  }

  function _15(a) {
    return M.jump(_6, _12, _13, _12, a);
  }
}

function a5() {
  var i;
  return M.scope(_1, _5);

  function _1() {
    var loop;
    loop = M.iterator(a4());
    return M.jump(_2, _5, loop);
  }

  function _2(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_3, _6, loop);
    } else {
      return M.pure();
    }
  }

  function _3(loop) {
    return M.repeat(i, _2, _5, loop);
  }

  function _4(ex) {
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    return M.jump(_4, _5, a);
  }
}