import * as M from '@effectful/core';

function a() {
  var a = function a() {
    console.log('hi');
    return M.chainBH(e1(), _1, _3);

    function _1() {
      return M.chainBH(e2(), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  },
      b = function b() {
    p4();
    p5();
    return M.chainBH(e1(), _1, _3);

    function _1() {
      return M.chainBH(e(2), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  };

  return M.chainBH(p1(), _1, _5);

  function _1() {
    return M.chainBH(p2(), _2, _5);
  }

  function _2() {
    return M.chainBH(p2(), _3, _5);
  }

  function _3() {
    return M.chainBH(p3(), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}