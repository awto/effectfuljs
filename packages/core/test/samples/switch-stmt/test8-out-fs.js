// *- with state
function a() {
  var i;
  i = 0;
  return M.chainBH(eff(), _1, _7, i);

  function _1(i) {
    var a;
    a = i += 1;
    return M.chainBH(eff(a), _2, _7, i);
  }

  function _2(a, i) {
    var pat, b;
    pat = a;
    b = i += 2;
    return M.chainBH(check(b), _3, _7, i, pat);
  }

  function _3(a, i, pat) {
    var b, c;

    if (pat === a) {
      b = i += 3;
      return M.chainBH(effB(b), _6, _7);
    } else {
      c = i += 4;
      return M.chainBH(check(c), _4, _7, i, pat);
    }
  }

  function _4(a, i, pat) {
    var b, c;

    if (pat === a) {
      b = i += 5;
      return M.chainBH(effB(b), _6, _7);
    } else {
      c = i += 6;
      return M.chainBH(check(c), _5, _7, i, pat);
    }
  }

  function _5(a, i, pat) {
    if (pat === a) {
      console.log('hi', i);
    }

    return M.chainBH(eff(i), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}