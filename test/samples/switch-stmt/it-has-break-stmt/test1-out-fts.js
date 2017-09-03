function a(z) {
  var a_v = {
    z
  };

  switch (a_v.z) {
    case 1:
      return M.j(eff(1), a_1);

    default:
      return M.j(eff(2), a_1);
  }
}

function _a(z) {
  var a_v = {
    z
  };

  switch (a_v.z) {
    case 1:
      return M.j(eff(1), _a_1);

    case 2:
      console.log('1');
      return _a_1();

    default:
      {
        console.log('2');
      }
  }
}

function c(z) {
  var c_v = {
    z
  };

  switch (c_v.z) {
    case 1:
      return M.j(eff(1), c_1);

    case 2:
      return M.j(eff(2), c_2);

    case 3:
      {
        console.log('z');
      }

    default:
      return M.j(eff(3), c_1);
  }
}

function d(z) {
  var d_v = {
    z
  };

  switch (d_v.z) {
    case 1:
      return M.j(eff(1), d_1);

    case 2:
      return M.j(eff(2), d_2);

    case 3:
      console.log('z');
      return M.j(eff(5), d_2);

    default:
      return M.j(eff(3), d_1);
  }
}

function a_1() {
  return M.j(eff(3), a_2);
}

function a_2() {
  return M.pure();
}

function _a_1() {
  return M.j(eff(3), _a_2);
}

function _a_2() {
  return M.pure();
}

function c_1() {
  return M.j(eff(4), c_2);
}

function c_2() {
  return M.j(eff(5), c_3);
}

function c_3() {
  return M.pure();
}

function d_1() {
  return M.j(eff(4), d_2);
}

function d_2() {
  return M.j(eff(6), d_3);
}

function d_3() {
  return M.pure();
}