function a() {
  var i;
  i = 0;
  return M.jM(eff(), _1);

  function _1() {
    var a, b;
    i += 1;
    a = i += 2;

    switch (a) {
      case 1:
        b = i += 3;
        return M.jM(effB(b), _2);

      case 2:
        return M.jM(effB(i), _2);

      case 3:
        {
          console.log('hi', i);
        }
    }
  }

  function _2() {
    return eff(i);
  }
}