function d(i) {
  return M.scopeH(_1, _8, i);

  function _1(i) {
    var j, a;
    j = 0;
    a = i++;
    return M.yldStarBH(M.yld(a), _2, _8, i, j);
  }

  function _2(a, i, j) {
    var b;
    b = j++;
    return M.yldStarBH(M.yld((a, b)), _3, _8, i, j);
  }

  function _3(i, j) {
    return M.yldStarBH(M.yldStar(some(i += 2, j) + j), _4, _8, i, j);
  }

  function _4(a, i, j) {
    return M.yldStarBH(M.yld(a), _5, _8, i, j);
  }

  function _5(a, i, j) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStarBH(M.yldStar(b), _7, _8);
    } else {
      if (j) {
        return M.pure(i);
      } else {
        return M.yldStarBH(M.yld(2), _6, _8);
      }
    }
  }

  function _6() {
    var r;
    return M.pure(r);
  }

  function _7(r) {
    return M.pure(r);
  }

  function _8(e) {
    return M.raise(e);
  }
}

function a4() {
  var e;
  return M.scopeH(_1, _11);

  function _1() {
    return M.yldStarBH(M.yld(1), _2, _13);
  }

  function _2() {
    return M.yldStarBH(M.yld(2), _3, _13);
  }

  function _3() {
    return M.yldStarBH(M.yld(3), _6, _11, _8, _11);
  }

  function _4(ex) {
    e = ex;
    return M.yldStarBH(M.yld('excep'), _5, _14);
  }

  function _5() {
    return M.yldStarBH(M.yld(e), _6, _11, _8, _11);
  }

  function _6(fc, fe, err) {
    return M.yldStarBH(M.yld('f'), _7, _11, fc, fe, err);
  }

  function _7(fc, fe, err) {
    return M.yldStarBH(M.yld('e'), fc, fe);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStarBH(M.yldStar(a), _9, _11);
  }

  function _9(a) {
    return M.yldStarBH(M.yld(a), _10, _11);
  }

  function _10() {
    return M.pure();
  }

  function _11(e) {
    return M.raise(e);
  }

  function _12(err) {
    return M.raise(err);
  }

  function _13(a) {
    return M.jumpH(_4, _14, a);
  }

  function _14(a) {
    return M.jumpH(_6, _11, _12, _11, a);
  }
}

function a5() {
  var i;
  return M.scopeH(_1, _5);

  function _1() {
    var loop;
    loop = M.iterator(a4());
    return M.jumpH(_2, _5, loop);
  }

  function _2(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jumpRH(_3, _6, loop);
    } else {
      return M.pure();
    }
  }

  function _3(loop) {
    return M.yldStarBH(M.yld(i), _2, _5, loop);
  }

  function _4(ex) {
    var e;
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
    return M.jumpH(_4, _5, a);
  }
}

function cfb1() {
  var e;
  return M.scopeH(_1, _10);

  function _1() {
    var i;
    i = 0;
    return M.jumpH(_2, _12, i);
  }

  function _2(i, err) {
    return M.yldStarBH(M.yld(i === 3), _3, _12, i, err);
  }

  function _3(a, i, err) {
    if (a) {
      throw new Error(`AAAAAAAAA${i++}`);
    }

    return M.yldStarBH(M.yld(`a${i}`), _4, _11, i, _5, _11, err);
  }

  function _4(i, fc, fe, err) {
    return M.yldStarBH(M.yld(`f1${i++}`), fc, fe, i, err, err);
  }

  function _5(i, ex, err) {
    return M.yldStarBH(M.yld(`b${i++}`), _9, _10, i, err);
  }

  function _6(i, ex) {
    e = ex;
    return M.yldStarBH(M.yld(`e${i}`), _7, _10, i);
  }

  function _7(i) {
    return M.yldStarBH(M.yld(e), _8, _10, i);
  }

  function _8(i) {
    return M.pure(i);
  }

  function _9(i, err) {
    i++;
    return M.jumpRH(_2, _12, i, err);
  }

  function _10(e) {
    return M.raise(e);
  }

  function _11(a) {
    return M.jumpH(_6, _10, void 0, a);
  }

  function _12(a) {
    return M.jumpH(_4, _11, void 0, _6, _10, a);
  }
}

function c() {
  return M.scopeH(_1, _3);

  function _1() {
    return M.yldStarBH(M.yld(1), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

const v = v => {
  return M.scopeH(_1, _3);

  function _1() {
    return M.chainBH(M.chain(v), _2, _3);
  }

  function _2(r) {
    return M.pure(r);
  }

  function _3(e) {
    return M.raise(e);
  }
};

const obj = {
  a1: function () {
    return M.scopeH(_1, _3);

    function _1() {
      return M.yldStarBH(M.yld(1), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  },
  a2: function (a) {
    return M.scopeH(_1, _3);

    function _1() {
      return M.chainBH(M.chain(a), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  },

  a3(a, b) {
    return M.scopeH(_1, _3);

    function _1() {
      return M.chainBH(M.chain(a), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  }

};

class A {
  static a(b) {
    return M.scopeH(_1, _3);

    function _1() {
      return M.chainBH(M.chain(b), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  }

  b(a) {
    return M.scopeH(_1, _3);

    function _1() {
      return M.chainBH(M.chain(a), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  }

}