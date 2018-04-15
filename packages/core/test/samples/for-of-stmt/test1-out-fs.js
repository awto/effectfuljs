import * as M from "@effectful/core";

function a() {
  var i, loop;
  loop = M.iterator(some);
  return M.jump(void 0, _1, _7, loop);

  function _1(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(1), _1, _7, loop);
    } else {
      return M.jump(void 0, _2, loop, _3, _5);
    }
  }

  function _2(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _3() {
    return M.chain(eff(2), _4, _5);
  }

  function _4() {}

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(void 0, _2, void 0, _6, _5, a);
  }
}

function b() {
  var i;
  return M.chain(eff("d"), _1);

  function _1(b) {
    var loop, a;
    a = M.iterator(b);
    loop = a;
    return M.jump(void 0, _2, _8, loop);
  }

  function _2(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _2, _8, loop);
    } else {
      return M.jump(void 0, _3, loop, _4, _6);
    }
  }

  function _3(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _4() {
    return M.chain(eff(i), _5, _6);
  }

  function _5() {}

  function _6(e) {
    return M.raise(e);
  }

  function _7(err) {
    return M.raise(err);
  }

  function _8(a) {
    return M.jump(void 0, _3, void 0, _7, _6, a);
  }
}

function c() {
  var i, j, loop;
  loop = M.iterator(some);
  return M.jump(void 0, _1, _10, loop);

  function _1(loop, _fc, _fe, err, _err) {
    var _loop;

    if (!(loop = loop.step()).done) {
      i = loop.value;
      _loop = M.iterator(other);
      return M.jump(void 0, _2, _11, loop, _loop, _fc, _fe, _err);
    } else {
      return M.jump(void 0, _4, loop, _5, _7, err, _err);
    }
  }

  function _2(a, loop, _loop, _fc, _fe, _err) {
    if (!(_loop = _loop.step()).done) {
      j = _loop.value;
      return M.chain(eff(i, j), _2, _11, loop, _loop, _fc, _fe, _err);
    } else {
      return M.jump(void 0, _3, _10, [loop, _loop, _1, _10, _fc, _fe, _err]);
    }
  }

  function _3([loop, _loop, fc, fe, _fc, _fe, _err]) {
    if (_loop.exit) {
      _loop.exit();
    }

    return M.jump(void 0, fc, fe, loop, _fc, _fe, _err, _err);
  }

  function _4(loop, _fc, _fe, err, _err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, _fc, _fe, err, _err);
  }

  function _5() {
    return M.chain(eff(i, j), _6, _7);
  }

  function _6() {}

  function _7(e) {
    return M.raise(e);
  }

  function _8(err) {
    return M.raise(err);
  }

  function _9(err, _err) {
    return M.raise(_err);
  }

  function _10(a) {
    return M.jump(void 0, _4, void 0, _8, _7, a);
  }

  function _11(a) {
    return M.jump(void 0, _3, _10, [void 0, void 0, _4, _7, _9, _7, a]);
  }
}

function d() {
  var i, loop;
  loop = M.iterator(some);
  return M.jump(void 0, _1, _7, loop);

  function _1(a, loop) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(1), _1, _7, loop);
    } else {
      return M.jump(void 0, _2, loop, _3, _5);
    }
  }

  function _2(loop, fc, fe, err) {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, fc, fe, err);
  }

  function _3() {
    return M.chain(eff(2), _4, _5);
  }

  function _4() {}

  function _5(e) {
    return M.raise(e);
  }

  function _6(err) {
    return M.raise(err);
  }

  function _7(a) {
    return M.jump(void 0, _2, void 0, _6, _5, a);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}