// *- with state
function a() {
  var i;
  i = 0;
  return M.j(eff(), _1);

  function _1() {
    var a;
    a = i += 1;
    return M.jB(eff(a), _2);
  }

  function _2(a) {
    var b;
    b = i += 2;
    return M.jB(check(b), _3, a);
  }

  function _3(b, a) {
    var c;
    c = i += 4;
    return M.jB(check(c), _4, a, b);
  }

  function _4(d, a, b) {
    var c;
    c = i += 6;
    return M.jB(check(c), _5, a, b, d);
  }

  function _5(f, a, b, d) {
    var c, e;

    switch (a) {
      case b:
        c = i += 3;
        return M.j(effB(c), _6);

      case d:
        e = i += 5;
        return M.j(effB(e), _6);

      case f:
        {
          console.log('hi', i);
        }
    }
  }

  function _6() {
    return M.j(eff(i), _7);
  }

  function _7() {
    return M.pure();
  }
}