function a() {
  var a = function a() {
    console.log('hi');
    return M.chain(e1(), _1, _3);

    function _1() {
      return M.chain(e2(), _2, _3);
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
    return M.chain(e1(), _1, _3);

    function _1() {
      return M.chain(e(2), _2, _3);
    }

    function _2() {
      return M.pure();
    }

    function _3(e) {
      return M.raise(e);
    }
  };

  return M.chain(p1(), _1, _5);

  function _1() {
    return M.chain(p2(), _2, _5);
  }

  function _2() {
    return M.chain(p2(), _3, _5);
  }

  function _3() {
    return M.chain(p3(), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}