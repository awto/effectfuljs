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
    switch (a) {
      case 1:
        return M.jM1(effB(i += 3), _3, i);

      case 2:
        return M.jM1(effB(i += 5), _3, i);

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