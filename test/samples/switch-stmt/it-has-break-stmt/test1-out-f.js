function a(z) {
  switch (z) {
    case 1:
      return M.j(eff(1), _1);

    default:
      return M.j(eff(2), _1);
  }

  function _1() {
    return M.j(eff(3), _2);
  }

  function _2() {
    return M.pure();
  }
}

function _a(z) {
  switch (z) {
    case 1:
      return M.j(eff(1), _1);

    case 2:
      console.log('1');
      return _1();

    default:
      {
        console.log('2');
      }
  }

  function _1() {
    return M.j(eff(3), _2);
  }

  function _2() {
    return M.pure();
  }
}

function c(z) {
  switch (z) {
    case 1:
      return M.j(eff(1), _1);

    case 2:
      return M.j(eff(2), _2);

    case 3:
      {
        console.log('z');
      }

    default:
      return M.j(eff(3), _1);
  }

  function _1() {
    return M.j(eff(4), _2);
  }

  function _2() {
    return M.j(eff(5), _3);
  }

  function _3() {
    return M.pure();
  }
}

function d(z) {
  switch (z) {
    case 1:
      return M.j(eff(1), _1);

    case 2:
      return M.j(eff(2), _2);

    case 3:
      console.log('z');
      return M.j(eff(5), _2);

    default:
      return M.j(eff(3), _1);
  }

  function _1() {
    return M.j(eff(4), _2);
  }

  function _2() {
    return M.j(eff(6), _3);
  }

  function _3() {
    return M.pure();
  }
}