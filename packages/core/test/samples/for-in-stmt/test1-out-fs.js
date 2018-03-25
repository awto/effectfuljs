import * as M from "@effectful/core";

function a() {
  var i;
  return M.chain(eff(2), _1);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return M.jump(void 0, _2, loop);
  }

  function _2(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _2, loop);
    }
  }
}

function b() {
  var i;
  return M.chain(eff(2), _1);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return M.jump(void 0, _2, loop);
  }

  function _2(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _2, loop);
    }
  }
}

function c() {
  var i;
  return M.chain(eff(2), _1);

  function _1(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return M.jump(void 0, _2, loop);
  }

  function _2(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _2, loop);
    }
  }
}

function d() {
  var i;
  return M.chain(eff(2), _1);

  function _1(a) {
    for (i in a) {
      console.log(i);
    }
  }
}

function e() {
  var i, loop;
  loop = M.forInIterator(obj);
  return M.jump(void 0, _1, loop);

  function _1(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _1, loop);
    }
  }
}

function f() {
  for (var i in obj) {
    console.log(i);
  }
}

function g() {
  var i;
  return M.chain(eff("a"), _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2(b) {
    var loop, a;
    a = M.forInIterator(b);
    loop = a;
    return M.jump(void 0, _3, loop);
  }

  function _3(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _4, loop);
    } else {
      return M.jump(void 0, _6);
    }
  }

  function _4(a, loop) {
    if (a) {
      return M.jump(void 0, _3, loop);
    } else {
      return M.chain(effB(i), _5, loop);
    }
  }

  function _5(a, loop) {
    if (a) {
      return M.jump(void 0, _6);
    } else {
      return M.chain(eff("c"), _3, loop);
    }
  }

  function _6() {
    return M.chain(eff("z"), _7);
  }

  function _7() {}
}

function h() {
  var j, i;
  return M.chain(eff("a"), _1);

  function _1() {
    var loop;
    loop = M.forInIterator(obj);
    return M.jump(void 0, _2, loop);
  }

  function _2(a, loop) {
    if (!(loop = loop.step()).done) {
      j = loop.value;
      console.log("j");
      return M.chain(effA(j), _3, loop);
    } else {
      return M.jump(void 0, _12);
    }
  }

  function _3(loop) {
    return M.chain(eff(j), _4, loop);
  }

  function _4(b, loop) {
    var _loop, a;

    a = M.forInIterator(b);
    _loop = a;
    return M.jump(void 0, _5, loop, _loop);
  }

  function _5(a, loop, _loop) {
    if (!(_loop = _loop.step()).done) {
      i = _loop.value;
      console.log("b");
      return M.chain(eff("b"), _6, loop, _loop);
    } else {
      return M.jump(void 0, _11, loop);
    }
  }

  function _6(loop, _loop) {
    return M.chain(eff(i + j), _7, loop, _loop);
  }

  function _7(a, loop, _loop) {
    if (a) {
      return M.jump(void 0, _2, loop);
    } else {
      return M.chain(effB(i + j), _8, loop, _loop);
    }
  }

  function _8(a, loop, _loop) {
    if (a) {
      return M.jump(void 0, _12);
    } else {
      return M.chain(eff(i), _9, loop, _loop);
    }
  }

  function _9(a, loop, _loop) {
    if (a) {
      return M.jump(void 0, _5, loop, _loop);
    } else {
      return M.chain(effB(i), _10, loop, _loop);
    }
  }

  function _10(a, loop, _loop) {
    if (a) {
      return M.jump(void 0, _11, loop);
    } else {
      return M.chain(eff("c"), _5, loop, _loop);
    }
  }

  function _11(loop) {
    return M.chain(effB(j), _2, loop);
  }

  function _12() {
    return M.chain(eff("z"), _13);
  }

  function _13() {}
}