import * as M from '@effectful/core';

function a() {
  return M.chain(eff(), _1, _6);

  function _1(a) {
    var pat;
    pat = a;
    return M.chain(effC(1), _2, _6, pat);
  }

  function _2(a, pat) {
    if (pat === a) {
      return M.chain(effR(1), _5, _6);
    } else {
      return M.chain(effC(2), _3, _6, pat);
    }
  }

  function _3(a, pat) {
    if (pat === a) {
      return M.chain(effR(2), _4, _6);
    } else {
      return M.jump(void 0, _4, _6);
    }
  }

  function _4() {
    return M.chain(effR('default'), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}

function c() {
  return M.chain(eff(1), _1, _7);

  function _1(a) {
    var pat;
    pat = a;
    return M.chain(eff(2), _2, _7, pat);
  }

  function _2(a, pat) {
    if (pat === a) {
      return M.chain(eff(3), _3, _7, pat);
    } else {
      return M.jump(void 0, _3, _7, pat);
    }
  }

  function _3(pat) {
    return M.chain(eff(4), _4, _7, pat);
  }

  function _4(a, pat) {
    if (pat === a) {
      return M.chain(eff(5), _6, _7);
    } else {
      if (pat === 6) {
        return M.chain(eff(7), _5, _7, pat);
      } else {
        return M.jump(void 0, _5, _7, pat);
      }
    }
  }

  function _5(pat) {
    if (pat === 8) {
      console.log(9);
    }

    return M.chain(eff(10), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}