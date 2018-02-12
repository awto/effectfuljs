import * as M from '@effectful/core';

function a() {
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2() {
    return M.chain(eff(3), _3);
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4() {}
}

function b() {
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2() {
    return M.chain(eff(3), _3);
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4() {
    return M.chain(eff(5), _5);
  }

  function _5() {
    return M.chain(eff(6), _6);
  }

  function _6() {
    console.log('7');
  }
}

function c() {
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2() {
    return M.chain(eff(3), _3);
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4() {
    return M.chain(eff(5), _5);
  }

  function _5() {
    return M.chain(eff(6), _6);
  }

  function _6() {
    console.log('7');
  }
}