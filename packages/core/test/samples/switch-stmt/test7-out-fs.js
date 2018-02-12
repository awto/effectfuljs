import * as M from '@effectful/core';

// *- with mixed effect/pure branches
function a() {
  return M.chain(eff(), _1);

  function _1(a) {
    var pat;
    pat = a;
    return M.chain(check(1), _2, pat);
  }

  function _2(a, pat) {
    if (pat === a) {
      return M.chain(effB(1), _3, pat);
    } else {
      return M.jump(void 0, _3, pat);
    }
  }

  function _3(pat) {
    return M.chain(check(2), _4, pat);
  }

  function _4(a, pat) {
    if (pat === a) {
      console.log(2);
    }

    return M.chain(check(3), _5, pat);
  }

  function _5(a, pat) {
    if (pat === a) {
      return M.chain(effB(2), _8);
    } else {
      return M.chain(check(4), _6, pat);
    }
  }

  function _6(a, pat) {
    if (pat === a) {
      console.log(5);
    } else {
      if (pat === 5) {
        console.log(6);
      }

      if (pat === 6) {
        console.log(7);
      } else {
        return M.chain(check(8), _7, pat);
      }
    }
  }

  function _7(a, pat) {
    if (pat === a) {
      return M.chain(effB(3), _8);
    }
  }

  function _8() {}
}