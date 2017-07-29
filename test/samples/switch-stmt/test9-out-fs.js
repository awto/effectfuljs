// *- with state
function a() {
  var i;
  i = 0;
  return M.jM(eff(), _1, i);

  function _1(i) {
    var a;
    a = i += 1;
    return M.jMB(eff(a), _2, i);
  }

  function _2(a, i) {
    var b, c;

    switch (a) {
      case 1:
        b = i += 3;
        return M.jM(effB(b), _3, i);

      case 2:
        c = i += 5;
        return M.jM(effB(c), _3, i);

      case 3:
        {
          console.log('hi', i);
        }
    }
  }

  function _3(i) {
    return eff(i);
  }
}