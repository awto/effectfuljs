function fSent() {
  var s, sent;
  return M.scope(_1, _6);

  function _1(p) {
    sent = p;
    return M.yldStar(M.yld(p), _2, _6);
  }

  function _2(a) {
    s = a;
    return M.yldStar(M.yldStar([1, 2, 3, sent]), _3, _6);
  }

  function _3() {
    console.log(s, sent);
    return M.yldStar(M.yld(void 0), _4, _6);
  }

  function _4(a) {
    console.log(a);
    return M.yldStar(M.yld(void 0), _5, _6);
  }

  function _5(a) {
    console.log(a);
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}