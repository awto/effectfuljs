// *- with state
function a() {
  var i;
  i = 0;
  return M.j(eff(), _1, i);

  function _1(i) {
    var a;
    a = i += 1;
    return M.jB(eff(a), _2, i);
  }

  function _2(a, i) {
    var b, c;

    switch (a) {
      case 1:
        b = i += 3;
        return M.j(effB(b), _3, i);

      case 2:
        c = i += 5;
        return M.j(effB(c), _3, i);

      case 3:
        {
          console.log('hi', i);
        }
    }
  }

  function _3(i) {
    return M.j(eff(i), _4);
  }

  function _4() {
    return M.pure();
  }
}