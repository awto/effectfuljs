import * as M from "@effectful/core";

function d(i) {
  var j, r;
  return M.scope(_1);

  function _1() {
    var a;
    j = 0;
    a = i++;
    return M.yld(a, _2);
  }

  function _2(a) {
    var b;
    b = j++;
    return M.yld((a, b), _3);
  }

  function _3() {
    return M.yldStar(some(i += 2, j) + j, _4);
  }

  function _4(a) {
    return M.yld(a, _5);
  }

  function _5(a) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStar(b, _6);
    } else {
      return M.pure(i);
    }
  }

  function _6(a) {
    return M.pure(a);
  }

  function _7(r) {
    return M.pure(r);
  }
}

function a4() {
  var e, ex, a, fc, fe, r, err;
  return M.scope(_1);

  function _1() {
    return M.yld(1, _2, _15);
  }

  function _2() {
    return M.yld(2, _3, _15);
  }

  function _3() {
    fc = _8, fe = _13;
    return M.yld(3, _6);
  }

  function _4() {
    e = ex;
    return M.yld("excep", _5, _16);
  }

  function _5() {
    fc = _8, fe = _13;
    return M.yld(e, _6);
  }

  function _6() {
    return M.yld("f", _7);
  }

  function _7() {
    return M.yld("e", fc, fe);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStar(a, _9);
  }

  function _9(c) {
    var b;
    a = c;
    b = a3();
    return M.yldStar(b, _10);
  }

  function _10(c) {
    var b;
    b = a1(a, c);
    return M.yld(b, _11);
  }

  function _11() {
    return M.pure();
  }

  function _12(r) {
    return M.pure(r);
  }

  function _13(e) {
    return M.raise(e);
  }

  function _14() {
    return M.raise(err);
  }

  function _15(a) {
    ex = a;
    return M.jump(void 0, _4, _16);
  }

  function _16(a) {
    fc = _14, fe = _13, err = a;
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
      return M.yld(i, _2, _8);
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