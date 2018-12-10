import * as M from "@effectful/core";

(function () {
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2(a) {
    if (a) {
      return M.jump(void 0, _3);
    } else {
      return M.chain(eff(3), _3);
    }
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4() {
    return M.chain(eff(5), _5);
  }

  function _5() {}
});

(function () {
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2(a) {
    if (a) {
      return M.chain(eff("a"), _3);
    } else {
      return M.chain(eff(3), _3);
    }
  }

  function _3() {
    return M.chain(eff(4), _4);
  }

  function _4() {
    return M.chain(eff(5), _5);
  }

  function _5() {}
});

(function () {
  var r;
  return M.chain(eff(1), _1);

  function _1() {
    return M.chain(eff(2), _2);
  }

  function _2(a) {
    if (a) {
      return M.chain(eff("a"), _3);
    } else {
      return M.chain(eff(4), _5);
    }
  }

  function _3() {
    return M.chain(eff("b"), _4);
  }

  function _4(a) {
    return a;
  }

  function _5() {
    return M.chain(eff(5), _6);
  }

  function _6() {
    return r;
  }
});

function a() {
  var r;

  if (e) {
    return M.chain(eff("b"), _1);
  } else {
    return r;
  }

  function _1(a) {
    return a;
  }
}