function a() {
  return M.jM(M.yld(1), _1);

  function _1() {
    return M.jM(M.yld(2), _2);
  }

  function _2() {
    return M.jM(M.yldStar(some()), _3);
  }

  function _3() {
    return M.yldStar(some);
  }
}