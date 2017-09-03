function a() {
  var i;
  i = 0;
  return M.j(eff(), _1, i);

  function _1(i) {
    var a, b;
    i += 1;
    a = i += 2;

    switch (a) {
      case 1:
        b = i += 3;
        return M.j(effB(b), _2, i);

      case 2:
        return M.j(effB(i), _2, i);

      case 3:
        {
          console.log('hi', i);
        }
    }
  }

  function _2(i) {
    return M.j(eff(i), _3);
  }

  function _3() {
    return M.pure();
  }
}