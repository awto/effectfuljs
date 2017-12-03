function a1() {
  var a1 = M.generator();
  a1.$sc = _1;
  return M.scopeH(_4);

  function _1(a1) {
    a1._loop = M.delegateFor(b(), _2, _3);
    a1.$.true = a1._loop.true;
    return M.jumpH(_4);
  }

  function _2(a1, i) {
    {
      a1._i = i;
      a1.$.true = a1._loop.true;
      return M.yldStarBH(M.yld(a1._i), _4);
    }
  }

  function _3(a1) {
    return M.pure();
  }

  function _4(a1, e) {
    return M.raise(e);
  }
}

function a2() {
  var a2 = M.generator();
  a2.$sc = _1;
  return M.scopeH(_5);

  function _1(a2) {
    a2._loop = M.delegateFor(b(), _2, _3);
    a2.$.true = a2._loop.true;
    return M.jumpH(_5);
  }

  function _2(a2, i) {
    {
      a2._i = i;
      a2.$.true = a2._loop.true;
      return M.yldStarBH(M.yld(a2._i), _5);
    }
  }

  function _3(a2) {
    a2.$sc = _4;
    return M.yldStarBH(M.yld('f'), _5);
  }

  function _4(a2) {
    return M.pure();
  }

  function _5(a2, e) {
    return M.raise(e);
  }
}

function a3() {
  var a3 = M.generator();
  a3.$sc = _1;
  return M.scopeH(_8);

  function _1(a3) {
    a3._loop = M.delegateFor(b(), _2, _6);
    a3.$.true = a3._loop.true;
    return M.jumpH(_8);
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
      a3.$.true = a3._loop.true;
      return M.jumpRH(_8);
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
      a3.$.true = a3._loop.true;
      return M.jumpRH(_8);
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
  return M.scopeH(_10);

  function _1(a4) {
    a4._loop = M.delegateFor(b(), _2, _6);
    a4.$.true = a4._loop.true;
    return M.jumpH(_10);
  }

  function _2(a4, i) {
    {
      a4._i = i;
      a4.$sc = _3;
      return M.jumpRH(_11);
    }
  }

  function _3(a4) {
    a4.$.true = a4._loop.true;
    return M.yldStarBH(M.yld(a4._i), _10);
  }

  function _4(a4) {
    var a;
    a4._e = a4._ex;
    a = a4._e.message;
    a4.$.true = a4._loop.true;
    return M.yldStarBH(M.yld(a), _10);
  }

  function _5(a4) {
    a4._e1 = a4._ex1;
    a4.$sc = _6;
    a4._fc = _7, a4._fe = _8;
    return M.yldStarBH(M.yld(a4._e1), _8);
  }

  function _6(a4) {
    a4.$sc = a4._fc;
    return M.yldStarBH(M.yld('f'), a4._fe);
  }

  function _7(a4) {
    return M.pure(r);
  }

  function _8(a4, e) {
    return M.raise(e);
  }

  function _9(a4) {
    return M.raise(a4._err1);
  }

  function _10(a4, a) {
    a4.$sc = _5;
    a4._ex1 = a;
    return M.jumpH(_12);
  }

  function _11(a4, a) {
    a4.$sc = _4;
    a4._ex = a;
    return M.jumpH(_10);
  }

  function _12(a4, a) {
    a4.$sc = _6;
    a4._fc = _9, a4._fe = _8, a4._err1 = a;
    return M.jumpH(_8);
  }
}