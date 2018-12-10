import * as M from "@effectful/core";

function a() {
  var i, loop, fc, fe, err;
  loop = M.iterator(some);
  return M.jump(void 0, _1, _7);

  function _1() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(1), _1, _7);
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
    return M.chain(eff(2), _5);
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5() {}

  function _6() {
    return M.raise(err);
  }

  function _7(a) {
    fc = _6, fe = _4, err = a;
    return M.jump(void 0, _2);
  }
}

function b() {
  var i, loop, fc, fe, err;
  return M.chain(eff("d"), _1);

  function _1(b) {
    var a;
    a = M.iterator(b);
    loop = a;
    return M.jump(void 0, _2, _8);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(i), _2, _8);
    } else {
      fc = _4, fe = _5;
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
    return M.chain(eff(i), _6);
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6() {}

  function _7() {
    return M.raise(err);
  }

  function _8(a) {
    fc = _7, fe = _5, err = a;
    return M.jump(void 0, _3);
  }
}

function c() {
  var i, j, loop, _loop, fc, fe, _fc, _fe, err, _err;

  loop = M.iterator(some);
  return M.jump(void 0, _1, _10);

  function _1() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      _loop = M.iterator(other);
      return M.jump(void 0, _2, _11);
    } else {
      _fc = _5, _fe = _6;
      return M.jump(void 0, _4);
    }
  }

  function _2() {
    if (!(_loop = _loop.step()).done) {
      j = _loop.value;
      return M.chain(eff(i, j), _2, _11);
    } else {
      fc = _1, fe = _10;
      return M.jump(void 0, _3, _12);
    }
  }

  function _3() {
    if (_loop.exit) {
      _loop.exit();
    }

    err = _err;
    return M.jump(void 0, fc, fe);
  }

  function _4() {
    if (loop.exit) {
      loop.exit();
    }

    return M.jump(void 0, _fc, _fe);
  }

  function _5() {
    return M.chain(eff(i, j), _7);
  }

  function _6(e) {
    return M.raise(e);
  }

  function _7() {}

  function _8() {
    return M.raise(err);
  }

  function _9() {
    return M.raise(_err);
  }

  function _10(a) {
    _fc = _8, _fe = _6, err = a;
    return M.jump(void 0, _4);
  }

  function _11(a) {
    fc = _4, fe = _6, _fc = _9, _fe = _6, _err = a;
    return M.jump(void 0, _3, _12);
  }

  function _12(a) {
    _fc = _8, _fe = _6, err = a;
    return M.jump(void 0, _4);
  }
}

function d() {
  var i, loop, fc, fe, err;
  loop = M.iterator(some);
  return M.jump(void 0, _1, _7);

  function _1() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.chain(eff(1), _1, _7);
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
    return M.chain(eff(2), _5);
  }

  function _4(e) {
    return M.raise(e);
  }

  function _5() {}

  function _6() {
    return M.raise(err);
  }

  function _7(a) {
    fc = _6, fe = _4, err = a;
    return M.jump(void 0, _2);
  }
}

function p() {
  for (var i of some) {
    console.log(1);
  }

  console.log(2);
}