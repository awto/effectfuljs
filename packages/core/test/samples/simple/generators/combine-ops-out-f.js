import * as M from "@effectful/core";

function d(i) {
  var j, a, r;
  j = 0;
  a = i++;
  return M.yld(a, _1);

  function _1(a) {
    var b;
    b = j++;
    return M.yld((a, b), _2);
  }

  function _2() {
    return M.yldStar(some(i += 2, j) + j, _3);
  }

  function _3(a) {
    return M.yld(a, _4);
  }

  function _4(a) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStar(b, _5);
    } else {
      return M.pure(i);
    }
  }

  function _5(a) {
    return M.pure(a);
  }
}

function a4() {
  var e, ex, a, fc, fe, err;
  return M.yld(1, _1, _13);

  function _1() {
    return M.yld(2, _2, _13);
  }

  function _2() {
    fc = _7, fe = _10;
    return M.yld(3, _5);
  }

  function _3() {
    e = ex;
    return M.yld("excep", _4, _14);
  }

  function _4() {
    fc = _7, fe = _10;
    return M.yld(e, _5);
  }

  function _5() {
    return M.yld("f", _6);
  }

  function _6() {
    return M.yld("e", fc, fe);
  }

  function _7() {
    var a;
    a = a2();
    return M.yldStar(a, _8);
  }

  function _8(c) {
    var b;
    a = c;
    b = a3();
    return M.yldStar(b, _9);
  }

  function _9(c) {
    var b;
    b = a1(a, c);
    return M.yld(b, _11);
  }

  function _10(e) {
    return M.raise(e);
  }

  function _11() {
    return M.pure();
  }

  function _12() {
    return M.raise(err);
  }

  function _13(a) {
    ex = a;
    return M.jump(void 0, _3, _14);
  }

  function _14(a) {
    fc = _12, fe = _10, err = a;
    return M.jump(void 0, _5);
  }
}

function a5() {
  var i, loop, fc, fe, err;
  loop = M.iterator(a4());
  return M.jump(void 0, _1, _6);

  function _1() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.yld(i, _1, _6);
    } else {
      fc = _3, fe = _4;
      return M.jump(void 0, _2);
    }
  }

  function _2() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5() {
    return M.raise(err);
  }

  function _6(a) {
    fc = _5, fe = _4, err = a;
    return M.jump(void 0, _2);
  }
}