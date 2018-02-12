import * as M from '@effectful/core';

function d(i) {
  return M.scope(_1, i);

  function _1(b, i) {
    var j, a;
    j = 0;
    a = i++;
    return M.yldStar(M.yld(a), _2, i, j);
  }

  function _2(a, i, j) {
    var b;
    b = j++;
    return M.yldStar(M.yld((a, b)), _3, i, j);
  }

  function _3(i, j) {
    return M.yldStar(M.yldStar(some(i += 2, j) + j), _4, i, j);
  }

  function _4(a, i, j) {
    return M.yldStar(M.yld(a), _5, i, j);
  }

  function _5(a, i, j) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStar(b);
    } else {
      if (j) {
        return M.pure(i);
      } else {
        return M.yldStar(M.yld(2), _6);
      }
    }
  }

  function _6() {
    var r;
    return M.pure(r);
  }
}

function a4() {
  var e;
  return M.scope(_1);

  function _1() {
    return M.yldStar(M.yld(1), _2, _13);
  }

  function _2() {
    return M.yldStar(M.yld(2), _3, _13);
  }

  function _3() {
    return M.yldStar(M.yld(3), _6, _8, _11);
  }

  function _4(ex) {
    e = ex;
    return M.yldStar(M.yld('excep'), _5, _14);
  }

  function _5() {
    return M.yldStar(M.yld(e), _6, _8, _11);
  }

  function _6(fc, fe, err) {
    return M.yldStar(M.yld('f'), _7, fc, fe, err);
  }

  function _7(fc, fe, err) {
    return M.yldStar(M.yld('e'), fc, fe);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStar(M.yldStar(a), _9);
  }

  function _9(a) {
    return M.yldStar(M.yld(a), _10, _11);
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
    return M.jump(void 0, _4, _14, a);
  }

  function _14(a) {
    return M.jump(void 0, _6, _12, _11, a);
  }
}

function a5() {
  var i;
  return M.scope(_1);

  function _1() {
    var loop;
    loop = M.iterator(a4());
    return M.jump(void 0, _2, _7, loop);
  }

  function _2(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.yldStar(M.yld(i), _2, _7, loop);
    } else {
      return M.jump(void 0, _3, _4, _5);
    }
  }

  function _3(fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(void 0, _3, _6, _5, a);
  }
}

function cfb1() {
  var e;
  return M.scope(_1);

  function _1() {
    var i;
    i = 0;
    return M.jump(void 0, _2, _12, i);
  }

  function _2(i, err) {
    return M.yldStar(M.yld(i === 3), _3, _12, i, err);
  }

  function _3(a, i, err) {
    if (a) {
      throw new Error(`AAAAAAAAA${i++}`);
    }

    return M.yldStar(M.yld(`a${i}`), _4, _11, i, _5, _11, err);
  }

  function _4(i, fc, fe, err) {
    return M.yldStar(M.yld(`f1${i++}`), fc, fe, i, err, err);
  }

  function _5(i, ex, err) {
    return M.yldStar(M.yld(`b${i++}`), _9, i, err);
  }

  function _6(i, ex) {
    e = ex;
    return M.yldStar(M.yld(`e${i}`), _7, i);
  }

  function _7(i) {
    return M.yldStar(M.yld(e), _8, i);
  }

  function _8(i) {
    return M.pure(i);
  }

  function _9(i, err) {
    i++;
    return M.jump(void 0, _2, _12, i, err);
  }

  function _10(e) {
    return M.raise(e);
  }

  function _11(a) {
    return M.jump(void 0, _6, void 0, a);
  }

  function _12(a) {
    return M.jump(void 0, _4, _11, void 0, _6, _10, a);
  }
}

function c() {
  return M.scope(_1);

  function _1() {
    return M.yldStar(M.yld(1), _2);
  }

  function _2() {
    return M.pure();
  }
}

const v = v => {
  return M.scope(_1);

  function _1() {
    return M.chain(v);
  }
};

const obj = {
  a1: function () {
    return M.scope(_1);

    function _1() {
      return M.yldStar(M.yld(1), _2);
    }

    function _2() {
      return M.pure();
    }
  },
  a2: function (a) {
    return M.scope(_1);

    function _1() {
      return M.chain(M.chain(a), _2);
    }

    function _2() {
      return M.pure();
    }
  },

  a3(a, b) {
    return M.scope(_1);

    function _1() {
      return M.chain(M.chain(a), _2);
    }

    function _2() {
      return M.pure();
    }
  }

};

class A {
  static a(b) {
    return M.scope(_1);

    function _1() {
      return M.chain(M.chain(b), _2);
    }

    function _2() {
      return M.pure();
    }
  }

  b(a) {
    return M.scope(_1);

    function _1() {
      return M.chain(M.chain(a), _2);
    }

    function _2() {
      return M.pure();
    }
  }

}