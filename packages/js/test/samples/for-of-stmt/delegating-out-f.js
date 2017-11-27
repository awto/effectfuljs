function a1() {
  var a1 = M.generator();
  a1.$sc = _1;
  return M.scopeH(_5);

  function _1(a1) {
    a1._loop = M.delegateIterator(b(), _2, _5, _4);
    return a1._loop.step();
  }

  function _2(a1, i) {
    {
      a1._i = i;
      a1.$sc = _3;
      return M.yldStarBH(M.yld(a1._i), _5);
    }
  }

  function _3(a1) {
    return a1._loop.step();
  }

  function _4(a1) {
    return M.pure();
  }

  function _5(a1, e) {
    return M.raise(e);
  }
}

function a2() {
  var a2 = M.generator();
  a2.$sc = _1;
  return M.scopeH(_6);

  function _1(a2) {
    a2._loop = M.delegateIterator(b(), _2, _6, _4);
    return a2._loop.step();
  }

  function _2(a2, i) {
    {
      a2._i = i;
      a2.$sc = _3;
      return M.yldStarBH(M.yld(a2._i), _6);
    }
  }

  function _3(a2) {
    return a2._loop.step();
  }

  function _4(a2) {
    a2.$sc = _5;
    return M.yldStarBH(M.yld('f'), _6);
  }

  function _5(a2) {
    return M.pure();
  }

  function _6(a2, e) {
    return M.raise(e);
  }
}

function a3() {
  var a3 = M.generator();
  a3.$sc = _1;
  return M.scopeH(_8);

  function _1(a3) {
    a3._loop = M.delegateIterator(b(), _2, _8, _6);
    return a3._loop.step();
  }

  function _2(a3, i) {
    {
      a3._i = i;
      a3.$sc = _3;
      return M.yldStarBH(M.yld(a3._i), _8);
    }
  }

  function _3(a3) {
    var a;
    a = a3._i++;
    a3.$sc = _4;
    return M.yldStarBH(M.yld(a), _8);
  }

  function _4(a3, a) {
    var b;

    if (a) {
      return a3._loop.step();
    } else {
      b = a3._i += 2;
      a3.$sc = _5;
      return M.yldStarBH(M.yld(b), _8);
    }
  }

  function _5(a3, a) {
    if (a) {
      a3.$sc = _6;
      return M.jumpH(_8);
    } else {
      return a3._loop.step();
    }
  }

  function _6(a3) {
    a3.$sc = _7;
    return M.yldStarBH(M.yld('f'), _8);
  }

  function _7(a3) {
    return M.pure();
  }

  function _8(a3, e) {
    return M.raise(e);
  }
}

function a4() {
  var a4 = M.generator();
  a4.$sc = _1;
  return M.scopeH(_11);

  function _1(a4) {
    a4._loop = M.delegateIterator(b(), _2, _11, _7);
    return a4._loop.step();
  }

  function _2(a4, i) {
    {
      a4._i = i;
      a4.$sc = _3;
      return M.jumpRH(_12);
    }
  }

  function _3(a4) {
    a4.$sc = _5;
    return M.yldStarBH(M.yld(a4._i), _11);
  }

  function _4(a4) {
    var a;
    a4._e = a4._ex;
    a = a4._e.message;
    a4.$sc = _5;
    return M.yldStarBH(M.yld(a), _11);
  }

  function _5(a4) {
    return a4._loop.step();
  }

  function _6(a4) {
    a4._e1 = a4._ex1;
    a4.$sc = _7;
    a4._fc = _8, a4._fe = _9;
    return M.yldStarBH(M.yld(a4._e1), _9);
  }

  function _7(a4) {
    a4.$sc = a4._fc;
    return M.yldStarBH(M.yld('f'), a4._fe);
  }

  function _8(a4) {
    return M.pure(r);
  }

  function _9(a4, e) {
    return M.raise(e);
  }

  function _10(a4) {
    return M.raise(a4._err1);
  }

  function _11(a4, a) {
    a4.$sc = _6;
    a4._ex1 = a;
    return M.jumpH(_13);
  }

  function _12(a4, a) {
    a4.$sc = _4;
    a4._ex = a;
    return M.jumpH(_11);
  }

  function _13(a4, a) {
    a4.$sc = _7;
    a4._fc = _10, a4._fe = _9, a4._err1 = a;
    return M.jumpH(_9);
  }
}