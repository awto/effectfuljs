import * as M from "@effectful/core";

(function () {
  var a, b;
  return M.chain(eff(0), _1);

  function _1() {
    a = true;
    return M.jump(void 0, _2);
  }

  function _2() {
    if (a) {
      return M.chain(eff(1), _3);
    } else {
      return M.jump(void 0, _14);
    }
  }

  function _3() {
    b = true;
    return M.jump(void 0, _4);
  }

  function _4() {
    if (b) {
      return M.chain(eff(2), _5);
    } else {
      return M.jump(void 0, _12);
    }
  }

  function _5() {
    return M.chain(eff(3), _6);
  }

  function _6(a) {
    if (a) {
      return M.chain(eff(4), _12);
    } else {
      return M.chain(eff(3), _7);
    }
  }

  function _7(a) {
    if (a) {
      return M.chain(eff(4), _10);
    } else {
      return M.chain(eff(5), _8);
    }
  }

  function _8(a) {
    if (a) {
      return M.chain(eff(6), _13);
    } else {
      return M.chain(eff(7), _9);
    }
  }

  function _9(a) {
    if (a) {
      return M.chain(eff(8), _14);
    } else {
      return M.jump(void 0, _10);
    }
  }

  function _10() {
    return M.chain(eff(9), _11);
  }

  function _11(a) {
    b = a;
    return M.jump(void 0, _4);
  }

  function _12() {
    return M.chain(eff(10), _13);
  }

  function _13() {
    a = true;
    return M.jump(void 0, _2);
  }

  function _14() {
    return M.chain(eff(11), _15);
  }

  function _15() {}
});