import * as M from '@effectful/core';

// *- with mixed effect/pure branches
function a() {
  var pat;
  return M.chainBH(eff(), _1, _9);

  function _1(a) {
    pat = a;
    return M.chainBH(check(1), _2, _9);
  }

  function _2(a) {
    if (pat === a) {
      return M.chainBH(effB(1), _3, _9);
    } else {
      return M.jumpH(_3, _9);
    }
  }

  function _3() {
    return M.chainBH(check(2), _4, _9);
  }

  function _4(a) {
    if (pat === a) {
      console.log(2);
    }

    return M.chainBH(check(3), _5, _9);
  }

  function _5(a) {
    if (pat === a) {
      return M.chainBH(effB(2), _8, _9);
    } else {
      return M.chainBH(check(4), _6, _9);
    }
  }

  function _6(a) {
    if (pat === a) {
      console.log(5);
      return M.pure();
    } else {
      if (pat === 5) {
        console.log(6);
      }

      if (pat === 6) {
        console.log(7);
        return M.pure();
      } else {
        return M.chainBH(check(8), _7, _9);
      }
    }
  }

  function _7(a) {
    if (pat === a) {
      return M.chainBH(effB(3), _8, _9);
    } else {
      return M.pure();
    }
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }
}