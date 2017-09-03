function a() {
  var a = function a() {
    console.log('hi');
    return M.j(e1(), _1);

    function _1() {
      return M.j(e2(), _2);
    }

    function _2() {
      return M.pure();
    }
  },
      b = function b() {
    p4();
    p5();
    return M.j(e1(), _1);

    function _1() {
      return M.j(e(2), _2);
    }

    function _2() {
      return M.pure();
    }
  };

  return M.j(p1(), _1);

  function _1() {
    return M.j(p2(), _2);
  }

  function _2() {
    return M.j(p2(), _3);
  }

  function _3() {
    return M.j(p3(), _4);
  }

  function _4() {
    return M.pure();
  }
}