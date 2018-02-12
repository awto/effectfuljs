import * as M from '@effectful/core';

function fSent() {
  var s;
  return M.scope(_1);

  function _1(a) {
    var sent;
    sent = a;
    return M.yldStar(M.yld(a), _2, sent);
  }

  function _2(a, sent) {
    s = a;
    return M.yldStar(M.yldStar([1, 2, 3, sent]), _3, sent);
  }

  function _3(sent) {
    console.log(s, sent);
    return M.yldStar(M.yld(), _4);
  }

  function _4(a) {
    console.log(a);
    return M.yldStar(M.yld(), _5);
  }

  function _5(a) {
    console.log(a);
    return M.pure();
  }
}