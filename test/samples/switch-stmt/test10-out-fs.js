function a() {
  var i;
  i = 0;
  return M.jM(eff(), _1, i);

  function _1(i) {
    var a, b;
    i += 1;
    a = i += 2;

    switch (a) {
      case 1:
        b = i += 3;
        return M.jM(effB(b), _2, i);

      case 2:
        return M.jM(effB(i), _2, i);

      case 3:
        {
          console.log('hi', i);
        }
    }
  }

  function _2(i) {
    return eff(i);
  }
}