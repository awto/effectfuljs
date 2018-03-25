import * as M from "@effectful/core";

// *- with mixed effect/pure branches
function a() {
  var pat;
  return M.chain(eff(), _1);

  function _1(a) {
    pat = a;
    return M.chain(check(1), _2);
  }

  function _2(a) {
    if (pat === a) {
      return M.chain(effB(1), _3);
    } else {
      return M.jump(void 0, _3);
    }
  }

  function _3() {
    return M.chain(check(2), _4);
  }

  function _4(a) {
    if (pat === a) {
      console.log(2);
    }

    return M.chain(check(3), _5);
  }

  function _5(a) {
    if (pat === a) {
      return M.chain(effB(2), _8);
    } else {
      return M.chain(check(4), _6);
    }
  }

  function _6(a) {
    if (pat === a) {
      console.log(5);
    } else {
      if (pat === 5) {
        console.log(6);
      }

      if (pat === 6) {
        console.log(7);
      } else {
        return M.chain(check(8), _7);
      }
    }
  }

  function _7(a) {
    if (pat === a) {
      return M.chain(effB(3), _8);
    }
  }

  function _8() {}
}