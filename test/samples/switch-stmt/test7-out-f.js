// *- with mixed effect/pure branches
function a() {
  return M.jB(eff(), _1);

  function _1(a) {
    return M.jB(check(1), _2, a);
  }

  function _2(b, a) {
    return M.jB(check(2), _3, a, b);
  }

  function _3(c, a, b) {
    return M.jB(check(3), _4, a, b, c);
  }

  function _4(d, a, b, c) {
    return M.jB(check(4), _5, a, b, c, d);
  }

  function _5(e, a, b, c, d) {
    return M.jB(check(8), _6, a, b, c, d, e);
  }

  function _6([f, a, b, c, d, e]) {
    switch (a) {
      case b:
        return M.j(effB(1), _7);

      case c:
        {
          console.log(2);
        }

      case d:
        return _7();

      case e:
        console.log(5);
        return _8();

      case 5:
        {
          console.log(6);
        }

      case 6:
        console.log(7);
        return _8();

      case f:
        return M.j(effB(3), _8);
    }
  }

  function _7() {
    return M.j(effB(2), _8);
  }

  function _8() {
    return M.pure();
  }
}