function a() {
  console.log('hi');
  return M.j(e1(), _1);

  function _1() {
    return M.j(e2(), _2);
  }

  function _2() {
    return M.j(p1(), _3);
  }

  function _3() {
    console.profile('minimal');
    return M.j(p2(), _4);
  }

  function _4() {
    console.profileEnd();
    return M.j(e1(), _5);
  }

  function _5() {
    return M.j(e(2), _6);
  }

  function _6() {
    return M.pure();
  }
}