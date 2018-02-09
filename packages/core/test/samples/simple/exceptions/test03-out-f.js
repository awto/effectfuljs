import * as M from '@effectful/core';

function a() {
  var e, error, _error, ex;

  return M.jumpH(_1, _6);

  function _1() {
    console.log('1');
    return M.chainBH(eff(1), _3, _5);
  }

  function _2() {
    _error = ex;
    e = _error;
    console.log('2');
    return M.jumpH(_3, _5);
  }

  function _3() {
    return M.chainBH(eff(e), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    ex = a;
    return M.jumpH(_2, _5);
  }
}

function a() {
  var e, error, _error, ex;

  return M.jumpH(_1, _6);

  function _1() {
    console.log('1');
    return M.chainBH(eff(1), _3, _5);
  }

  function _2() {
    _error = ex;
    e = _error;
    console.log('2');
    _error = null;
    return M.jumpH(_3, _5);
  }

  function _3() {
    return M.chainBH(eff(e), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    ex = a;
    return M.jumpH(_2, _5);
  }
}