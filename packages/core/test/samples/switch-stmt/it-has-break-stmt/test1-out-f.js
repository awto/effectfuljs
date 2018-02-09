function a(z) {
  switch (z) {
    case 1:
      return M.chainBH(eff(1), _1, _3);

    default:
      return M.chainBH(eff(2), _1, _3);
  }

  function _1() {
    return M.chainBH(eff(3), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function a(z) {
  switch (z) {
    case 1:
      return M.chainBH(eff(1), _1, _3);

    case 2:
      console.log('1');
      return M.jumpH(_1, _3);

    default:
      console.log('2');
      return M.jumpH(_1, _3);
  }

  function _1() {
    return M.chainBH(eff(3), _2, _3);
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function c(z) {
  switch (z) {
    case 1:
      return M.chainBH(eff(1), _1, _4);

    case 2:
      return M.chainBH(eff(2), _2, _4);

    case 3:
      {
        console.log('z');
      }

    default:
      return M.chainBH(eff(3), _1, _4);
  }

  function _1() {
    return M.chainBH(eff(4), _2, _4);
  }

  function _2() {
    return M.chainBH(eff(5), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function d(z) {
  switch (z) {
    case 1:
      return M.chainBH(eff(1), _1, _4);

    case 2:
      return M.chainBH(eff(2), _2, _4);

    case 3:
      console.log('z');
      return M.chainBH(eff(5), _2, _4);

    default:
      return M.chainBH(eff(3), _1, _4);
  }

  function _1() {
    return M.chainBH(eff(4), _2, _4);
  }

  function _2() {
    return M.chainBH(eff(6), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}