function a() {
  var i;
  i = 0;
  return M.jM(eff(), _1);

  function _1() {
    i += 1;

    switch (i += 2) {
      case 1:
        return M.jM(effB(i += 3), _2);

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