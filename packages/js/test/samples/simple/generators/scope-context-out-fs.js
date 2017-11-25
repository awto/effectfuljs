function d(i) {
  var d = M.generator();
  return M.scopeH(_1, _7, i);

  function _1(d, i) {
    var j, a;
    j = 0;
    a = i++;
    return M.yldStarBH(M.yld(a), _2, _7, i, j);
  }

  function _2(d, a, i, j) {
    var b;
    b = j++;
    return M.yldStarBH(M.yld((a, b)), _3, _7, i, j);
  }

  function _3(d, i, j) {
    return M.yldStarBH(M.yldStar(some(i += 2, j) + j), _4, _7, i);
  }

  function _4(d, a, i) {
    return M.yldStarBH(M.yld(a), _5, _7, i);
  }

  function _5(d, a, i) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStarBH(M.yldStar(b), _6, _7);
    } else {
      return M.pure(i);
    }
  }

  function _6(d, r) {
    return M.pure(r);
  }

  function _7(d, e) {
    return M.raise(e);
  }
}

function a4() {
  var e,
      a4 = M.generator();
  return M.scopeH(_1, _12);

  function _1(a4) {
    return M.yldStarBH(M.yld(1), _2, _14);
  }

  function _2(a4) {
    return M.yldStarBH(M.yld(2), _3, _14);
  }

  function _3(a4) {
    return M.yldStarBH(M.yld(3), _6, _12, _8, _12);
  }

  function _4(a4, ex) {
    e = ex;
    return M.yldStarBH(M.yld('excep'), _5, _15);
  }

  function _5(a4) {
    return M.yldStarBH(M.yld(e), _6, _12, _8, _12);
  }

  function _6(a4, fc, fe, err) {
    return M.yldStarBH(M.yld('f'), _7, _12, fc, fe, err);
  }

  function _7(a4, fc, fe, err) {
    return M.yldStarBH(M.yld('e'), fc, fe);
  }

  function _8(a4) {
    var a;
    a = a2();
    return M.yldStarBH(M.yldStar(a), _9, _12);
  }

  function _9(a4, a) {
    var b;
    b = a3();
    return M.yldStarBH(M.yldStar(b), _10, _12, a);
  }

  function _10(a4, c, a) {
    var b;
    b = a1(a, c);
    return M.yldStarBH(M.yld(b), _11, _12);
  }

  function _11(a4) {
    return M.pure();
  }

  function _12(a4, e) {
    return M.raise(e);
  }

  function _13(a4, err) {
    return M.raise(err);
  }

  function _14(a4, a) {
    return M.jumpH(_4, _15, a);
  }

  function _15(a4, a) {
    return M.jumpH(_6, _12, _13, _12, a);
  }
}

function a5() {
  var i,
      a5 = M.generator();
  return M.scopeH(_1, _5);

  function _1(a5) {
    var loop;
    loop = M.iterator(a4());
    return M.jumpH(_2, _5, loop);
  }

  function _2(a5, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jumpRH(_3, _6, loop);
    } else {
      return M.pure();
    }
  }

  function _3(a5, loop) {
    return M.yldStarBH(M.yld(i), _2, _5, loop);
  }

  function _4(a5, ex) {
    var e;
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _5(a5, e) {
    return M.raise(e);
  }

  function _6(a5, a) {
    return M.jumpH(_4, _5, a);
  }
}