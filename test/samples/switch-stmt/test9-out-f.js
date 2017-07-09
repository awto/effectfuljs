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
    switch (a) {
      case 1:
        return M.jM(effB(i += 3), _3);

      case 2:
        return M.jM(effB(i += 5), _3);

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