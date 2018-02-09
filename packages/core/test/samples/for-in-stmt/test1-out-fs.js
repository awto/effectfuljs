import * as M from '@effectful/core';

function a() {
  var i;
  return M.chainBH(eff(2), _1, _3);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return M.jumpH(_2, _3, loop);
  }

  function _2(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chainBH(eff(i), _2, _3, loop);
    } else {
      return M.pure();
    }
  }

  function _3(e) {
    return M.raise(e);
  }
}

function b() {
  var i;
  return M.chainBH(eff(2), _1, _3);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return M.jumpH(_2, _3, loop);
  }

  function _2(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chainBH(eff(i), _2, _3, loop);
    } else {
      return M.pure();
    }
  }

  function _3(e) {
    return M.raise(e);
  }
}

function c() {
  var i;
  return M.chainBH(eff(2), _1, _3);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return M.jumpH(_2, _3, loop);
  }

  function _2(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chainBH(eff(i), _2, _3, loop);
    } else {
      return M.pure();
    }
  }

  function _3(e) {
    return M.raise(e);
  }
}

function d() {
  var i;
  return M.chainBH(eff(2), _1, _2);

  function _1(a) {
    for (i in a) {
      console.log(i);
    }

    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function e() {
  var i, loop;
  loop = M.forInIterator(obj);
  return M.jumpH(_1, _2, loop);

  function _1(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chainBH(eff(i), _1, _2, loop);
    } else {
      return M.pure();
    }
  }

  function _2(e) {
    return M.raise(e);
  }
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var i;
  return M.chainBH(eff('a'), _1, _8);

  function _1() {
    return M.chainBH(eff(2), _2, _8);
  }

  function _2(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return M.jumpH(_3, _8, loop);
  }

  function _3(loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chainBH(eff(i), _4, _8, loop);
    } else {
      return M.jumpH(_6, _8);
    }
  }

  function _4(a, loop) {
    if (a) {
      return M.jumpRH(_3, _8, loop);
    } else {
      return M.chainBH(effB(i), _5, _8, loop);
    }
  }

  function _5(a, loop) {
    if (a) {
      return M.jumpH(_6, _8);
    } else {
      return M.chainBH(eff('c'), _3, _8, loop);
    }
  }

  function _6() {
    return M.chainBH(eff('z'), _7, _8);
  }

  function _7() {
    return M.pure();
  }

  function _8(e) {
    return M.raise(e);
  }
}

function h() {
  var j, i;
  return M.chainBH(eff('a'), _1, _14);

  function _1() {
    var loop;
    loop = M.forInIterator(obj);
    return M.jumpH(_2, _14, loop);
  }

  function _2(loop) {
    if (!(loop = loop.step()).done) {
      j = loop.value;
      console.log('j');
      return M.chainBH(effA(j), _3, _14, loop);
    } else {
      return M.jumpH(_12, _14);
    }
  }

  function _3(loop) {
    return M.chainBH(eff(j), _4, _14, loop);
  }

  function _4(b, loop) {
    var _loop, a;

    a = M.forInIterator(b);
    _loop = a;
    return M.jumpRH(_5, _14, loop, _loop);
  }

  function _5(loop, _loop) {
    if (!(_loop = _loop.step()).done) {
      i = _loop.value;
      console.log('b');
      return M.chainBH(eff('b'), _6, _14, loop, _loop);
    } else {
      return M.jumpH(_11, _14, loop);
    }
  }

  function _6(loop, _loop) {
    return M.chainBH(eff(i + j), _7, _14, loop, _loop);
  }

  function _7(a, loop, _loop) {
    if (a) {
      return M.jumpH(_2, _14, loop);
    } else {
      return M.chainBH(effB(i + j), _8, _14, loop, _loop);
    }
  }

  function _8(a, loop, _loop) {
    if (a) {
      return M.jumpH(_12, _14);
    } else {
      return M.chainBH(eff(i), _9, _14, loop, _loop);
    }
  }

  function _9(a, loop, _loop) {
    if (a) {
      return M.jumpRH(_5, _14, loop, _loop);
    } else {
      return M.chainBH(effB(i), _10, _14, loop, _loop);
    }
  }

  function _10(a, loop, _loop) {
    if (a) {
      return M.jumpH(_11, _14, loop);
    } else {
      return M.chainBH(eff('c'), _5, _14, loop, _loop);
    }
  }

  function _11(loop) {
    return M.chainBH(effB(j), _2, _14, loop);
  }

  function _12() {
    return M.chainBH(eff('z'), _13, _14);
  }

  function _13() {
    return M.pure();
  }

  function _14(e) {
    return M.raise(e);
  }
}