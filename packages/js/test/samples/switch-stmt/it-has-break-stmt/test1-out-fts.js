function a(z) {
  var a = M.context();
  a._z = z;

  switch (a._z) {
    case 1:
      return M.chain(eff(1), a_1, _a_3);

    default:
      return M.chain(eff(2), a_1, _a_3);
  }
}

function a(z) {
  var a = M.context();
  a._z = z;

  switch (a._z) {
    case 1:
      return M.chain(eff(1), _a_1, a_3);

    case 2:
      console.log('1');
      return M.jump(_a_1, a_3);

    default:
      console.log('2');
      return M.jump(_a_1, a_3);
  }
}

function c(z) {
  var c = M.context();
  c._z = z;

  switch (c._z) {
    case 1:
      return M.chain(eff(1), c_1, c_4);

    case 2:
      return M.chain(eff(2), c_2, c_4);

    case 3:
      {
        console.log('z');
      }

    default:
      return M.chain(eff(3), c_1, c_4);
  }
}

function d(z) {
  var d = M.context();
  d._z = z;

  switch (d._z) {
    case 1:
      return M.chain(eff(1), d_1, d_4);

    case 2:
      return M.chain(eff(2), d_2, d_4);

    case 3:
      console.log('z');
      return M.chain(eff(5), d_2, d_4);

    default:
      return M.chain(eff(3), d_1, d_4);
  }
}

function a_1(a) {
  return M.chain(eff(3), _a_2, _a_3);
}

function _a_2(a) {
  return M.pure();
}

function _a_3(a, e) {
  return M.raise(e);
}

function _a_1(a) {
  return M.chain(eff(3), a_2, a_3);
}

function a_2(a) {
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}

function c_1(c) {
  return M.chain(eff(4), c_2, c_4);
}

function c_2(c) {
  return M.chain(eff(5), c_3, c_4);
}

function c_3(c) {
  return M.pure();
}

function c_4(c, e) {
  return M.raise(e);
}

function d_1(d) {
  return M.chain(eff(4), d_2, d_4);
}

function d_2(d) {
  return M.chain(eff(6), d_3, d_4);
}

function d_3(d) {
  return M.pure();
}

function d_4(d, e) {
  return M.raise(e);
}