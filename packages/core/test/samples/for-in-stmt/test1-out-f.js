import * as M from "@effectful/core";
function a() {
  var i, loop;
  return M.chain(eff(2), _1);
  function _1(b) {
    var a;
    a = M.forInIterator(b);
    loop = a;
    return M.jump(void 0, _2);
  }
  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _2);
    }
  }
}
function b() {
  var i, loop;
  return M.chain(eff(2), _1);
  function _1(b) {
    var a;
    a = M.forInIterator(b);
    loop = a;
    return M.jump(void 0, _2);
  }
  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _2);
    }
  }
}
function c() {
  var i, loop;
  return M.chain(eff(2), _1);
  function _1(b) {
    var a;
    a = M.forInIterator(b);
    loop = a;
    return M.jump(void 0, _2);
  }
  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _2);
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
  return M.jump(void 0, _1);
  function _1() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _1);
    }
  }
}
function f() {
  for (var i in obj) {
    console.log(i);
  }
}
function g() {
  var i, loop;
  return M.chain(eff("a"), _1);
  function _1() {
    return M.chain(eff(2), _2);
  }
  function _2(b) {
    var a;
    a = M.forInIterator(b);
    loop = a;
    return M.jump(void 0, _3);
  }
  function _3() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _4);
    } else {
      return M.jump(void 0, _6);
    }
  }
  function _4(a) {
    if (a) {
      return M.jump(void 0, _3);
    } else {
      return M.chain(effB(i), _5);
    }
  }
  function _5(a) {
    if (a) {
      return M.jump(void 0, _6);
    } else {
      return M.chain(eff("c"), _3);
    }
  }
  function _6() {
    return M.chain(eff("z"), _7);
  }
  function _7() {}
}
function h() {
  var j, i, loop, _loop;
  return M.chain(eff("a"), _1);
  function _1() {
    loop = M.forInIterator(obj);
    return M.jump(void 0, _2);
  }
  function _2() {
    if (!(loop = loop.step()).done) {
      j = loop.value;
      console.log("j");
      return M.chain(effA(j), _3);
    } else {
      return M.jump(void 0, _12);
    }
  }
  function _3() {
    return M.chain(eff(j), _4);
  }
  function _4(b) {
    var a;
    a = M.forInIterator(b);
    _loop = a;
    return M.jump(void 0, _5);
  }
  function _5() {
    if (!(_loop = _loop.step()).done) {
      i = _loop.value;
      console.log("b");
      return M.chain(eff("b"), _6);
    } else {
      return M.jump(void 0, _11);
    }
  }
  function _6() {
    return M.chain(eff(i + j), _7);
  }
  function _7(a) {
    if (a) {
      return M.jump(void 0, _2);
    } else {
      return M.chain(effB(i + j), _8);
    }
  }
  function _8(a) {
    if (a) {
      return M.jump(void 0, _12);
    } else {
      return M.chain(eff(i), _9);
    }
  }
  function _9(a) {
    if (a) {
      return M.jump(void 0, _5);
    } else {
      return M.chain(effB(i), _10);
    }
  }
  function _10(a) {
    if (a) {
      return M.jump(void 0, _11);
    } else {
      return M.chain(eff("c"), _5);
    }
  }
  function _11() {
    return M.chain(effB(j), _2);
  }
  function _12() {
    return M.chain(eff("z"), _13);
  }
  function _13() {}
}