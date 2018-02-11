import * as M from '@effectful/core';

(function () {
  return M.chain(eff(1), _1, _6);

  function _1() {
    return M.chain(eff(2), _2, _6);
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _3, _6);
    } else {
      return M.chain(eff(3), _3, _6);
    }
  }

  function _3() {
    return M.chain(eff(4), _4, _6);
  }

  function _4() {
    return M.chain(eff(5), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
});

(function () {
  return M.chain(eff(1), _1, _6);

  function _1() {
    return M.chain(eff(2), _2, _6);
  }

  function _2(a) {
    if (a) {
      return M.chain(eff('a'), _3, _6);
    } else {
      return M.chain(eff(3), _3, _6);
    }
  }

  function _3() {
    return M.chain(eff(4), _4, _6);
  }

  function _4() {
    return M.chain(eff(5), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
});

(function () {
  return M.chain(eff(1), _1, _7);

  function _1() {
    return M.chain(eff(2), _2, _7);
  }

  function _2(a) {
    if (a) {
      return M.chain(eff('a'), _3, _7);
    } else {
      return M.chain(eff(4), _4, _7);
    }
  }

  function _3() {
    return M.chain(eff('b'), _6, _7);
  }

  function _4() {
    return M.chain(eff(5), _5, _7);
  }

  function _5() {
    var r;
    return M.pure(r);
  }

  function _6(r) {
    return M.pure(r);
  }

  function _7(e) {
    return M.raise(e);
  }
});

function a() {
  var r;

  if (e) {
    return M.chain(eff('b'), _1, _2);
  } else {
    return M.pure(r);
  }

  function _1(r) {
    return M.pure(r);
  }

  function _2(e) {
    return M.raise(e);
  }
}