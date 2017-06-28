function a() {
  var i;
  i = 0;
  return M.jM1(eff(), _1, i);

  function _1(i) {
    i += 1;

    switch (i += 2) {
      case 1:
        return M.jM1(effB(i += 3), _2, i);

      case 2:
        return M.jM1(effB(i), _2, i);

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