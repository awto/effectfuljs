import * as M from "@effectful/core";

function d(i) {
  var j,
      d = M.context(),
      r;
  return M.scope(_1);

  function _1(d) {
    var a;
    j = 0;
    a = i++;
    return M.yldStar(M.yld(a), _2);
  }

  function _2(d, a) {
    var b;
    b = j++;
    return M.yldStar(M.yld((a, b)), _3);
  }

  function _3(d) {
    return M.yldStar(M.yldStar(some(i += 2, j) + j), _4);
  }

  function _4(d, a) {
    return M.yldStar(M.yld(a), _5);
  }

  function _5(d, a) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStar(b);
    } else {
      return M.pure(i);
    }
  }
}

function a4() {
  var e,
      a4 = M.context(),
      ex,
      a,
      fc,
      fe,
      err;
  return M.scope(_1);

  function _1(a4) {
    return M.yldStar(M.yld(1), _2, _14);
  }

  function _2(a4) {
    return M.yldStar(M.yld(2), _3, _14);
  }

  function _3(a4) {
    fc = _8, fe = _12;
    return M.yldStar(M.yld(3), _6);
  }

  function _4(a4) {
    e = ex;
    return M.yldStar(M.yld("excep"), _5, _15);
  }

  function _5(a4) {
    fc = _8, fe = _12;
    return M.yldStar(M.yld(e), _6);
  }

  function _6(a4) {
    return M.yldStar(M.yld("f"), _7);
  }

  function _7(a4) {
    return M.yldStar(M.yld("e"), fc, fe);
  }

  function _8(a4) {
    var a;
    a = a2();
    return M.yldStar(M.yldStar(a), _9);
  }

  function _9(a4, c) {
    var b;
    a = c;
    b = a3();
    return M.yldStar(M.yldStar(b), _10);
  }

  function _10(a4, c) {
    var b;
    b = a1(a, c);
    return M.yldStar(M.yld(b), _11, _12);
  }

  function _11(a4) {
    return M.pure();
  }

  function _12(a4, e) {
    return M.raise(e);
  }

  function _13(a4) {
    return M.raise(err);
  }

  function _14(a4, a) {
    ex = a;
    return M.jump(void 0, _4, _15);
  }

  function _15(a4, a) {
    fc = _13, fe = _12, err = a;
    return M.jump(void 0, _6);
  }
}

function a5() {
  var i,
      a5 = M.context(),
      loop,
      fc,
      fe,
      err;
  return M.scope(_1);

  function _1(a5) {
    loop = M.iterator(a4());
    return M.jump(void 0, _2, _7);
  }

  function _2(a5) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.yldStar(M.yld(i), _2, _7);
    } else {
      fc = _4, fe = _5;
      return M.jump(void 0, _3);
    }
  }

  function _3(a5) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _4(a5) {
    return M.pure();
  }

  function _5(a5, e) {
    return M.raise(e);
  }

  function _6(a5) {
    return M.raise(err);
  }

  function _7(a5, a) {
    fc = _6, fe = _5, err = a;
    return M.jump(void 0, _3);
  }
}