function a() {
  console.log('hi');
  return M.jM(e1(), _1);

  function _1() {
    return M.jM(e2(), _2);
  }

  function _2() {
    return M.jM(p1(), _3);
  }

  function _3() {
    console.profile('minimal');
    return M.jM(p2(), _4);
  }

  function _4() {
    console.profileEnd();
    return M.jM(e1(), _5);
  }

  function _5() {
    return e(2);
  }
}