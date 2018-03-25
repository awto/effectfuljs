import * as M from "@effectful/core";

function a() {
  var a = function a() {
    console.log("hi");
    return M.chain(e1(), _1);

    function _1() {
      return M.chain(e2(), _2);
    }

    function _2() {}
  },
      b = function b() {
    p4();
    p5();
    return M.chain(e1(), _1);

    function _1() {
      return M.chain(e(2), _2);
    }

    function _2() {}
  };

  return M.chain(p1(), _1);

  function _1() {
    return M.chain(p2(), _2);
  }

  function _2() {
    return M.chain(p2(), _3);
  }

  function _3() {
    return M.chain(p3(), _4);
  }

  function _4() {}
}