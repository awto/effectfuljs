function a_1() {
  return eff(3);
}

function _a_1() {
  return eff(3);
}

function c_1() {
  return M.jM(eff(4), c_2);
}

function c_2() {
  return eff(5);
}

function d_1() {
  return M.jM(eff(4), d_2);
}

function d_2() {
  return eff(6);
}

function a(z) {
  var a_v = {
    z
  };

  switch (a_v.z) {
    case 1:
      return M.jM(eff(1), a_1);

    default:
      return M.jM(eff(2), a_1);
  }
}

function _a(z) {
  var a_v = {
    z
  };

  switch (a_v.z) {
    case 1:
      return M.jM(eff(1), _a_1);

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
      return M.jM(eff(1), c_1);

    case 2:
      return M.jM(eff(2), c_2);

    case 3:
      {
        console.log('z');
      }

    default:
      return M.jM(eff(3), c_1);
  }
}

function d(z) {
  var d_v = {
    z
  };

  switch (d_v.z) {
    case 1:
      return M.jM(eff(1), d_1);

    case 2:
      return M.jM(eff(2), d_2);

    case 3:
      console.log('z');
      return M.jM(eff(5), d_2);

    default:
      return M.jM(eff(3), d_1);
  }
}