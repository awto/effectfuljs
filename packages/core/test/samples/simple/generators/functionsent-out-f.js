import * as M from "@effectful/core";

function fSent() {
  var s, sent;
  return M.scope(_1);

  function _1(a) {
    sent = a;
    return M.yldStar(M.yld(a), _2);
  }

  function _2(a) {
    s = a;
    return M.yldStar(M.yldStar([1, 2, 3, sent]), _3);
  }

  function _3() {
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