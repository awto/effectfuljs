function a(z) {
  switch (z) {
    case 1:
      return M.jM(eff(1), _1);

    default:
      return M.jM(eff(2), _1);
  }

  function _1() {
    return eff(3);
  }
}

function _a(z) {
  switch (z) {
    case 1:
      return M.jM(eff(1), _1);

    case 2:
      console.log('1');
      return _1();

    default:
      {
        console.log('2');
      }
  }

  function _1() {
    return eff(3);
  }
}

function c(z) {
  switch (z) {
    case 1:
      return M.jM(eff(1), _1);

    case 2:
      return M.jM(eff(2), _2);

    case 3:
      {
        console.log('z');
      }

    default:
      return M.jM(eff(3), _1);
  }

  function _1() {
    return M.jM(eff(4), _2);
  }

  function _2() {
    return eff(5);
  }
}

function d(z) {
  switch (z) {
    case 1:
      return M.jM(eff(1), _1);

    case 2:
      return M.jM(eff(2), _2);

    case 3:
      console.log('z');
      return M.jM(eff(5), _2);

    default:
      return M.jM(eff(3), _1);
  }

  function _1() {
    return M.jM(eff(4), _2);
  }

  function _2() {
    return eff(6);
  }
}