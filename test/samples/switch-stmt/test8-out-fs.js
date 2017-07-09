// *- with state
function a() {
  var i;
  i = 0;
  return M.jM1(eff(), _1, i);

  function _1(i) {
    var a;
    a = i += 1;
    return M.jMB1(eff(a), _2, i);
  }

  function _2(a, i) {
    var b;
    b = i += 2;
    return M.jMB2(check(b), _3, i, a);
  }

  function _3(b, i, a) {
    var c;
    c = i += 4;
    return M.jMB3(check(c), _4, i, a, b);
  }

  function _4(c, i, a, b) {
    var d;
    d = i += 6;
    return M.jMB4(check(d), _5, i, a, b, c);
  }

  function _5(d, i, a, b, c) {
    switch (a) {
      case b:
        return M.jM1(effB(i += 3), _6, i);

      case c:
        return M.jM1(effB(i += 5), _6, i);

      case d:
        {
          console.log('hi', i);
        }
    }
  }

  function _6(i) {
    return eff(i);
  }
}