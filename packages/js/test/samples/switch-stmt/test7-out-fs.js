// *- with mixed effect/pure branches
function a() {
  return M.chainBH(eff(), _1, _9);

  function _1(a) {
    var pat;
    pat = a;
    return M.chainBH(check(1), _2, _9, pat);
  }

  function _2(a, pat) {
    if (pat === a) {
      return M.chainBH(effB(1), _3, _9, pat);
    } else {
      return M.jumpH(_3, _9, pat);
    }
  }

  function _3(pat) {
    return M.chainBH(check(2), _4, _9, pat);
  }

  function _4(a, pat) {
    if (pat === a) {
      console.log(2);
    }

    return M.chainBH(check(3), _5, _9, pat);
  }

  function _5(a, pat) {
    if (pat === a) {
      return M.chainBH(effB(2), _8, _9);
    } else {
      return M.chainBH(check(4), _6, _9, pat);
    }
  }

  function _6(a, pat) {
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
        return M.chainBH(check(8), _7, _9, pat);
      }
    }
  }

  function _7(a, pat) {
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