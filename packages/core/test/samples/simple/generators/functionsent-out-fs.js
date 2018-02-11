import * as M from '@effectful/core';

function fSent() {
  var s;
  return M.scope(_1, _6);

  function _1(a) {
    var sent;
    sent = a;
    return M.yldStar(M.yld(a), _2, _6, sent);
  }

  function _2(a, sent) {
    s = a;
    return M.yldStar(M.yldStar([1, 2, 3, sent]), _3, _6, sent);
  }

  function _3(sent) {
    console.log(s, sent);
    return M.yldStar(M.yld(), _4, _6);
  }

  function _4(a) {
    console.log(a);
    return M.yldStar(M.yld(), _5, _6);
  }

  function _5(a) {
    console.log(a);
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}