import * as M from '@effectful/core';

// *- with state
function a() {
  var i;
  i = 0;
  return M.chain(eff(), _1, i);

  function _1(i) {
    var a;
    a = i += 1;
    return M.chain(eff(a), _2, i);
  }

  function _2(a, i) {
    var pat, b;
    pat = a;
    b = i += 2;
    return M.chain(check(b), _3, i, pat);
  }

  function _3(a, i, pat) {
    var b, c;

    if (pat === a) {
      b = i += 3;
      return M.chain(effB(b), _6);
    } else {
      c = i += 4;
      return M.chain(check(c), _4, i, pat);
    }
  }

  function _4(a, i, pat) {
    var b, c;

    if (pat === a) {
      b = i += 5;
      return M.chain(effB(b), _6);
    } else {
      c = i += 6;
      return M.chain(check(c), _5, i, pat);
    }
  }

  function _5(a, i, pat) {
    if (pat === a) {
      console.log('hi', i);
    }

    return M.chain(eff(i), _6);
  }

  function _6() {}
}