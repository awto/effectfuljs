function a() {
  var i;
  i = 0;
  return M.chainBH(eff(), _1, _4);

  function _1() {
    var a;
    i += 1;

    switch (i += 2) {
      case 1:
        a = i += 3;
        return M.chainBH(effB(a), _2, _4);

      case 2:
        return M.chainBH(effB(i), _2, _4);

      case 3:
        {
          console.log('hi', i);
        }

      default:
        return M.jumpH(_2, _4);
    }
  }

  function _2() {
    return M.chainBH(eff(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}