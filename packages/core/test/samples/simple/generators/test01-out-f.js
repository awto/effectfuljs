import * as M from "@effectful/core";

function d(i) {
  var j, r;
  return M.scope(_1);

  function _1() {
    var a;
    j = 0;
    a = i++;
    return M.yldStar(M.yld(a), _2);
  }

  function _2(a) {
    var b;
    b = j++;
    return M.yldStar(M.yld((a, b)), _3);
  }

  function _3() {
    return M.yldStar(M.yldStar(some(i += 2, j) + j), _4);
  }

  function _4(a) {
    return M.yldStar(M.yld(a), _5);
  }

  function _5(a) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStar(M.yldStar(b), _6);
    } else {
      if (j) {
        return M.pure(i);
      } else {
        return M.yldStar(M.yld(2), _7);
      }
    }
  }

  function _6(a) {
    return M.pure(a);
  }

  function _7() {
    return M.pure();
  }

  function _8(r) {
    return M.pure(r);
  }
}

function a4() {
  var e, ex, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    return M.yldStar(M.yld(1), _2, _14);
  }

  function _2() {
    return M.yldStar(M.yld(2), _3, _14);
  }

  function _3() {
    fc = _8, fe = _12;
    return M.yldStar(M.yld(3), _6);
  }

  function _4() {
    e = ex;
    return M.yldStar(M.yld("excep"), _5, _15);
  }

  function _5() {
    fc = _8, fe = _12;
    return M.yldStar(M.yld(e), _6);
  }

  function _6() {
    return M.yldStar(M.yld("f"), _7);
  }

  function _7() {
    return M.yldStar(M.yld("e"), fc, fe);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStar(M.yldStar(a), _9);
  }

  function _9(a) {
    return M.yldStar(M.yld(a), _10);
  }

  function _10() {
    return M.pure();
  }

  function _11(r) {
    return M.pure(r);
  }

  function _12(e) {
    return M.raise(e);
  }

  function _13() {
    return M.raise(err);
  }

  function _14(a) {
    ex = a;
    return M.jump(void 0, _4, _15);
  }

  function _15(a) {
    fc = _13, fe = _12, err = a;
    return M.jump(void 0, _6);
  }
}

function a5() {
  var i, loop, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    loop = M.iterator(a4());
    return M.jump(void 0, _2, _8);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.yldStar(M.yld(i), _2, _8);
    } else {
      fc = _4, fe = _6;
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _4() {
    return M.pure();
  }

  function _5(r) {
    return M.pure(r);
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _6, err = a;
    return M.jump(void 0, _3);
  }
}

function cfb1() {
  var i, e, ex, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    i = 0;
    return M.jump(void 0, _2, _13);
  }

  function _2() {
    return M.yldStar(M.yld(i === 3), _3, _13);
  }

  function _3(a) {
    if (a) {
      throw new Error(`AAAAAAAAA${i++}`);
    }

    fc = _5, fe = _12;
    return M.yldStar(M.yld(`a${i}`), _4, _14);
  }

  function _4() {
    ex = err;
    return M.yldStar(M.yld(`f1${i++}`), fc, fe);
  }

  function _5() {
    return M.yldStar(M.yld(`b${i++}`), _9);
  }

  function _6() {
    e = ex;
    return M.yldStar(M.yld(`e${i}`), _7);
  }

  function _7() {
    return M.yldStar(M.yld(e), _8);
  }

  function _8() {
    return M.pure(i);
  }

  function _9() {
    i++;
    return M.jump(void 0, _2, _13);
  }

  function _10(r) {
    return M.pure(r);
  }

  function _11(e) {
    return M.raise(e);
  }

  function _12(a) {
    ex = a;
    return M.jump(void 0, _6);
  }

  function _13(a) {
    fc = _6, fe = _11, err = a;
    return M.jump(void 0, _4, _14);
  }

  function _14(a) {
    ex = a;
    return M.jump(void 0, _6);
  }
}

function c() {
  var r;
  return M.scope(_1);

  function _1() {
    return M.yldStar(M.yld(1), _2);
  }

  function _2() {
    return M.pure();
  }

  function _3(r) {
    return M.pure(r);
  }
}

const v = v => {
  var r;
  return M.scope(_1);

  function _1() {
    return M.chain(v, _2);
  }

  function _2(a) {
    return M.pure(a);
  }

  function _3(r) {
    return M.pure(r);
  }
};

const obj = {
  a1: function () {
    var r;
    return M.scope(_1);

    function _1() {
      return M.yldStar(M.yld(1), _2);
    }

    function _2() {
      return M.pure();
    }

    function _3(r) {
      return M.pure(r);
    }
  },
  a2: function (a) {
    var r;
    return M.scope(_1);

    function _1() {
      return M.chain(a, _2);
    }

    function _2() {
      return M.pure();
    }

    function _3(r) {
      return M.pure(r);
    }
  },

  a3(a, b) {
    var r;
    return M.scope(_1);

    function _1() {
      return M.chain(a, _2);
    }

    function _2() {
      return M.pure();
    }

    function _3(r) {
      return M.pure(r);
    }
  }

};

class A {
  static a(b) {
    var r;
    return M.scope(_1);

    function _1() {
      return M.chain(b, _2);
    }

    function _2() {
      return M.pure();
    }

    function _3(r) {
      return M.pure(r);
    }
  }

  b(a) {
    var r;
    return M.scope(_1);

    function _1() {
      return M.chain(a, _2);
    }

    function _2() {
      return M.pure();
    }

    function _3(r) {
      return M.pure(r);
    }
  }

}