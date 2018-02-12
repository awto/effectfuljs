import * as M from '@effectful/core';

function a() {
  var error, _error;

  return M.jump(void 0, _1, _5);

  function _1() {
    console.log('1');
    return M.chain(eff(1), _3);
  }

  function _2(ex) {
    var e;
    _error = ex;
    e = _error;
    console.log('2');
    return M.jump(void 0, _3, e);
  }

  function _3(e) {
    return M.chain(eff(e), _4);
  }

  function _4() {}

  function _5(a) {
    return M.jump(void 0, _2, a);
  }
}

function a() {
  var error;
  return M.jump(void 0, _1, _5);

  function _1() {
    console.log('1');
    return M.chain(eff(1), _3);
  }

  function _2(ex) {
    var e, error;
    error = ex;
    e = error;
    console.log('2');
    error = null;
    return M.jump(void 0, _3, e);
  }

  function _3(e) {
    return M.chain(eff(e), _4);
  }

  function _4() {}

  function _5(a) {
    return M.jump(void 0, _2, a);
  }
}