// *- with mixed effect/pure branches
function a() {
  return M.jMB(eff(), _1);

  function _1(a) {
    return M.jMB1(check(1), _2, a);
  }

  function _2(b, a) {
    return M.jMB2(check(2), _3, a, b);
  }

  function _3(c, a, b) {
    return M.jMB3(check(3), _4, a, b, c);
  }

  function _4(d, a, b, c) {
    return M.jMB4(check(4), _5, a, b, c, d);
  }

  function _5(e, a, b, c, d) {
    return M.jMB5(check(8), _6, a, b, c, d, e);
  }

  function _6(f, a, b, c, d, e) {
    switch (a) {
      case b:
        return M.jM(effB(1), _7);

      case c:
        {
          console.log(2);
        }

      case d:
        return _7();

      case e:
        console.log(5);
        return M.pure();

      case 5:
        {
          console.log(6);
        }

      case 6:
        console.log(7);
        return M.pure();

      case f:
        return effB(3);
    }
  }

  function _7() {
    return effB(2);
  }
}