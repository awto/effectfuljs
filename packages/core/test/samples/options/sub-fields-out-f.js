import * as M from "@effectful/core";

function a1() {
  var i,
      b = function b(j) {
    var k, r;
    k = j + i;
    i++;
    return M.chain(eff_1(), _1);

    function _1(a) {
      return a;
    }
  },
      r;

  i = 0;
  return M.chain(eff_2(), _1);

  function _1(a) {
    return a;
  }
}

function a2() {
  var i,
      b = function b(j) {
    var k, r;
    k = j + i;
    i++;
    return M.chain(eff_1(), _1);

    function _1(a) {
      return a;
    }
  },
      r;

  i = 0;
  return M.chain(eff_2(), _1);

  function _1(a) {
    return a;
  }
}