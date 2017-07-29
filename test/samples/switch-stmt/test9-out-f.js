// *- with state
function a() {
  var i;
  i = 0;
  return M.jM(eff(), _1);

  function _1() {
    var a;
    a = i += 1;
    return M.jMB(eff(a), _2);
  }

  function _2(a) {
    var b, c;

    switch (a) {
      case 1:
        b = i += 3;
        return M.jM(effB(b), _3);

      case 2:
        c = i += 5;
        return M.jM(effB(c), _3);

      case 3:
        {
          console.log('hi', i);
        }
    }
  }

  function _3() {
    return eff(i);
  }
}