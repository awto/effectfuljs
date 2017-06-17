// *- with state
function a() {
  var i;
  i = 0;
  return M.jM(eff(), _1);

  function _1() {
    var a;
    const a = i += 1;
    return M.jMB(eff(a), _2);
  }

  function _2(a) {
    var b;
    const b = i += 2;
    return M.jMB1(check(b), _3, a);
  }

  function _3(b, a) {
    var c;
    const c = i += 4;
    return M.jMB2(check(c), _4, a, b);
  }

  function _4(c, a, b) {
    var d;
    const d = i += 6;
    return M.jMB3(check(d), _5, a, b, c);
  }

  function _5(d, a, b, c) {
    switch (a) {
      case b:
        return M.jM(effB(i += 3), _6);

      case c:
        return M.jM(effB(i += 5), _6);

      case d:
        {
          console.log('hi', i);
        }
    }
  }

  function _6() {
    return eff(i);
  }
}