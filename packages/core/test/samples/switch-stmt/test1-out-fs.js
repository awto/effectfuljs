import * as M from "@effectful/core";

function a() {
  return M.chain(eff(), _1);

  function _1(a) {
    var pat;
    pat = a;
    return M.chain(effC(1), _2, pat);
  }

  function _2(a, pat) {
    if (pat === a) {
      return M.chain(effR(1), _5);
    } else {
      return M.chain(effC(2), _3, pat);
    }
  }

  function _3(a, pat) {
    if (pat === a) {
      return M.chain(effR(2), _4);
    } else {
      return M.jump(void 0, _4);
    }
  }

  function _4() {
    return M.chain(effR("default"), _5);
  }

  function _5() {}
}

function c() {
  return M.chain(eff(1), _1);

  function _1(a) {
    var pat;
    pat = a;
    return M.chain(eff(2), _2, pat);
  }

  function _2(a, pat) {
    if (pat === a) {
      return M.chain(eff(3), _3, pat);
    } else {
      return M.jump(void 0, _3, pat);
    }
  }

  function _3(pat) {
    return M.chain(eff(4), _4, pat);
  }

  function _4(a, pat) {
    if (pat === a) {
      return M.chain(eff(5), _6);
    } else {
      if (pat === 6) {
        return M.chain(eff(7), _5, pat);
      } else {
        return M.jump(void 0, _5, pat);
      }
    }
  }

  function _5(pat) {
    if (pat === 8) {
      console.log(9);
    }

    return M.chain(eff(10), _6);
  }

  function _6() {}
}