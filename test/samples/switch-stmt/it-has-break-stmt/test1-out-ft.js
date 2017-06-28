function a_1(ref_1) {
  return eff(3);
}

function _a_1(ref_2) {
  return eff(3);
}

function c_1(ref_3) {
  return M.jM1(eff(4), c_2, ref_3);
}

function c_2(ref_3) {
  return eff(5);
}

function d_1(ref_4) {
  return M.jM1(eff(4), d_2, ref_4);
}

function d_2(ref_4) {
  return eff(6);
}

function a(z) {
  switch (ref_1.z) {
    case 1:
      return M.jM1(eff(1), a_1, ref_1);

    default:
      return M.jM1(eff(2), a_1, ref_1);
  }
}

function _a(z) {
  switch (ref_2.z) {
    case 1:
      return M.jM1(eff(1), _a_1, ref_2);

    case 2:
      console.log('1');
      return _a_1(ref_2);

    default:
      {
        console.log('2');
      }
  }
}

function c(z) {
  switch (ref_3.z) {
    case 1:
      return M.jM1(eff(1), c_1, ref_3);

    case 2:
      return M.jM1(eff(2), c_2, ref_3);

    case 3:
      {
        console.log('z');
      }

    default:
      return M.jM1(eff(3), c_1, ref_3);
  }
}

function d(z) {
  switch (ref_4.z) {
    case 1:
      return M.jM1(eff(1), d_1, ref_4);

    case 2:
      return M.jM1(eff(2), d_2, ref_4);

    case 3:
      console.log('z');
      return M.jM1(eff(5), d_2, ref_4);

    default:
      return M.jM1(eff(3), d_1, ref_4);
  }
}